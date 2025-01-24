"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { File } from "lucide-react";

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

interface EditorSidebarProps {
    posts: Post[];
    preference: boolean;
}

export default function NoteSidebar({ posts, preference }: EditorSidebarProps) {
    const [menuOpen, setMenuOpen] = useState(preference);

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
            className={`hidden sm:block ${
                menuOpen ? "w-56" : "w-11"
            } h-full border-gray-200 select-none transition-all duration-300`}
        >
            <div className="flex items-center p-2 gap-2">
                <div onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <OpenedMenu /> : <ClosedMenu />}
                </div>
                <h3
                    className={
                        menuOpen ? "text-lg font-bold text-center" : "hidden"
                    }
                >
                    Files
                </h3>
            </div>
            <div className={menuOpen ? "h-full" : "hidden"}>
                {posts.map((post) => (
                    <Link key={post.title} href={`/note/${post.id}`}>
                        <Button variant="ghost" className="text-xs">
                            <span>{">"}</span>
                            <File size={16} />
                            {post.title}
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function ClosedMenu() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M3 6h10v2H3zm0 10h10v2H3zm0-5h12v2H3zm13-4l-1.42 1.39L18.14 12l-3.56 3.61L16 17l5-5z"
            ></path>
        </svg>
    );
}

function OpenedMenu() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M3 18v-2h13v2zm16.6-1l-5-5l5-5L21 8.4L17.4 12l3.6 3.6zM3 13v-2h10v2zm0-5V6h13v2z"
            ></path>
        </svg>
    );
}
