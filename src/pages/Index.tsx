import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CatchToCashSection from "@/components/CatchToCashSection";
import WeatherSection from "@/components/WeatherSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <CatchToCashSection />
        <WeatherSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
