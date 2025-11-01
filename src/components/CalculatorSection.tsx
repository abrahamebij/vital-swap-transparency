import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, ExternalLink, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TEAM_REFERRAL_CODE = "@abrahamebij";

export const CalculatorSection = () => {
  const [usdAmount, setUsdAmount] = useState<string>("100");
  const [exchangeRate, setExchangeRate] = useState<number>(1480);
  const [loading, setLoading] = useState(true);
  const [leftValue, setLeftValue] = useState("USD");
  const [rightValue, setRightValue] = useState("NGN");
  const { toast } = useToast();

  const handleSwap = () => {
    setLeftValue(rightValue);
    setRightValue(leftValue);
  };

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://2kbbumlxz3.execute-api.us-east-1.amazonaws.com/default/exchange?from=USD&to=NGN"
        );
        const data = await response.json();
        setExchangeRate(data.rate || 1480);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        toast({
          title: "Using default rate",
          description: "Could not fetch live rate. Using $1 = ₦1480",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [toast]);

  const calculateNGN = (amount: string): string => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * exchangeRate).toFixed(2);
  };
  const calculateUSD = (amount: string): string => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount / exchangeRate).toFixed(2);
  };
  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setUsdAmount(value);
    }
  };

  return (
    <section id="calculator" className="py-16 md:py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-in fade-in duration-700">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Real-Time FX Swap Calculator
          </h2>
          <p className="text-muted-foreground text-lg">
            See exactly how much your recipient will receive
          </p>
        </div>
        <div className="grid lg:flex gap-4 mx-auto justify-center">
          <img
            src="/calculator.png"
            className="rounded-xl max-w-lg mx-auto w-full"
            alt=""
          />
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xl">Calculate Your Swap</span>
                <span className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  Live Exchange Rate:{" "}
                  {leftValue === "USD"
                    ? `$1 = ₦${exchangeRate.toLocaleString()}`
                    : `₦1 = $${(1 / exchangeRate).toFixed(4)}`}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center flex-wrap justify-center gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="usd-amount"
                    className="text-base font-semibold"
                  >
                    You Send
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                      {leftValue === "USD" ? "$" : "₦"}
                    </span>
                    <Input
                      id="usd-amount"
                      type="text"
                      value={usdAmount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="pl-8 text-lg h-14 font-semibold"
                      placeholder="0.00"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {leftValue}
                    </span>
                  </div>
                </div>

                {/* Swap Currencies */}
                <button
                  className="p-2 shrink-0 size-12 bg-primary rounded-full flex justify-center items-center text-white text-center focus:scale-95 duration-300"
                  onClick={handleSwap}
                  aria-label="Swap Currencies"
                >
                  <ArrowRightLeft />
                </button>

                <div className="space-y-2">
                  <Label
                    htmlFor="ngn-amount"
                    className="text-base font-semibold"
                  >
                    Recipient Gets
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                      {rightValue === "USD" ? "$" : "₦"}
                    </span>
                    <Input
                      id="ngn-amount"
                      type="text"
                      value={
                        leftValue === "USD"
                          ? calculateNGN(usdAmount)
                          : calculateUSD(usdAmount)
                      }
                      disabled
                      className="pl-8 text-lg h-14 font-semibold/50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {rightValue}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-base mb-3">Fee Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Amount to Convert:
                    </span>
                    <span className="font-semibold">
                      {leftValue === "USD"
                        ? `$${usdAmount || "0.00"}`
                        : `₦${usdAmount || "0.00"}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      FX Transaction Fee:
                    </span>
                    <span className="font-semibold text-accent">FREE</span>
                  </div>

                  <div className="h-px bg-border my-2" />

                  <div className="flex justify-between text-base">
                    <span className="font-semibold">
                      Recipient Will Receive:
                    </span>
                    <span className="font-bold text-primary">
                      {rightValue === "USD"
                        ? `$${parseFloat(
                            calculateUSD(usdAmount)
                          ).toLocaleString()}`
                        : `₦${parseFloat(
                            calculateNGN(usdAmount)
                          ).toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="default"
                size="lg"
                className="w-full text-base py-6"
                asChild
              >
                <a
                  href={`https://vitalswap.com/signup?ref=${TEAM_REFERRAL_CODE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start This Swap Now
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
