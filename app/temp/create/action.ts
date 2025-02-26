"use server";
import { createTempNote } from "@/models/temp-notes";
import sanitizeHtml from "sanitize-html";

export async function createTempNoteAction(noteContent: string) {
    const sanitizedContent = sanitizeHtml(noteContent);
    return await createTempNote(sanitizedContent);
}
