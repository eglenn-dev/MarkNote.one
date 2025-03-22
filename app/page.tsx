import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import HomeMdPreview from "@/components/home-md-preview";
import LandingHeader from "@/components/landing-header";

export default async function LandingPage() {
    const session = await getSession();
    if (session) redirect("/home");

    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <LandingHeader />
            <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-4xl font-bold mb-4 flex items-center">
                    Welcome to MarkNote.one
                </h2>
                <div className="text-xl mb-8">
                    <HomeMdPreview text="A _powerful_ markdown **note-taking** app with [live]() `previews`" />
                </div>
                <div className="flex flex-col items-center gap-6 w-full max-w-md">
                    <Link
                        href="/login"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center"
                    >
                        <span>Start Taking Notes</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                    <div className="flex flex-row gap-4 w-full">
                        <Link
                            href="/demo"
                            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 border border-secondary/20 hover:border-secondary flex items-center justify-center"
                        >
                            <span>Try It Out</span>
                        </Link>
                        <a
                            href={`https://temp.${process.env.BASE_DOMAIN}`}
                            className="flex-1 bg-background text-foreground hover:bg-accent px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 border border-border hover:border-primary/50 flex items-center justify-center"
                        >
                            <span>Temp Notes</span>
                        </a>
                    </div>
                </div>
            </main>
            <footer className="p-4 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} MarkNote.one. All rights
                reserved.
            </footer>
        </div>
    );
}
