"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserGrowthChart from "./components/user-growth-chart";
import UserTable from "./components/user-table";

interface CleanUser {
    id: string;
    name: string;
    role: string;
    joinDate: string;
    oauth: boolean;
}

interface CleanNote {
    creationDate: string;
    viewDate: string;
}

interface AdminDashboardProps {
    users: CleanUser[];
    notes: CleanNote[];
}

export default function AdminDashboard({ users, notes }: AdminDashboardProps) {
    const viewedNotes = notes.filter((note) => note.viewDate !== "");
    const unviewedNotes = notes.filter((note) => note.viewDate === "");
    const totalNotes = notes.length;

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Manage users and monitor platform growth.
                </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Growth</CardTitle>
                            <CardDescription>
                                New user signups over the last 90 days
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <UserGrowthChart users={users} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>
                                View and manage all users on the platform
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserTable users={users} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notes" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Note Statistics</CardTitle>
                            <CardDescription>
                                Statistics about temp notes and their usage
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Total Notes:</span>
                                    <span>{totalNotes}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Viewed Notes:</span>
                                    <span>{viewedNotes.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Unviewed Notes:</span>
                                    <span>{unviewedNotes.length}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
