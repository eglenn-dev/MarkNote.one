import { Button } from "./ui/button";

interface DownloadButtonProps {
    children: React.ReactNode;
    note: {
        title: string;
        content: string;
    };
    variant?:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined;
    classname?: string;
}

export default function DownloadButton({
    children,
    note,
    variant,
    classname,
}: DownloadButtonProps) {
    if (note.title === "" || note.content === "") {
        return (
            <Button className={classname} variant={variant} disabled={true}>
                {children}
            </Button>
        );
    }

    return (
        <Button
            className={classname}
            variant={variant}
            onClick={() => {
                const blob = new Blob([note?.content], {
                    type: "text/markdown",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${note?.title}.md`;
                a.click();
                URL.revokeObjectURL(url);
            }}
        >
            {children}
        </Button>
    );
}
