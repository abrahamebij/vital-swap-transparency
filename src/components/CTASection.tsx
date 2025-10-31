// 1. Import motion from framer-motion
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const TEAM_REFERRAL_CODE = "teamsilver"; // Example referral code

// 2. Define animation variants for a staggered entrance effect
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const CTASection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-primary bg-blend-darken bg-right-top relative overflow-hidden">
      {/* 3. Add subtle, continuous animation to background elements */}
      <motion.img
        src="/decoration.png"
        alt="Decoration"
        className="absolute w-40 md:w-52 lg:w-80 -right-20 -top-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.img
        src="/decoration.png"
        alt="Decoration"
        className="absolute w-40 md:w-52 lg:w-80 -left-20 -bottom-8"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* 4. Animate the main container into view */}
      <motion.div
        className="container mx-auto max-w-4xl z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Join thousands of customers enjoying fair, transparent financial
              services.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <Check className="h-5 w-5 text-accent" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <Check className="h-5 w-5 text-accent" />
              <span>Instant setup</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <Check className="h-5 w-5 text-accent" />
              <span>24/7 support</span>
            </div>
          </motion.div>

          {/* 5. Add hover and tap microinteractions to the button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="secondary"
              size="lg"
              className="text-base md:text-lg px-10 md:px-12 py-6 md:py-7 group"
              asChild
            >
              <a
                href={`https://app.vitalswap.com?ref=${TEAM_REFERRAL_CODE}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Create Your Free Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          <motion.p variants={itemVariants} className="text-sm text-gray-200">
            No credit card required • Get started in minutes
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};
