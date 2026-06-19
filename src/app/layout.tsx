import type { Metadata } from "next";
import { Space_Grotesk, Archivo_Black } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AdminProvider } from "@/components/admin-provider";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const archivoBlack = Archivo_Black({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-head",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Portofolio Prompt - Galeri Prompt AI",
    description: "Simpan, kelola, dan pamerkan koleksi prompt AI Anda beserta gambar yang dihasilkan",
    keywords: ["prompt", "AI", "galeri", "portofolio", "kreator", "desainer"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body className={`${spaceGrotesk.variable} ${archivoBlack.variable} font-sans`}>
                <AdminProvider>
                    <ThemeProvider>
                        <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
                            {children}
                        </div>
                        <div id="toast-container" className="toast-container"></div>
                    </ThemeProvider>
                </AdminProvider>
            </body>
        </html>
    );
}
