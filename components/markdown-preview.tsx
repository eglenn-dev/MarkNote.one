import ReactMarkdown from "react-markdown";

interface MarkdownPreviewProps {
    content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
    return (
        <ReactMarkdown
            className="overflow-x-auto h-fit overflow-y-hidden leading-7 flex flex-col gap-1"
            components={{
                h1: ({ ...props }) => (
                    <h1
                        className="text-3xl font-bold my-4 p-2 border-b"
                        {...props}
                    />
                ),
                h2: ({ ...props }) => (
                    <h2 className="text-2xl font-bold my-3" {...props} />
                ),
                h3: ({ ...props }) => (
                    <h3 className="text-xl font-bold my-2" {...props} />
                ),
                h4: ({ ...props }) => (
                    <h4 className="text-lg font-bold my-2" {...props} />
                ),
                h5: ({ ...props }) => (
                    <h5 className="text-base font-bold my-1" {...props} />
                ),
                h6: ({ ...props }) => (
                    <h6 className="text-sm font-bold my-1" {...props} />
                ),
                p: ({ ...props }) => <p className="my-2" {...props} />,
                ul: ({ ...props }) => (
                    <ul className="list-disc my-2" {...props} />
                ),
                ol: ({ ...props }) => (
                    <ol className="list-decimal my-2" {...props} />
                ),
                li: ({ ...props }) => <li className="ml-6" {...props} />,
                a: ({ ...props }) => (
                    <a
                        className="text-blue-500 dark:text-blue-400 hover:underline"
                        {...props}
                    />
                ),
                blockquote: ({ ...props }) => (
                    <blockquote
                        className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-2"
                        {...props}
                    />
                ),
                code: ({
                    inline,
                    ...props
                }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) =>
                    inline ? (
                        <code
                            className="bg-gray-100 dark:bg-gray-700 rounded px-1"
                            {...props}
                        />
                    ) : (
                        <code
                            className="bg-gray-100 dark:bg-gray-700 rounded p-2 my-2 whitespace-pre-wrap"
                            {...props}
                        />
                    ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
