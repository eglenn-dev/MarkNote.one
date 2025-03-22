import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostsByUser } from "@/models/post-model";
import { getUserCategories } from "@/models/accounts-model";
import Note from "@/components/note";
import NoteSidebar from "@/components/note-sidebar";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

export const metadata = {
    title: "New Note | MarkNote.one",
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

export default async function NewNotePage() {
    const session = await getSession();
    if (!session) redirect("/login");
    const posts = (await getPostsByUser(session.user.userId)) as Post[];
    const categoriesList = await getUserCategories(session.user.userId);
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
                        <NoteSidebar
                            posts={postsArray.filter((post) => !post.archived)}
                            preference={session.user.menuOpen}
                        />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={100} minSize={75}>
                        <Note
                            userId={session.user.userId}
                            preference={session.user.mdPreview}
                            categoriesList={categoriesList}
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </span>
            <span className="block sm:hidden h-full w-full">
                <Note
                    userId={session.user.userId}
                    preference={session.user.mdPreview}
                    categoriesList={categoriesList}
                />
            </span>
        </div>
    );
}
