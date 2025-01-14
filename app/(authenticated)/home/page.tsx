import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getPostsByUser } from "@/models/post-model";
import Link from "next/link";

interface Post {
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

export default async function homePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const userId = session.user.userId;
    const posts = (await getPostsByUser(userId)) as Record<string, Post>;

    return (
        <div>
            <ul>
                {posts &&
                    Object.entries(posts).map(([key, post]) => (
                        <li key={key}>
                            <Link href={`/note/${key}`}>
                                <p>{post.title}</p>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
