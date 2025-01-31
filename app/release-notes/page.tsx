import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
    title: "Release Notes | MarkNote.one",
    description: "Release notes for MarkNote.one",
};

type Release = {
    version: string;
    date: string;
    changes: string[];
};

const releases: Release[] = [
    {
        version: "1.2.1",
        date: "2025-01-31",
        changes: [
            "Notes can note be categorized by tags",
            "Added ability to pin notes to the top of the list",
            "Tags can be added and removed in settings",
            "Home page context menu can now edit categories and pinned notes",
        ],
    },
    {
        version: "1.2.0",
        date: "2025-01-25",
        changes: [
            "Added sidebar file list for easier navigation between notes",
            "Implemented file selection and editing functionality",
            "Added docs popup with list of available shortcuts",
            "Added release notes page to track changes",
        ],
    },
    {
        version: "1.1.1",
        date: "2025-01-16",
        changes: [
            "Added page for uploading new .md files that are converted into MarkNote",
            "Added a download button that saves notes to a local .md file",
        ],
    },
    {
        version: "1.1.0",
        date: "2025-01-15",
        changes: [
            "Added GitHub as an authentication provider",
            "Implemented account management page",
            "Improved responsive design for mobile devices",
            "Added keyboard shortcuts for common actions",
        ],
    },
    {
        version: "1.0.0",
        date: "2025-01-11",
        changes: [
            "Initial release of MarkNote.one",
            "Autosave turned on for all notes",
            "Basic Markdown editing and preview functionality",
            "User authentication (login and signup)",
        ],
    },
];

export default function ReleaseNotes() {
    return (
        <div className="container mx-auto min-h-screen p-4 flex flex-col">
            <header className="flex justify-between items-center mb-8">
                <Link
                    href="/"
                    className="text-2xl font-bold flex items-center space-x-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="m5.41 21l.71-4h-4l.35-2h4l1.06-6h-4l.35-2h4l.71-4h2l-.71 4h6l.71-4h2l-.71 4h4l-.35 2h-4l-1.06 6h4l-.35 2h-4l-.71 4h-2l.71-4h-6l-.71 4zM9.53 9l-1.06 6h6l1.06-6z"
                        ></path>
                    </svg>
                    MarkNote.one
                </Link>
                <ThemeToggle />
            </header>
            <main className="flex-grow pl-4 pr-4 md:pl-0 md:pr-0 md:w-1/2 mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Release Notes
                </h1>
                <div className="space-y-8">
                    {releases.map((release) => (
                        <div key={release.version} className="border-b pb-6">
                            <h2 className="text-2xl font-semibold mb-2">
                                Version {release.version}{" "}
                                <span className="text-sm font-normal text-muted-foreground">
                                    ({release.date})
                                </span>
                            </h2>
                            <ul className="list-disc list-inside space-y-2">
                                {release.changes.map((change, index) => (
                                    <li key={index}>{change}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="mt-8 text-center text-sm text-muted-foreground">
                <p>
                    &copy; {new Date().getFullYear()} MarkNote. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
