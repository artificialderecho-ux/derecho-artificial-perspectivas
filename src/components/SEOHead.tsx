import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  lang?: string;
}

export function SEOHead({
  title = "Derecho Artificial | Análisis jurídico y ético de la inteligencia artificial",
  description = "Proyecto editorial independiente dedicado al análisis crítico del Derecho, la ética y la práctica jurídica en la era de la inteligencia artificial.",
  canonical = "https://derechoartificial.com",
  lang = "es",
}: SEOHeadProps) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Derecho Artificial",
    "url": "https://derechoartificial.com",
    "description": description,
    "inLanguage": lang === "es" ? "es-ES" : "en",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://derechoartificial.com/buscar?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Meta noindex temporal - eliminar cuando el sitio esté listo para indexación */}
      <meta name="robots" content="noindex, nofollow" />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === "es" ? "es_ES" : "en_US"} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>
    </Helmet>
  );
}
