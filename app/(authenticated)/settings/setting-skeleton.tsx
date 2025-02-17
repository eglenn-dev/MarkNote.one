import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsSkeleton() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex flex-col items-center p-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Account Settings</h2>
                    </div>
                    <Tabs defaultValue="preferences" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="preferences">
                                Preferences
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="preferences">
                            <form className="flex flex-col gap-4 mt-8">
                                <div className="flex flex-col">
                                    <Label>Default Markdown Preview</Label>
                                    <Skeleton className="h-11 w-full" />
                                </div>
                                <Separator />
                                <div className="flex flex-col">
                                    <Label>Default Menu Preference</Label>
                                    <Skeleton className="h-11 w-full" />
                                </div>
                                <Separator className="my-4" />
                                <div className="flex flex-col gap-4">
                                    <Label>Categories</Label>
                                    <Skeleton className="h-24 w-full" />
                                </div>
                                <Button
                                    type="submit"
                                    disabled
                                    className="w-full"
                                >
                                    Loading...
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
