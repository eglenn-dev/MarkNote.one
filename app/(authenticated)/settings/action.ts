"use server";
import { getSession, encrypt } from "@/lib/session";
import { verifyPassword } from "@/lib/hashing";
import { logout } from "@/lib/auth";
import { cookies } from "next/headers";
import {
    updateUserEmail,
    getEmailByKey,
    updateUserPassword,
    getUserByKey,
    checkOauthUser,
    getUsernameByKey,
    updateUserUsername,
    updateUserPreferences,
} from "@/models/accounts-model";

export async function updateEmailAction(userId: string, email: string) {
    const session = await getSession();
    if (!session) return null;
    if (session.user.userId !== userId) return null;
    const dbEmail = await getEmailByKey(userId);
    if (dbEmail === email) return null;
    return await updateUserEmail(userId, email);
}

export async function updatePasswordAction(
    userId: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
) {
    const session = await getSession();
    if (!session) return null;
    if (session.user.userId !== userId) return null;
    const user = await getUserByKey(userId);
    if (!user) return null;
    const username = await getUsernameByKey(userId);
    if (!username) return null;
    const isOauth = await checkOauthUser(username);
    if (!isOauth && !currentPassword) return null;
    if (isOauth) {
        if (user.password) {
            console.log("User is oauth but has a password");
            if (!(await verifyPassword(currentPassword, user.password))) {
                console.log("Password is incorrect");
                return null;
            }
        } else {
            console.log("User is oauth and has no password");
        }
    } else {
        if (!(await verifyPassword(currentPassword, user.password))) {
            console.log("Password is incorrect");
            return null;
        }
    }
    if (newPassword.length < 8) return null;
    if (newPassword !== confirmNewPassword) return null;
    await updateUserPassword(userId, newPassword);
    await logout();
}

export async function updateUsernameAction(userId: string, username: string) {
    const session = await getSession();
    if (!session) return null;
    if (session.user.userId !== userId) return null;
    const dbUsername = await getUsernameByKey(userId);
    if (dbUsername === username) return null;
    return await updateUserUsername(userId, username);
}

export async function updatePreferencesAction(
    userId: string,
    mdPreview: boolean,
    menuOpen: boolean
) {
    const session = await getSession();
    if (!session) return null;
    if (session.user.userId !== userId) return null;
    await updateUserPreferences(userId, mdPreview, menuOpen);
    session.user.mdPreview = mdPreview;
    session.user.menuOpen = menuOpen;
    const expires = new Date(Date.now() + 60 * 60 * 1000 * 168);
    session.expires = expires;
    const newSession = await encrypt(session);
    (await cookies()).set("session", newSession, { expires, httpOnly: true });
}
