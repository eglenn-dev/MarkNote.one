import { checkNoteExists } from "@/models/temp-notes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OpenNote from "./note-view";

export const metadata = {
    title: "View Temp Note | MarkNote.one",
};

export default async function TempNoteView({
    params,
}: {
    params: Promise<{ noteId: string }>;
}) {
    const noteId = (await params).noteId;
    const noteExists = await checkNoteExists(noteId);

    if (!noteExists) {
        return (
            <div className="flex flex-col gap-8 justify-center items-center py-12 px-6">
                <h2 className="text-center text-2xl font-bold">
                    404 - Note Not Found
                </h2>
                <p className="text-center">
                    The note you are looking for either does not exist, or has
                    already been opened.
                </p>
                <Link href="/">
                    <Button className="text-lg">Return Home</Button>
                </Link>
            </div>
        );
    }

    return <OpenNote noteId={noteId} />;
}
