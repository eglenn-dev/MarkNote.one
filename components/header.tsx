import Link from "next/link";
import { logoutAction } from "./action";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
    return (
        <div className="flex justify-between items-center mb-4">
            <Link
                href="/home"
                className="text-2xl font-bold flex items-center user-none space-x-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={25}
                    height={25}
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="m5.41 21l.71-4h-4l.35-2h4l1.06-6h-4l.35-2h4l.71-4h2l-.71 4h6l.71-4h2l-.71 4h4l-.35 2h-4l-1.06 6h4l-.35 2h-4l-.71 4h-2l.71-4h-6l-.71 4zM9.53 9l-1.06 6h6l1.06-6z"
                    ></path>
                </svg>
                <span>MarkNote</span>
            </Link>
            <div className="flex items-center space-x-4">
                <Link href="/home">
                    <Button>Home</Button>
                </Link>
                <form action={logoutAction}>
                    <Button variant="outline">Logout</Button>
                </form>
                <ThemeToggle />
            </div>
        </div>
    );
}
