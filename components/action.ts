"use server";
import { logout } from "@/lib/auth";
import {
    createPost,
    updatePost,
    getPostByKey,
    deletePost,
    createDemoPost,
} from "@/models/post-model";
import { getSession } from "@/lib/session";

interface Post {
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
    pinned?: boolean;
}

export async function logoutAction() {
    await logout();
}

export async function createPostAction(post: Post) {
    const session = await getSession();
    if (!session) return "";
    if (session.user.userId !== post.userId) return "";
    post.pinned = false;
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

export async function deletePostAction(postId: string) {
    if (!postId) return;
    const session = await getSession();
    if (!session) return;
    const existingPost = await getPostByKey(postId);
    if (!existingPost) return;
    if (session.user.userId !== existingPost.userId) return;
    await deletePost(postId);
}

export async function createDemoPostAction() {
    const session = await getSession();
    if (!session) return;
    await createDemoPost(session.user.userId);
}

export async function pinPostAction(postId: string) {
    const session = await getSession();
    if (!session) return;
    const existingPost = await getPostByKey(postId);
    if (!existingPost) return;
    if (session.user.userId !== existingPost.userId) return;
    await updatePost(postId, { ...existingPost, pinned: !existingPost.pinned });
}
