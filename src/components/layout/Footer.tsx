import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-divider bg-background">
      <div className="container-wide section-spacing-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-medium text-foreground">
                Derecho Artificial
              </span>
            </Link>
            <p className="mt-6 text-body leading-relaxed max-w-sm">
              Análisis crítico e independiente sobre la intersección del Derecho, 
              la Ética y la Inteligencia Artificial para el mundo hispanohablante.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-7">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-caption mb-6">
              Navegación
            </h4>
            <nav className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
              <Link to="/" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                Inicio
              </Link>
              <Link to="/analisis" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                Análisis
              </Link>
              <Link to="/documentos" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                Documentos
              </Link>
              <Link to="/software-ia-legal" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                Software IA legal
              </Link>
              <Link to="/noticias" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                Noticias
              </Link>
              <Link to="/manifiesto" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                Manifiesto editorial
              </Link>
              <Link to="/sobre" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                Sobre nosotros
              </Link>
              <Link to="/contacto" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                Contacto
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-10 border-t border-divider">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs text-caption tracking-wide">
              © {currentYear} Derecho Artificial
            </p>
            <p className="text-xs text-caption tracking-wide">
              Un proyecto editorial independiente
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}