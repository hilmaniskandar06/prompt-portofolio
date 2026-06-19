import { supabase } from "./supabase";
import { Prompt, NewPromptData } from "./types";

const COLLECTION_NAME = "prompts";
const CONTENT_TABLE = "site_content";

// Ambil semua prompt
export async function getPrompts(): Promise<Prompt[]> {
    try {
        const { data, error } = await supabase
            .from(COLLECTION_NAME)
            .select("*")
            .order("createdAt", { ascending: false });

        if (error) {
            console.error("Error getting prompts:", error);
            return [];
        }

        return data as Prompt[];
    } catch (error) {
        console.error("Error getting prompts:", error);
        return [];
    }
}

// Ambil satu prompt berdasarkan ID
export async function getPromptById(id: string): Promise<Prompt | null> {
    try {
        const { data, error } = await supabase
            .from(COLLECTION_NAME)
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            return null;
        }

        return data as Prompt;
    } catch (error) {
        console.error("Error getting prompt:", error);
        return null;
    }
}

// Tambah prompt baru
export async function addPrompt(data: NewPromptData): Promise<Prompt | null> {
    try {
        const { data: newPrompt, error } = await supabase
            .from(COLLECTION_NAME)
            .insert([{
                promptText: data.promptText,
                imageBefore: data.imageBefore || null,
                imageAfter: data.imageAfter || null,
                notes: data.notes || null
            }])
            .select()
            .single();

        if (error || !newPrompt) {
            console.error("Error adding prompt:", error);
            return null;
        }

        return newPrompt as Prompt;
    } catch (error) {
        console.error("Error adding prompt:", error);
        return null;
    }
}

// Update prompt
export async function updatePrompt(id: string, data: Partial<NewPromptData>): Promise<boolean> {
    try {
        const { error } = await supabase
            .from(COLLECTION_NAME)
            .update(data)
            .eq("id", id);

        if (error) {
            console.error("Error updating prompt:", error);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error updating prompt:", error);
        return false;
    }
}

// Hapus prompt
export async function deletePrompt(id: string): Promise<boolean> {
    try {
        const { error } = await supabase
            .from(COLLECTION_NAME)
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting prompt:", error);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return false;
    }
}

// Ambil site content berdasarkan key
export async function getSiteContent(key: string): Promise<string | null> {
    try {
        const { data, error } = await supabase
            .from(CONTENT_TABLE)
            .select("value")
            .eq("key", key)
            .single();
            
        if (error || !data) return null;
        return data.value;
    } catch (error) {
        console.error("Error getting site content:", error);
        return null;
    }
}

// Update site content
export async function updateSiteContent(key: string, value: string): Promise<boolean> {
    try {
        const { error } = await supabase
            .from(CONTENT_TABLE)
            .upsert({ key, value });

        if (error) {
            console.error("Error updating site content:", error);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error updating site content:", error);
        return false;
    }
}
