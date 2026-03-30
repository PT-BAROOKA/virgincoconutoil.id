import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_API = "https://wfthvovlhphnrodrqxqt.supabase.co/functions/v1/chat-vco";
const WELCOME_MESSAGE = "Halo! Saya asisten virtual Barooka VCO. Ada yang bisa saya bantu seputar Virgin Coconut Oil?";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
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
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
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
      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-28 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[480px] h-[75vh] max-h-[600px] bg-card rounded-2xl overflow-hidden flex flex-col"
          style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.18)" }}
        >
          {/* Header */}
          <div className="bg-primary px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-7 h-7 text-primary-foreground" />
              <div>
                <p className="font-display text-lg font-semibold text-primary-foreground">Barooka VCO AI</p>
                <p className="text-sm text-primary-foreground/70">Asisten Virtual</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-xl text-base font-body leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-foreground px-4 py-3 rounded-xl rounded-bl-sm text-base">
                  <span className="animate-pulse">Mengetik...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 flex items-center gap-3">
            <input
              type="text"
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
              className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-accent-foreground" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button — posisi di kiri WhatsApp button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-24 z-50 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        aria-label="Chat Bot"
      >
        {open ? (
          <X className="w-8 h-8 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-8 h-8 text-primary-foreground" />
        )}
      </button>
    </>
  );
};

export default FloatingChatbot;
