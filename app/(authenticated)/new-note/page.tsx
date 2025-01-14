import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Note from "@/components/note";

export default async function NotePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    return <Note userId={session.user.userId} />;
}
