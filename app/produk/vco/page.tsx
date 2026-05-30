import Link from "next/link";
import { ArrowLeft, Download, Phone, CheckCircle2, FlaskConical, Shield, Droplets, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FloatingContact from "@/components/landing/FloatingContact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate of Analysis VCO Barooka | Spesifikasi Resmi",
  description:
    "Certificate of Analysis (COA) Virgin Coconut Oil Barooka. Diuji oleh PT Saraswanti Indo Genetech — laboratorium terakreditasi KAN & ILAC-MRA. 23 parameter uji resmi.",
};

const COA_PATH = "/COA-VCO-PT-Barooka.pdf";
const WA_NUMBER = "6285647486700";
const WA_TEXT = encodeURIComponent(
  "Halo Barooka VCO, saya sudah melihat COA produk Anda dan tertarik. Bisa info lebih lanjut?"
);

const keyStats = [
  { value: "48,04%", label: "Asam Laurat (C12:0)", sub: "Kunci imunitas & kesehatan" },
  { value: "0", label: "Bilangan Peroksida", sub: "Nol oksidasi — minyak murni" },
  { value: "0,09%", label: "Kadar Air", sub: "Sangat rendah & stabil" },
  { value: "23", label: "Parameter Uji", sub: "Termasuk logam berat & mikroba" },
];

const specs = [
  { no: 1,  parameter: "Asam Lemak Bebas (sbg. Asam Laurat)", unit: "%",         result: "0,28",               highlight: false },
  { no: 2,  parameter: "Bilangan Iod",                          unit: "Wijs",      result: "8,66",               highlight: false },
  { no: 3,  parameter: "Bilangan Peroksida",                    unit: "mEq O₂/kg", result: "0",                  highlight: true  },
  { no: 4,  parameter: "Arsenikum (As)",                        unit: "mg/kg",     result: "Tidak terdeteksi",   highlight: false },
  { no: 5,  parameter: "Kadmium (Cd)",                          unit: "mg/kg",     result: "Tidak terdeteksi",   highlight: false },
  { no: 6,  parameter: "Tembaga (Cu)",                          unit: "mg/kg",     result: "Tidak terdeteksi",   highlight: false },
  { no: 7,  parameter: "Besi (Fe)",                             unit: "mg/100g",   result: "0,79",               highlight: false },
  { no: 8,  parameter: "Timbal (Pb)",                           unit: "mg/kg",     result: "Tidak terdeteksi",   highlight: false },
  { no: 9,  parameter: "Angka Lempeng Total (ALT)",             unit: "colony/g",  result: "1,1×10²",            highlight: false },
  { no: 10, parameter: "Rasa",                                  unit: "—",         result: "Normal, tidak berasa", highlight: false },
  { no: 11, parameter: "Warna",                                 unit: "—",         result: "Normal, putih",      highlight: false },
  { no: 12, parameter: "Bau",                                   unit: "—",         result: "Normal",             highlight: false },
  { no: 13, parameter: "Asam Linolenat (C18:3)",               unit: "%",         result: "Tidak terdeteksi",   highlight: false },
  { no: 14, parameter: "Asam Linoleat (C18:2)",                unit: "%",         result: "1,37",               highlight: false },
  { no: 15, parameter: "Asam Oleat (C18:1)",                   unit: "%",         result: "6,33",               highlight: false },
  { no: 16, parameter: "Asam Kaprilat (C8:0)",                 unit: "%",         result: "7,4",                highlight: false },
  { no: 17, parameter: "Asam Kaproat (C6:0)",                  unit: "%",         result: "0,45",               highlight: false },
  { no: 18, parameter: "Asam Stearat (C18:0)",                 unit: "%",         result: "2,53",               highlight: false },
  { no: 19, parameter: "Asam Palmitat (C16:0)",                unit: "%",         result: "9,11",               highlight: false },
  { no: 20, parameter: "Asam Miristat (C14:0)",                unit: "%",         result: "18,28",              highlight: false },
  { no: 21, parameter: "Asam Laurat (C12:0)",                  unit: "%",         result: "48,04",              highlight: true  },
  { no: 22, parameter: "Asam Kaprat (C10:0)",                  unit: "%",         result: "6,22",               highlight: false },
  { no: 23, parameter: "Kadar Air & Bahan Menguap",            unit: "%",         result: "0,09",               highlight: true  },
];

