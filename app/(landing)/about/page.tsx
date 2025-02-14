import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import { GithubIcon, GlobeIcon } from "@/components/icons";
import LandingHeader from "@/components/landing-header";

export const metadata = {
    title: "About | MarkNote.one",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4">
            <LandingHeader />
            <div className=" max-w-4xl mx-auto py-12">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    About Our MarkNote.one
                </h1>

                <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                About Us
                            </CardTitle>
                            <CardDescription>
                                Learn more about our developers and our mission.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                <a
                                    href="https://eglenn.dev"
                                    target="_blank"
                                    className="underline underline-offset-4"
                                >
                                    Ethan Glenn
                                </a>{" "}
                                is a full-stack developer and the creator of
                                MarkNote.one. With a passion for building
                                innovative web applications, Ethan has a keen
                                interest in AI and its potential to transform
                                the way we interact with technology. When
                                he&#39;s not coding, you can find him playing
                                pickleball or exploring the outdoors.
                            </p>
                            <p className="text-muted-foreground mb-4">
                                Founded in 2025, MarkNote.one is the brainchild
                                of Ethan, who envisioned a platform that would
                                revolutionize the way people take notes. With a
                                background in full-stack development, Ethan set
                                out to create a tool that was not only powerful
                                but also incredibly easy to use.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Contact Us
                            </CardTitle>
                            <CardDescription>
                                Get in touch with our team
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5" />
                                <a
                                    href="mailto:info@marknote.one"
                                    target="_blank"
                                    className="text-primary hover:underline"
                                >
                                    info@marknote.one
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <GithubIcon />
                                <a
                                    href="https://github.com/eglenn-dev/marknote.one"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    github.com/eglenn-dev/marknote.one
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <GlobeIcon />
                                <a href="https://eglenn.dev" target="_blank">
                                    About Ethan (eglenn.dev)
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
