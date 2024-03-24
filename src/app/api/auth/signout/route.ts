import {
    ACCESS_TOKEN_COOKIE_NAME,
    AUTH_TOKEN_COOKIE_NAME,
} from "@/config/const";
import { verifyAccessToken } from "@/lib/jwt";
import { removeAuthTokenFromCache } from "@/lib/redis/methods/token";
import { CResponse, handleError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const refreshToken = req.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
        if (!refreshToken)
            return CResponse({
                message: "UNAUTHORIZED",
                longMessage: "Please sign in first!",
            });

        const accessToken = req.headers.get("Authorization")?.split(" ")[1];
        if (!accessToken)
            return CResponse({
                message: "UNAUTHORIZED",
                longMessage: "You are not authorized",
            });

        const data = await verifyAccessToken(accessToken);
        if (!data)
            return CResponse({
                message: "UNAUTHORIZED",
                longMessage: "Invalid access token",
            });
        if (!data.userId)
            return CResponse({
                message: "UNAUTHORIZED",
                longMessage: "Invalid access token",
            });

        await removeAuthTokenFromCache(data.userId);

        const res = CResponse({
            message: "OK",
            longMessage: "Goodbye!",
        });

        // eslint-disable-next-line drizzle/enforce-delete-with-where
        res.cookies.delete(AUTH_TOKEN_COOKIE_NAME);
        // eslint-disable-next-line drizzle/enforce-delete-with-where
        res.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);

        return res;
    } catch (err) {
        return handleError(err);
    }
}
