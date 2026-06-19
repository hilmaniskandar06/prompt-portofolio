"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, ImageIcon, Trash } from "lucide-react";
import { Prompt } from "@/lib/types";
import { copyToClipboard, truncateText } from "@/lib/utils";
import { ImageModal } from "./image-modal";
import { useAdmin } from "./admin-provider";
import { deletePrompt } from "@/lib/storage";

interface PromptCardProps {
    prompt: Prompt;
    onDelete?: () => void;
}

export function PromptCard({ prompt, onDelete }: PromptCardProps) {
    const [copied, setCopied] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);
    const { isAdmin } = useAdmin();

    const handleImageClick = (e: React.MouseEvent, src: string, alt: string) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedImage({ src, alt });
    };

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const success = await copyToClipboard(prompt.promptText);
        if (success) {
            setCopied(true);
            showToast("Prompt berhasil disalin!");
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (window.confirm("Apakah Anda yakin ingin menghapus prompt ini?")) {
            const success = await deletePrompt(prompt.id);
            if (success) {
                showToast("Prompt berhasil dihapus!");
                onDelete?.();
            } else {
                showToast("Gagal menghapus prompt.");
            }
        }
    };

    const showToast = (message: string) => {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("hiding");
            setTimeout(() => toast.remove(), 200);
        }, 2000);
    };

    return (
        <Link href={`/prompts/${prompt.id}`}>
            <article className="card transition-card hover-lift cursor-pointer group">
                {/* Image Comparison */}
                <div className="image-comparison p-3 pb-0">
                    <div className="relative rounded-lg overflow-hidden">
                        {prompt.imageBefore ? (
                            <img
                                src={prompt.imageBefore}
                                alt="Gambar sebelum"
                                className="w-full h-28 object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
                                onClick={(e) => handleImageClick(e, prompt.imageBefore, "Gambar Sebelum")}
                            />
                        ) : (
                            <div className="placeholder-image h-28">
                                <div className="flex flex-col items-center gap-1">
                                    <ImageIcon className="w-6 h-6" />
                                    <span>Sebelum</span>
                                </div>
                            </div>
                        )}
                        <span className="absolute top-2 left-2 text-[10px] bg-[var(--brand)] text-black font-bold px-2 py-1 border-2 border-black">
                            SEBELUM
                        </span>
                    </div>
                    <div className="relative rounded-lg overflow-hidden">
                        {prompt.imageAfter ? (
                            <img
                                src={prompt.imageAfter}
                                alt="Gambar sesudah"
                                className="w-full h-28 object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
                                onClick={(e) => handleImageClick(e, prompt.imageAfter, "Gambar Sesudah")}
                            />
                        ) : (
                            <div className="placeholder-image h-28">
                                <div className="flex flex-col items-center gap-1">
                                    <ImageIcon className="w-6 h-6" />
                                    <span>Sesudah</span>
                                </div>
                            </div>
                        )}
                        <span className="absolute top-2 left-2 text-[10px] bg-[var(--brand)] text-black font-bold px-2 py-1 border-2 border-black">
                            SESUDAH
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="card-content">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-[var(--foreground)] line-clamp-3">
                                {truncateText(prompt.promptText, 120)}
                            </p>
                            {prompt.notes && (
                                <p className="text-xs text-[var(--muted)] mt-2 italic line-clamp-1 border-t border-[var(--border)] pt-1">
                                    Catatan: {prompt.notes}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            {isAdmin && (
                                <button
                                    onClick={handleDelete}
                                    className="btn btn-icon btn-ghost shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--destructive)] hover:text-red-700"
                                    title="Hapus prompt"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                onClick={handleCopy}
                                className="btn btn-icon btn-ghost shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Salin prompt"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {selectedImage && (
                <ImageModal
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </Link>
    );
}
