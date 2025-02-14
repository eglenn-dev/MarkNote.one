import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FeedbackThanks() {
    const session = await getSession();
    if (!session?.user) redirect("/");

    return (
        <div className="container max-w-2xl mx-auto py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">
                Thank you for your feedback!
            </h1>
            <p className="text-gray-400 text-lg mb-4">
                We appreciate you taking the time to help us improve our
                product.
            </p>
            <Link href="/home">
                <Button>Return Home</Button>
            </Link>
        </div>
    );
}
