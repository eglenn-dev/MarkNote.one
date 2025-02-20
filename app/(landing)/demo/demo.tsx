"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Eye,
    EyeOff,
    Maximize,
    Minimize,
    CloudUpload,
    Download,
} from "lucide-react";
import MarkdownPreview from "@/components/markdown-preview";
import Link from "next/link";

interface MarkdownEditorProps {
    defaultTitle?: string;
    defaultContent?: string;
    defaultShowPreview?: boolean;
}

const markdownContent = `# [MarkNote.one](https://marknote.one) Demo Example

All the _classic_ **Markdown** [syntax]() is \`supported\`.

**Get Started** by creating an account here: [Sign Up](https://marknote.one/signup)

### Editor Features:

- **Show/Hide Preview:** Press \`Alt + P\` to toggle the preview.
- **Full Preview:** Press \`Alt + F\` to toggle the full preview.
- **Tab Indent:** Press \`Tab\` to indent the text.

### Other Features:

- **Export:** Download the Markdown file.
- **Dark Mode:** Toggle the dark mode from the top right corner.
- **Responsive Design:** Works on all devices.
- **Live Preview:** See the changes in real-time.
`;

export default function MarkdownEditor({
    defaultTitle = "Welcome to MarkNote.one",
    defaultContent = markdownContent,
    defaultShowPreview = true,
}: MarkdownEditorProps) {
    const [title, setTitle] = useState(defaultTitle);
    const [content, setContent] = useState(defaultContent);
    const [showPreview, setShowPreview] = useState(defaultShowPreview);
    const [fullPreview, setFullPreview] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (
                e.key === "Tab" &&
                document.activeElement === textareaRef.current
            ) {
                e.preventDefault();
                const start = textareaRef.current!.selectionStart;
                const end = textareaRef.current!.selectionEnd;
                setContent(
                    content.substring(0, start) +
                        "    " +
                        content.substring(end)
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
            }
        },
        [content, showPreview, fullPreview]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Enter title..."
                    className="mt-1 p-4 h-fit md:text-2xl font-bold"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    spellCheck={false}
                />
            </div>
            <div className="flex items-center gap-2 mb-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setShowPreview(!showPreview);
                        setFullPreview(false);
                    }}
                >
                    {showPreview ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                    <span className="ml-2 hidden sm:inline">
                        {showPreview ? "Hide Preview" : "Show Preview"}
                    </span>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        const newFullPreview = !fullPreview;
                        setFullPreview(newFullPreview);
                        setShowPreview(newFullPreview);
                    }}
                >
                    {fullPreview ? (
                        <Minimize className="h-4 w-4" />
                    ) : (
                        <Maximize className="h-4 w-4" />
                    )}
                    <span className="ml-2 hidden sm:inline">
                        {fullPreview ? "Exit Full Preview" : "Full Preview"}
                    </span>
                </Button>
                <Link href="/upload">
                    <Button variant="outline">
                        <CloudUpload className="h-4 w-4" />
                        <span className="ml-2 hidden sm:inline">Upload</span>
                    </Button>
                </Link>
                <Button
                    onClick={() => {
                        const downloadLink = document.createElement("a");
                        downloadLink.href = `data:text/markdown;charset=utf-8,${encodeURIComponent(
                            content
                        )}`;
                        downloadLink.download = `${title}.md`;
                        downloadLink.click();
                    }}
                    variant="outline"
                >
                    <Download className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Download</span>
                </Button>
            </div>
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
                        } w-full h-full p-4 border rounded-md resize-none font-mono bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        spellCheck={false}
                        placeholder="Write your Markdown here..."
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
                                ? "h-full p-4 border rounded-md overflow-auto bg-background text-foreground hide-scrollbar prose dark:prose-invert max-w-none"
                                : "hidden"
                        }`}
                    >
                        <MarkdownPreview content={content} />
                    </div>
                </div>
            </div>
        </div>
    );
}
