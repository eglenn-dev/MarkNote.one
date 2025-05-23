import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Upload from "./upload";

export const metadata = {
    title: "Upload | MarkNote.one",
};

export default async function UploadPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    return <Upload userId={session.user.userId} />;
}
