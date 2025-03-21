"use client";
import React from "react";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
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
                <SelectTrigger className="w-[175px] rounded-md p-0">
                    Edit Category
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
                        <Link className="text-sm pl-1" href="/settings">
                            Add Category
                        </Link>
                        <SelectItem value="remove" className="text-red-500">
                            Remove
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
