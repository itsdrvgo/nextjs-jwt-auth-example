"use client";

import { cFetch, cn } from "@/lib/utils";
import { ResponseData } from "@/lib/validation/response";
import { GenericProps } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

function ProfilePage({ className, ...props }: GenericProps) {
    const router = useRouter();

    const generateToken = async () => {
        const res = await cFetch<ResponseData<{ token: string }>>("/api/token");

        if (res.message !== "OK") return null;
        if (!res.data) return null;

        return res.data.token;
    };

    const handleLogout = async () => {
        const accessToken = await generateToken();
        if (!accessToken) return toast.error("Failed to generate token");

        const res = await cFetch<ResponseData>("/api/auth/signout", {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });
        if (res.message !== "OK") return toast.error(res.longMessage);

        toast.success(res.longMessage);
        router.push("/auth/signin");
    };

    const handleViewToast = async () => {
        const accessToken = await generateToken();
        if (!accessToken) return toast.error("Failed to generate token");

        const res = await cFetch<ResponseData>("/api/toast", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });
        if (res.message !== "OK") return toast.error(res.longMessage);

        toast.success(res.longMessage);
    };

    return (
        <div className={cn("space-x-2", className)} {...props}>
            <Button size="sm" variant="destructive" onClick={handleLogout}>
                Logout
            </Button>

            <Button size="sm" onClick={handleViewToast}>
                View Toast
            </Button>
        </div>
    );
}

export default ProfilePage;
