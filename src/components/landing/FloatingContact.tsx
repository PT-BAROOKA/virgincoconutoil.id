import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Headphones, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_API = "https://wfthvovlhphnrodrqxqt.supabase.co/functions/v1/chat-vco";
const WELCOME_MESSAGE = "Halo! Saya asisten virtual Barooka VCO. Ada yang bisa saya bantu seputar Virgin Coconut Oil?";
const WA_NUMBER = "6285647486700";
const WA_MESSAGE = encodeURIComponent("Halo, saya ingin bertanya tentang produk VCO Barooka.");

// Primary green: hsl(155 45% 22%) ≈ #1e4d37
const PRIMARY = "#1e4d37";
// Dark green: hsl(155 50% 12%) ≈ #0f2e20
const GREEN_DARK = "#0f2e20";
// WhatsApp green
const WA_GREEN = "#25D366";

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

  const handleAIClick = () => {
    setChatOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Chat window */}
      {chatOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-border bg-card flex flex-col overflow-hidden"
          style={{ height: 520 }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white" style={{ backgroundColor: PRIMARY }}>
            <div className="flex items-center gap-3">
              <Bot size={28} />
              <div>
                <p className="font-display font-bold text-sm leading-tight">Barooka VCO AI</p>
                <p className="text-xs opacity-80 font-body">Asisten Virtual</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="opacity-80 hover:opacity-100">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-background">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm font-body whitespace-pre-wrap text-justify ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-secondary text-secondary-foreground rounded-bl-sm"
                  }`}
                  style={msg.role === "user" ? { backgroundColor: PRIMARY } : {}}
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
              className="rounded-lg p-3 text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              style={{ backgroundColor: PRIMARY }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Floating menu options */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {menuOpen && (
          <div className="flex flex-col items-end gap-3 mb-1">
            {/* AI Assistant option */}
            <div className="flex items-center gap-3">
              <span className="bg-white text-gray-800 text-sm font-body font-medium px-3 py-1.5 rounded-full shadow-md">
                AI Assistant
              </span>
              <button
                onClick={handleAIClick}
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: GREEN_DARK }}
                aria-label="AI Assistant"
              >
                <Bot size={26} className="text-white" />
              </button>
            </div>

            {/* WhatsApp option */}
            <div className="flex items-center gap-3">
              <span className="bg-white text-gray-800 text-sm font-body font-medium px-3 py-1.5 rounded-full shadow-md">
                WhatsApp
              </span>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: WA_GREEN }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={26} className="text-white" />
              </a>
            </div>

            {/* Tutup button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-body font-medium shadow-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: PRIMARY }}
            >
              <X size={16} />
              Tutup
            </button>
          </div>
        )}

        {/* Main trigger button */}
        {!menuOpen && (
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-white font-body font-medium shadow-lg hover:scale-105 transition-transform duration-200"
            style={{ backgroundColor: PRIMARY }}
            aria-label="Hubungi Kami"
          >
            <Headphones size={20} />
            Hubungi Kami
          </button>
        )}
      </div>
    </>
  );
};

export default FloatingContact;
