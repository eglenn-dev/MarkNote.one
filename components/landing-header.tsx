import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingHeader() {
    return (
        <header className="p-4 flex justify-between items-center">
            <Link href="/">
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
            </Link>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Sign Up</Button>
                    </Link>
                </div>
                <ThemeToggle />
            </div>
        </header>
    );
}
