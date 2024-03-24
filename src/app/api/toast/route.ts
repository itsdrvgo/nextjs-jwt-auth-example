import { AUTH_TOKEN_COOKIE_NAME } from "@/config/const";
import { verifyAccessToken } from "@/lib/jwt";
import { CResponse, handleError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
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

        return CResponse({
            message: "OK",
            longMessage: "Toast created!",
        });
    } catch (err) {
        return handleError(err);
    }
}
