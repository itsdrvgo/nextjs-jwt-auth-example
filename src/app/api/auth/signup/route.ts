import {
    ACCESS_TOKEN_COOKIE_NAME,
    AUTH_TOKEN_COOKIE_NAME,
} from "@/config/const";
import { db } from "@/lib/drizzle";
import { insertUserSchema, users } from "@/lib/drizzle/schema";
import { generateAccessToken, generateAuthToken } from "@/lib/jwt";
import { updateAuthTokenInCache } from "@/lib/redis/methods/token";
import { CResponse, handleError } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { username, password } = insertUserSchema.parse(body);

        const existingUser = await db.query.users.findFirst({
            where: eq(users.username, username),
        });
        if (existingUser)
            return CResponse({
                message: "CONFLICT",
                longMessage: "User already exists!",
            });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = (
            await db
                .insert(users)
                .values({
                    username,
                    password: hashedPassword,
                })
                .returning()
        )[0];

        const authToken = await generateAuthToken(user.id);
        const accessToken = await generateAccessToken(user.id);

        await updateAuthTokenInCache(authToken, user.id);

        const res = CResponse({
            message: "CREATED",
            longMessage: "Hi there! Welcome to our platform!",
            data: {
                user: {
                    username: user.username,
                    id: user.id,
                },
            },
        });

        res.cookies.set(AUTH_TOKEN_COOKIE_NAME, authToken, {
            httpOnly: true,
        });
        res.cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
            httpOnly: true,
        });

        return res;
    } catch (err) {
        return handleError(err);
    }
}
