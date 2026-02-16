import vcoBottle from "@/assets/vco-bottle.jpg";
import vcoCooking from "@/assets/vco-cooking.jpg";
import vcoBeauty from "@/assets/vco-beauty.jpg";
import { Button } from "@/components/ui/button";

const WA_NUMBER = "6285647486700";

const products = [
  {
    image: vcoBottle,
    title: "VCO Barooka 250ml",
    desc: "Virgin Coconut Oil premium dalam kemasan botol kaca 250ml. Cocok untuk konsumsi harian, memasak, dan perawatan kulit & rambut.",
    price: "Rp 45.000",
    waMessage: "Halo, saya ingin memesan VCO Barooka 250ml. Bisa info lebih lanjut?",
  },
  {
    image: vcoCooking,
    title: "VCO Barooka 500ml",
    desc: "Ukuran keluarga untuk kebutuhan memasak sehari-hari. Minyak kelapa murni cold-pressed yang menjaga cita rasa masakan Anda.",
    price: "Rp 80.000",
    waMessage: "Halo, saya ingin memesan VCO Barooka 500ml. Bisa info harganya?",
  },
  {
    image: vcoBeauty,
    title: "VCO Barooka 1 Liter",
    desc: "Paket hemat untuk penggunaan rutin. Ideal untuk kebutuhan kecantikan, kesehatan, dan memasak seluruh keluarga.",
    price: "Rp 145.000",
    waMessage: "Halo, saya tertarik dengan VCO Barooka 1 Liter. Bisa minta penawaran?",
  },
];

const ProductsSection = () => {
  return (
    <section id="produk" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Produk Kami</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Pilihan VCO Terbaik
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <div
              key={p.title}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.15}s`, boxShadow: "var(--shadow-sm)" }}
            >
              <div className="aspect-square overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-display font-bold text-accent">{p.price}</span>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(p.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
                      Pesan Sekarang
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
