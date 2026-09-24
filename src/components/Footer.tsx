import { Waves, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/public/favicon.ico.png"
                alt="SagarMitr Logo"
                className="h-12 w-auto object-contain"
                style={{ marginRight: "8px" }}
              />

              <span className="text-2xl font-bold">SagarMitr</span>
            </div>
            <p className="text-white/70 mb-4">
              Empowering fishermen with smart technology for better catch insigths and weather predictions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                <MapPin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-white/70 hover:text-secondary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#catch-to-cash" className="text-white/70 hover:text-secondary transition-colors">
                  Catch-to-Cash
                </a>
              </li>
              <li>
                <a href="#weather" className="text-white/70 hover:text-secondary transition-colors">
                  Weather
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60">
            Made with <span className="text-red-400">❤️</span> by Team SagarMitr © 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
