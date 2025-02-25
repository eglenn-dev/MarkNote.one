"use server";

import { createTempNote } from "@/models/temp-notes";

export async function createTempNoteAction(noteContent: string) {
    return await createTempNote(noteContent);
}
