import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Download, Pin, FolderEdit } from "lucide-react";
import {
    deletePostAction,
    pinPostAction,
    updatePostCategoryAction,
} from "./action";
import DownloadButton from "./download-button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    category: string;
    lastUpdated: string;
    pinned: boolean;
}

interface ContextMenuProps {
    x: number;
    y: number;
    post: Post | undefined;
    categories: string[];
    postClick: (post: Post) => void;
    closeMenu: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    x,
    y,
    post,
    categories,
    postClick,
    closeMenu,
}) => {
    const handleDelete = () => {
        if (!post) return;
        deletePostAction(post.id);
        closeMenu();
    };

    const handleCategoryChange = (category: string) => {
        console.log("category", category);
        if (!post) return;
        updatePostCategoryAction(post.id, category);
        closeMenu();
    };

    const pinClick = () => {
        if (!post) return;
        pinPostAction(post.id);
        closeMenu();
    };

    return (
        <div
            className="absolute w-[200px] bg-background border border-border rounded-md shadow-md p-2 user-none text-foreground flex flex-col gap-1"
            style={{ top: `${y}px`, left: `${x}px` }}
        >
            <Button
                className="w-full justify-start px-2 py-1.5 h-auto"
                variant="ghost"
                onClick={() => pinClick()}
            >
                <Pin className="mr-2 h-4 w-4" />
                <span className="text-md">
                    {post?.pinned ? "Unpin" : "Pin"}
                </span>
            </Button>
            <Button
                className="w-full justify-start px-2 py-1.5 h-auto"
                onClick={() => {
                    if (!post) return;
                    postClick(post);
                }}
                variant="ghost"
            >
                <Eye className="mr-2 h-4 w-4" />
                <span className="text-md">Preview</span>
            </Button>
            <Link href={`/note/${post?.id}`} className="w-full">
                <Button
                    className="w-full justify-start px-2 py-1.5 h-auto"
                    variant="ghost"
                >
                    <Edit className="mr-2 h-4 w-4" />
                    <span className="text-md">Edit</span>
                </Button>
            </Link>
            <DownloadButton
                classname="w-full justify-start px-2 py-1.5 h-auto"
                note={post ? post : { title: "", content: "" }}
                variant="ghost"
            >
                <Download className="mr-2 h-4 w-4" />
                <span className="text-md">Download</span>
            </DownloadButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="w-full justify-start px-2 py-1.5 h-auto"
                        variant="ghost"
                    >
                        <FolderEdit className="mr-2 h-4 w-4" />
                        <span className="text-md">Change Category</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    {categories.map((category) => (
                        <DropdownMenuItem
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                className="w-full justify-start px-2 py-1.5 h-auto text-red-500 hover:text-destructive"
                onClick={handleDelete}
                variant="ghost"
            >
                <Trash2 className="mr-2 h-4 w-4" />
                <span className="text-md">Delete</span>
            </Button>
        </div>
    );
};

export default ContextMenu;
