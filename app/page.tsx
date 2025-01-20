import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { logoutAction } from "./action";
import { redirect } from "next/navigation";
import HomeMdPreview from "@/components/home-md-preview";

export default async function LandingPage() {
    const session = await getSession();
    if (session) redirect("/home");

    return (
        <div className="min-h-screen flex flex-col">
            <header className="p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center space-x-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="m5.41 21l.71-4h-4l.35-2h4l1.06-6h-4l.35-2h4l.71-4h2l-.71 4h6l.71-4h2l-.71 4h4l-.35 2h-4l-1.06 6h4l-.35 2h-4l-.71 4h-2l.71-4h-6l-.71 4zM9.53 9l-1.06 6h6l1.06-6z"
                        ></path>
                    </svg>
                    <span className="hidden sm:inline-block">MarkNote.one</span>
                </h1>
                <div className="flex items-center space-x-4">
                    {session ? (
                        <div className="flex items-center space-x-4">
                            <Link href="/home">
                                <Button>Home</Button>
                            </Link>
                            <form action={logoutAction}>
                                <Button variant="outline">Logout</Button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link href="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href="/signup">
                                <Button>Sign Up</Button>
                            </Link>
                        </div>
                    )}
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-4xl font-bold mb-4 flex items-center">
                    Welcome to MarkNote.one
                </h2>
                <div className="text-xl mb-8">
                    <HomeMdPreview text="A _powerful_ Markdown **note-taking** app with [live]() `previews`" />
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
