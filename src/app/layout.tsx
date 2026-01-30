import type { Metadata } from "next";
import "../index.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://derechoartificial.com"),
  title: {
    default: "Derecho Artificial",
    template: "%s | Derecho Artificial",
  },
  description:
    "Análisis jurídico, ético y regulatorio de la inteligencia artificial. Enfoque editorial independiente centrado en normativa, jurisprudencia y práctica jurídica.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

