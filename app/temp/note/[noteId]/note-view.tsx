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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Clock, AlertTriangle } from "lucide-react";

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
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                <AlertTriangle size={18} />
                <p className="text-center">
                    This note is temporary and will only be available until you
                    leave or refresh the page.
                </p>
            </div>

            {noteContent ? (
                <Card className="w-full max-w-2xl border shadow-md">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle>Temporary Note</CardTitle>
                            <div className="flex items-center text-muted-foreground text-sm">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>Expires on page refresh</span>
                            </div>
                        </div>
                        <CardDescription>
                            Make sure to copy this content if you want to save
                            it
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 pb-2">
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="prose dark:prose-invert max-w-none">
                                <MarkdownPreview content={noteContent} />
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end pt-2">
                        <CopyText text={noteContent || ""} showText={false} />
                    </CardFooter>
                </Card>
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
