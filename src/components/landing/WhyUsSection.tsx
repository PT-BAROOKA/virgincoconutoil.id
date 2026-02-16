import { Leaf, Heart, ShieldCheck, Droplets } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Alami",
    desc: "Tanpa bahan kimia, pewarna, atau pengawet. Murni dari kelapa segar pilihan.",
  },
  {
    icon: Heart,
    title: "Kaya Asam Laurat",
    desc: "Kandungan asam laurat tinggi untuk meningkatkan imunitas & kesehatan tubuh.",
  },
  {
    icon: ShieldCheck,
    title: "Bersertifikasi",
    desc: "Diproduksi dengan standar BPOM & halal untuk jaminan kualitas terbaik.",
  },
  {
    icon: Droplets,
    title: "Cold-Pressed",
    desc: "Diproses dengan metode cold-pressed untuk menjaga nutrisi & kemurnian minyak.",
  },
];

const WhyUsSection = () => {
  return (
    <section id="keunggulan" className="section-padding" style={{ background: "var(--gradient-warm)" }}>
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Mengapa Memilih Kami</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Keunggulan VCO Barooka
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
