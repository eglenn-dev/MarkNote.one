"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MarkdownPreview from "@/components/markdown-preview";
import { createPostAction, updatePostAction } from "./action";

interface NoteEditorProps {
    userId: string;
    postKey?: string;
    post?: {
        title: string;
        content: string;
        userId: string;
    };
}

export default function NoteEditor({ userId, postKey, post }: NoteEditorProps) {
    const [noteTitle, setNoteTitle] = useState("");
    const [note, setNote] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [postId, setPostId] = useState(postKey || "");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (post) {
            setNoteTitle(post.title);
            setNote(post.content);
        }
    }, [post]);

    useEffect(() => {
        const adjustTextareaHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = `${Math.min(
                    textarea.scrollHeight,
                    window.innerHeight * 0.8
                )}px`;
            }
        };

        adjustTextareaHeight();
        window.addEventListener("resize", adjustTextareaHeight);

        return () => {
            window.removeEventListener("resize", adjustTextareaHeight);
        };
    }, [note, noteTitle]);

    const saveNote = useCallback(async () => {
        if (!noteTitle || !note) return;

        if (!postId) {
            const response = await createPostAction({
                title: noteTitle,
                content: note,
                userId: userId,
                lastUpdated: new Date().toISOString(),
            });
            if (response) {
                setPostId(response);
                history.pushState(null, "", `/note/${response}`);
            }
        } else {
            await updatePostAction(postId, {
                title: noteTitle,
                content: note,
                userId: userId,
                lastUpdated: new Date().toISOString(),
            });
        }
    }, [noteTitle, note, userId, postId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            saveNote();
        }, 2000);

        return () => clearTimeout(timer);
    }, [noteTitle, note, saveNote]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                saveNote();
            } else if (
                e.key === "Tab" &&
                document.activeElement === textareaRef.current
            ) {
                e.preventDefault();
                const start = textareaRef.current!.selectionStart;
                const end = textareaRef.current!.selectionEnd;
                setNote(
                    note.substring(0, start) + "    " + note.substring(end)
                );
                setTimeout(() => {
                    textareaRef.current!.selectionStart =
                        textareaRef.current!.selectionEnd = start + 4;
                }, 0);
            }
        },
        [note, saveNote]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="flex flex-col flex-grow h-full">
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                    id="preview-mode"
                    checked={showPreview}
                    onCheckedChange={setShowPreview}
                />
                <Label htmlFor="preview-mode">Show Preview</Label>
            </div>
            <div className="mb-4">
                <Input
                    id="title"
                    name="title"
                    type="title"
                    required
                    placeholder={post?.title || "Enter note title"}
                    className="mt-1 p-4 h-fit md:text-2xl font-bold"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
            </div>
            <div className={`flex flex-grow ${showPreview ? "space-x-4" : ""}`}>
                <div
                    className={`${
                        showPreview ? "w-1/2" : "w-full"
                    } flex flex-col gap-5 h-full`}
                >
                    <textarea
                        ref={textareaRef}
                        className="w-full h-full p-2 border rounded-md resize-none font-mono bg-background text-foreground"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={
                            post?.content || "Write your Markdown here..."
                        }
                    />
                </div>
                {showPreview && (
                    <div className="w-1/2 h-full p-4 border rounded-md overflow-auto bg-background text-foreground">
                        <MarkdownPreview content={note} />
                    </div>
                )}
            </div>
        </div>
    );
}
