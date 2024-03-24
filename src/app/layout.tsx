import { cn, getAbsoluteURL } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { LayoutProps } from "@/types";
import { Metadata } from "next";
import { Titillium_Web } from "next/font/google";

const font = Titillium_Web({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700"],
});

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: "%s | " + siteConfig.name,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(getAbsoluteURL()),
};

function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    font.className,
                    "flex min-h-screen flex-col overflow-x-hidden antialiased"
                )}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}

export default RootLayout;
