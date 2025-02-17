import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function NoteEditorSkeleton() {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="mb-4">
                <Skeleton className="w-full h-6" />
            </div>
            <div className="flex items-center gap-2 mb-4">
                <Button variant="ghost" disabled>
                    File
                </Button>
                <Button variant="ghost" disabled>
                    Edit
                </Button>
                <Button variant="ghost" disabled>
                    View
                </Button>
            </div>
            <div>
                <Skeleton className="w-full h-[500px]" />
            </div>
        </div>
    );
}

export function NoteSidebarSkeleton() {
    return (
        <div>
            <div>
                <div className="flex items-center p-2 gap-2">
                    <OpenedMenu size={30} />
                    <h3 className="transition-opacity duration-300 text-lg font-bold text-center opacity-100">
                        Files
                    </h3>
                </div>
            </div>
            <div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center w-full gap-2 p-2 duration-300 border-b cursor-pointer hover:bg-secondary"
                    >
                        <div className="w-3 h-3 bg-secondary" />
                        <div className="w-full">
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OpenedMenu({ size = 24 }: { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M3 18v-2h13v2zm16.6-1l-5-5l5-5L21 8.4L17.4 12l3.6 3.6zM3 13v-2h10v2zm0-5V6h13v2z"
            ></path>
        </svg>
    );
}
