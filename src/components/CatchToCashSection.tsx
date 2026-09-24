import { Scan, TrendingUp, Sparkles, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import fishScannerImage from "@/assets/fish-scanner.jpg";

const features = [
  {
    icon: Scan,
    title: "Species Detection",
    description: "Instantly identify fish species with AI-powered recognition",
  },
  {
    icon: TrendingUp,
    title: "Size Estimation",
    description: "Accurate measurements and weight calculations",
  },
  {
    icon: Sparkles,
    title: "Freshness Detection",
    description: "Quality assessment to ensure optimal freshness",
  },
  {
    icon: DollarSign,
    title: "Price Prediction",
    description: "Real-time market price insights for better deals",
  },
];

const CatchToCashSection = () => {
  return (
    <section id="catch-to-cash" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            AI-based Fish Identification & Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your catch into cash with intelligent species recognition and market insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Image Mockup */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 ocean-gradient rounded-3xl opacity-20 blur-2xl"></div>
              <img
                src={fishScannerImage}
                alt="Fish Scanner Interface"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="order-1 md:order-2 grid gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatchToCashSection;
