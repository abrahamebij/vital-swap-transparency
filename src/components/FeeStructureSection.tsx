import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { FeeData, FeeCategory } from "@/types/fee";

export const FeeStructureSection = () => {
  const [feeData, setFeeData] = useState<FeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
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
      <AccordionItem key={categoryName} value={categoryName}>
        <AccordionTrigger className="text-base font-semibold">
          {categoryName}
        </AccordionTrigger>
        <AccordionContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Fee
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/50 hover:bg-secondary/10 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm">{item.Service}</td>
                    <td className="py-3 px-4 text-sm font-medium">
                      {item.Fee}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {item.Description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionContent>
      </AccordionItem>
    ));
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 px-4/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
          </div>
          <Card className="shadow-card">
            <CardContent className="p-8">
              <Skeleton className="h-10 w-full mb-8" />
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-4/30 mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-in fade-in duration-700">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Fees</h2>
          <p className="text-muted-foreground text-lg">
            Clear pricing for individuals and businesses
          </p>
        </div>

        <Card className="shadow-card border-0">
          <CardContent className="p-6 md:p-8">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                <TabsTrigger value="personal" className="text-base">
                  Personal
                </TabsTrigger>
                <TabsTrigger value="business" className="text-base">
                  Business
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-0">
                {feeData?.Customer && (
                  <Accordion type="single" collapsible className="w-full">
                    {renderFeeTable(feeData.Customer)}
                  </Accordion>
                )}
              </TabsContent>

              <TabsContent value="business" className="mt-0">
                {feeData?.Business && (
                  <Accordion type="single" collapsible className="w-full">
                    {renderFeeTable(feeData.Business)}
                  </Accordion>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
