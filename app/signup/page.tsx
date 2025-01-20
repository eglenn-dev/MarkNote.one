import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Signup from "./signup";

export const metadata = {
    title: "Signup | MarkNote.one",
};

export default async function LoginPage() {
    const session = await getSession();
    if (session) redirect("/home");

    return <Signup />;
}
