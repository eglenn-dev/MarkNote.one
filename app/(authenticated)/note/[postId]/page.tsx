import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostByKey, getPostsByUser } from "@/models/post-model";
import { getUserCategories } from "@/models/accounts-model";
import Note from "@/components/note";
import NoteSidebar from "@/components/note-sidebar";
import { NoteEditorSkeleton, NoteSidebarSkeleton } from "./note-skeletons";
import { Suspense } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

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
    archived?: boolean;
}

export default async function Page({
    params,
}: {
    params: Promise<{ postId: string }>;
}) {
    const session = await getSession();
    if (!session) redirect("/login");

    return (
        <div className="flex flex-row h-full w-full">
            <span className="hidden sm:flex h-full w-full">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="w-full h-full"
                >
                    <ResizablePanel
                        defaultSize={session.user.menuOpen ? 25 : 0}
                        minSize={15}
                        maxSize={40}
                        collapsible={true}
                        collapsedSize={0}
                    >
                        <Suspense fallback={<NoteSidebarSkeleton />}>
                            <NoteSidebarWrapper
                                userId={session.user.userId}
                                menuOpen={session.user.menuOpen}
                            />
                        </Suspense>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={100} minSize={75}>
                        <Suspense fallback={<NoteEditorSkeleton />}>
                            <NoteWrapper
                                userId={session.user.userId}
                                postId={(await params).postId}
                                mdPreview={session.user.mdPreview}
                            />
                        </Suspense>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </span>
            <span className="block sm:hidden h-full w-full">
                <Suspense fallback={<NoteEditorSkeleton />}>
                    <NoteWrapper
                        userId={session.user.userId}
                        postId={(await params).postId}
                        mdPreview={session.user.mdPreview}
                    />
                </Suspense>
            </span>
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
            archived: post.archived || false,
        };
    }) as Post[];

    return (
        <NoteSidebar
            posts={postsArray.filter((post) => !post.archived)}
            preference={menuOpen}
        />
    );
}
