import { LayoutProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Auth",
        template: "%s | Auth",
    },
};

function Layout({ children }: LayoutProps) {
    return <main className="flex flex-1">{children}</main>;
}

export default Layout;
