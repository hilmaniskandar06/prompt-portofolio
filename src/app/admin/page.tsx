"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/admin-provider";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, logout, isAdmin } = useAdmin();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            router.push("/");
        } else {
            setError("Password salah");
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    if (isAdmin) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
                <div className="card p-8 max-w-md w-full text-center space-y-6">
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">Mode Admin Aktif</h1>
                    <p className="text-[var(--muted)]">Anda sekarang dapat mengklik teks di beranda untuk mengubah isinya.</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => router.push("/")} className="btn btn-primary">
                            Kembali ke Beranda
                        </button>
                        <button onClick={handleLogout} className="btn bg-[var(--destructive)] text-[var(--foreground)] hover:opacity-90">
                            Keluar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
            <div className="card p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-[var(--foreground)] text-center mb-6">Login Admin</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                            Password Admin
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            className="form-input w-full"
                            placeholder="Masukkan password..."
                            autoFocus
                        />
                        {error && <p className="text-[var(--destructive)] text-sm mt-1">{error}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full justify-center">
                        Masuk Mode Admin
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button onClick={() => router.push("/")} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </div>
    );
}
