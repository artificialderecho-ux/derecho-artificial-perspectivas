import type { Metadata } from "next";
import "../index.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import {
  StructuredData,
  createOrganizationJsonLd,
  createPersonJsonLd,
  createWebSiteJsonLd,
} from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://derechoartificial.com"),
  title: {
    default: "Derecho Artificial",
    template: "%s | Derecho Artificial",
  },
  description:
    "Análisis jurídico, ético y regulatorio de la inteligencia artificial. Enfoque editorial independiente centrado en normativa, jurisprudencia y práctica jurídica.",
  keywords: [
    "derecho artificial",
    "inteligencia artificial",
    "regulación IA",
    "AI Act",
    "RGPD",
    "jurisprudencia",
    "cumplimiento",
    "ética",
    "tecnología y derecho",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Derecho Artificial",
    url: "https://derechoartificial.com",
    title: "Derecho Artificial",
    description:
      "Análisis jurídico, ético y regulatorio de la inteligencia artificial. Enfoque editorial independiente centrado en normativa, jurisprudencia y práctica jurídica.",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Derecho Artificial",
    description:
      "Análisis jurídico, ético y regulatorio de la inteligencia artificial. Enfoque editorial independiente centrado en normativa, jurisprudencia y práctica jurídica.",
    images: ["/logo-principal.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <StructuredData
          data={[
            createOrganizationJsonLd(),
            createWebSiteJsonLd(),
            createPersonJsonLd({
              name: "Ricardo Scarpa",
              url: "https://derechoartificial.com/quienes-somos",
              description:
                "Responsable editorial de Derecho Artificial. Licenciado en Derecho por la Universidad Europea de Madrid. Máster en Informática Jurídica por la UNED. Máster en Dirección de Empresas Audiovisuales por el Instituto de Empresa (IE) de Madrid.",
            }),
          ]}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
