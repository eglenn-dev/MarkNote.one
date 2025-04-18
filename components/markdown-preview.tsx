import ReactMarkdown from "react-markdown";

interface MarkdownPreviewProps {
    content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
    return (
        <ReactMarkdown
            className="prose dark:prose-invert max-w-none overflow-x-auto h-fit leading-7"
            components={{
                h1: ({ ...props }) => (
                    <h1
                        className="text-3xl font-bold my-4 mt-6 p-2 border-b"
                        {...props}
                    />
                ),
                h2: ({ ...props }) => (
                    <h2 className="text-2xl font-bold my-3 mt-6" {...props} />
                ),
                h3: ({ ...props }) => (
                    <h3 className="text-xl font-bold my-2 mt-6" {...props} />
                ),
                h4: ({ ...props }) => (
                    <h4 className="text-lg font-bold my-2 mt-4" {...props} />
                ),
                h5: ({ ...props }) => (
                    <h5 className="text-base font-bold my-1" {...props} />
                ),
                h6: ({ ...props }) => (
                    <h6 className="text-sm font-bold my-1" {...props} />
                ),
                p: ({ ...props }) => <p className="my-2 mb-6" {...props} />,
                ul: ({ ...props }) => (
                    <ul className="list-disc my-2 pl-5" {...props} />
                ),
                ol: ({ ...props }) => (
                    <ol className="list-decimal my-2 pl-5" {...props} />
                ),
                li: ({ ...props }) => <li className="my-1 mb-2" {...props} />,
                a: ({ ...props }) => (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
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
                code: ({ ...props }) => (
                    <code
                        className="bg-gray-100 dark:bg-gray-900 rounded px-1 py-0.5"
                        {...props}
                    />
                ),
                pre: ({ children }) => (
                    <pre className="overflow-x-auto text-gray-800 dark:text-gray-200 p-4 my-5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 mb-4">
                        {children}
                    </pre>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
