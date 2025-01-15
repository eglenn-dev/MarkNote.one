import Link from "next/link";
import { logoutAction } from "./action";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
    return (
        <div className="flex justify-between items-center mb-4">
            <Link href="/home" className="text-2xl font-bold">
                MarkNote
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
