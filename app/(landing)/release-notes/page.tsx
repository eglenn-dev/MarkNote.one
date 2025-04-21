import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import { releaseNotes } from "@/release-notes";

export const metadata = {
    title: "Release Notes | MarkNote.one",
    description: "Update release notes for MarkNote.one",
};

export default function ReleaseNotes() {
    return (
        <div className="container mx-auto min-h-screen p-4 flex flex-col">
            <LandingHeader />
            <main className="flex-grow pl-4 pr-4 md:pl-0 md:pr-0 md:w-1/2 mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Release Notes
                </h1>
                <div className="space-y-8">
                    {releaseNotes.map((release) => (
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
            <LandingFooter />
        </div>
    );
}
