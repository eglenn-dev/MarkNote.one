"use client";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarShortcut,
} from "@/components/ui/menubar";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import DownloadButton from "./download-button";
import NoteCategory from "./note-category";
import { redirect } from "next/navigation";

interface NoteMenuBarProps {
    saveStatus: string;
    showPreview: boolean;
    setShowPreview: (show: boolean) => void;
    fullPreview: boolean;
    setFullPreview: (show: boolean) => void;
    noteTitle: string;
    note: string;
    category: string;
    categoriesList: string[];
    setCategory: (category: string) => void;
    saveNote: () => void;
}

export function NoteMenuBar({
    saveStatus,
    showPreview,
    setShowPreview,
    fullPreview,
    setFullPreview,
    noteTitle,
    note,
    category,
    categoriesList,
    setCategory,
    saveNote,
}: NoteMenuBarProps) {
    return (
        <Menubar className="mb-4">
            <MenubarMenu>
                <MenubarTrigger className="text-sm">File</MenubarTrigger>
                <MenubarContent className="border border-gray-500">
                    <MenubarItem
                        asChild
                        onClick={async () => {
                            await saveNote();
                            redirect("/new-note");
                        }}
                    >
                        <Button
                            className="w-full justify-between"
                            variant="ghost"
                        >
                            New Note
                            <MenubarShortcut>Alt + N</MenubarShortcut>
                        </Button>
                    </MenubarItem>
                    <MenubarItem
                        asChild
                        onClick={async () => {
                            await saveNote();
                            redirect("/upload");
                        }}
                    >
                        <Button
                            className="w-full justify-between"
                            variant="ghost"
                        >
                            Upload Note
                            <MenubarShortcut>Alt + U</MenubarShortcut>
                        </Button>
                    </MenubarItem>
                    <MenubarItem asChild onClick={saveNote}>
                        <Button
                            className="w-full justify-between"
                            variant="ghost"
                        >
                            Save
                            <MenubarShortcut>Ctrl + S</MenubarShortcut>{" "}
                        </Button>
                    </MenubarItem>
                    <MenubarItem asChild>
                        <DownloadButton
                            classname="w-full flex justify-between px-2"
                            variant="ghost"
                            note={{ title: noteTitle, content: note }}
                        >
                            Download
                            <MenubarShortcut>Alt + D</MenubarShortcut>
                        </DownloadButton>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="text-sm">Edit</MenubarTrigger>
                <MenubarContent className="border border-gray-500">
                    <MenubarItem className="py-0 mx-auto">
                        <Button
                            asChild
                            variant="ghost"
                            className="w-fit p-0 justify-between"
                        >
                            <NoteCategory
                                category={category}
                                categoriesList={categoriesList}
                                setCategory={setCategory}
                            />
                        </Button>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="text-sm">View</MenubarTrigger>
                <MenubarContent className="border border-gray-500">
                    <MenubarItem
                        asChild
                        onClick={() => {
                            setShowPreview(!showPreview);
                            setFullPreview(false);
                        }}
                    >
                        <Button
                            variant="ghost"
                            className="w-full justify-between"
                        >
                            {showPreview ? (
                                <p>Hide Preview</p>
                            ) : (
                                <p>Show Preview</p>
                            )}
                            <MenubarShortcut>Alt + P</MenubarShortcut>
                        </Button>
                    </MenubarItem>
                    <MenubarItem
                        asChild
                        onClick={() => {
                            setFullPreview(!fullPreview);
                            setShowPreview(false);
                        }}
                    >
                        <Button
                            variant="ghost"
                            className="w-full justify-between"
                        >
                            {fullPreview ? (
                                <p>Exit Full Preview</p>
                            ) : (
                                <p>Full Preview</p>
                            )}
                            <MenubarShortcut>Alt + F</MenubarShortcut>
                        </Button>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            {category && (
                <MenubarMenu>
                    <Badge className="hidden sm:block">{category}</Badge>
                </MenubarMenu>
            )}
            <MenubarMenu>
                <div className="flex flex-row items-center justify-between select-none">
                    <div className="flex items-center justify-end ml-2">
                        {saveStatus === "unsaved" && (
                            <span className="text-yellow-500">
                                Unsaved changes
                            </span>
                        )}
                        {saveStatus === "saving" && (
                            <span className="text-blue-500 flex items-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </span>
                        )}
                        {saveStatus === "saved" && (
                            <span className="text-green-500 flex items-center">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Changes saved
                            </span>
                        )}
                        {saveStatus === "error" && (
                            <span className="text-red-500 flex items-center">
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Error saving changes
                            </span>
                        )}
                    </div>
                </div>
            </MenubarMenu>
        </Menubar>
    );
}
