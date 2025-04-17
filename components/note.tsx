"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MarkdownPreview from "@/components/markdown-preview";
import { createPostAction } from "./action";
import { AlertCircle } from "lucide-react";
import { NoteMenuBar } from "@/components/menu-bar";
import { redirect } from "next/navigation";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

interface NoteEditorProps {
    userId: string;
    preference: boolean;
    categoriesList: string[];
    postKey?: string;
    post?: {
        title: string;
        content: string;
        userId: string;
        category?: string;
    };
}

type SaveStatus = "unsaved" | "saving" | "saved" | "error";

export default function NoteEditor({
    userId,
    preference,
    categoriesList,
    postKey,
    post,
}: NoteEditorProps) {
    const [noteTitle, setNoteTitle] = useState(post?.title || "");
    const [note, setNote] = useState(post?.content || "");
    const [category, setCategory] = useState(post?.category || "");
    const [showPreview, setShowPreview] = useState(preference);
    const [postId, setPostId] = useState(postKey || "");
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
    const [fullPreview, setFullPreview] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const isMobileDevice = useCallback(() => {
        return /Mobi|Android/i.test(navigator.userAgent);
    }, []);

    const saveNote = useCallback(async () => {
        if (!noteTitle || !note) {
            setSaveStatus("unsaved");
            return;
        }

        setSaveStatus("saving");
        try {
            let newPostId = postId;
            if (!postId) {
                const response = await createPostAction({
                    title: noteTitle,
                    content: note,
                    userId: userId,
                    lastUpdated: new Date().toISOString(),
                });
                if (response) {
                    newPostId = response;
                    setPostId(response);
                    window.history.replaceState(null, "", `/note/${response}`);
                }
            } else {
                const payload = {
                    postId: postId,
                    post: {
                        title: noteTitle,
                        content: note,
                        userId: userId,
                        category: category === "remove" ? "" : category,
                        lastUpdated: new Date().toISOString(),
                    },
                };
                const response = await fetch("/api/update-post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                console.log("Response:", response);
                if (!response.ok) {
                    throw new Error("Failed to update post");
                }
            }
            setSaveStatus("saved");
            return newPostId;
        } catch (error) {
            console.error("Error saving note:", error);
            setSaveStatus("error");
        }
    }, [noteTitle, note, postId, category, userId]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (saveStatus === "unsaved" && noteTitle && note) {
            timer = setTimeout(async () => {
                const savedId = await saveNote();
                if (savedId && !postId) {
                    setPostId(savedId);
                }
            }, 1200);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [noteTitle, note, category, saveStatus, saveNote, postId]);

    useEffect(() => {
        if (post?.title !== noteTitle || post?.content !== note) {
            setSaveStatus("unsaved");
        }
    }, [noteTitle, note, post?.title, post?.content]);

    const handleKeyDown = useCallback(
        async (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                await saveNote();
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
                setFullPreview(false);
            } else if (e.altKey && e.key === "f") {
                e.preventDefault();
                const newFullPreview = !fullPreview;
                setFullPreview(newFullPreview);
                setShowPreview(newFullPreview);
            } else if (e.altKey && e.key === "d") {
                e.preventDefault();
                const downloadLink = document.createElement("a");
                downloadLink.href = `data:text/markdown;charset=utf-8,${encodeURIComponent(
                    note
                )}`;
                downloadLink.download = `${noteTitle}.md`;
                downloadLink.click();
            } else if (e.altKey && e.key === "n") {
                e.preventDefault();
                await saveNote();
                redirect("/new-note");
            } else if (e.altKey && e.key === "u") {
                e.preventDefault();
                await saveNote();
                redirect("/upload");
            } else if (e.ctrlKey && e.key === "b") {
                e.preventDefault();
                const start = textareaRef.current!.selectionStart;
                const end = textareaRef.current!.selectionEnd;
                let selectedText = note.substring(start, end);
                let newStart = start;
                let newEnd = end;
                if (
                    note.substring(start - 2, start) === "**" &&
                    note.substring(end, end + 2) === "**"
                ) {
                    newStart = start - 2;
                    newEnd = end + 2;
                    selectedText = note.substring(newStart, newEnd);
                }

                const isBold =
                    selectedText.startsWith("**") &&
                    selectedText.endsWith("**");

                if (isBold) {
                    setNote(
                        note.substring(0, newStart) +
                            selectedText.slice(2, -2) +
                            note.substring(newEnd)
                    );
                    setTimeout(() => {
                        textareaRef.current!.selectionStart = newStart;
                        textareaRef.current!.selectionEnd = newEnd - 4;
                    }, 0);
                } else {
                    setNote(
                        note.substring(0, start) +
                            `**${selectedText}**` +
                            note.substring(end)
                    );
                    setTimeout(() => {
                        textareaRef.current!.selectionStart = start + 2;
                        textareaRef.current!.selectionEnd = end + 2;
                    }, 0);
                }
            } else if (e.ctrlKey && e.key === "i") {
                e.preventDefault();
                const start = textareaRef.current!.selectionStart;
                const end = textareaRef.current!.selectionEnd;
                let selectedText = note.substring(start, end);
                let newStart = start;
                let newEnd = end;
                if (
                    note.substring(start - 1, start) === "*" &&
                    note.substring(end, end + 1) === "*"
                ) {
                    newStart = start - 1;
                    newEnd = end + 1;
                    selectedText = note.substring(newStart, newEnd);
                }

                const isItalic =
                    selectedText.startsWith("*") && selectedText.endsWith("*");

                if (isItalic) {
                    setNote(
                        note.substring(0, newStart) +
                            selectedText.slice(1, -1) +
                            note.substring(newEnd)
                    );
                    setTimeout(() => {
                        textareaRef.current!.selectionStart = newStart;
                        textareaRef.current!.selectionEnd = newEnd - 2;
                    }, 0);
                } else {
                    setNote(
                        note.substring(0, start) +
                            `*${selectedText}*` +
                            note.substring(end)
                    );
                    setTimeout(() => {
                        textareaRef.current!.selectionStart = start + 1;
                        textareaRef.current!.selectionEnd = end + 1;
                    }, 0);
                }
            }
        },
        [note, noteTitle, showPreview, fullPreview, saveNote]
    );

    const handleDoubleClick = useCallback(() => {
        setFullPreview(false);
        setShowPreview(false);
        if (!fullPreview && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [fullPreview]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.selectionStart =
                textareaRef.current.selectionEnd =
                    textareaRef.current.value.length;
        }
        if (isMobileDevice()) {
            setShowPreview(false);
        }
    }, [isMobileDevice]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="flex flex-col w-full h-full bg-background">
            <div className="mb-2">
                <Input
                    id="title"
                    name="title"
                    type="title"
                    required
                    spellCheck={false}
                    placeholder={post?.title || "Enter note title"}
                    className="mt-1 p-4 h-fit md:text-2xl font-bold border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    defaultValue={post?.title || ""}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
            </div>
            <NoteMenuBar
                saveStatus={saveStatus}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                fullPreview={fullPreview}
                setFullPreview={setFullPreview}
                noteTitle={noteTitle}
                note={note}
                category={category}
                categoriesList={categoriesList}
                setCategory={setCategory}
                saveNote={saveNote}
            />
            {saveStatus === "error" && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        There was an error saving your changes. Please try
                        again.
                    </AlertDescription>
                </Alert>
            )}

            {!postId && (
                <div className="text-sm pl-4">Enter title and note to save</div>
            )}

            <div
                className="flex-grow overflow-hidden"
                style={{ height: "calc(100vh - 160px)" }}
            >
                {fullPreview ? (
                    <div
                        className="h-full p-4 overflow-auto bg-background text-foreground"
                        onDoubleClick={handleDoubleClick}
                    >
                        <MarkdownPreview content={note} />
                    </div>
                ) : (
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="w-full h-full rounded-lg"
                    >
                        <ResizablePanel
                            defaultSize={showPreview ? 50 : 100}
                            minSize={20}
                        >
                            <textarea
                                ref={textareaRef}
                                className="w-full h-full p-4 font-mono bg-background text-foreground resize-none border-0 focus:outline-none focus:ring-0"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                spellCheck={false}
                                placeholder={
                                    post?.content ||
                                    "Write your Markdown here..."
                                }
                            />
                        </ResizablePanel>

                        {showPreview && (
                            <>
                                <ResizableHandle withHandle />
                                <ResizablePanel defaultSize={50} minSize={20}>
                                    <div
                                        className="h-full p-4 overflow-auto bg-background text-foreground"
                                        onDoubleClick={handleDoubleClick}
                                    >
                                        <MarkdownPreview content={note} />
                                    </div>
                                </ResizablePanel>
                            </>
                        )}
                    </ResizablePanelGroup>
                )}
            </div>
        </div>
    );
}
