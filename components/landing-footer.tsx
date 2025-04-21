import Link from "next/link";

export default function LandingFooter() {
    return (
        <footer className="p-4 text-center text-sm text-muted-foreground">
            <p>
                &copy; {new Date().getFullYear()} MarkNote.one. All rights
                reserved.
            </p>
            <Link href="/privacy-policy" className="underline">
                Privacy Policy
            </Link>
        </footer>
    );
}
