import { useState, useEffect } from "react";
// 1. Import motion from framer-motion
import { motion, Variants } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { FeeData, FeeCategory } from "@/types/fee";

// 2. Define our animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

const accordionContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075, // Staggers the animation of each accordion item
    },
  },
};

const accordionItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};


export const FeeStructureSection = () => {
  const [feeData, setFeeData] = useState<FeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // ... (your data fetching logic remains exactly the same)
    const fetchFees = async () => {
      try {
        const response = await fetch(
          "https://2kbbumlxz3.execute-api.us-east-1.amazonaws.com/default/fee"
        );
        const data = await response.json();
        setFeeData(data);
      } catch (error) {
        console.error("Error fetching fees:", error);
        toast({
          title: "Error loading fees",
          description: "Please try refreshing the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFees();
  }, [toast]);

  const renderFeeTable = (category: FeeCategory) => {
    return Object.entries(category).map(([categoryName, items]) => (
      // 3. Convert AccordionItem to a motion component
      <motion.div variants={accordionItemVariants} key={categoryName}>
        <AccordionItem value={categoryName} className="border-b-0">
          <AccordionTrigger className="text-base font-semibold hover:bg-secondary/10 hover:text-primary rounded-md px-4 transition-colors">
            {categoryName}
          </AccordionTrigger>
          <AccordionContent>
             {/* ... table content remains the same ... */}
             <div className="overflow-x-auto pt-2">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Service</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Fee</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-secondary/10 transition-all hover:scale-[1.01]">
                      <td className="py-3 px-4 text-sm">{item.Service}</td>
                      <td className="py-3 px-4 text-sm font-medium">{item.Fee}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{item.Description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </motion.div>
    ));
  };
  
  // ... (your loading skeleton remains the same)
  if (loading) {
    return (
      <section className="py-16 md:py-24 px-4">
        {/* ... */}
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-4 mt-20">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Fees</h2>
          <p className="text-muted-foreground text-lg">
            Clear pricing for individuals and businesses
          </p>
        </motion.div>

        {/* 4. Convert Card to a motion component and apply variants */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // amount triggers animation when 20% is visible
        >
            <Card className="shadow-card border-0">
              <CardContent className="p-6 md:p-8">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                    <TabsTrigger value="personal" className="text-base">Personal</TabsTrigger>
                    <TabsTrigger value="business" className="text-base">Business</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="mt-0">
                    {feeData?.Customer && (
                      <motion.div
                        variants={accordionContainerVariants}
                        initial="hidden"
                        animate="visible" // Use animate here so it triggers when the tab is shown
                      >
                        <Accordion type="single" collapsible className="w-full space-y-2">
                          {renderFeeTable(feeData.Customer)}
                        </Accordion>
                      </motion.div>
                    )}
                  </TabsContent>

                  <TabsContent value="business" className="mt-0">
                    {feeData?.Business && (
                      <motion.div
                        variants={accordionContainerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Accordion type="single" collapsible className="w-full space-y-2">
                          {renderFeeTable(feeData.Business)}
                        </Accordion>
                      </motion.div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
        </motion.div>
      </div>
    </section>
  );
};