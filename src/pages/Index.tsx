import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import ProductsSection from "@/components/landing/ProductsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <ProductsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
