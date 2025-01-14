import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function homePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    // const userId = session.user.userId;

    return (
        <div>
            <p>You are authenticated and so you are able to view this page.</p>
            <Link href="/new-note">
                <Button>New Note</Button>
            </Link>
        </div>
    );
}
