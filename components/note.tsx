"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MarkdownPreview from "@/components/markdown-preview";
import { createPostAction, updatePostAction } from "./action";
import { AlertCircle } from "lucide-react";
import { NoteMenuBar } from "@/components/menu-bar";
import { redirect } from "next/navigation";

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
                    category: category === "remove" ? "" : category,
                    lastUpdated: new Date().toISOString(),
                });
            }
            setSaveStatus("saved");
        } catch (error) {
            console.error("Error saving note:", error);
            setSaveStatus("error");
        }
    }, [noteTitle, note, postId, category, userId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (saveStatus !== "saved") {
                saveNote();
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [noteTitle, note, category, saveStatus, saveNote]);

    const handleKeyDown = useCallback(
        async (e: KeyboardEvent) => {
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
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (saveStatus === "saved") {
            setSaveStatus("unsaved");
        }
    }, [noteTitle, note, category]);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="mb-4">
                <Input
                    id="title"
                    name="title"
                    type="title"
                    required
                    spellCheck={false}
                    placeholder={post?.title || "Enter note title"}
                    className="mt-1 p-4 h-fit md:text-2xl font-bold"
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
            <div
                className={`flex flex-grow transition-all duration-300 ease-in-out overflow-hidden ${
                    showPreview && !fullPreview ? "sm:space-x-4" : ""
                }`}
                style={{ height: "calc(100vh - 200px)" }}
            >
                <div
                    className={`${
                        fullPreview
                            ? "hidden"
                            : showPreview
                            ? "sm:w-1/2"
                            : "w-full"
                    } flex flex-col gap-5 h-full overflow-auto hide-scrollbar`}
                >
                    <textarea
                        ref={textareaRef}
                        className={`${
                            showPreview && !fullPreview
                                ? "hidden sm:inline-block"
                                : null
                        } w-full h-full p-2 border rounded-md resize-none font-mono bg-background text-foreground`}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        spellCheck={false}
                        placeholder={
                            post?.content || "Write your Markdown here..."
                        }
                    />
                </div>
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        fullPreview
                            ? "w-full"
                            : showPreview
                            ? "w-full sm:w-1/2 h-full opacity-100"
                            : "w-0 h-0 opacity-0"
                    }`}
                >
                    <div
                        className={`${
                            fullPreview || showPreview
                                ? "h-full p-4 border rounded-md overflow-auto bg-background text-foreground hide-scrollbar"
                                : "hidden"
                        }`}
                        onDoubleClick={handleDoubleClick}
                    >
                        <MarkdownPreview content={note} />
                    </div>
                </div>
            </div>
        </div>
    );
}
