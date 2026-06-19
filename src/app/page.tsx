"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { PromptGallery } from "@/components/prompt-gallery";
import { NewPromptForm } from "@/components/new-prompt-form";
import { EditableText } from "@/components/editable-text";
import { getPrompts } from "@/lib/storage";
import { Prompt } from "@/lib/types";

export default function HomePage() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadPrompts = async () => {
        setIsLoading(true);
        try {
            const data = await getPrompts();
            setPrompts(data);
        } catch (error) {
            console.error("Error loading prompts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPrompts();
    }, []);

    const handlePromptAdded = () => {
        loadPrompts();
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="text-center mb-8">
                    <EditableText 
                        as="h1"
                        contentKey="home_hero_title"
                        defaultText="Portofolio Prompt"
                        className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-2 inline-block"
                    />
                    <div>
                        <EditableText 
                            as="p"
                            contentKey="home_hero_subtitle"
                            defaultText="Simpan, kelola, dan pamerkan koleksi prompt AI Anda. Temukan inspirasi dari galeri atau tambahkan kreasi Anda sendiri."
                            className="text-[var(--muted)] max-w-2xl mx-auto inline-block"
                        />
                    </div>
                </div>

                {/* Gallery Grid */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <NewPromptForm onSuccess={handlePromptAdded} />
                        <PromptGallery prompts={prompts} onDelete={loadPrompts} />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-[var(--border)] mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <EditableText 
                            contentKey="footer_text"
                            defaultText="© 2024 Portofolio Prompt. Dibuat dengan ❤️ untuk kreator AI."
                            as="p"
                        />
                </div>
            </footer>
        </div>
    );
}
