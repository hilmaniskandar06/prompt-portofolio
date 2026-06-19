-- Skrip untuk Supabase SQL Editor

-- 1. Buat tabel prompts
CREATE TABLE public.prompts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  promptText text NOT NULL,
  imageBefore text,
  imageAfter text,
  notes text,
  createdAt timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Buat tabel site_content untuk konfigurasi/Admin
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value text NOT NULL
);

-- 3. Isi data site_content awal (default)
INSERT INTO public.site_content (key, value) VALUES
  ('home_hero_title', 'Portofolio Prompt'),
  ('home_hero_subtitle', 'Simpan, kelola, dan pamerkan koleksi prompt AI Anda. Temukan inspirasi dari galeri atau tambahkan kreasi Anda sendiri.'),
  ('footer_text', '© 2024 Portofolio Prompt. Dibuat dengan ❤️ untuk kreator AI.')
ON CONFLICT (key) DO NOTHING;

-- 4. Setup RLS (Row Level Security) - Opsional, tapi direkomendasikan
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 5. Buat policy akses pubik (untuk portfolio sederhana ini, kita izinkan baca tulis secara anonim)
CREATE POLICY "Enable read access for all users on prompts" ON public.prompts FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users on prompts" ON public.prompts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users on prompts" ON public.prompts FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users on prompts" ON public.prompts FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users on site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users on site_content" ON public.site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users on site_content" ON public.site_content FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users on site_content" ON public.site_content FOR DELETE USING (true);
