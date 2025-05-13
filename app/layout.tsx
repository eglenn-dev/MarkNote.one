import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/analytics";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MarkNote.one - Markdown Note Taking",
    description:
        "A powerful Markdown note-taking app with live previews. Simple and easy user interface equipped with auto-saving and a text interface, all accessible form your keyboard with shortcuts. Start taking notes now!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} bg-background text-foreground`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
                <GoogleAnalytics />
                <Analytics />
            </body>
        </html>
    );
}
