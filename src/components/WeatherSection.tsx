import { Cloud, Wind, Waves, Sun, Thermometer } from "lucide-react";
import { Card } from "@/components/ui/card";
import weatherDashboardImage from "@/assets/weatherUI.jpeg";

const weatherFeatures = [
  {
    icon: Thermometer,
    label: "Temperature",
    description: "Real-time air and water temperature",
  },
  {
    icon: Wind,
    label: "Wind Speed",
    description: "Current wind conditions and forecasts",
  },
  {
    icon: Waves,
    label: "Tide Information",
    description: "High and low tide predictions",
  },
  {
    icon: Sun,
    label: "UV Index",
    description: "Sun exposure safety recommendations",
  },
];

const WeatherSection = () => {
  return (
    <section
      id="weather"
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(195, 100%, 95%) 0%, hsl(192, 100%, 90%) 100%)",
      }}
    >
      {/* Decorative cloud shapes */}
      <div className="absolute top-10 right-10 opacity-10">
        <Cloud className="h-32 w-32 text-primary animate-float" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10">
        <Cloud className="h-24 w-24 text-secondary animate-wave" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Weather Prediction & Fishing Forecast
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay Safe, Fish Smart — Know the Weather Before You Sail
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Weather Dashboard Mockup */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl"></div>
            <img
              src={weatherDashboardImage}
              alt="Weather Dashboard"
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </div>

          {/* Weather Features */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {weatherFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-primary/10"
                >
                  <feature.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-1 text-foreground">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>

            <Card className="p-6 ocean-gradient text-white">
              <h3 className="text-xl font-semibold mb-2">Fishing Suitability Score</h3>
              <p className="text-white/90 mb-4">
                Get AI-powered recommendations on the best times to fish based on comprehensive weather analysis
              </p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-white rounded-full"></div>
                </div>
                <span className="font-bold text-lg">85%</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
