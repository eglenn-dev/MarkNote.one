import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostsByUser } from "@/models/post-model";
import Note from "@/components/note";
import NoteSidebar from "@/components/note-sidebar";

export const metadata = {
    title: "New Note | MarkNote.one",
};

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

export default async function NewNotePage() {
    const session = await getSession();
    if (!session) redirect("/login");
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

    postsArray.sort(
        (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
    );

    return (
        <div className="flex flex-row h-full gap-3">
            <NoteSidebar
                posts={postsArray}
                preference={session.user.menuOpen}
            />
            <Note
                userId={session.user.userId}
                preference={session.user.mdPreview}
            />
        </div>
    );
}
