import { HeroSection } from "@/components/HeroSection";
import { FeeStructureSection } from "@/components/FeeStructureSection";
import { CalculatorSection } from "@/components/CalculatorSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeeStructureSection />
      <CalculatorSection />
      <CTASection />
    </main>
  );
};

export default Index;
