import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import {
    getEmailByKey,
    checkOauthUser,
    getUsernameByKey,
} from "@/models/accounts-model";
import AccountManagement from "./account";

export default async function AccountPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const userEmail = await getEmailByKey(session.user.userId);
    const username = await getUsernameByKey(session.user.userId);
    const isOauth = await checkOauthUser(username);

    return (
        <AccountManagement
            userId={session.user.userId}
            userEmail={userEmail}
            isOauth={isOauth}
        />
    );
}
