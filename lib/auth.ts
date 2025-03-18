import { getUserByEmail } from "@/models/accounts-model";
import { verifyPassword } from "@/lib/hashing";
import { encrypt } from "./session";
import { cookies } from "next/headers";
import { getKeyByEmail } from "@/models/accounts-model";

interface User {
    email: string;
    password: string;
    name: string;
    role: string;
    preferences: {
        mdPreview: boolean;
        menuOpen: boolean;
    };
}

export async function login(formData: FormData) {
    const formUserData = {
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
        name: formData.get("name")?.toString() || "",
        role: "",
    };

    if (formUserData.password === "")
        throw new Error("Please fill in all fields");

    const dbUser: User = await getUserByEmail(formUserData.email);
    if (!dbUser) throw new Error("Invalid credentials");

    if (
        (await verifyPassword(formUserData.password, dbUser.password)) === false
    )
        throw new Error("Invalid credentials");

    formUserData.name = dbUser.name;
    const expires = new Date(Date.now() + 60 * 60 * 1000 * 168);
    const userKey = await getKeyByEmail(formUserData.email);
    if (!userKey)
        throw new Error(
            "An error occurred while logging in. Please try again."
        );
    const session = await encrypt({
        user: {
            userId: userKey,
            role: dbUser.role,
            menuOpen: dbUser.preferences.menuOpen ? true : false,
            mdPreview: dbUser.preferences.mdPreview ? true : false,
        },
        expires,
    });

    (await cookies()).set("session", session, { expires, httpOnly: true });
}

export async function logout() {
    (await cookies()).set("session", "", { expires: new Date(0) });
}
