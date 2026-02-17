import vcoBulk1 from "@/assets/Curah_produk.jpeg";
import vcoBulk2 from "@/assets/Maklon_produk.jpeg";
import vcoBulk3 from "@/assets/vco-bulk-3.png";
import vco250ml from "@/assets/vco-250ml.jpg";
import { Button } from "@/components/ui/button";

const WA_NUMBER = "6285647486700";

const retailProducts = [
  {
    image: vco250ml,
    title: "VCO Barooka 250ml",
    desc: "Virgin Coconut Oil premium dalam kemasan botol kaca 250ml. Cocok untuk konsumsi harian, memasak, dan perawatan kulit & rambut.",
    price: "Rp 35.000",
    waMessage: "Halo, saya ingin memesan VCO Barooka 250ml. Bisa info lebih lanjut?",
  },
  {
    image: vcoBulk2,
    title: "VCO Barooka 500ml",
    desc: "Ukuran keluarga untuk kebutuhan memasak sehari-hari. Minyak kelapa murni cold-pressed yang menjaga cita rasa masakan Anda.",
    price: "Rp 65.000",
    waMessage: "Halo, saya ingin memesan VCO Barooka 500ml. Bisa info harganya?",
  },
  {
    image: vcoBulk3,
    title: "VCO Barooka 1 Liter",
    desc: "Ukuran hemat untuk kebutuhan keluarga atau usaha kecil. Minyak kelapa murni berkualitas tinggi dengan harga terbaik per mililiter.",
    price: "Rp 105.000",
    waMessage: "Halo, saya ingin memesan VCO Barooka 1 Liter. Bisa info harganya?",
  },
];

const ProductsSection = () => {
  return (
    <section id="produk" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Produk Kami</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Pilihan VCO Terbaik</h2>
          <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
            Tersedia dalam berbagai ukuran — dari retail 250ml hingga curah dan layanan maklon.
          </p>
        </div>

        {/* Bulk Purchase Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg overflow-hidden border border-border mb-8 animate-fade-in-up"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="h-64 md:h-auto overflow-hidden">
            <img src={vcoBulk1} alt="Pembelian Curah VCO Barooka" className="w-full h-full object-cover" />
          </div>
          <div className="bg-card p-8 md:p-10 flex flex-col justify-center">
            <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Grosir & Curah</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Pembelian Curah & B2B</h3>
            <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">
              Melayani pembelian grosir mulai dari 5 Liter. Tersedia dalam jerigen dan drum untuk kebutuhan industri,
              HORECA, dan distributor. Harga spesial untuk pembelian dalam jumlah besar.
            </p>
            <div>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya tertarik dengan VCO Barooka pembelian curah/grosir. Bisa minta penawaran harga?")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
                  Minta Penawaran Grosir
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Maklon Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg overflow-hidden border border-border mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.15s", boxShadow: "var(--shadow-sm)" }}
        >
          <div className="bg-card p-8 md:p-10 flex flex-col justify-center md:order-0 order-1">
            <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Layanan Maklon</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Maklon VCO</h3>
            <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">
              Kami menyediakan layanan maklon (contract manufacturing) VCO dengan merek Anda sendiri. Mulai dari
              formulasi, pengemasan, hingga desain kemasan — semua kami tangani secara profesional. Minimum order
              berlaku.
            </p>
            <div>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya tertarik dengan layanan maklon VCO. Bisa info lebih detail?")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
                  Konsultasi Maklon
                </Button>
              </a>
            </div>
          </div>
          <div className="h-64 md:h-auto overflow-hidden md:order-1 order-0">
            <img src={vcoBulk2} alt="Layanan Maklon VCO Barooka" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Retail Products Grid */}
        <div className="text-center mb-10">
          <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Retail</p>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">Kemasan Retail</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {retailProducts.map((p, i) => (
            <div
              key={p.title}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.15}s`, boxShadow: "var(--shadow-sm)" }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-display font-bold text-accent">{p.price}</span>
                    <span className="text-xs font-body text-muted-foreground ml-2">{p.pricePerMl}</span>
                  </div>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(p.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
                      Pesan
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
