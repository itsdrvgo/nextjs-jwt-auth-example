import {
    ACCESS_TOKEN_COOKIE_NAME,
    AUTH_TOKEN_COOKIE_NAME,
} from "@/config/const";
import {
    decodeAuthToken,
    generateAccessToken,
    verifyAccessToken,
} from "@/lib/jwt";
import { CResponse } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const authToken = req.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
    if (!authToken)
        return CResponse({
            message: "UNAUTHORIZED",
            longMessage: "You are not authorized",
        });

    const { sub: userId } = decodeAuthToken(authToken);
    if (!userId)
        return CResponse({
            message: "UNAUTHORIZED",
            longMessage: "You are not authorized",
        });

    let accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
    if (!accessToken) {
        accessToken = await generateAccessToken(userId);

        const res = CResponse({
            message: "OK",
            longMessage: "Access token generated",
            data: { token: accessToken },
        });

        res.cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return res;
    }

    const data = await verifyAccessToken(accessToken);
    if (!data)
        return CResponse({
            message: "UNAUTHORIZED",
            longMessage: "Invalid access token",
        });

    switch (data.error) {
        case "EXPIRED":
            accessToken = await generateAccessToken(userId);

            const res = CResponse({
                message: "OK",
                longMessage: "Access token generated",
                data: { token: accessToken },
            });

            res.cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });

            return res;
        case "INVALID":
            return CResponse({
                message: "UNAUTHORIZED",
                longMessage: "Invalid access token",
            });
    }

    return CResponse({
        message: "OK",
        longMessage: "Access token verified",
        data: { token: accessToken },
    });
}
