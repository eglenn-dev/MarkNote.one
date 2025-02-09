'use client';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarShortcut,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import DownloadButton from "./download-button";
import NoteCategory from "./note-category";

interface NoteMenuBarProps {
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
                <MenubarTrigger className="text-md">File</MenubarTrigger>
                <MenubarContent className="border border-gray-500">
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
                <MenubarTrigger className="text-md">View</MenubarTrigger>
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
        </Menubar>
    );
}
