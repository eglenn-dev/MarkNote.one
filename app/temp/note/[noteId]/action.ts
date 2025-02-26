"use server";
import { readNote } from "@/models/temp-notes";

export async function getTempNoteAction(nodeId: string) {
    return await readNote(nodeId);
}
