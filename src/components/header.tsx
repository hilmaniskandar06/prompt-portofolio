"use client";

import Link from "next/link";
import { Sparkles, Moon, Sun, Settings } from "lucide-react";
import { useTheme } from "./theme-provider";
import { EditableText } from "./editable-text";
import { EditableImage } from "./editable-image";

export function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Spacer for centering */}
                    <div className="w-10"></div>

                    {/* Logo - Centered */}
                    <Link href="/" className="flex items-center gap-2">
                        <EditableImage 
                            contentKey="header_logo_image"
                            defaultSrc="https://placehold.co/32x32/FFDB33/000000.png?text=Logo"
                            alt="Logo"
                            className="w-8 h-8 object-cover border-2 border-[var(--border-default)]"
                        />
                        <EditableText 
                            as="span"
                            contentKey="header_logo_text"
                            defaultText="Portofolio Prompt"
                            className="font-semibold text-lg text-[var(--foreground)]"
                        />
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Link 
                            href="/admin" 
                            className="theme-toggle"
                            title="Mode Admin"
                        >
                            <Settings className="w-5 h-5" />
                        </Link>
                        
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            title={theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
                        >
                            {theme === "light" ? (
                                <Moon className="w-5 h-5 text-[var(--muted)]" />
                            ) : (
                                <Sun className="w-5 h-5 text-[var(--muted)]" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
