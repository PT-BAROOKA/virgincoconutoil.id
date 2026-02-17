import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const POPUP_DISMISSED_KEY = "barooka_popup_dismissed";
const DISMISS_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

const LeadCapturePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ nama: "", kontak: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Don't show if recently dismissed
    const dismissed = localStorage.getItem(POPUP_DISMISSED_KEY);
    if (dismissed && Date.now() - Number(dismissed) < DISMISS_DURATION_MS) {
      return;
    }

    const timer = setTimeout(() => setIsOpen(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(POPUP_DISMISSED_KEY, String(Date.now()));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await supabase.from("leads").insert({
        nama: form.nama,
        kontak: form.kontak,
        sumber: "virgincoconutoil.id",
      });
      setIsSuccess(true);
      setTimeout(() => handleClose(), 2500);
    } catch {
      // Still close on error to not block user
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative bg-card rounded-xl p-8 w-full max-w-sm border border-border animate-fade-in-up"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              Terima Kasih!
            </h3>
            <p className="text-sm font-body text-muted-foreground">
              Data Anda berhasil terkirim.
            </p>
          </div>
        ) : (
          <>
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-display font-bold text-foreground mb-1">
                Konsultasi Gratis!
              </h3>
              <p className="text-sm font-body text-muted-foreground">
                Tinggalkan kontak Anda, kami hubungi dengan penawaran terbaik.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                placeholder="Nama Anda"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                required
                className="font-body"
              />
              <Input
                placeholder="Email atau No. WhatsApp"
                value={form.kontak}
                onChange={(e) => setForm({ ...form, kontak: e.target.value })}
                required
                className="font-body"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold"
              >
                {isSubmitting ? "Mengirim..." : "Kirim"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadCapturePopup;
