import Link from "next/link";
import { logoutAction } from "./action";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";
import { createDemoPostAction } from "./action";
import { HomeIcon, SettingsIcon, TimerIcon, LogoutIcon } from "./icons";
import { Lightbulb } from "lucide-react";
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

export default async function Header() {
    return (
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
                <Link
                    href="/home"
                    className="text-2xl font-bold flex items-center user-none space-x-2 hover:opacity-80 transition-opacity"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={36}
                        height={36}
                        viewBox="0 0 24 24"
                        className="text-primary"
                    >
                        <path
                            fill="currentColor"
                            d="m5.41 21l.71-4h-4l.35-2h4l1.06-6h-4l.35-2h4l.71-4h2l-.71 4h6l.71-4h2l-.71 4h4l-.35 2h-4l-1.06 6h4l-.35 2h-4l-.71 4h-2l.71-4h-6l-.71 4zM9.53 9l-1.06 6h6l1.06-6z"
                        ></path>
                    </svg>
                    <span className="hidden sm:inline">MarkNote.one</span>
                </Link>
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/home">
                        <Button
                            size="lg"
                            variant="ghost"
                            className="h-10 px-4 rounded-lg"
                        >
                            <HomeIcon width={22} height={22} className="mr-2" />
                            <span>Home</span>
                        </Button>
                    </Link>
                    <Link href="/settings">
                        <Button
                            size="lg"
                            variant="ghost"
                            className="h-10 px-4 rounded-lg"
                        >
                            <SettingsIcon
                                width={22}
                                height={22}
                                className="mr-2"
                            />
                            <span>Settings</span>
                        </Button>
                    </Link>
                    <a
                        target="_blank"
                        href={`https://temp.${process.env.BASE_DOMAIN}`}
                        rel="noreferrer"
                    >
                        <Button
                            size="lg"
                            variant="ghost"
                            className="h-10 px-4 rounded-lg"
                        >
                            <TimerIcon
                                width={22}
                                height={22}
                                className="mr-2"
                            />
                            <span>Temp</span>
                        </Button>
                    </a>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="lg"
                                variant="ghost"
                                className="h-10 px-4 rounded-lg"
                            >
                                <Lightbulb
                                    width={22}
                                    height={22}
                                    className="mr-2"
                                />
                                <span>Tips</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="h-full overflow-y-scroll">
                            <SheetHeader>
                                <SheetTitle>Tips and Tricks</SheetTitle>
                                <SheetDescription>
                                    Learn all the tips and tricks to get the
                                    most out of MarkNote.one
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-4 flex flex-col">
                                <a href="/feedback">
                                    <Button size="lg" className="w-full mb-4">
                                        Submit Feedback
                                    </Button>
                                </a>
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
                            <div className="mt-6 flex flex-row gap-2 justify-center items-center">
                                <Link href="/release-notes">
                                    <Button variant="secondary">
                                        Release Notes
                                    </Button>
                                </Link>
                                <form action={createDemoPostAction}>
                                    <Button type="submit" variant="secondary">
                                        Welcome Note
                                    </Button>
                                </form>
                                <Link href="/demo">
                                    <Button variant="secondary">Demo</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <form action={logoutAction}>
                        <Button
                            size="lg"
                            variant="ghost"
                            className="h-10 px-4 rounded-lg"
                        >
                            <LogoutIcon
                                width={22}
                                height={22}
                                className="mr-2"
                            />
                            <span>Logout</span>
                        </Button>
                    </form>
                    <ThemeToggle />
                </div>
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10"
                            >
                                <Menu width={24} height={24} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem
                                className="text-base py-3 cursor-pointer"
                                asChild
                            >
                                <Link href="/home">
                                    <HomeIcon
                                        width={18}
                                        height={18}
                                        className="mr-2"
                                    />
                                    Home
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-base py-3 cursor-pointer"
                                asChild
                            >
                                <a
                                    href={`https://temp.${process.env.BASE_DOMAIN}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <TimerIcon
                                        width={18}
                                        height={18}
                                        className="mr-2"
                                    />
                                    Temp Note
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-base py-3 cursor-pointer"
                                asChild
                            >
                                <Link href="/settings">
                                    <SettingsIcon
                                        width={18}
                                        height={18}
                                        className="mr-2"
                                    />
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-base py-3 cursor-pointer">
                                <form action={logoutAction} className="w-full">
                                    <button
                                        type="submit"
                                        className="flex items-center w-full text-left"
                                    >
                                        <LogoutIcon
                                            width={18}
                                            height={18}
                                            className="mr-2"
                                        />
                                        Logout
                                    </button>
                                </form>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    Theme
                                </span>
                                <ThemeToggle />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
