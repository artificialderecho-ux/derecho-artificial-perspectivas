import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-divider bg-background">
      <div className="container-wide section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-serif text-xl font-medium text-foreground">
                Derecho Artificial
              </span>
            </Link>
            <p className="mt-4 text-sm text-body leading-relaxed max-w-xs">
              Análisis crítico e independiente sobre la intersección del Derecho, 
              la Ética y la Inteligencia Artificial para el mundo hispanohablante.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="font-sans text-sm font-medium uppercase tracking-wider text-caption mb-4">
              Navegación
            </h4>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-3">
              <Link to="/" className="text-sm text-body hover:text-foreground transition-colors">
                Inicio
              </Link>
              <Link to="/analisis" className="text-sm text-body hover:text-foreground transition-colors">
                Análisis
              </Link>
              <Link to="/documentos" className="text-sm text-body hover:text-foreground transition-colors">
                Documentos
              </Link>
              <Link to="/software-ia-legal" className="text-sm text-body hover:text-foreground transition-colors">
                Software IA legal
              </Link>
              <Link to="/noticias" className="text-sm text-body hover:text-foreground transition-colors">
                Noticias
              </Link>
              <Link to="/manifiesto" className="text-sm text-body hover:text-foreground transition-colors">
                Manifiesto editorial
              </Link>
              <Link to="/sobre" className="text-sm text-body hover:text-foreground transition-colors">
                Sobre Derecho Artificial
              </Link>
              <Link to="/contacto" className="text-sm text-body hover:text-foreground transition-colors">
                Contacto
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-divider">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs text-caption">
              © {currentYear} Derecho Artificial. Contenido bajo licencia Creative Commons.
            </p>
            <p className="text-xs text-caption">
              Un proyecto editorial independiente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
