import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import MarkdownPreview from './markdown-preview';
import Link from 'next/link';

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

interface NoteModalProps {
    post: Post | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function NoteModal({ post, isOpen, onClose }: NoteModalProps) {
    const [title, setTitle] = useState(post?.title || '')
    const [content, setContent] = useState(post?.content || '')

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setContent(post.content)
        }
    }, [post])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Note Preview</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 w-full">
                    <h2 className='text-2xl font-bold w-full'>{post?.title}</h2>
                    <div className="w-full">
                        <MarkdownPreview content={post?.content || ""} />
                    </div>
                </div>
                <Link href={`/note/${post?.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"></path></svg>
                </Link>
            </DialogContent>
        </Dialog>
    )
}

