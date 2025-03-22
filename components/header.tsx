import React from "react";
import Link from "next/link";
import { logoutAction } from "./action";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu, Lightbulb, Archive, Link2Icon } from "lucide-react";
import { createDemoPostAction } from "./action";
import {
    HomeIcon,
    SettingsIcon,
    TimerIcon,
    LogoutIcon,
    UserIcon,
    OtherIcon,
} from "./icons";
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
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b mb-4">
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
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/home">
                                    <Button
                                        variant="ghost"
                                        className="h-10 px-4 flex items-center justify-center gap-2 text-sm"
                                    >
                                        <HomeIcon
                                            width={30}
                                            height={30}
                                            className="mr-2"
                                        />
                                        Home
                                    </Button>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="flex items-center gap-2 h-10 px-4">
                                    <UserIcon width={18} height={18} />
                                    Account
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="flex flex-col gap-1 p-4 md:w-[300px]">
                                        <Link
                                            href="/settings"
                                            className="py-1 flex items-center gap-2 w-full hover:bg-muted rounded-lg"
                                        >
                                            <SettingsIcon
                                                width={18}
                                                height={18}
                                                className="mr-2"
                                            />
                                            <span>Settings</span>
                                        </Link>
                                        <Link
                                            href="/home/archive"
                                            className="py-1 flex items-center gap-2 w-full hover:bg-muted rounded-lg"
                                        >
                                            <Archive className="h-4 w-4" />
                                            <span>Archive</span>
                                        </Link>
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <span className="flex items-center gap-2 py-1 cursor-pointer w-full hover:bg-muted rounded-lg">
                                                    <Lightbulb
                                                        width={18}
                                                        height={18}
                                                    />
                                                    <span>Tips</span>
                                                </span>
                                            </SheetTrigger>
                                            <SheetContent className="h-full overflow-y-scroll">
                                                <SheetHeader>
                                                    <SheetTitle>
                                                        Tips and Tricks
                                                    </SheetTitle>
                                                    <SheetDescription>
                                                        Learn all the tips and
                                                        tricks to get the most
                                                        out of MarkNote.one
                                                    </SheetDescription>
                                                </SheetHeader>
                                                <div className="mt-4 flex flex-col">
                                                    <Link href="/feedback">
                                                        <Button
                                                            size="lg"
                                                            className="w-full mb-4"
                                                        >
                                                            Submit Feedback
                                                        </Button>
                                                    </Link>
                                                    <Table>
                                                        <TableCaption>
                                                            Markdown tips to
                                                            help you get started
                                                        </TableCaption>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>
                                                                    Title
                                                                </TableHead>
                                                                <TableHead>
                                                                    Description
                                                                </TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {markdownTips.map(
                                                                (
                                                                    tip,
                                                                    index
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <TableCell className="font-medium">
                                                                            {
                                                                                tip.title
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                tip.description
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                                <div className="mt-6 flex flex-row gap-2 justify-center items-center">
                                                    <Link href="/release-notes">
                                                        <Button variant="secondary">
                                                            Release Notes
                                                        </Button>
                                                    </Link>
                                                    <form
                                                        action={
                                                            createDemoPostAction
                                                        }
                                                    >
                                                        <Button
                                                            type="submit"
                                                            variant="secondary"
                                                        >
                                                            Welcome Note
                                                        </Button>
                                                    </form>
                                                    <Link href="/demo">
                                                        <Button variant="secondary">
                                                            Demo
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </SheetContent>
                                        </Sheet>
                                        <form action={logoutAction}>
                                            <button
                                                type="submit"
                                                className="flex items-center py-1 gap-2 cursor-pointer w-full hover:bg-muted rounded-lg"
                                            >
                                                <LogoutIcon
                                                    width={18}
                                                    height={18}
                                                    className="mr-2"
                                                />
                                                <span>Logout</span>
                                            </button>
                                        </form>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="flex items-center gap-2 h-10 px-4">
                                    <OtherIcon width={16} height={16} />
                                    Other
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="flex flex-col gap-1 p-4 md:w-[300px]">
                                        <a
                                            target="_blank"
                                            href={`https://temp.${process.env.BASE_DOMAIN}`}
                                            rel="noreferrer"
                                            className="w-full flex flex-row gap-1 items-center justify-start h-10 px-4 rounded-lg hover:bg-muted text-sm"
                                        >
                                            <TimerIcon
                                                width={18}
                                                height={22}
                                                className="mr-2"
                                            />
                                            <span>Temp Notes</span>
                                        </a>
                                        <a
                                            target="_blank"
                                            href="https://clipit.one"
                                            rel="noreferrer"
                                            className="w-full flex flex-row gap-1 items-center justify-start h-10 px-4 rounded-lg hover:bg-muted text-sm"
                                        >
                                            <Link2Icon className="h-6 w-6" />
                                            <span>ClipIt.one</span>
                                        </a>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <ThemeToggle />
                </div>
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Menu width={30} height={30} />
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
                                <Link href="/home/archive">
                                    <Archive />
                                    <span>Archive</span>
                                </Link>
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
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-base py-3 cursor-pointer">
                                <form action={logoutAction} className="w-full">
                                    <button
                                        type="submit"
                                        className="flex items-center w-full text-left gap-1"
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
