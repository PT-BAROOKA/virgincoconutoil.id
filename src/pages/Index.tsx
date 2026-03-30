import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import ProductsSection from "@/components/landing/ProductsSection";
import BlogSection from "@/components/landing/BlogSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import FloatingChatbot from "@/components/landing/FloatingChatbot";
import LeadCapturePopup from "@/components/landing/LeadCapturePopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <ProductsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
      <FloatingChatbot />
      <FloatingWhatsApp />
      <LeadCapturePopup />
    </div>
  );
};

export default Index;
