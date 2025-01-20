"use server";
import { getSession } from "@/lib/session";
import { createPost } from "@/models/post-model";

interface Post {
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

export async function createPostAction(post: Post) {
    const session = await getSession();
    if (!session) return "";
    if (session.user.userId !== post.userId) return "";
    const id = await createPost(post);
    return id;
}
