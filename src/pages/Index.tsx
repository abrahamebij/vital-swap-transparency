import { HeroSection } from "@/components/HeroSection";
import { FeeStructureSection } from "@/components/FeeStructureSection";
import { CalculatorSection } from "@/components/CalculatorSection";
import { CTASection } from "@/components/CTASection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroSection />
      <FeeStructureSection />
      <CalculatorSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
