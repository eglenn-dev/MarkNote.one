import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Login from "./login";

export default async function LoginPage() {
    const session = await getSession();
    if (session) redirect("/home");

    return <Login />;
}
