"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MarkdownPreview from "@/components/markdown-preview";
import { createPostAction, updatePostAction } from "./action";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface NoteEditorProps {
    userId: string;
    postKey?: string;
    post?: {
        title: string;
        content: string;
        userId: string;
    };
}

type SaveStatus = "unsaved" | "saving" | "saved" | "error";

export default function NoteEditor({ userId, postKey, post }: NoteEditorProps) {
    const [noteTitle, setNoteTitle] = useState(post?.title || "");
    const [note, setNote] = useState(post?.content || "");
    const [showPreview, setShowPreview] = useState(false);
    const [postId, setPostId] = useState(postKey || "");
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const adjustTextareaHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = `${Math.min(
                    textarea.scrollHeight + 100,
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

        setSaveStatus("saving");
        try {
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
            setSaveStatus("saved");
        } catch (error) {
            console.error("Error saving note:", error);
            setSaveStatus("error");
        }
    }, [noteTitle, note, postId, userId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (saveStatus !== "saved") {
                saveNote();
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [noteTitle, note, saveNote, saveStatus]);

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
            } else if (e.altKey && e.key === "p") {
                e.preventDefault();
                setShowPreview(!showPreview);
            }
        },
        [note, showPreview, saveNote]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (saveStatus === "saved") {
            setSaveStatus("unsaved");
        }
    }, [noteTitle, note]);

    return (
        <div className="flex flex-col flex-grow h-full">
            <div className="flex items-center justify-between mb-4">
                <div
                    title="Alt + P to toggle preview mode"
                    className="flex items-center space-x-2 select-none"
                >
                    <Switch
                        id="preview-mode"
                        checked={showPreview}
                        onCheckedChange={setShowPreview}
                    />
                    <Label htmlFor="preview-mode">Show Preview</Label>
                </div>
                <div className="flex items-center space-x-2 select-none">
                    <div className="hidden md:flex items-center space-x-2 text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"
                            ></path>
                        </svg>
                        <p>Visible only to you</p>
                    </div>
                    {saveStatus === "unsaved" && (
                        <span className="text-yellow-500">Unsaved changes</span>
                    )}
                    {saveStatus === "saving" && (
                        <span className="text-blue-500 flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </span>
                    )}
                    {saveStatus === "saved" && (
                        <span className="text-green-500 flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Changes saved
                        </span>
                    )}
                    {saveStatus === "error" && (
                        <span className="text-red-500 flex items-center">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Error saving changes
                        </span>
                    )}
                </div>
            </div>
            {saveStatus === "error" && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        There was an error saving your changes. Please try
                        again.
                    </AlertDescription>
                </Alert>
            )}
            <div className="mb-4">
                <Input
                    id="title"
                    name="title"
                    type="title"
                    required
                    placeholder={post?.title || "Enter note title"}
                    className="mt-1 p-4 h-fit md:text-2xl font-bold"
                    defaultValue={post?.title || ""}
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
                        className="w-full min-h-96 h-full p-2 border rounded-md resize-none font-mono bg-background text-foreground"
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
