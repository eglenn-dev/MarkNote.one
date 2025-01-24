"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import { signup } from "./action";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    }, [password, confirmPassword]);

    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <header className="p-4 flex justify-between items-center">
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
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold">
                            Create your account
                        </h2>
                    </div>
                    {error && (
                        <div>
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}
                    <form className="mt-8 space-y-6" action={signup}>
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1"
                                />
                            </div>
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
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirm-password">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full">
                                Sign up
                            </Button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-primary hover:text-primary/80"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
