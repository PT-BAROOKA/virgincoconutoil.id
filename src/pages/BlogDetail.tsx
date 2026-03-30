import { useParams, Link } from "react-router-dom";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import FloatingChatbot from "@/components/landing/FloatingChatbot";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 section-padding">
          <div className="container-main max-w-3xl">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-64 bg-muted rounded" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 section-padding">
          <div className="container-main max-w-3xl text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">Artikel Tidak Ditemukan</h1>
            <Link to="/blog" className="text-primary font-body hover:underline">
              ← Kembali ke Blog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 section-padding">
        <article className="container-main max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft size={16} />
            Kembali ke Blog
          </Link>

          <div className="flex items-center gap-4 text-sm font-body text-muted-foreground mb-4">
            {post.published_at && (
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {format(new Date(post.published_at), "dd MMMM yyyy", { locale: id })}
              </span>
            )}
            {post.reading_time_minutes && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.reading_time_minutes} menit baca
              </span>
            )}
            {post.category && (
              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
                {post.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            {post.title}
          </h1>

          {post.featured_image_url && (
            <div className="rounded-lg overflow-hidden mb-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div
            className="blog-content prose prose-lg max-w-none font-body text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm font-body text-muted-foreground mb-2">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs font-body bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
