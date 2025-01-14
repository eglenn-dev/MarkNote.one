import { redirect } from "next/navigation";
export default async function NotePage() {
    return redirect("/home");
}
