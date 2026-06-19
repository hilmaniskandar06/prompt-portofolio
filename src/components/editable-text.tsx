"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "./admin-provider";
import { getSiteContent, updateSiteContent } from "@/lib/storage";

interface EditableTextProps {
    contentKey: string;
    defaultText: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

export function EditableText({ contentKey, defaultText, className, as: Component = "span" }: EditableTextProps) {
    const { isAdmin } = useAdmin();
    const [text, setText] = useState(defaultText);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            const content = await getSiteContent(contentKey);
            if (content) {
                setText(content);
            }
            setIsLoading(false);
        };
        loadContent();
    }, [contentKey]);

    const handleBlur = async () => {
        setIsEditing(false);
        await updateSiteContent(contentKey, text);
    };

    if (isLoading) return <Component className={className}>{defaultText}</Component>;

    if (isAdmin) {
        if (isEditing) {
            return (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => e.key === "Enter" && handleBlur()}
                    autoFocus
                    className={`bg-transparent border-b border-[var(--primary)] outline-none w-full ${className}`}
                    style={{ minWidth: "150px" }}
                />
            );
        }

        return (
            <Component 
                className={`cursor-pointer hover:bg-[var(--accent)] hover:outline hover:outline-1 hover:outline-[var(--primary)] rounded px-1 transition-colors ${className}`}
                onClick={() => setIsEditing(true)}
                title="Klik untuk mengedit (Mode Admin)"
            >
                {text}
            </Component>
        );
    }

    return <Component className={className}>{text}</Component>;
}
