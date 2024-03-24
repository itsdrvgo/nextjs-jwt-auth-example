"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cFetch } from "@/lib/utils";
import { ResponseData } from "@/lib/validation/response";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

interface UserReponse {
    user: {
        id: string;
        username: string;
    };
}

function Page() {
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const username = formdata.get("username") as string;
        const password = formdata.get("password") as string;

        const res = await cFetch<ResponseData<UserReponse>>(
            "/api/auth/signin",
            {
                body: JSON.stringify({
                    username,
                    password,
                }),
                method: "POST",
            }
        );

        if (res.message === "NOT_FOUND") {
            router.push("/auth/signup");
            return toast.error(res.longMessage);
        }
        if (res.message !== "OK") return toast.error(res.longMessage);

        toast.success(res.longMessage);
        router.push("/");
    };

    return (
        <section className="flex flex-1 flex-col items-center justify-center gap-5">
            <h1 className="text-3xl font-bold">Signin</h1>

            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <Input name="username" type="text" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <Input name="password" type="password" />
                </div>

                <Button type="submit">Signin</Button>
            </form>

            <Link href="/auth/signup">Signup</Link>
        </section>
    );
}

export default Page;
