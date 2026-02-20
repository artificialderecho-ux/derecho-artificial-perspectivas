import type { Metadata } from "next";
import ArticleContent from "@/content/posts/articulo_ia_agentica.mdx";
import NormativaIA from "@/components/normativa_ia_agentica";
import FlujosIA from "@/components/flujos_ia_agentica";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createLegalArticleJsonLd } from "@/components/seo/StructuredData";

const title = "IA Agéntica y RGPD: Guía Completa sobre Protección de Datos Personales";
const description =
  "Guía práctica del impacto de la IA agéntica en el RGPD: vulnerabilidades, EIPD, prompt injection, shadow-leak y gobernanza arquitectónica. Obligaciones y recomendaciones 2026.";
const url = "https://www.derechoartificial.com/normativa/ia-agentica";
const image = "/images/sections/normativa.jpg";
const datePublished = "2026-02-18";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ia-agentica",
    "rgpd",
    "proteccion-datos",
    "eipd",
    "prompt-injection",
    "shadow-leak",
  ],
  alternates: {
    canonical: url,
  },
  openGraph: {
    type: "article",
    title,
    description,
    url,
    siteName: "Derecho Artificial",
    locale: "es_ES",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@RicardoScarpa",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const articleJsonLd = createLegalArticleJsonLd({
  url,
  headline: title,
  description,
  datePublished,
  authorName: "Ricardo Scarpa",
});

export default function IAAgenticaPage() {
  return (
    <>
      <StructuredData data={articleJsonLd} />
      <LegalLayout
        title={title}
        category="Normativa IA"
        date={datePublished}
        author={{ name: "Ricardo Scarpa", href: "/quienes-somos" }}
      >
        <ArticleContent />
      </LegalLayout>
      <NormativaIA />
      <FlujosIA />
    </>
  );
}

