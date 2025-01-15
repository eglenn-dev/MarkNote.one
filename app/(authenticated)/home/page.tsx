import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostsByUser } from "@/models/post-model";
import PostList from "@/components/post-list";

interface Post {
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

export const metadata = {
    title: "Home | MarkNote.one",
    description: "View and manage all your markdown notes",
};

export default async function homePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const userId = session.user.userId;
    const posts = (await getPostsByUser(userId)) as Post[];
    const postsArray = Object.entries(posts).map(([key, post]) => {
        return {
            id: key,
            title: post.title,
            content: post.content,
            userId: post.userId,
            lastUpdated: post.lastUpdated,
        };
    });

    return <PostList initialPosts={postsArray} />;
}
