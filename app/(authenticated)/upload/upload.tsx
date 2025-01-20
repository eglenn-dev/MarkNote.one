"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPostAction } from "./action";

interface UploadProps {
    userId: string;
}

export default function Upload({ userId }: UploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const content = e.target?.result;
            if (typeof content === "string" && file.name.includes(".md")) {
                const post = {
                    title: file.name,
                    content,
                    userId: userId,
                    lastUpdated: new Date().toISOString(),
                };
                const response = await createPostAction(post);
                if (response) {
                    router.push(`/note/${response}`);
                } else {
                    router.push("/home");
                }
            } else {
                setLoading(false);
                setError("Invalid file format. Please upload a Markdown file.");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex-grow flex flex-col items-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Upload Markdown File</h2>
                </div>
                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleUpload}>
                    <div>
                        <Label htmlFor="file-upload">
                            Choose a Markdown file
                        </Label>
                        <Input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept=".md"
                            onChange={handleFileChange}
                            className="mt-1"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!file || loading}
                    >
                        {loading ? "Uploading..." : "Upload and Edit"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
