"use client";
import { Button } from "@/components/ui/button";
import { deleteFeedbackAction } from "./action";

interface DeleteFeedbackButtonProps {
    feedbackKey: string;
}

export default function DeleteFeedbackButton({
    feedbackKey,
}: DeleteFeedbackButtonProps) {
    if (feedbackKey === undefined || feedbackKey === "") return <></>;

    return (
        <Button
            variant="secondary"
            className="text-red-500 dark:text-red-400"
            onClick={async () => {
                await deleteFeedbackAction(feedbackKey);
                window.location.reload();
            }}
        >
            Delete
        </Button>
    );
}
