import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById("calculator");
    calculatorSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative px-4 pt-20 overflow-hidden">
      <div className="text-center lg:text-start container mx-auto max-w-7xl relative flex flex-col-reverse gap-8 gap-y-20 lg:flex-row-reverse z-10">
        <img
          src="/hero.png"
          // <-- ADDED: Entrance animation for the image -->
          className="mx-auto w-1/2 max-w-lg min-w-md animate-in fade-in slide-in-from-bottom-12 lg:slide-in-from-right-12 duration-700 delay-200"
        />
        {/* <-- REMOVED: Animation wrapper from this div --> */}
        <div className="space-y-8">
          <h1
            // <-- ADDED: Staggered entrance animation -->
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight animate-in fade-in duration-700"
          >
            Simple, Transparent Pricing.
          </h1>

          <p
            // <-- ADDED: Staggered entrance animation with delay -->
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-in fade-in duration-700 delay-150"
          >
            No hidden fees, no surprises. See exactly what you'll pay for every
            service, and use our live calculator to simulate your swap.
          </p>

          <div
            // <-- ADDED: Staggered entrance animation with more delay -->
            className="pt-4 animate-in fade-in duration-700 delay-300"
          >
            <Button
              onClick={scrollToCalculator}
              size="lg"
              // <-- ADDED: Click animation and transition -->
              className="text-base md:text-lg px-8 md:px-10 py-6 group transition-transform active:scale-95"
            >
              Simulate Your Swap
              <ArrowDown
                // <-- ADDED: Hover animation for the icon -->
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1"
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};