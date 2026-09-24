import { useNavigate } from "react-router-dom";
import { ArrowRight, Waves, Fish } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ocean.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 119, 182, 0.6), rgba(0, 150, 199, 0.7)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Empowering Fishermen with Smart Technology
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-95">
          Identify, Analyze, and Predict — Your Digital Fishing Companion.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="hero"
            size="xl"
            onClick={() => navigate("/catch-to-cash")}
            className="group"
          >
            Explore Catch-to-Cash
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="xl"
            onClick={() => navigate("/weather")}
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50"
          >
            Check Weather Forecast
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
