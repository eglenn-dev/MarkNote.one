"use server";
import { createPost } from "@/models/post-model";
import { getSession } from "@/lib/session";

interface Post {
    title: string;
    content: string;
    userId: string;
}

export async function createUserPost(post: Post) {
    const session = await getSession();
    if (!session) return null;
    if (post.userId !== session.user.userId) return null;
    return await createPost(post);
}
