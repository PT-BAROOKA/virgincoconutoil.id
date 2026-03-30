import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content_html: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  tags: string[] | null;
  featured_image_url: string | null;
  og_image_url: string | null;
  category: string;
  word_count: number | null;
  reading_time_minutes: number | null;
  status: string;
  source: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = (limit?: number) => {
  return useQuery({
    queryKey: ["blog-posts", limit],
    queryFn: async () => {
      let query = supabase
        .from("vco_blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vco_blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;
      return data as BlogPost;
    },
    enabled: !!slug,
  });
};
