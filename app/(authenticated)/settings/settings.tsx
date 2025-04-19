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
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { X } from "lucide-react";

interface AccountManagementProps {
    userAccount: {
        userId: string;
        preferences: {
            mdPreview: boolean;
            menuOpen: boolean;
            categories: string[];
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
    const [categories, setCategories] = useState(
        userAccount.preferences.categories
    );
    const [newCategory, setNewCategory] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleAddCategory = () => {
        if (newCategory.trim() !== "") {
            setCategories([...categories, newCategory]);
            setNewCategory("");
        }
    };

    const handleDeleteCategory = (index: number) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    };

    const handleEditCategory = (index: number, value: string) => {
        const updatedCategories = [...categories];
        updatedCategories[index] = value;
        setCategories(updatedCategories);
    };

    const handleUpdatePreferences = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        updatePreferencesAction(
            userAccount.userId,
            mdPreview,
            menuOpen,
            categories
        );
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!email) {
            setError("Email cannot be empty!");
            setLoading(false);
            return;
        }
        const response = await updateEmailAction(userAccount.userId, email);
        if (!response) {
            setError("There was an error updating your email!");
            setLoading(false);
            return;
        } else if (response === "email already exists") {
            setError("Email is being used by another user.");
            setEmail("");
            setLoading(false);
            return;
        }
        setError("");
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
                                <Separator className="my-4" />
                                <div className="flex flex-col gap-4">
                                    <Label>Categories</Label>
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {categories.map(
                                                    (category, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1"
                                                        >
                                                            {editingIndex ===
                                                            index ? (
                                                                <Input
                                                                    value={
                                                                        category
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleEditCategory(
                                                                            index,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onBlur={() =>
                                                                        setEditingIndex(
                                                                            -1
                                                                        )
                                                                    }
                                                                    onKeyPress={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            e.key ===
                                                                            "Enter"
                                                                        ) {
                                                                            setEditingIndex(
                                                                                -1
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="w-24 h-6 p-1 text-sm"
                                                                />
                                                            ) : (
                                                                <>
                                                                    <span
                                                                        onClick={() =>
                                                                            setEditingIndex(
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            category
                                                                        }
                                                                    </span>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="ml-2 h-4 w-4 p-0"
                                                                        onClick={() =>
                                                                            handleDeleteCategory(
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <X className="h-3 w-3" />
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <div className="flex items-center mt-4">
                                                <Input
                                                    value={newCategory}
                                                    onChange={(e) =>
                                                        setNewCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="New category"
                                                    className="mr-2"
                                                />
                                                <Button
                                                    onClick={handleAddCategory}
                                                    size="sm"
                                                >
                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                    Add
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
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
                                        value={email}
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
