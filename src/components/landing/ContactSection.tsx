import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const WA_NUMBER = "6285647486700";

const ContactSection = () => {
  const [form, setForm] = useState({ nama: "", wa: "", pesan: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save lead to database
    try {
      await supabase.from("leads").insert({
        nama: form.nama,
        kontak: form.wa,
        sumber: "virgincoconutoil.id",
      });
    } catch {
      // Don't block WhatsApp redirect on DB error
    }

    const message = `Halo, saya ingin bertanya tentang VCO Barooka.\n\nNama: ${form.nama}\nWhatsApp: ${form.wa}\nPesan: ${form.pesan}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="kontak" className="section-padding" style={{ background: "var(--gradient-warm)" }}>
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-accent font-body text-sm tracking-widest uppercase mb-2">Hubungi Kami</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Ada Pertanyaan?</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <p className="text-muted-foreground font-body leading-relaxed">
              Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda mendapatkan produk VCO terbaik.
            </p>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "Tangerang Selatan" },
                { icon: Phone, text: "+62 856-4748-6700" },
                { icon: Mail, text: "info@virgincoconutoil.id" },
                { icon: Clock, text: "Senin - Sabtu, 08:00 - 17:00 WIB" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-body text-foreground pt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-lg p-6 md:p-8 border border-border space-y-4"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <Input
              placeholder="Nama Anda"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              required
              className="font-body"
            />
            <Input
              placeholder="Nomor WhatsApp"
              value={form.wa}
              onChange={(e) => setForm({ ...form, wa: e.target.value })}
              required
              className="font-body"
            />
            <Textarea
              placeholder="Pesan Anda..."
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              rows={4}
              className="font-body"
            />
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold"
            >
              Kirim via WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
