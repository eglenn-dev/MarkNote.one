"use server";
import { logout } from "@/lib/auth";
import { createPost, updatePost, getPostByKey } from "@/models/post-model";
import { getSession } from "@/lib/session";

interface Post {
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

export async function logoutAction() {
    await logout();
}

export async function createPostAction(post: Post) {
    const session = await getSession();
    if (!session) return "";
    if (session.user.userId !== post.userId) return "";
    const id = await createPost(post);
    return id;
}

export async function updatePostAction(postId: string, post: Post) {
    if (!postId || !post) return;
    const session = await getSession();
    if (!session) return;
    if (session.user.userId !== post.userId) return "";
    const existingPost = await getPostByKey(postId);
    if (!existingPost) return;
    if (session.user.userId !== existingPost.userId) return;
    await updatePost(postId, post);
}
