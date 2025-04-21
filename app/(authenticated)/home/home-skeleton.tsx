import {
    Search,
    PlusCircle,
    UploadCloud,
    PlusIcon,
    Archive,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function HomeSkeleton() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div className="relative w-full sm:max-w-sm">
                    <Input
                        type="text"
                        placeholder="Search by category, title, or note content..."
                        className="pl-10"
                        disabled
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center border rounded-md overflow-hidden mr-2">
                        <Button size="sm" className="px-2 rounded-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-grid-2x2"
                            >
                                <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="2"
                                />
                                <path d="M3 12h18" />
                                <path d="M12 3v18" />
                            </svg>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="px-2 rounded-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-list"
                            >
                                <line x1="8" x2="21" y1="6" y2="6" />
                                <line x1="8" x2="21" y1="12" y2="12" />
                                <line x1="8" x2="21" y1="18" y2="18" />
                                <line x1="3" x2="3.01" y1="6" y2="6" />
                                <line x1="3" x2="3.01" y1="12" y2="12" />
                                <line x1="3" x2="3.01" y1="18" y2="18" />
                            </svg>
                        </Button>
                    </div>
                    <Link href="/home/archive" className="hidden md:block">
                        <Button variant="outline">
                            <Archive className="h-4 w-4" />
                            Archive
                        </Button>
                    </Link>
                    <Link href="/upload" className="hidden md:block">
                        <Button variant="outline">
                            <UploadCloud className="h-4 w-4" />
                            Upload
                        </Button>
                    </Link>
                    <Link href="/new-note" className="hidden md:block">
                        <Button>
                            <PlusCircle className="h-4 w-4" />
                            New
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card
                        key={item}
                        className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
                    >
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg truncate flex flex-row justify-between items-center">
                                <Skeleton className="h-8 w-[300px]" />
                            </CardTitle>
                            <CardDescription className="text-sm flex flex-row gap-2 items-center">
                                <Skeleton className="h-4 w-[250px]" />
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-[250px]" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Link
                href="/new-note"
                className="md:hidden fixed bottom-10 right-4 m-6 h-12 w-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
                <PlusIcon width={24} height={24} className="h-8 w-8" />
            </Link>
        </div>
    );
}
