import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Trash2 } from "lucide-react";
import Link from "next/link";

export default function TempNotesLanding() {
    return (
        <div className="min-h-screen">
            <section className="container px-4 py-16 mx-auto text-center lg:py-24">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Secure Temporary Notes
                </h1>
                <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
                    Create self-destructing notes that automatically disappear
                    after they&apos;re read or after a set time. Perfect for
                    sharing sensitive information securely.
                </p>
                <div className="flex flex-col gap-4 mt-10 sm:flex-row justify-center">
                    <Link href="/create">
                        <Button size="lg" className="text-lg px-8">
                            Create Temporary Note
                        </Button>
                    </Link>
                </div>
            </section>
            <section className="container px-4 py-2 mx-auto">
                <div className="flex flex-col sm:flex-row gap-8 lg:flex-row lg:gap-16 items-center justify-center">
                    <Card className="relative overflow-hidden w-96">
                        <CardContent className="pt-6">
                            <div className="mb-4 text-primary">
                                <Lock className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                One-Time Access
                            </h3>
                            <p className="text-muted-foreground">
                                Notes automatically delete after being read
                                once, ensuring information stays private.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden w-96">
                        <CardContent className="pt-6">
                            <div className="mb-4 text-primary">
                                <Trash2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Secure Deletion
                            </h3>
                            <p className="text-muted-foreground">
                                Notes are permanently erased from our servers
                                after being viewed.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="container px-4 py-16 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                    How It Works
                </h2>
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                            1
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">
                                Create Your Note
                            </h3>
                            <p className="text-muted-foreground">
                                Enter your markdown supported note and generate
                                a secure one time link to view that note.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                            2
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">
                                Share the Link
                            </h3>
                            <p className="text-muted-foreground">
                                Send the secure link to your recipient through
                                any messaging platform or email.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                            3
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">
                                Automatic Deletion
                            </h3>
                            <p className="text-muted-foreground">
                                Once the note is viewed, it is automatically
                                deleted from our servers, ensuring privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container px-4 py-16 mx-auto text-center">
                <Card className="max-w-3xl mx-auto">
                    <CardContent className="py-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Share Securely?
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Create your first temporary note now. No account
                            required.
                        </p>
                        <Link href="/temp-notes/create">
                            <Button size="lg" className="text-lg px-8">
                                Create Your First Note
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>
            <footer className="p-4 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} MarkNote.one. All rights
                reserved.
            </footer>
        </div>
    );
}
