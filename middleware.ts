import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/session";

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    let pathname = url.pathname;

    const hostname = request.headers.get("host");

    const baseDomain = process.env.BASE_DOMAIN || "marknote.one";
    const targetSubdomain = "temp";
    const targetHostname = `${targetSubdomain}.${baseDomain}`;

    let rewrite = false;
    if (
        (process.env.NODE_ENV === "production" &&
            hostname === targetHostname) ||
        (process.env.NODE_ENV !== "production" &&
            hostname === `${targetSubdomain}.localhost:3000`)
    ) {
        pathname = `/${targetSubdomain}${pathname}`;
        rewrite = true;
    }

    const response = await updateSession(request);

    if (rewrite) {
        return NextResponse.rewrite(new URL(pathname, request.url), response);
    }

    return response;
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
