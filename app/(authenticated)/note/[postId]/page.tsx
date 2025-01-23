import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostByKey } from "@/models/post-model";
import Note from "@/components/note";
import NoteSidebar from "@/components/note-sidebar";
import { getPostsByUser } from "@/models/post-model";

export const metadata = {
    title: "Edit Note | MarkNote.one",
};

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

export default async function Page({
    params,
}: {
    params: Promise<{ postId: string }>;
}) {
    const session = await getSession();
    if (!session) redirect("/login");

    const post = await getPostByKey((await params).postId);
    if (!post) redirect("/");
    if (session.user.userId !== post.userId) redirect("/");

    const posts = (await getPostsByUser(session.user.userId)) as Post[];
    if (!posts) return [];
    const postsArray = Object.entries(posts).map(([key, post]) => {
        return {
            id: key,
            title: post.title,
            content: post.content,
            userId: post.userId,
            lastUpdated: post.lastUpdated,
        };
    }) as Post[];

    return (
        <div className="flex flex-row h-full gap-3">
            <NoteSidebar posts={postsArray} />
            <Note
                userId={session.user.userId}
                postKey={(await params).postId}
                post={post}
            />
        </div>
    );
}
