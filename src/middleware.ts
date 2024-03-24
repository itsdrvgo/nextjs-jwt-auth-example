import { NextRequest, NextResponse } from "next/server";
import {
    ACCESS_TOKEN_COOKIE_NAME,
    AUTH_TOKEN_COOKIE_NAME,
} from "./config/const";
import { decodeAuthToken, verifyAccessToken } from "./lib/jwt";
import { isAuthTokenInCache } from "./lib/redis/methods/token";

export async function middleware(req: NextRequest) {
    const url = new URL(req.url);
    const res = NextResponse.next();

    const authToken = req.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
    const accessToken = req.headers.get("Authorization")?.split(" ")[1];

    if (url.pathname.startsWith("/api")) {
        const publicApiRoutes = new RegExp("/api/auth/(signin|signup)");
        if (publicApiRoutes.test(url.pathname)) return res;

        if (!authToken)
            return NextResponse.redirect(new URL("/auth/signin", url.origin));
        if (url.pathname === "/api/token") return res;

        if (!accessToken)
            return NextResponse.json(
                {
                    error: "Unauthorized",
                    message: "Invalid access token",
                },
                {
                    status: 401,
                    statusText: "Unauthorized",
                }
            );

        const data = await verifyAccessToken(accessToken);
        if (!data)
            return NextResponse.json(
                {
                    error: "Unauthorized",
                    message: "Invalid access token",
                },
                {
                    status: 401,
                    statusText: "Unauthorized",
                }
            );

        return res;
    }

    if (!authToken)
        return NextResponse.redirect(new URL("/auth/signin", url.origin));

    const { sub: userId } = decodeAuthToken(authToken);
    if (!userId)
        return NextResponse.redirect(new URL("/auth/signin", url.origin));

    const isTokenValid = await isAuthTokenInCache(userId, authToken);
    if (!isTokenValid) {
        const newRes = NextResponse.redirect(
            new URL("/auth/signin", url.origin)
        );
        // eslint-disable-next-line drizzle/enforce-delete-with-where
        newRes.cookies.delete(AUTH_TOKEN_COOKIE_NAME);
        // eslint-disable-next-line drizzle/enforce-delete-with-where
        newRes.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
        return newRes;
    }

    return res;
}

export const config = {
    matcher: ["/", "/profile", "/api/:path*"],
};
