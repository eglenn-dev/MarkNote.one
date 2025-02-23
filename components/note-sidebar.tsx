"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { File, Pin } from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
    pinned?: boolean;
}

interface EditorSidebarProps {
    posts: Post[];
    preference: boolean;
}

export default function NoteSidebar({ posts, preference }: EditorSidebarProps) {
    const [menuOpen, setMenuOpen] = useState(preference);
    const pinnedPosts = posts.filter((post) => post.pinned);
    const unpinnedPosts = posts.filter((post) => !post.pinned);

    const sortedPinnedPosts = [...pinnedPosts].sort((a, b) => {
        return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
        );
    });

    const sortedUnpinnedPosts = [...unpinnedPosts].sort((a, b) => {
        return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
        );
    });

    const sortedPosts = [...sortedPinnedPosts, ...sortedUnpinnedPosts];

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.altKey && e.key === "m") {
                e.preventDefault();
                setMenuOpen(!menuOpen);
            } else if (e.key === "Escape") {
                e.preventDefault();
                redirect("/home");
            }
        },
        [menuOpen]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-56 h-full gap-3">
                <h3 className="text-lg font-bold text-center">Files</h3>
                <p className="text-xs text-center">No files, yet!</p>
            </div>
        );
    }

    return (
        <div
            className={`hidden sm:block transition-all duration-300 ease-in-out ${
                menuOpen ? "w-60" : "w-12"
            } h-full border-gray-200 select-none overflow-hidden`}
        >
            <div className="flex items-center p-2 gap-2">
                <div onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? (
                        <OpenedMenu size={30} />
                    ) : (
                        <ClosedMenu size={30} />
                    )}
                </div>
                <h3
                    className={`transition-opacity duration-300 ${
                        menuOpen
                            ? "text-lg font-bold text-center opacity-100"
                            : "hidden"
                    }`}
                >
                    Files
                </h3>
            </div>
            <div
                className={`transition-all duration-300 overflow-hidden ${
                    menuOpen ? "h-full opacity-100" : "hidden"
                } flex flex-col`}
            >
                {sortedPosts.map((post) => (
                    <HoverCard key={post.id}>
                        <HoverCardTrigger asChild>
                            <Link href={`/note/${post.id}`}>
                                <Button variant="ghost" className="text-xs">
                                    <span>{">"}</span>
                                    <File size={16} />
                                    <span className="flex flex-row items-center justify-between gap-1">
                                        {post.pinned && (
                                            <Pin className="h-4 w-4 text-yellow-500" />
                                        )}
                                        {post.title}
                                    </span>
                                </Button>
                            </Link>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <div className="flex flex-col gap-2 p-2">
                                <div className="flex flex-row justify-between items-center">
                                    <h3>{post.title}</h3>
                                    {post.pinned && (
                                        <Pin className="h-4 w-4 text-yellow-500" />
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-3">
                                    {post.content}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Last updated: {post.lastUpdated}
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                ))}
            </div>
        </div>
    );
}

interface IconProps {
    size?: number;
}

function ClosedMenu({ size = 24 }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M3 6h10v2H3zm0 10h10v2H3zm0-5h12v2H3zm13-4l-1.42 1.39L18.14 12l-3.56 3.61L16 17l5-5z"
            ></path>
        </svg>
    );
}

function OpenedMenu({ size = 24 }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M3 18v-2h13v2zm16.6-1l-5-5l5-5L21 8.4L17.4 12l3.6 3.6zM3 13v-2h10v2zm0-5V6h13v2z"
            ></path>
        </svg>
    );
}
