import type { Metadata } from "next";
import Link from "next/link";
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
    default: "Derecho, ética y regulación de la IA",
    template: "%s | Derecho Artificial",
  },
  description:
    "Análisis jurídico experto del Reglamento IA. Guías prácticas y criterio independiente para abogados y compliance.",
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
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Derecho Artificial",
    url: "/",
    title: "Derecho Artificial",
    description:
      "Análisis jurídico experto del Reglamento IA. Guías prácticas y criterio independiente para abogados y compliance.",
    locale: "es_ES",
    images: [
      {
        url: "/og-home-1200x630.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Derecho Artificial",
    description:
      "Análisis jurídico experto del Reglamento IA. Guías prácticas y criterio independiente para abogados y compliance.",
    images: ["/og-home-1200x630.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="alternate" hrefLang="es" href="https://www.derechoartificial.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.derechoartificial.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.derechoartificial.com/" />
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
