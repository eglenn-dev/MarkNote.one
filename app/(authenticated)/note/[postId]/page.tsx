import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostByKey } from "@/models/post-model";
import Note from "@/components/note";

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

    return (
        <Note
            userId={session.user.userId}
            postKey={(await params).postId}
            post={post}
        />
    );
}
