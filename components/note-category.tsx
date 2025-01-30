"use client";
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface NoteCategoryProps {
    category: string;
    categoriesList: string[];
    setCategory: (category: string) => void;
}

export default function NoteCategory({
    category,
    categoriesList,
    setCategory,
}: NoteCategoryProps) {
    return (
        <div>
            <Select
                onValueChange={(value) => setCategory(value)}
                defaultValue={category}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categoriesList.map((category) => (
                            <SelectItem
                                key={category}
                                value={category}
                                className="pl-6"
                            >
                                {category}
                            </SelectItem>
                        ))}
                        <SelectItem value="remove" className="text-red-500">
                            Remove
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
