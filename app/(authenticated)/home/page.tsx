import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function homePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    // const userId = session.user.userId;

    return <div>You have to be authenticated to view this page.</div>;
}
