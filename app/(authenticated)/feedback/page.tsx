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
import Link from "next/link";

export default async function FeedbackPage() {
    const session = await getSession();

    if (!session?.user) {
        return (
            <div className="container max-w-md mx-auto h-full flex items-center justify-center">
                <Card className="w-full">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">
                            Feedback
                        </CardTitle>
                        <CardDescription>
                            You must be signed in to leave feedback.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Link href="/login">
                            <Button className="w-full">Sign in</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

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
                    <form className="flex flex-col gap-4">
                        <Label htmlFor="type">Type</Label>
                        <Select>
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
                            id="feedback"
                            name="feedback"
                            type="text"
                            className="w-full"
                            required
                        />
                        <div className="mt-4">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
