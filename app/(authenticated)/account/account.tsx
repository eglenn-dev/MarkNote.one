"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEmailAction, updatePasswordAction } from "./action";

interface AccountManagementProps {
    userId: string;
    userEmail?: string;
    isOauth?: boolean;
}

export default function AccountManagement({
    userId,
    userEmail,
    isOauth,
}: AccountManagementProps) {
    const [email, setEmail] = useState(userEmail || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!email) {
            setError("Email cannot be empty!");
            setLoading(false);
            return;
        }
        updateEmailAction(userId, email);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (newPassword !== confirmNewPassword) {
            setError("New passwords don't match!");
            setLoading(false);
            return;
        }
        if (!currentPassword && !isOauth) {
            setError("Current password cannot be empty!");
            setLoading(false);
            return;
        }
        updatePasswordAction(
            userId,
            currentPassword,
            newPassword,
            confirmNewPassword
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex flex-col items-center p-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">
                            Account Management
                        </h2>
                    </div>
                    {error && (
                        <div>
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={handleUpdateEmail}
                    >
                        <div>
                            <Label htmlFor="email">New Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Email"}
                        </Button>
                    </form>
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={handleUpdatePassword}
                    >
                        <div>
                            <Label htmlFor="current-password">
                                Current Password
                            </Label>
                            <Input
                                id="current-password"
                                name="current-password"
                                type="password"
                                autoComplete="current-password"
                                required={!isOauth}
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                                id="new-password"
                                name="new-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirm-new-password">
                                Confirm New Password
                            </Label>
                            <Input
                                id="confirm-new-password"
                                name="confirm-new-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmNewPassword}
                                onChange={(e) =>
                                    setConfirmNewPassword(e.target.value)
                                }
                                className="mt-1"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
