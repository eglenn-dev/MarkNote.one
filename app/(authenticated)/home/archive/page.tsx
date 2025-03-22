import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostsByUser } from "@/models/post-model";
import { getUserCategories } from "@/models/accounts-model";
import { Suspense } from "react";
import HomeSkeleton from "../home-skeleton";
import PostList from "../post-list";

interface Post {
    title: string;
    content: string;
    userId: string;
    category?: string;
    lastUpdated: string;
    pinned?: boolean;
    archived?: boolean;
}

export const metadata = {
    title: "Archive | MarkNote.one",
    description: "View and manage all your archived markdown notes",
};

export default async function HomePage() {
    const session = await getSession();
    if (!session) redirect("/login");
    const userId = session.user.userId;

    return (
        <Suspense fallback={<HomeSkeleton />}>
            <PostListWrapper userId={userId} />
        </Suspense>
    );
}

async function PostListWrapper({ userId }: { userId: string }) {
    const categories = await getUserCategories(userId);
    const posts = (await getPostsByUser(userId)) as Post[];

    if (!posts) return <PostList categories={categories} initialPosts={[]} />;

    const postsArray = Object.entries(posts).map(([key, post]) => ({
        id: key,
        title: post.title,
        content: post.content,
        userId: post.userId,
        category: post.category || "",
        lastUpdated: post.lastUpdated,
        pinned: post.pinned || false,
        archived: post.archived || false,
    }));

    return (
        <PostList
            categories={categories}
            initialPosts={postsArray.filter((post) => post.archived)}
        />
    );
}
