import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import {
    getEmailByKey,
    checkOauthUser,
    getUsernameByKey,
    getUserCategories,
} from "@/models/accounts-model";
import Settings from "./settings";
import { Suspense } from "react";
import SettingsSkeleton from "./setting-skeleton";

export const metadata = {
    title: "Settings | MarkNote.one",
};

interface User {
    user: {
        userId: string;
        role: string;
        menuOpen: boolean;
        mdPreview: boolean;
    };
}

export default async function AccountPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    return (
        <Suspense fallback={<SettingsSkeleton />}>
            <AccountPageWrapper user={session.user} />
        </Suspense>
    );
}

async function AccountPageWrapper({ user }: User) {
    const userEmail = await getEmailByKey(user.userId);
    const username = await getUsernameByKey(user.userId);
    const userCategories = await getUserCategories(user.userId);
    const isOauth = await checkOauthUser(username);

    const userAccount = {
        userId: user.userId,
        preferences: {
            mdPreview: user.mdPreview,
            menuOpen: user.menuOpen,
            categories: userCategories,
        },
        username: username,
        userEmail: userEmail,
        isOauth: isOauth,
    };

    return <Settings userAccount={userAccount} />;
}
