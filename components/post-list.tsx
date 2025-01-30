"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, UploadCloud, Pin } from "lucide-react";
import NoteModal from "./note-modal";
import ContextMenu from "./context-menu";

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    category: string;
    lastUpdated: string;
    pinned: boolean;
}

interface PostListProps {
    initialPosts?: Post[] | undefined;
}

export default function PostList({ initialPosts }: PostListProps) {
    const pinnedPosts = (initialPosts || []).filter((post) => post.pinned);
    const unpinnedPosts = (initialPosts || []).filter((post) => !post.pinned);

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
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        postId: string;
    } | null>(null);

    const filteredPosts = sortedPosts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.altKey && e.key === "n") {
            e.preventDefault();
            redirect("/new-note");
        } else if (e.altKey && e.key === "u") {
            e.preventDefault();
            redirect("/upload");
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
    };

    const handleContextMenu = (e: React.MouseEvent, postId: string) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, postId });
    };

    useEffect(() => {
        const handleClickOutside = () => setContextMenu(null);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div className="relative w-full sm:max-w-sm">
                    <Input
                        type="text"
                        placeholder="Search by category, title, or note content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="hidden md:flex items-center space-x-2 text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12 22q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-4-3v-2h8v2zm.25-3q-1.725-1.025-2.738-2.75T4.5 9.5q0-3.125 2.188-5.312T12 2t5.313 2.188T19.5 9.5q0 2.025-1.012 3.75T15.75 16zm.6-2h6.3q1.125-.8 1.738-1.975T17.5 9.5q0-2.3-1.6-3.9T12 4T8.1 5.6T6.5 9.5q0 1.35.613 2.525T8.85 14M12 14"
                            ></path>
                        </svg>
                        <p>Try right clicking a card</p>
                    </div>
                    <Link href="/new-note">
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> New Note
                        </Button>
                    </Link>
                    <Link href="/upload" className="hidden md:block">
                        <Button>
                            <UploadCloud className="mr-2 h-4 w-4" /> Upload File
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                    <Link
                        href={`/note/${post.id}`}
                        key={post.id}
                        onContextMenu={(e) => handleContextMenu(e, post.id)}
                    >
                        <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg truncate flex flex-row justify-between items-center">
                                    <span>{post.title}</span>
                                    {post.pinned && (
                                        <Pin className="h-4 w-4 text-yellow-500" />
                                    )}
                                </CardTitle>
                                <CardDescription className="text-sm flex flex-row gap-2 items-center">
                                    {post.category && (
                                        <Badge className="max-w-20">
                                            {post.category}
                                        </Badge>
                                    )}
                                    Updated:{" "}
                                    {new Date(
                                        post.lastUpdated
                                    ).toLocaleString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 line-clamp-3 break-words overflow-hidden">
                                    {post.content}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            {filteredPosts.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                    No notes found. Create a new one!
                </p>
            )}
            <NoteModal
                post={selectedPost}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    post={
                        initialPosts
                            ? initialPosts.find(
                                  (post) => post.id === contextMenu.postId
                              )
                            : undefined
                    }
                    postClick={handlePostClick}
                />
            )}
        </div>
    );
}
