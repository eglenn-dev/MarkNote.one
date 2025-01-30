import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import {
    getEmailByKey,
    checkOauthUser,
    getUsernameByKey,
    getUserCategories,
} from "@/models/accounts-model";
import Settings from "./settings";

export const metadata = {
    title: "Settings | MarkNote.one",
};

export default async function AccountPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const userEmail = await getEmailByKey(session.user.userId);
    const username = await getUsernameByKey(session.user.userId);
    const userCategories = await getUserCategories(session.user.userId);
    const isOauth = await checkOauthUser(username);

    const userAccount = {
        userId: session.user.userId,
        preferences: {
            mdPreview: session.user.mdPreview,
            menuOpen: session.user.menuOpen,
            categories: userCategories,
        },
        username: username,
        userEmail: userEmail,
        isOauth: isOauth,
    };

    return <Settings userAccount={userAccount} />;
}
