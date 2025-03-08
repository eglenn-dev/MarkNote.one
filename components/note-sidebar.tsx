"use client";
import { useEffect, useCallback } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { File, Pin, FileText, FolderOpen } from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

export default function NoteSidebar({ posts }: EditorSidebarProps) {
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

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            redirect("/home");
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-muted/20">
                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card">
                    <FolderOpen className="w-12 h-12 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">No Files</h3>
                    <p className="text-sm text-center text-muted-foreground">
                        Create a new note to get started
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full border-r bg-muted/10">
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Files
                </h3>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-2">
                    {pinnedPosts.length > 0 && (
                        <div className="mb-4">
                            <h4 className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Pinned
                            </h4>
                            <div className="space-y-1">
                                {sortedPinnedPosts.map((post) => (
                                    <NoteItem key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    )}

                    {unpinnedPosts.length > 0 && (
                        <div>
                            <h4 className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                All Files
                            </h4>
                            <div className="space-y-1">
                                {sortedUnpinnedPosts.map((post) => (
                                    <NoteItem key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}

function NoteItem({ post }: { post: Post }) {
    const formattedDate = new Date(post.lastUpdated).toLocaleDateString(
        undefined,
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link href={`/note/${post.id}`} className="block">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start text-sm px-2 py-1 h-auto",
                            "hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <div className="flex items-center gap-2 w-full overflow-hidden">
                            <File className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{post.title}</span>
                            {post.pinned && (
                                <Pin className="h-3 w-3 text-yellow-500 ml-auto flex-shrink-0" />
                            )}
                        </div>
                    </Button>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent side="right" align="start" className="w-72">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">{post.title}</h3>
                        {post.pinned && (
                            <Pin className="h-4 w-4 text-yellow-500" />
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.content || "No content"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Last updated: {formattedDate}
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
