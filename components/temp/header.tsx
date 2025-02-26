import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default async function Header() {
    return (
        <div className="flex justify-between items-center mb-4 px-4 py-4">
            <a
                href={`https://${process.env.BASE_DOMAIN}`}
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
                <span className="hidden sm:inline">MarkNote.one</span>
            </a>
            <div className="hidden md:flex items-center space-x-4">
                <Link href="/">
                    <Button>Home</Button>
                </Link>
                <a href={`https://${process.env.BASE_DOMAIN}`}>
                    <Button variant="outline">Take Notes</Button>
                </a>
                <ThemeToggle />
            </div>
            <div className="md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Menu width={30} height={30} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="text-lg font-semibold"
                            asChild
                        >
                            <Link href="/">Home</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-lg font-semibold"
                            asChild
                        >
                            <a
                                className="h-11"
                                href={`https://${process.env.BASE_DOMAIN}`}
                            >
                                Take Notes
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ThemeToggle />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
