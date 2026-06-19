"use client";

import { useState, useEffect, useRef } from "react";
import { useAdmin } from "./admin-provider";
import { getSiteContent, updateSiteContent } from "@/lib/storage";
import { compressImage } from "@/lib/utils";

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

    const fileInputRef = useRef<HTMLInputElement>(null);

    if (isLoading) return <img src={defaultSrc} alt={alt} className={className} />;

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("File harus berupa gambar");
                return;
            }
            try {
                const compressed = await compressImage(file, 200);
                setSrc(compressed);
                updateSiteContent(contentKey, compressed);
            } catch (error) {
                console.error(error);
                alert("Gagal memproses gambar");
            }
        }
    };

    if (isAdmin) {
        return (
            <div 
                className="relative inline-block cursor-pointer" 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    onChange={handleFileSelect} 
                    title="Klik untuk memilih gambar baru (Mode Admin)"
                />
                <img 
                    src={src} 
                    alt={alt}
                    className={`hover:outline hover:outline-2 hover:outline-[var(--primary)] transition-all ${className}`}
                />
            </div>
        );
    }

    return <img src={src} alt={alt} className={className} />;
}