export default function VCODetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(155 50% 10%), hsl(155 42% 20%))" }}
        >
          {/* decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: "hsl(42 75% 50%)" }} />
          <div className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full opacity-10"
            style={{ background: "hsl(42 75% 50%)" }} />

          <div className="container-main section-padding relative z-10">
            <Link
              href="/#produk"
              className="inline-flex items-center gap-2 text-sm font-body text-white/60 hover:text-white mb-10 transition-colors"
            >
              <ArrowLeft size={15} />
              Kembali ke Produk
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                  <Award size={14} className="text-yellow-300" />
                  <span className="text-xs font-body text-white/90 tracking-wide uppercase">
                    Laboratorium Terakreditasi KAN · ILAC-MRA
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                  Certificate<br />of Analysis
                </h1>
                <p className="text-white/70 font-body leading-relaxed mb-8 max-w-md">
                  VCO Barooka telah diuji secara independen. Semua parameter — dari logam berat,
                  profil asam lemak, hingga mikrobiologi — lolos standar kualitas premium.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a href={COA_PATH} download="COA-VCO-PT-Barooka.pdf">
                    <Button className="bg-yellow-400 text-green-950 hover:bg-yellow-300 font-body font-semibold gap-2 px-6">
                      <Download size={17} />
                      Download COA (PDF)
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-body gap-2 px-6 backdrop-blur-sm">
                      <Phone size={16} />
                      WhatsApp Kami
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right — COA card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/20">
                  <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm">Certificate of Analysis</p>
                    <p className="text-xs text-white/60 font-body">Laporan Hasil Uji Resmi</p>
                  </div>
                </div>

                <div className="space-y-0 text-sm font-body divide-y divide-white/10">
                  {[
                    { label: "No. Sertifikat",   value: "SIG.LHP.XII.2021.060955351"   },
                    { label: "Laboratorium",      value: "PT Saraswanti Indo Genetech"  },
                    { label: "No. Order",         value: "SIG.MARK.T.XI.2021.000650"   },
                    { label: "Tanggal Pengujian", value: "24 Nov — 03 Des 2021"         },
                    { label: "Tanggal Terbit",    value: "06 Desember 2021"             },
                    { label: "Nama Sampel",       value: "Virgin Coconut Oil"           },
                    { label: "Akreditasi",        value: "KAN · ILAC-MRA"              },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-2.5">
                      <span className="text-white/60">{row.label}</span>
                      <span className="text-white font-medium text-right ml-4 text-xs md:text-sm">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY STATS ── */}
        <section className="py-10 bg-background border-b border-border">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keyStats.map((s, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border border-border p-5 text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s`, boxShadow: "var(--shadow-sm)" }}
                >
                  <p className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">{s.value}</p>
                  <p className="text-sm font-body font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs font-body text-muted-foreground mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEUNGGULAN ── */}
        <section className="section-padding" style={{ background: "var(--gradient-warm)" }}>
          <div className="container-main">
            <div className="text-center mb-10">
              <p className="text-accent font-body text-xs tracking-widest uppercase mb-2">Hasil Uji Membuktikan</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Kemurnian yang Terukur</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Shield,
                  title: "Bebas Logam Berat",
                  desc: "As, Cd, Cu, Pb — semua tidak terdeteksi. Aman dikonsumsi dan diaplikasikan ke kulit.",
                  color: "bg-emerald-500/10",
                  iconColor: "text-emerald-600",
                },
                {
                  icon: FlaskConical,
                  title: "Asam Laurat Tinggi",
                  desc: "48,04% asam laurat — komponen aktif utama VCO untuk imunitas dan antimikroba alami.",
                  color: "bg-yellow-500/10",
                  iconColor: "text-yellow-600",
                },
                {
                  icon: Droplets,
                  title: "Peroksida Nol",
                  desc: "Bilangan peroksida = 0 mEq O₂/kg. Tidak ada oksidasi, kualitas minyak sempurna.",
                  color: "bg-blue-500/10",
                  iconColor: "text-blue-600",
                },
                {
                  icon: CheckCircle2,
                  title: "Kadar Air Minimal",
                  desc: "Hanya 0,09% kadar air — jauh di bawah standar, menjamin daya tahan produk lebih lama.",
                  color: "bg-primary/10",
                  iconColor: "text-primary",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border border-border p-6 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s`, boxShadow: "var(--shadow-sm)" }}
                >
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${item.color} mb-4`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TABEL SPESIFIKASI ── */}
        <section className="section-padding bg-background">
          <div className="container-main">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="text-accent font-body text-xs tracking-widest uppercase mb-2">Data Lengkap</p>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Tabel Spesifikasi
                </h2>
                <p className="text-sm font-body text-muted-foreground mt-1">
                  23 parameter uji — metode SNI, AOAC, AOCS, USP
                </p>
              </div>
              <a href={COA_PATH} download="COA-VCO-PT-Barooka.pdf" className="shrink-0">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-body gap-2">
                  <Download size={16} />
                  Download PDF
                </Button>
              </a>
            </div>

            <div
              className="rounded-2xl border border-border overflow-hidden"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr style={{ background: "linear-gradient(90deg, hsl(155 50% 14%), hsl(155 42% 22%))" }}>
                      <th className="text-left px-5 py-4 font-semibold text-white/80 w-12">No</th>
                      <th className="text-left px-5 py-4 font-semibold text-white">Parameter</th>
                      <th className="text-left px-5 py-4 font-semibold text-white/80">Satuan</th>
                      <th className="text-left px-5 py-4 font-semibold text-white">Hasil Uji</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((s, i) => (
                      <tr
                        key={s.no}
                        className={`border-t border-border transition-colors ${
                          s.highlight
                            ? "bg-yellow-50 dark:bg-yellow-900/10"
                            : i % 2 === 0
                            ? "bg-background"
                            : "bg-card"
                        }`}
                      >
                        <td className="px-5 py-3.5 text-muted-foreground font-medium">{s.no}</td>
                        <td className="px-5 py-3.5 text-foreground font-medium">
                          {s.parameter}
                          {s.highlight && (
                            <span className="ml-2 inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded-full font-body">
                              ★ Unggulan
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{s.unit}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={
                              s.highlight
                                ? "font-bold text-primary"
                                : s.result === "Tidak terdeteksi"
                                ? "text-emerald-600 font-medium"
                                : "text-foreground"
                            }
                          >
                            {s.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs font-body text-muted-foreground mt-4 text-center">
              Metode: SNI · AOAC · AOCS · USP 43 NF 38 · ICP-MS · ICP-OES · GC
            </p>
          </div>
        </section>

        {/* ── WHATSAPP CTA ── */}
        <section
          className="section-padding"
          style={{ background: "linear-gradient(135deg, hsl(155 50% 10%), hsl(155 42% 20%))" }}
        >
          <div className="container-main">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Tertarik dengan Produk Kami?
              </h2>
              <p className="text-white/70 font-body leading-relaxed mb-4">
                Hubungi kami langsung via WhatsApp untuk informasi harga, pemesanan,
                atau konsultasi maklon VCO dengan merek Anda sendiri.
              </p>
              <p className="text-2xl font-display font-bold text-yellow-300 mb-8">
                +62 856-4748-6700
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-400 hover:bg-green-300 text-green-950 font-body font-bold gap-2 px-8 py-3 h-auto text-base">
                    <Phone size={20} />
                    Chat WhatsApp Sekarang
                  </Button>
                </a>
                <a href={COA_PATH} download="COA-VCO-PT-Barooka.pdf">
                  <Button className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-body gap-2 px-8 py-3 h-auto text-base backdrop-blur-sm">
                    <Download size={18} />
                    Download COA
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
