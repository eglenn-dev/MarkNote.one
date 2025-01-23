import { getUserByEmail } from "@/models/accounts-model";
import { verifyPassword } from "@/lib/hashing";
import { NextResponse } from "next/server";
import { encrypt } from "./session";
import { cookies } from "next/headers";
import { getKeyByEmail } from "@/models/accounts-model";

interface User {
    email: string;
    password: string;
    name: string;
    role: string;
}

export async function login(formData: FormData) {
    const formUserData: User = {
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
        name: formData.get("name")?.toString() || "",
        role: "",
    };

    if (formUserData.password === "")
        return new NextResponse("Missing password", { status: 400 });

    const dbUser: User = await getUserByEmail(formUserData.email);
    if (!dbUser)
        return new NextResponse("Invalid credentials", { status: 401 });

    if (
        (await verifyPassword(formUserData.password, dbUser.password)) === false
    )
        return new NextResponse("Invalid credentials", { status: 401 });

    formUserData.name = dbUser.name;
    const expires = new Date(Date.now() + 60 * 60 * 1000 * 168);
    const userKey = await getKeyByEmail(formUserData.email);
    if (!userKey)
        return new NextResponse("Invalid credentials", { status: 401 });
    const session = await encrypt({
        user: {
            userId: userKey,
            role: dbUser.role,
        },
        expires,
    });

    (await cookies()).set("session", session, { expires, httpOnly: true });
}

export async function logout() {
    (await cookies()).set("session", "", { expires: new Date(0) });
}
