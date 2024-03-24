import ProfileFetch from "@/components/profile/profile-fetch";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Profile",
};

function Page() {
    return (
        <section className="flex flex-1 items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
                <ProfileFetch />
            </Suspense>
        </section>
    );
}

export default Page;
