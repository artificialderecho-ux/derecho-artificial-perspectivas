import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Análisis", href: "/analisis" },
  { name: "Manifiesto editorial", href: "/manifiesto" },
  { name: "Sobre Derecho Artificial", href: "/sobre" },
  { name: "Contacto", href: "/contacto" },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-divider bg-background">
      <div className="container-wide">
        <div className="flex items-center justify-between py-8 md:py-10">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              Derecho Artificial
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-caption mt-1">
              Ley · Ética · Inteligencia Artificial
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm tracking-wide transition-colors duration-300 ${
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-caption hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="xl:hidden p-2 -mr-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="xl:hidden border-t border-divider py-8">
            <div className="flex flex-col gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base transition-colors duration-300 ${
                    location.pathname === item.href
                      ? "text-foreground"
                      : "text-caption hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}