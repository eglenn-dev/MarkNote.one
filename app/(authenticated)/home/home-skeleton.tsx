import { Search, PlusCircle, UploadCloud, PlusIcon } from "lucide-react";
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
                    <div className="hidden md:flex items-center space-x-2 text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12 22q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-4-3v-2h8v2zm.25-3q-1.725-1.025-2.738-2.75T4.5 9.5q0-3.125 2.188-5.312T12 2t5.313 2.188T19.5 9.5q0 2.025-1.012 3.75T15.75 16zm.6-2h6.3q1.125-.8 1.738-1.975T17.5 9.5q0-2.3-1.6-3.9T12 4T8.1 5.6T6.5 9.5q0 1.35.613 2.525T8.85 14M12 14"
                            ></path>
                        </svg>
                        <p>Try right clicking a card</p>
                    </div>
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
                    <Link href="/new-note" className="hidden md:block">
                        <Button>
                            <PlusCircle className="h-4 w-4" /> New
                        </Button>
                    </Link>
                    <Link href="/upload" className="hidden md:block">
                        <Button>
                            <UploadCloud className="h-4 w-4" /> Upload
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
