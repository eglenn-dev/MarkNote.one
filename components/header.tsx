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
        shortcut: "Crtl + D",
        action: "Download current note",
        pages: "/note/[id]",
    },
    {
        shortcut: "Alt + P",
        action: "Toggle live preview",
        pages: "/note/[id]",
    },{
        shortcut: "Alt + F",
        action: "Toggle full preview",
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

const markdownTips = [
    {
        title: "Headers",
        description: "Use # to create headers",
    },
    {
        title: "Emphasis",
        description: "Use * or _ to emphasize text",
    },
    {
        title: "Lists",
        description: "Use - or * to create lists",
    },
    {
        title: "Links",
        description: "Use []() to create links",
    },
    {
        title: "Images",
        description: "Use ![]() to add images",
    },
    {
        title: "Blockquotes",
        description: "Use > to create blockquotes",
    },
    {
        title: "Code",
        description: "Use ` to create inline code",
    },
    {
        title: "Code Blocks",
        description: "Use ``` to create code blocks",
    },
    {
        title: "Horizontal Rules",
        description: "Use --- to create horizontal rules",
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
                    <SheetContent className="h-full overflow-y-scroll">
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
                                variant="secondary"
                                className="mt-4"
                            >
                                View Welcome Post
                            </Button>
                        </form>
                        <div className="mt-4 flex flex-col">
                            <Table>
                                <TableCaption>
                                    Markdown tips to help you get started
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {markdownTips.map((tip, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {tip.title}
                                            </TableCell>
                                            <TableCell>
                                                {tip.description}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
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
