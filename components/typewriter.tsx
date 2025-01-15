"use client";

import React, { useState, useEffect } from "react";

interface TypewriterProps {
    text: string;
    typingSpeed?: number;
    cursorStyle?: string;
    delay?: number;
    returnDisplayedText?: (text: string) => void;
}

export default function Typewriter({
    text,
    typingSpeed = 50,
    cursorStyle = "|",
    delay = 0,
    returnDisplayedText,
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setStartTyping(true);
        }, delay);

        return () => clearTimeout(delayTimer);
    }, [delay]);

    useEffect(() => {
        if (returnDisplayedText) {
            returnDisplayedText(displayedText);
        }
    }, [displayedText, returnDisplayedText]);

    useEffect(() => {
        if (startTyping && currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, typingSpeed);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, text, typingSpeed, startTyping]);

    return (
        <div className="font-mono text-lg">
            {displayedText}
            <span className="animate-pulse">{cursorStyle}</span>
        </div>
    );
}
