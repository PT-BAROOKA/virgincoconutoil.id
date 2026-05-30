'use client';

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Headphones, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WA_NUMBER = "6285647486700";
const WA_MESSAGE = encodeURIComponent("Halo, saya ingin bertanya tentang produk VCO Barooka.");
const CHAT_API = "https://wfthvovlhphnrodrqxqt.supabase.co/functions/v1/chat-vco";
const WELCOME_MESSAGE = "Halo! Saya asisten virtual Barooka VCO. Ada yang bisa saya bantu seputar Virgin Coconut Oil?";

const FloatingContact = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openChat = () => {
    setMenuOpen(false);
    setChatOpen(true);
  };

  const closeAll = () => {
    setMenuOpen(false);
    setChatOpen(false);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, terjadi gangguan. Silakan hubungi WhatsApp kami di +62 856-4748-6700." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chatbot Window ── */}
      {chatOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-border bg-card flex flex-col overflow-hidden animate-fade-in-up"
          style={{ height: 520 }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <Bot size={26} />
              <div>
                <p className="font-display font-bold text-sm leading-tight">Barooka VCO AI</p>
                <p className="text-xs opacity-70 font-body">Asisten Virtual</p>
              </div>
            </div>
            <button onClick={closeAll} className="text-primary-foreground/70 hover:text-primary-foreground">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-background">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm font-body whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-secondary-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground rounded-xl px-4 py-2.5 text-sm font-body animate-pulse">
                  Mengetik...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 px-3 py-3 border-t border-border bg-card">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan..."
              disabled={loading}
              className="flex-1 bg-background border border-border rounded-lg px-4 py-3 font-body text-base focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-primary text-primary-foreground rounded-lg p-3 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Stack ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Menu Items — muncul ke atas saat menu terbuka */}
        {menuOpen && (
          <>
            {/* AI Assistant */}
            <div className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
              <button
                onClick={openChat}
                className="bg-white text-foreground font-body text-sm font-medium px-4 py-2.5 rounded-full shadow-md border border-border hover:bg-secondary transition-colors"
              >
                AI Assistant
              </button>
              <button
                onClick={openChat}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                style={{ backgroundColor: "hsl(155 45% 22%)" }}
                aria-label="AI Chatbot"
              >
                <Bot size={22} className="text-white" />
              </button>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: "0s" }}>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-foreground font-body text-sm font-medium px-4 py-2.5 rounded-full shadow-md border border-border hover:bg-secondary transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                style={{ backgroundColor: "#25D366" }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={22} className="text-white" />
              </a>
            </div>

            {/* Tutup */}
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 font-body text-sm font-semibold px-5 py-3 rounded-full shadow-lg transition-colors animate-fade-in text-white"
              style={{ backgroundColor: "hsl(155 50% 12%)" }}
            >
              <X size={16} />
              Tutup
            </button>
          </>
        )}

        {/* Main Button */}
        {!menuOpen && !chatOpen && (
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-white font-body font-semibold text-sm px-5 py-3.5 rounded-full shadow-xl hover:scale-105 transition-transform animate-fade-in"
            style={{ backgroundColor: "hsl(155 45% 22%)" }}
            aria-label="Hubungi Kami"
          >
            <Headphones size={20} />
            Hubungi Kami
          </button>
        )}

        {/* Tombol tutup chat saat chatbot terbuka */}
        {chatOpen && (
          <button
            onClick={closeAll}
            className="flex items-center gap-2 font-body text-sm font-semibold px-5 py-3 rounded-full shadow-lg transition-colors text-white"
            style={{ backgroundColor: "hsl(155 50% 12%)" }}
          >
            <X size={16} />
            Tutup
          </button>
        )}
      </div>
    </>
  );
};

export default FloatingContact;
