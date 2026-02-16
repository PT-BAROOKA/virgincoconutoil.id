import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const BlogSection = () => {
  const { data: posts, isLoading } = useBlogPosts(3);

  return (
    <section id="blog" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Blog</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Artikel Terbaru
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-5 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  {post.featured_image_url && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.published_at && (
                      <p className="text-xs font-body text-muted-foreground mb-2 flex items-center gap-1">
                        <Calendar size={12} />
                        {format(new Date(post.published_at), "dd MMM yyyy", { locale: id })}
                      </p>
                    )}
                    <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm font-body text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Lihat Semua Artikel
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground font-body">Artikel akan segera hadir. Nantikan!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
