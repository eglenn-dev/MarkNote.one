import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

interface ContextMenuProps {
    x: number
    y: number
    post: Post | undefined
    postClick: (post: Post) => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, post, postClick }) => {
    return (
        <div
            className="user-none absolute w-[125px] bg-white border border-gray-200 rounded shadow-lg py-3 px-1 text-black flex flex-col gap-2"
            style={{ top: `${y}px`, left: `${x}px` }}
        >
            <Button
                className='w-full flex justify-start'
                onClick={() => {
                    if (!post) return;
                    postClick(post)
                }} variant="ghost">
                Preview
            </Button>
            <Link
                href={`/note/${post?.id}`}>
                <Button className='w-full flex justify-start' variant="ghost">
                    Edit
                </Button>
            </Link>
        </div>
    )
}

export default ContextMenu

