import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById("calculator");
    calculatorSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative px-4  pt-20 overflow-hidden">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-transparent" /> */}

      <div className="text-center lg:text-start container mx-auto max-w-7xl relative flex flex-col-reverse gap-8 gap-y-20 lg:flex-row-reverse z-10">
        <img src="/hero.png" className="mx-auto w-1/2 max-w-md min-w-sm" />
        <div className="space-y-8 animate-in fade-in duration-700">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight">
            Simple, Transparent Pricing.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            No hidden fees, no surprises. See exactly what you'll pay for every
            service, and use our live calculator to simulate your swap.
          </p>

          <div className="pt-4">
            <Button
              onClick={scrollToCalculator}
              size="lg"
              className="text-base md:text-lg px-8 md:px-10 py-6 group"
            >
              Simulate Your Swap
              <ArrowDown className="ml-2 h-5 w-5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
