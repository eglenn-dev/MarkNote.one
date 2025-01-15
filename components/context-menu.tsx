import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

interface ContextMenuProps {
    x: number;
    y: number;
    post: Post | undefined;
    postClick: (post: Post) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, post, postClick }) => {
    return (
        <div
            className="user-none absolute w-[125px] bg-white border border-gray-200 rounded shadow-lg py-3 px-1 text-black flex flex-col gap-2"
            style={{ top: `${y}px`, left: `${x}px` }}
        >
            <Button
                className="w-full flex justify-start"
                onClick={() => {
                    if (!post) return;
                    postClick(post);
                }}
                variant="ghost"
            >
                <span className="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                        ></path>
                    </svg>
                    <span>Preview</span>
                </span>
            </Button>
            <Link href={`/note/${post?.id}`}>
                <Button className="w-full flex justify-start" variant="ghost">
                    <span className="flex items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                            ></path>
                        </svg>
                        <span>Edit</span>
                    </span>
                </Button>
            </Link>
        </div>
    );
};

export default ContextMenu;
