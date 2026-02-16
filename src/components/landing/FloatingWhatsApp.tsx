import { MessageCircle } from "lucide-react";

const WA_NUMBER = "6285647486700";
const WA_MESSAGE = encodeURIComponent("Halo, saya ingin bertanya tentang produk VCO Barooka.");

const FloatingWhatsApp = () => {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="w-7 h-7" style={{ color: "white" }} />
    </a>
  );
};

export default FloatingWhatsApp;
