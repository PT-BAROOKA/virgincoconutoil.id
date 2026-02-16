import { Button } from "@/components/ui/button";
import vcoCooking from "@/assets/vco-cooking.jpg";
import vcoBeauty from "@/assets/vco-beauty.jpg";

const WA_NUMBER = "6285647486700";

const VCOBulkSection = () => {
  return (
    <section id="maklon" className="section-padding bg-background">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Produk Kami</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Virgin Coconut Oil Pilihan
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-2xl mx-auto leading-relaxed">
            Tersedia dalam berbagai ukuran — dari retail 250 ml hingga curah jeriken 20 liter.
          </p>
        </div>

        {/* Card 1 — Pembelian Curah & B2B */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card rounded-lg overflow-hidden border border-border mb-10 animate-fade-in-up"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img
              src={vcoCooking}
              alt="Pembelian Curah & B2B VCO"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Grosir & Curah</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Pembelian Curah & B2B
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Melayani pembelian grosir Virgin Coconut Oil mulai dari 20 liter. Tersedia dalam jeriken dan drum untuk kebutuhan industri, HORECA, dan distributor. Harga spesial untuk pembelian dalam jumlah besar.
            </p>
            <div>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya ingin minta penawaran grosir VCO Barooka. Bisa info lebih lanjut?")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold">
                  Minta Penawaran Grosir
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 — Maklon VCO */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card rounded-lg overflow-hidden border border-border animate-fade-in-up"
          style={{ animationDelay: "0.15s", boxShadow: "var(--shadow-md)" }}
        >
          <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img
              src={vcoBeauty}
              alt="Maklon VCO"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Layanan Maklon</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Maklon Virgin Coconut Oil
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Kami menyediakan layanan maklon (contract manufacturing) Virgin Coconut Oil dengan merek Anda sendiri. Mulai dari formulasi, pengemasan, hingga desain kemasan — semua kami tangani secara profesional. Minimum order berlaku.
            </p>
            <div>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya tertarik dengan layanan maklon VCO. Bisa konsultasi?")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold">
                  Konsultasi Maklon
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VCOBulkSection;
