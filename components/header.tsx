import Link from "next/link";
import { logoutAction } from "./action";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";
import { createDemoPostAction } from "./action";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const shortcuts = [
    {
        shortcut: "Alt + N",
        action: "New note",
        pages: "/home",
    },
    {
        shortcut: "Alt + U",
        action: "Upload note",
        pages: "/home",
    },
    {
        shortcut: "Crtl + S",
        action: "Save current note",
        pages: "/note/[id]",
    },
    {
        shortcut: "Alt + P",
        action: "Toggle live preview",
        pages: "/note/[id]",
    },
    {
        shortcut: "Alt + M",
        action: "Toggle menu bar",
        pages: "/note/[id]",
    },
    {
        shortcut: "Esc",
        action: "Close note",
        pages: "/note/[id]",
    },
];

export default function Header() {
    return (
        <div className="flex justify-between items-center mb-4 px-4 py-2">
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
                <span className="hidden sm:inline">MarkNote.one</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
                <Link href="/home">
                    <Button>Home</Button>
                </Link>
                <Link href="/settings">
                    <Button variant="outline">Settings</Button>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Tips</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tips and Tricks</SheetTitle>
                            <SheetDescription>
                                Learn all the tips and tricks to get the most
                                out of MarkNote.one
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-4 flex flex-col">
                            <Link href="/release-notes">
                                <Button>View Release Notes</Button>
                            </Link>
                            <Table>
                                <TableCaption>
                                    Shortcuts available and when you can use
                                    them.
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            Shortcut
                                        </TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Pages</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {shortcuts.map((shortcut, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {shortcut.shortcut}
                                            </TableCell>
                                            <TableCell>
                                                {shortcut.action}
                                            </TableCell>
                                            <TableCell>
                                                {shortcut.pages}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <form action={createDemoPostAction}>
                            <Button
                                type="submit"
                                variant="outline"
                                className="mt-4"
                            >
                                Create Demo Post
                            </Button>
                        </form>
                    </SheetContent>
                </Sheet>
                <form action={logoutAction}>
                    <Button variant="outline">Logout</Button>
                </form>
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
                            <Link className="h-11" href="/home">
                                Home
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-lg font-semibold"
                            asChild
                        >
                            <Link className="h-11" href="/settings">
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-lg font-semibold">
                            <form action={logoutAction}>
                                <button className="h-11" type="submit">
                                    Logout
                                </button>
                            </form>
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
