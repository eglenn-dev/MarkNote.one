import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import HomeMdPreview from "@/components/home-md-preview";
import LandingHeader from "@/components/landing-header";

export default async function LandingPage() {
    const session = await getSession();
    if (session) redirect("/home");

    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <LandingHeader />
            <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-4xl font-bold mb-4 flex items-center">
                    Welcome to MarkNote.one
                </h2>
                <div className="text-xl mb-8">
                    <HomeMdPreview text="A _powerful_ markdown **note-taking** app with [live]() `previews`" />
                </div>
                <div></div>
                <Link
                    href="/login"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-lg font-semibold transition-colors"
                >
                    Start Taking Notes
                </Link>
            </main>
            <footer className="p-4 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} MarkNote.one. All rights
                reserved.
            </footer>
        </div>
    );
}
