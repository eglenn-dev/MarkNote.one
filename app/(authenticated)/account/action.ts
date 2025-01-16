"use server";
import { getSession } from "@/lib/session";
import { verifyPassword } from "@/lib/hashing";
import { logout } from "@/lib/auth";
import {
    updateUserEmail,
    getEmailByKey,
    updateUserPassword,
    getUserByKey,
    checkOauthUser,
    getUsernameByKey,
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
