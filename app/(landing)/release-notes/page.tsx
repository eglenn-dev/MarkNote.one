import LandingHeader from "@/components/landing-header";

export const metadata = {
    title: "Release Notes | MarkNote.one",
    description: "Update release notes for MarkNote.one",
};

type Release = {
    version: string;
    date: string;
    changes: string[];
};

const releases: Release[] = [
    {
        version: "1.5.1",
        date: "2025-02-21",
        changes: ["Minor bug fixes and performance improvements."],
    },
    {
        version: "1.5.0",
        date: "2025-02-20",
        changes: [
            "Created a demo page for users to try out MarkNote.one.",
            "Demo page includes a live markdown editor with preview, and upload and download buttons.",
            "Demo page can now be accessed from the landing page.",
        ],
    },
    {
        version: "1.4.6",
        date: "2025-02-18",
        changes: [
            "Updated GitHub OAuth to add GitHub account email to account.",
            "Added skeleton loaders to improve navigation speed and responsiveness.",
        ],
    },
    {
        version: "1.4.5",
        date: "2025-02-14",
        changes: [
            "Created a feedback page for users to make feature requests and report bugs.",
            "Added an about page with information about the developers.",
            "Minor component and UI improvements.",
        ],
    },
    {
        version: "1.4.0",
        date: "2025-02-11",
        changes: [
            "Updated note editor with drop down menus for more settings.",
            "Added a full screen mode rendered for the note editor.",
            "Refactored the note editor to use a more modular design.",
        ],
    },
    {
        version: "1.3.0",
        date: "2025-02-03",
        changes: [
            "Notes can note be categorized by tags.",
            "Added ability to pin notes to the top of the list.",
            "Tags can be created and deleted in settings.",
            "Home page context menu can now edit categories and pinned notes.",
            "Tips and tricks now has markdown shortcuts.",
        ],
    },
    {
        version: "1.2.0",
        date: "2025-01-25",
        changes: [
            "Added sidebar file list for easier navigation between notes.",
            "Implemented file selection and editing functionality.",
            "Added docs popup with list of available shortcuts.",
            "Added release notes page to track changes.",
        ],
    },
    {
        version: "1.1.1",
        date: "2025-01-16",
        changes: [
            "Added page for uploading new .md files that are converted into MarkNote.",
            "Added a download button that saves notes to a local .md file.",
        ],
    },
    {
        version: "1.1.0",
        date: "2025-01-15",
        changes: [
            "Added GitHub as an authentication provider.",
            "Implemented account management page.",
            "Improved responsive design for mobile devices.",
            "Added keyboard shortcuts for common actions.",
        ],
    },
    {
        version: "1.0.0",
        date: "2025-01-11",
        changes: [
            "Initial release of MarkNote.one.",
            "Autosave turned on for all notes.",
            "Basic Markdown editing and preview functionality.",
            "User authentication (login and signup).",
        ],
    },
];

export default function ReleaseNotes() {
    return (
        <div className="container mx-auto min-h-screen p-4 flex flex-col">
            <LandingHeader />
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
                    &copy; {new Date().getFullYear()} MarkNote.one. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
