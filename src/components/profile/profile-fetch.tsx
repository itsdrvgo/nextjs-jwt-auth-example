import { AUTH_TOKEN_COOKIE_NAME } from "@/config/const";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { decodeAuthToken } from "@/lib/jwt";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfilePage from "./profile-page";

async function ProfileFetch() {
    const cookieStore = cookies();

    const authToken = cookieStore.get(AUTH_TOKEN_COOKIE_NAME)?.value;
    if (!authToken) redirect("/auth/signin");

    const { sub: userId } = decodeAuthToken(authToken);
    if (!userId) redirect("/auth/signin");

    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });
    if (!user) redirect("/auth/signin");

    return (
        <div className="flex flex-col items-center gap-5">
            <div className="space-y-1 text-center">
                <h1>Welcome back, {user.username}!</h1>
                <p>Your ID is {user.id}</p>
            </div>

            <ProfilePage />
        </div>
    );
}

export default ProfileFetch;
