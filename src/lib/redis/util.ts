import { CACHED_AUTH_TOKEN_KEY } from "@/config/const";

export function generateAuthTokenCacheKey(userId: string) {
    return CACHED_AUTH_TOKEN_KEY + "::" + userId;
}
