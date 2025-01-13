import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function homePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    return <div>You have to be authenticated to view this page.</div>;
}
