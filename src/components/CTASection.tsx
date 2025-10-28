import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const TEAM_REFERRAL_CODE = "TEAM_SILVER_SWAPTAG";

export const CTASection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-in fade-in duration-700">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of customers enjoying fair, transparent financial services.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-5 w-5 text-accent" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-5 w-5 text-accent" />
              <span>Instant setup</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-5 w-5 text-accent" />
              <span>24/7 support</span>
            </div>
          </div>

          <Button
            variant="accent"
            size="lg"
            className="text-base md:text-lg px-10 md:px-12 py-6 md:py-7 group"
            asChild
          >
            <a
              href={`https://vitalswap.com/signup?ref=${TEAM_REFERRAL_CODE}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>

          <p className="text-sm text-muted-foreground">
            No credit card required • Get started in minutes
          </p>
        </div>
      </div>
    </section>
  );
};
