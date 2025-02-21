import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { submitFeedbackAction } from "./action";
import { getFeedback } from "@/models/feedback-model";
import { redirect } from "next/navigation";
import DeleteFeedbackButton from "./delete-feedback-button";

interface Feedback {
    key: string;
    type: string;
    content: string;
    userId: string;
}

export const metadata = {
    title: "Feedback | MarkNote.one",
};

export default async function FeedbackPage() {
    const session = await getSession();
    if (!session?.user) redirect("/");
    const feedbackList =
        session.user.role === "admin"
            ? ((await getFeedback()) as Feedback[])
            : [];
    return (
        <div className="container max-w-2xl mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                        Feedback
                    </CardTitle>
                    <CardDescription>
                        We value your input. Please share your thoughts with us.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={submitFeedbackAction}
                        className="flex flex-col gap-4"
                    >
                        <Label htmlFor="type">Type</Label>
                        <Select name="type">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">
                                    General Feedback
                                </SelectItem>
                                <SelectItem value="feature">
                                    Feature Request
                                </SelectItem>
                                <SelectItem value="bug">Bug</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="feedback">Feedback</Label>
                        <Input
                            id="content"
                            name="content"
                            type="text"
                            className="w-full border-white h-[44px]"
                            required
                        />
                        <div className="mt-4">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            {session.user.role === "admin" && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Feedback List</h2>
                    {feedbackList.length > 0 ? (
                        <ul className="space-y-4">
                            {feedbackList.map((feedback) => (
                                <li
                                    key={feedback.key}
                                    className="p-4 border border-gray-800 rounded-md flex flex-row justify-between"
                                >
                                    <div>
                                        <p className="text-lg font-semibold">
                                            {feedback.type
                                                .charAt(0)
                                                .toUpperCase() +
                                                feedback.type.slice(1)}
                                        </p>
                                        <p>{feedback.content}</p>
                                    </div>
                                    <DeleteFeedbackButton
                                        feedbackKey={feedback.key}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No feedback available.</p>
                    )}
                </div>
            )}
        </div>
    );
}
