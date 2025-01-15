import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Note from "@/components/note";

export const metadata = {
    title: "New Note | MarkNote"
}

export default async function NotePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    return <Note userId={session.user.userId} />;
}
