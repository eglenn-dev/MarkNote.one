"use client";
import React, { useState } from "react";
import Typewriter from "./typewriter";
import MarkdownPreview from "./markdown-preview";

interface HomeMdPreviewProps {
    text: string;
}

export default function HomeMdPreview({ text }: HomeMdPreviewProps) {
    const [textToDisplay, setTextToDisplay] = useState("");

    return (
        <div className="flex flex-col items-center gap-4">
            <Typewriter text={text} returnDisplayedText={setTextToDisplay} />
            <MarkdownPreview content={textToDisplay} />
        </div>
    );
}
