"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getTempNoteAction } from "./action";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MarkdownPreview from "@/components/markdown-preview";
import CopyText from "@/components/temp/copy-button";

interface OpenNoteProps {
    noteId: string;
}

export default function OpenNote({ noteId }: OpenNoteProps) {
    const [noteContent, setNoteContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNoteContent = async () => {
        setIsLoading(true);
        const noteContent = await getTempNoteAction(noteId);
        if (noteContent) {
            setNoteContent(noteContent);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-8 justify-center items-center py-12 px-6">
            <h2 className="text-center text-2xl font-bold">
                Open Temporary Note
            </h2>
            <p className="text-center text-red-600 dark:text-red-400 font-bold">
                This note is temporary and will only be available until you
                leave or refresh the page.
            </p>
            {noteContent ? (
                <div className="w-full max-w-2xl flex flex-col gap-8">
                    {isLoading && <p>Loading...</p>}
                    <MarkdownPreview content={noteContent} />
                    <CopyText text={noteContent} showText={false} />
                </div>
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>Open Note</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Open Temporary Note
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            Are you sure you want to open this note? After
                            opening the note, if you leave or refresh the page
                            you will not be able to view the note again. If you
                            want to save the note, please copy the contents to a
                            safe location.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={fetchNoteContent}>
                                Open
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}
