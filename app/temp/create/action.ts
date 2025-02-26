"use server";
import { createTempNote } from "@/models/temp-notes";
import DOMPurify from "dompurify";

export async function createTempNoteAction(noteContent: string) {
    const sanitizedContent = DOMPurify.sanitize(noteContent);
    return await createTempNote(sanitizedContent);
}
