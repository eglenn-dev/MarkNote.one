import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getCleanUsers, getTempNoteStats } from "@/models/admin-model";
import AdminDashboard from "./admin-dashboard";

export const metadata = {
    title: "Admin Dashboard | MarkNote.one",
};

export default async function AdminPage() {
    const session = await getSession();
    if (!session) redirect("/login");
    if (session.user.role !== "admin") redirect("/home");

    const users = await getCleanUsers();
    const noteStats = await getTempNoteStats();

    return <AdminDashboard users={users} notes={noteStats} />;
}
