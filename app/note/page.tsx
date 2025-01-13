"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MarkdownPreview from "@/components/markdown-preview";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { logoutAction } from "./action";

export default function Home() {
    const [note, setNote] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <Link href="/" className="text-2xl font-bold">
                    MarkNote
                </Link>
                <form
                    className="flex items-center space-x-4"
                    action={logoutAction}
                >
                    <Button variant="ghost">Logout</Button>
                    <ThemeToggle />
                </form>
            </div>

            <div className="flex items-center space-x-2 mb-4">
                <Switch
                    id="preview-mode"
                    checked={showPreview}
                    onCheckedChange={setShowPreview}
                />
                <Label htmlFor="preview-mode">Show Preview</Label>
            </div>

            <div className={`flex flex-grow ${showPreview ? "space-x-4" : ""}`}>
                <div className={`${showPreview ? "w-1/2" : "w-full"}`}>
                    <textarea
                        className="w-full h-full p-2 border rounded-md resize-none font-mono bg-background text-foreground"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write your Markdown here..."
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
