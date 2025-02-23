import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostByKey, getPostsByUser } from "@/models/post-model";
import { getUserCategories } from "@/models/accounts-model";
import Note from "@/components/note";
import NoteSidebar from "@/components/note-sidebar";
import { NoteEditorSkeleton, NoteSidebarSkeleton } from "./note-skeletons";
import { Suspense } from "react";

export const metadata = {
    title: "Edit Note | MarkNote.one",
};

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
    pinned?: boolean;
}

export default async function Page({
    params,
}: {
    params: Promise<{ postId: string }>;
}) {
    const session = await getSession();
    if (!session) redirect("/login");

    return (
        <div className="flex flex-row h-full gap-3">
            <Suspense fallback={<NoteSidebarSkeleton />}>
                <NoteSidebarWrapper
                    userId={session.user.userId}
                    menuOpen={session.user.menuOpen}
                />
            </Suspense>
            <Suspense fallback={<NoteEditorSkeleton />}>
                <NoteWrapper
                    userId={session.user.userId}
                    postId={(await params).postId}
                    mdPreview={session.user.mdPreview}
                />
            </Suspense>
        </div>
    );
}

async function NoteWrapper({
    userId,
    postId,
    mdPreview,
}: {
    userId: string;
    postId: string;
    mdPreview: boolean;
}) {
    const post = await getPostByKey(postId);
    if (!post) redirect("/");
    if (userId !== post.userId) redirect("/");

    const categoriesList = await getUserCategories(userId);

    return (
        <Note
            userId={userId}
            preference={mdPreview}
            postKey={postId}
            categoriesList={categoriesList}
            post={post}
        />
    );
}

async function NoteSidebarWrapper({
    userId,
    menuOpen,
}: {
    userId: string;
    menuOpen: boolean;
}) {
    const posts = (await getPostsByUser(userId)) as Post[];
    if (!posts) return [];
    const postsArray = Object.entries(posts).map(([key, post]) => {
        return {
            id: key,
            title: post.title,
            content: post.content,
            userId: post.userId,
            lastUpdated: post.lastUpdated,
            pinned: post.pinned || false,
        };
    }) as Post[];

    postsArray.sort(
        (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
    );

    return <NoteSidebar posts={postsArray} preference={menuOpen} />;
}
