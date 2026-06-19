export interface Prompt {
    id: string;
    promptText: string;
    imageBefore: string; // Base64 string dari gambar
    imageAfter: string;  // Base64 string dari gambar
    notes?: string;      // Catatan
    createdAt: string;   // ISO date string
}

export interface NewPromptData {
    promptText: string;
    imageBefore: string;
    imageAfter: string;
    notes?: string;
}
