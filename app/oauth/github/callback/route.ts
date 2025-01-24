import {
    checkOauthUser,
    createOauthUser,
    getKeyByUsername,
    getUserByKey,
} from "@/models/accounts-model";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/session";

export async function GET(request: Request) {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: new URL(request.url).searchParams.get("code"),
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
    };

    try {
        const response = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to exchange code for access token: ${response.statusText}`
            );
        }

        const data = await response.json();

        if (!data.access_token) {
            throw new Error("Access token not found in response");
        }

        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `token ${data.access_token}`,
            },
        });

        if (!userResponse.ok) {
            console.error(
                "Error Fetching User Data:",
                userResponse.status,
                userResponse.statusText
            );
            return new Response("Error fetching user data", {
                status: userResponse.status,
            });
        }

        const user = await userResponse.json();
        const githubUsername = user.login;

        if (!(await checkOauthUser(githubUsername)))
            await createOauthUser(githubUsername);

        const key = await getKeyByUsername(githubUsername);
        if (!key) throw new Error("Failed to get key by username");

        const dbUser = await getUserByKey(key);
        if (!user) throw new Error("Failed to get user by key");
        const expires = new Date(Date.now() + 60 * 60 * 1000 * 168);
        const session = await encrypt({
            user: {
                userId: key,
                role: "user",
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
    } catch (e) {
        if (e instanceof Error) {
            return new Response(e.message, { status: 500 });
        }
        return new Response("An unknown error occurred", { status: 500 });
    }
}
