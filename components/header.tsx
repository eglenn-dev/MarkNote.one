import Link from "next/link";
import { logoutAction } from "./action";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
    return (
        <div className="flex justify-between items-center mb-4">
            <Link href="/" className="text-2xl font-bold">
                MarkNote
            </Link>
            <form className="flex items-center space-x-4" action={logoutAction}>
                <Button variant="ghost">Logout</Button>
                <ThemeToggle />
            </form>
        </div>
    );
}
