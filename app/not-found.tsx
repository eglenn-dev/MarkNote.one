import Link from "next/link";
import HomeMdPreview from "@/components/home-md-preview";
import LandingHeader from "@/components/landing-header";

export const metadata = {
    title: "Page Not Found | MarkNote.one",
};

export default async function NotFound() {
    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <LandingHeader />
            <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <div className="text-xl mb-8">
                    <HomeMdPreview text="## **404 - Page Not Found**" />
                </div>
                <div></div>
                <Link
                    href="/"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-lg font-semibold transition-colors"
                >
                    Return Home
                </Link>
            </main>
            <footer className="p-4 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} MarkNote.one. All rights
                reserved.
            </footer>
        </div>
    );
}
