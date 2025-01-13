import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">MarkNote</h1>
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <Button variant="ghost">Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Sign Up</Button>
                    </Link>
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Welcome to MarkNote</h2>
                <p className="text-xl mb-8">
                    A powerful Markdown note-taking app with live preview
                </p>
                <Link
                    href="/home"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-lg font-semibold transition-colors"
                >
                    Start Taking Notes
                </Link>
            </main>
            <footer className="p-4 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} MarkNote. All rights reserved.
            </footer>
        </div>
    );
}
