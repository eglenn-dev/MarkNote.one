import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Login from "./login";

export const metadata = {
    title: "Login | MarkNote.one",
    description: "Sign in to your MarkNote.one account",
};

export default async function LoginPage() {
    const session = await getSession();
    if (session) redirect("/home");

    return <Login />;
}
