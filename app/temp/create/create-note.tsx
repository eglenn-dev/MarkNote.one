"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createTempNoteAction } from "./action";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CopyText from "@/components/temp/copy-button";

export default function CreateTempNote() {
    const [noteContent, setNoteContent] = useState("");
    const [noteId, setNoteId] = useState("");
    const [loading, setLoading] = useState(false);

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitFormActionResult = async () => {
            setLoading(true);
            const dbNoteId = await createTempNoteAction(noteContent);
            if (dbNoteId) setNoteId(dbNoteId);
            setLoading(false);
        };
        submitFormActionResult();
    };

    return (
        <div className="container py-16 mx-auto">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Create a Temporary Note</CardTitle>
                    <CardDescription>
                        Your note will be securely stored and automatically
                        deleted after being read or when it expires.{" "}
                        <i>Markdown supported.</i>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {noteId ? (
                        <div className="flex flex-col gap-4">
                            <p>
                                Your note has been created. Share the link below
                                to allow others to view it.
                            </p>
                            <div className="text-sm text-muted-foreground">
                                <CopyText
                                    text={`https://temp.marknote.one/note/${noteId}`}
                                />
                            </div>
                            <p className="text-[#f44336] text-sm">
                                <strong>
                                    Copy the link above as it cannot be viewed
                                    again.
                                </strong>
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={onFormSubmit}>
                            {noteContent.length > 500 && (
                                <p className="text-red-500 text-sm mb-4">
                                    Note content cannot exceed 500 characters.
                                </p>
                            )}
                            <Label htmlFor="note-content">Note Content</Label>
                            <Textarea
                                id="note-content"
                                name="note-content"
                                placeholder="Write your note here..."
                                rows={5}
                                required
                                onChange={(e) => setNoteContent(e.target.value)}
                            />
                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={
                                        noteContent.length > 500 || loading
                                    }
                                >
                                    {loading ? "Creating..." : "Create Note"}
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
