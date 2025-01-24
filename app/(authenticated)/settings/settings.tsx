"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    updateEmailAction,
    updatePasswordAction,
    updateUsernameAction,
    updatePreferencesAction,
} from "./action";

interface AccountManagementProps {
    userAccount: {
        userId: string;
        preferences: {
            mdPreview: boolean;
            menuOpen: boolean;
        };
        username?: string;
        userEmail?: string;
        isOauth?: boolean;
    };
}

export default function Settings({ userAccount }: AccountManagementProps) {
    const [email, setEmail] = useState(userAccount.userEmail || "");
    const [username, setUsername] = useState(userAccount.username || "");
    const [mdPreview, setMdPreview] = useState(
        userAccount.preferences.mdPreview
    );
    const [menuOpen, setMenuOpen] = useState(userAccount.preferences.menuOpen);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdatePreferences = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        updatePreferencesAction(userAccount.userId, mdPreview, menuOpen);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!email) {
            setError("Email cannot be empty!");
            setLoading(false);
            return;
        }
        updateEmailAction(userAccount.userId, email);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleUpdateUsername = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!username) {
            setError("Username cannot be empty!");
            setLoading(false);
            return;
        }
        updateUsernameAction(userAccount.userId, username);
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
        if (!currentPassword && !userAccount.isOauth) {
            setError("Current password cannot be empty!");
            setLoading(false);
            return;
        }
        updatePasswordAction(
            userAccount.userId,
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
                        <h2 className="text-3xl font-bold">Account Settings</h2>
                    </div>
                    {error && (
                        <div>
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}
                    <Tabs defaultValue="preferences" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="preferences">
                                Preferences
                            </TabsTrigger>
                            <TabsTrigger value="email">Email</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="preferences">
                            <form
                                className="flex flex-col gap-4 mt-8"
                                onSubmit={handleUpdatePreferences}
                            >
                                <div className="flex flex-col">
                                    <Label>Default Markdown Preview</Label>
                                    <Select
                                        onValueChange={(e) => {
                                            setMdPreview(e === "true");
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder={
                                                    mdPreview
                                                        ? "Show Preview"
                                                        : "Hide Preview"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Default MarkDown Preview
                                                </SelectLabel>
                                                <SelectItem value="true">
                                                    Show Preview
                                                </SelectItem>
                                                <SelectItem value="false">
                                                    Hide Preview
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator />
                                <div className="flex flex-col">
                                    <Label>Default Menu Preference</Label>
                                    <Select
                                        onValueChange={(e) => {
                                            setMenuOpen(e === "true");
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder={
                                                    menuOpen
                                                        ? "Show Menu"
                                                        : "Hide Menu"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Default Menu Preference
                                                </SelectLabel>
                                                <SelectItem value="true">
                                                    Show Menu
                                                </SelectItem>
                                                <SelectItem value="false">
                                                    Hide Menu
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full"
                                >
                                    {loading
                                        ? "Updating..."
                                        : "Update Preferences"}
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="email">
                            <form
                                className="space-y-6"
                                onSubmit={handleUpdateEmail}
                            >
                                <div>
                                    <Label htmlFor="email">
                                        New Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
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
                                className="mt-6 space-y-6"
                                onSubmit={handleUpdateUsername}
                            >
                                <div>
                                    <Label htmlFor="username">
                                        New Username
                                    </Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        spellCheck="false"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        value={username}
                                        className="mt-1"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Updating..."
                                        : "Update Username"}
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="password">
                            <form
                                className="space-y-6"
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
                                        required={!userAccount.isOauth}
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="new-password">
                                        New Password
                                    </Label>
                                    <Input
                                        id="new-password"
                                        name="new-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
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
                                            setConfirmNewPassword(
                                                e.target.value
                                            )
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Updating..."
                                        : "Update Password"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
