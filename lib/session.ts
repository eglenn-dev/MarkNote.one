import { SignJWT, jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

interface UserSession {
    user: {
        userId: string;
        role: string;
    };
    expires: Date;
}

export async function encrypt(payload: {
    user: { userId: string; role: string };
    expires: Date;
}) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(payload.expires)
        .sign(key);
}

export async function decrypt(input: string): Promise<UserSession | null> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload as {
            user: {
                userId: string;
                role: string;
            };
            expires: Date;
        };
    } catch (error) {
        if (error instanceof JWTExpired) {
            console.error("Token has expired");
            return null;
        } else {
            console.error("Token verification failed: ", error);
            return null;
        }
    }
}

export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    if (!parsed) return;

    parsed.expires = new Date(Date.now() + 60 * 60 * 1000 * 168);

    const updatedSessionData = {
        user: {
            userId: parsed.user.userId,
            role: parsed.user.role,
        },
        expires: parsed.expires,
    };

    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(updatedSessionData),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}
