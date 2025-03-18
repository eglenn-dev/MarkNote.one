"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "./action";
import LandingHeader from "@/components/landing-header";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [gitHubLoading, setGitHubLoading] = useState(false);

    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <LandingHeader />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold">
                            Sign in to your account
                        </h2>
                    </div>
                    {error && (
                        <div className="text-center text-red-500">{error}</div>
                    )}
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setError("");
                            if (loading) return;
                            if (email === "" || password === "") {
                                setError("Please fill in all fields");
                                return;
                            }
                            setLoading(true);
                            const formData = new FormData();
                            formData.append("email", email);
                            formData.append("password", password);
                            loginAction(formData)
                                .then(() => {
                                    setLoading(false);
                                    setError("");
                                })
                                .catch((error) => {
                                    setLoading(false);
                                    setError(error.message);
                                });
                        }}
                    >
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <Label htmlFor="email-address">
                                    Email address
                                </Label>
                                <Input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Sign in"}
                            </Button>
                        </div>
                    </form>
                    <div>
                        <a href="/oauth/github" className="w-full">
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={() => setGitHubLoading(true)}
                                disabled={gitHubLoading}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={30}
                                    height={30}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                                    ></path>
                                </svg>
                                <span>
                                    {gitHubLoading
                                        ? "Loading..."
                                        : "Sign in with GitHub"}
                                </span>
                            </Button>
                        </a>
                    </div>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Not a member?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-primary hover:text-primary/80"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
