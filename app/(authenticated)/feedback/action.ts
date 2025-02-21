"use server";
import { getSession } from "@/lib/session";
import { recordFeedback, deleteFeedback } from "@/models/feedback-model";
import { redirect } from "next/navigation";

export async function submitFeedbackAction(formData: FormData) {
    const session = await getSession();
    if (!session?.user) return;
    const type = formData.get("type");
    const content = formData.get("content");
    if (typeof type !== "string" || typeof content !== "string") return;
    const feedback = {
        type,
        content,
        userId: session.user.userId,
    };
    await recordFeedback(feedback);
    redirect("/feedback/thank-you");
}

export async function deleteFeedbackAction(key: string) {
    if (key === undefined || key === "") return;
    const session = await getSession();
    if (!session?.user || session.user.role !== "admin") return;
    await deleteFeedback(key);
}
