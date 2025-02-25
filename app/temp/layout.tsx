import type React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/temp/header";

interface TempNotesLayoutProps {
    children: React.ReactNode;
}

export const metadata = {
    title: "Temporary Notes | MarkNote.one",
    describe:
        "Secure Temporary Notes that automatically disappear after being read or after a set time. Perfect for sharing sensitive information securely.",
};

export default async function TempNotesLayout({
    children,
}: TempNotesLayoutProps) {
    const headerList = await headers();
    const host = headerList.get("host");
    if (
        host !== `temp.${process.env.BASE_URL}` &&
        process.env.NODE_ENV === "production"
    ) {
        redirect(`https://temp.${process.env.BASE_URL}`);
    } else if (host !== `temp.localhost:3000`) {
        redirect(`http://temp.localhost:3000`);
    }
    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow-0">{children}</main>
        </div>
    );
}
