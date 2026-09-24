import { useState, useEffect } from "react";
import { Waves, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-morphism shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <img
                src="/public/favicon.ico.png"
                alt="SagarMitr Logo"
                className="h-14 w-auto object-contain"
                style={{ marginRight: "8px" }}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SagarMitr
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("catch-to-cash")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Catch-to-Cash
            </button>
            <button
              onClick={() => scrollToSection("weather")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Weather
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-muted-foreground">
              Hello, <span className="font-semibold text-foreground">Ramesh!</span>
            </span>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
