import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { deletePostAction } from "./action";

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
    const handleDelete = () => {
        if (!post) return;
        deletePostAction(post.id);
    };

    return (
        <div
            className="user-none absolute w-[125px] bg-background border border-border rounded-md shadow-md py-1 text-foreground"
            style={{ top: `${y}px`, left: `${x}px` }}
        >
            <Button
                className="w-full justify-start px-2 py-1.5 h-auto"
                onClick={() => {
                    if (!post) return;
                    postClick(post);
                }}
                variant="ghost"
            >
                <Eye className="mr-2 h-4 w-4" />
                <span>Preview</span>
            </Button>
            <Link href={`/note/${post?.id}`} className="w-full">
                <Button
                    className="w-full justify-start px-2 py-1.5 h-auto"
                    variant="ghost"
                >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                </Button>
            </Link>
            <Button
                className="w-full justify-start px-2 py-1.5 h-auto text-red-500 hover:text-destructive"
                onClick={handleDelete}
                variant="ghost"
            >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
            </Button>
        </div>
    );
};

export default ContextMenu;
