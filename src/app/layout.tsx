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
  metadataBase: new URL("https://www.derechoartificial.com"),
  title: {
    default: "Derecho, ética y regulación de la IA | Derecho Artificial",
    template: "%s | Derecho Artificial",
  },
  description:
    "Análisis jurídico independiente sobre inteligencia artificial, Reglamento IA, ética y compliance para abogados y profesionales.",
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
    url: "https://www.derechoartificial.com",
    title: "Derecho Artificial | Análisis Jurídico de IA, Ética y Regulación",
    description:
      "Guías prácticas y criterio experto sobre el impacto legal de la IA. Referencia para abogados y compliance.",
    locale: "es_ES",
    images: [
      {
        url: "https://www.derechoartificial.com/og-home-1200x630.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Derecho Artificial | IA, Ética y Regulación",
    description:
      "Análisis jurídico independiente sobre inteligencia artificial, Reglamento IA, ética y compliance.",
    images: ["https://www.derechoartificial.com/og-home-1200x630.jpg"],
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
              url: "https://www.derechoartificial.com/quienes-somos",
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
