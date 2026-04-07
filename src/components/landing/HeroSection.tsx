import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";

const WA_NUMBER = "6285647486700";
const WA_MESSAGE = encodeURIComponent("Halo, saya tertarik dengan produk VCO Barooka. Bisa info lebih lanjut?");

const HeroSection = () => {
  const scrollToProducts = () => {
    document.querySelector("#produk")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="beranda" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 container-main px-4 md:px-8 text-center">
        <p className="text-gold-light font-body text-sm md:text-base tracking-widest uppercase mb-4 animate-fade-in-up">
          100% Murni · Cold-Pressed · Tinggi Asam Laurat
        </p>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Satu Botol untuk Kesehatan, <br className="hidden md:block" />
          Kecantikan & Masakan Anda
        </h1>
        <p
          className="text-primary-foreground/80 font-body text-base md:text-lg max-w-2xl mx-auto mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          VCO Barooka 100% murni dari kelapa segar pilihan. Tinggi asam laurat untuk menjaga imun tubuh, merawat kulit &
          rambut, serta menyehatkan masakan keluarga Anda.
        </p>

        <div
          className="inline-block bg-accent/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="text-gold font-body font-semibold text-sm">Mulai dari Rp 100.500 / liter</span>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            onClick={scrollToProducts}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold px-8"
          >
            Lihat Produk
          </Button>
          <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="border-2 border-white text-white bg-white/20 hover:bg-white/30 font-body font-semibold px-8 w-full sm:w-auto"
            >
              Hubungi WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
