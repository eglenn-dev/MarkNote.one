import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostsByUser } from "@/models/post-model";
import { getUserCategories } from "@/models/accounts-model";
import PostList from "@/components/post-list";

interface Post {
    title: string;
    content: string;
    userId: string;
    category?: string;
    lastUpdated: string;
    pinned?: boolean;
}

export const metadata = {
    title: "Home | MarkNote.one",
    description: "View and manage all your markdown notes",
};

export default async function homePage() {
    const session = await getSession();
    if (!session) redirect("/login");
    const userId = session.user.userId;
    const categories = await getUserCategories(userId);
    const posts = (await getPostsByUser(userId)) as Post[];
    if (!posts) return <PostList categories={categories} initialPosts={[]} />;
    const postsArray = Object.entries(posts).map(([key, post]) => {
        return {
            id: key,
            title: post.title,
            content: post.content,
            userId: post.userId,
            category: post.category || "",
            lastUpdated: post.lastUpdated,
            pinned: post.pinned || false,
        };
    });

    return <PostList categories={categories} initialPosts={postsArray} />;
}
