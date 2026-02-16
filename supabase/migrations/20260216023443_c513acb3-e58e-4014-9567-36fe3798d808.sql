
-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content_html TEXT NOT NULL,
  excerpt TEXT,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  tags TEXT[],
  featured_image_url TEXT,
  og_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'Edukasi',
  word_count INTEGER,
  reading_time_minutes INTEGER,
  status TEXT NOT NULL DEFAULT 'draft',
  source TEXT NOT NULL DEFAULT 'manual',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read for published posts
CREATE POLICY "Public can read published posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

-- Service role can insert
CREATE POLICY "Service role can insert posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (true);

-- Service role can update
CREATE POLICY "Service role can update posts"
  ON public.blog_posts FOR UPDATE
  USING (true);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path TO 'public';

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_posts_updated_at();

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  kontak TEXT NOT NULL,
  sumber TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- Storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

CREATE POLICY "Public read blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Service role upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images');
