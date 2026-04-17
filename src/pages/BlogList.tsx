import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FloatingContact from "@/components/landing/FloatingContact";

const BlogList = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 section-padding">
        <div className="container-main">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          <div className="text-center mb-12">
            <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Blog</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Artikel & Tips
            </h1>
            <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
              Informasi terbaru seputar manfaat Virgin Coconut Oil untuk kesehatan dan kecantikan.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-6 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <div className="flex items-center gap-4 text-xs font-body text-muted-foreground mb-3">
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {format(new Date(post.published_at), "dd MMM yyyy", { locale: id })}
                        </span>
                      )}
                      {post.reading_time_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.reading_time_minutes} menit
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm font-body text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    )}
                    {post.category && (
                      <span className="inline-block mt-3 text-xs font-body bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-body">Belum ada artikel. Nantikan artikel menarik dari kami!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default BlogList;
