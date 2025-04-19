import { google } from "googleapis";
import {
    checkGoogleOauthUserById,
    createGoogleOauthUser,
    getKeyByGoogleID,
    getUserByKey,
    getUserByEmail,
    addGoogleOauthToUser,
} from "@/models/accounts-model";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URI
);

export async function GET(request: Request) {
    const code = new URL(request.url).searchParams.get("code");

    if (!code) return new Response("No code provided", { status: 400 });

    let tokens;
    try {
        const result = await oauth2Client.getToken(code);
        tokens = result.tokens;
    } catch (err) {
        console.error("Error getting token", err);
        return new Response("Error getting token", { status: 500 });
    }

    if (!tokens) return new Response("No tokens received", { status: 500 });
    oauth2Client.setCredentials(tokens);

    try {
        const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
        const userInfo = await oauth2.userinfo.get();
        const { email, name, id } = userInfo.data;

        if (!email || !name || !id) {
            return new Response("Failed to retrieve user information", {
                status: 500,
            });
        }

        if (!(await checkGoogleOauthUserById(id))) {
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                await addGoogleOauthToUser(existingUser.username, id);
            } else {
                const username = email.split("@")[0];
                await createGoogleOauthUser(username, email, name, id);
            }
        }

        const key = await getKeyByGoogleID(id);
        if (!key) throw new Error("Failed to get key by username");

        const dbUser = await getUserByKey(key);
        if (!dbUser) throw new Error("Failed to get user by key");
        const expires = new Date(Date.now() + 60 * 60 * 1000 * 168);
        const session = await encrypt({
            user: {
                userId: key,
                role: dbUser.role || "user",
                menuOpen: dbUser.preferences.menuOpen || true,
                mdPreview: dbUser.preferences.mdPreview || true,
            },
            expires,
        });

        (await cookies()).set("session", session, { expires, httpOnly: true });
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/home",
            },
        });
    } catch (err) {
        console.error("Error fetching user info", err);
        return new Response("Error fetching user info", { status: 500 });
    }
}
