import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import WhyUsSection from '@/components/landing/WhyUsSection';
import ProductsSection from '@/components/landing/ProductsSection';
import BlogSection from '@/components/landing/BlogSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import FloatingContact from '@/components/landing/FloatingContact';
import LeadCapturePopup from '@/components/landing/LeadCapturePopup';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <ProductsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
      <FloatingContact />
      <LeadCapturePopup />
    </div>
  );
}
