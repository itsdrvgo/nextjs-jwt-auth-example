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
        if (!existingUser)
            return CResponse({
                message: "NOT_FOUND",
                longMessage: "Please sign up first!",
            });

        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordValid)
            return CResponse({
                message: "UNAUTHORIZED",
                longMessage: "Invalid password!",
            });

        const authToken = await generateAuthToken(existingUser.id);
        const accessToken = await generateAccessToken(existingUser.id);

        await updateAuthTokenInCache(authToken, existingUser.id);

        const res = CResponse({
            message: "OK",
            longMessage: "Welcome back!",
            data: {
                user: {
                    username: existingUser.username,
                    id: existingUser.id,
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
