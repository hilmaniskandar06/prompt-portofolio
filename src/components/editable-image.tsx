"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "./admin-provider";
import { getSiteContent, updateSiteContent } from "@/lib/storage";

interface EditableImageProps {
    contentKey: string;
    defaultSrc: string;
    alt: string;
    className?: string;
}

export function EditableImage({ contentKey, defaultSrc, alt, className }: EditableImageProps) {
    const { isAdmin } = useAdmin();
    const [src, setSrc] = useState(defaultSrc);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            const content = await getSiteContent(contentKey);
            if (content) {
                setSrc(content);
            }
            setIsLoading(false);
        };
        loadContent();
    }, [contentKey]);

    if (isLoading) return <img src={defaultSrc} alt={alt} className={className} />;

    if (isAdmin) {
        return (
            <img 
                src={src} 
                alt={alt}
                className={`cursor-pointer hover:outline hover:outline-2 hover:outline-[var(--primary)] transition-all ${className}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newUrl = window.prompt("Masukkan URL gambar baru:", src);
                    if (newUrl !== null && newUrl.trim() !== "") {
                        setSrc(newUrl);
                        updateSiteContent(contentKey, newUrl);
                    }
                }}
                title="Klik untuk mengubah URL gambar (Mode Admin)"
            />
        );
    }

    return <img src={src} alt={alt} className={className} />;
}
