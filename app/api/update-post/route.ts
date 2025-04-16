"use server";
import { getSession } from "@/lib/session";
import { updatePost, getPostByKey } from "@/models/post-model";

export async function GET() {
    return new Response("You are not supposed to be here", { status: 200 });
}

export async function POST(request: Request) {
    try {
        const { postId, post } = await request.json();
        if (!postId || !post)
            return new Response("Bad Request", { status: 400 });
        const session = await getSession();
        if (!session) return new Response("Unauthorized", { status: 401 });
        if (session.user.userId !== post.userId)
            return new Response("Forbidden", { status: 403 });
        const existingPost = await getPostByKey(postId);
        if (!existingPost) return new Response("Not Found", { status: 404 });
        if (session.user.userId !== existingPost.userId)
            return new Response("Forbidden", { status: 403 });
        await updatePost(postId, post);
    } catch (error) {
        console.error("Error updating post:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Success", { status: 200 });
}
