"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import type React from "react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PlusCircle, Search, UploadCloud, Pin, Archive } from "lucide-react";
import { PlusIcon } from "@/components/icons";
import NoteModal from "@/components/note-modal";
import ContextMenu from "@/components/context-menu";
import LinkLoadingIndicator from "@/components/link-loading";

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    category: string;
    lastUpdated: string;
    pinned: boolean;
    archived: boolean;
}

interface PostListProps {
    categories: string[];
    initialPosts?: Post[] | undefined;
}

export default function PostList({ categories, initialPosts }: PostListProps) {
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

    const [sortedPosts, setSortedPosts] = useState<Post[]>([
        ...sortedPinnedPosts,
        ...sortedUnpinnedPosts,
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        postId: string;
    } | null>(null);
    const [viewType, setViewType] = useState<"grid" | "list">(() => {
        if (typeof window !== "undefined") {
            const savedView = localStorage.getItem("noteViewType");
            return savedView === "list" ? "list" : "grid";
        }
        return "grid";
    });

    const contextMenuRef = useRef<HTMLDivElement>(null);

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

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const togglePinPost = (postId: string) => {
        setSortedPosts((sortedPosts) =>
            sortedPosts.map((post) =>
                post.id === postId ? { ...post, pinned: !post.pinned } : post
            )
        );
    };

    const handlePostDelete = (postId: string) => {
        setSortedPosts((sortedPosts) =>
            sortedPosts.filter((post) => post.id !== postId)
        );
    };

    const updatePostCategory = (postId: string, category: string) => {
        setSortedPosts((sortedPosts) =>
            sortedPosts.map((post) =>
                post.id === postId ? { ...post, category } : post
            )
        );
    };

    const removePost = (postId: string) => {
        setSortedPosts((sortedPosts) =>
            sortedPosts.filter((post) => post.id !== postId)
        );
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            setTimeout(() => {
                if (
                    contextMenu &&
                    contextMenuRef.current &&
                    !contextMenuRef.current.contains(e.target as Node)
                ) {
                    setContextMenu(null);
                }
            }, 100);
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [contextMenu]);

    useEffect(() => {
        localStorage.setItem("noteViewType", viewType);
    }, [viewType]);

    const renderGridView = () => {
        if (filteredPosts.length === 0) {
            return (
                <div className="flex items-center justify-center h-96 text-muted-foreground">
                    No notes found. Create a new one!
                </div>
            );
        }

        return (
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
        );
    };

    const renderTableView = () => (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="w-[400px]">Content</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPosts.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center h-24 text-muted-foreground"
                            >
                                No notes found. Create a new one!
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredPosts.map((post) => (
                            <TableRow
                                key={post.id}
                                className="cursor-pointer select-none hover:bg-muted/50"
                                onContextMenu={(e) =>
                                    handleContextMenu(e, post.id)
                                }
                                onClick={() =>
                                    window.location.assign(`/note/${post.id}`)
                                }
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {post.pinned && (
                                            <Pin className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                                        )}
                                        <span className="truncate">
                                            {post.title}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {post.category && (
                                        <Badge className="max-w-20 text-center">
                                            {post.category}
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        post.lastUpdated
                                    ).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <p className="text-sm text-muted-foreground line-clamp-1 break-words max-w-screen-sm">
                                        {post.content}
                                    </p>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );

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
                    <div className="flex items-center border rounded-md overflow-hidden mr-2">
                        <Button
                            aria-label="Grid view"
                            variant={viewType === "grid" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => {
                                setViewType("grid");
                            }}
                            className="px-2 rounded-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-grid-2x2"
                            >
                                <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="2"
                                />
                                <path d="M3 12h18" />
                                <path d="M12 3v18" />
                            </svg>
                        </Button>
                        <Button
                            aria-label="List view"
                            variant={viewType === "list" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => {
                                setViewType("list");
                            }}
                            className="px-2 rounded-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-list"
                            >
                                <line x1="8" x2="21" y1="6" y2="6" />
                                <line x1="8" x2="21" y1="12" y2="12" />
                                <line x1="8" x2="21" y1="18" y2="18" />
                                <line x1="3" x2="3.01" y1="6" y2="6" />
                                <line x1="3" x2="3.01" y1="12" y2="12" />
                                <line x1="3" x2="3.01" y1="18" y2="18" />
                            </svg>
                        </Button>
                    </div>
                    <Link href="/home/archive" className="hidden md:block">
                        <Button variant="outline">
                            <LinkLoadingIndicator
                                icon={<Archive className="h-4 w-4" />}
                            />
                            Archive
                        </Button>
                    </Link>
                    <Link href="/upload" className="hidden md:block">
                        <Button variant="outline">
                            <LinkLoadingIndicator
                                icon={<UploadCloud className="h-4 w-4" />}
                            />
                            Upload
                        </Button>
                    </Link>
                    <Link href="/new-note" className="hidden md:block">
                        <Button>
                            <LinkLoadingIndicator
                                icon={<PlusCircle className="h-4 w-4" />}
                            />
                            New
                        </Button>
                    </Link>
                </div>
            </div>

            {viewType === "grid" ? renderGridView() : renderTableView()}

            <Link
                href="/new-note"
                className="md:hidden fixed bottom-10 right-4 m-6 h-12 w-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
                <PlusIcon width={24} height={24} className="h-8 w-8" />
            </Link>

            <NoteModal
                post={selectedPost}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
            {contextMenu && (
                <div ref={contextMenuRef}>
                    {" "}
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        categories={categories}
                        post={
                            initialPosts
                                ? initialPosts.find(
                                      (post) => post.id === contextMenu.postId
                                  )
                                : undefined
                        }
                        postClick={handlePostClick}
                        closeMenu={closeContextMenu}
                        deletePost={handlePostDelete}
                        categoryChange={updatePostCategory}
                        pinPost={togglePinPost}
                        removePost={removePost}
                    />
                </div>
            )}
        </div>
    );
}
