"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyTextProps {
    text: string;
    className?: string;
    showText?: boolean;
}

export default function CopyText({
    text,
    className,
    showText = true,
}: CopyTextProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    return (
        <div
            className={cn("relative group flex items-center gap-2", className)}
        >
            {showText && (
                <div className="w-fit break-all text-gray-200">{text}</div>
            )}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative shrink-0 text-gray-200"
                onClick={copyToClipboard}
                aria-label={copied ? "Copied!" : "Copy to clipboard"}
            >
                <div className="relative w-4 h-4">
                    <Copy
                        className={cn(
                            "w-4 h-4 transition-all",
                            copied ? "opacity-0" : "opacity-100"
                        )}
                    />
                    <Check
                        className={cn(
                            "w-4 h-4 absolute inset-0 transition-all",
                            copied ? "opacity-100" : "opacity-0"
                        )}
                    />
                </div>
            </Button>
        </div>
    );
}
