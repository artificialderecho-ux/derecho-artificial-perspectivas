import Head from "next/head";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  lang?: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  author?: string;
  hreflangs?: { lang: string; href: string }[];
  noIndex?: boolean;
}

export function SEOHead({
  title = "Derecho Artificial | Análisis jurídico y ético de la inteligencia artificial",
  description = "Proyecto editorial independiente dedicado al análisis crítico del Derecho, la ética y la práctica jurídica en la era de la inteligencia artificial.",
  canonical = "https://derechoartificial.com",
  lang = "es",
  type = "website",
  image,
  publishedTime,
  author = "Derecho Artificial",
  hreflangs = [],
  noIndex = false,
}: SEOHeadProps) {
  let siteUrl = canonical;
  try {
    siteUrl = new URL(canonical).origin;
  } catch {
    siteUrl = canonical;
  }

  const baseSchema = [
    {
      "@type": "LegalService",
      "name": "Derecho Artificial",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo-principal.png`
      },
      "sameAs": [
        "https://www.linkedin.com/company/derecho-artificial",
        "https://twitter.com/derechoIA"
      ],
      "knowsAbout": ["AI Law", "Legaltech", "European Regulation", "GDPR", "Digital Ethics"],
      "description": "Análisis jurídico y ético de la inteligencia artificial, regulación europea y transformación digital del sector legal.",
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "European Union"
      }
    },
    {
      "@type": "WebSite",
      "name": "Derecho Artificial",
      "url": siteUrl,
      "description": description,
      "inLanguage": lang === "es" ? "es-ES" : "en",
    }
  ];

  const articleSchema = type === "article" ? {
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": publishedTime,
    "dateModified": publishedTime, // Asumimos modificación igual a publicación si no se provee
    "author": {
      "@type": "Organization", // Cambiado a Organization para E-E-A-T corporativo o Person si es específico
      "name": author,
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Derecho Artificial",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo-da.jpg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical
    },
    "mentions": [
      {
        "@type": "Legislation",
        "name": "European Union AI Act",
        "url": "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
      }
    ]
  } : {
    "@type": "WebPage",
    "name": title,
    "url": canonical,
    "description": description,
    "inLanguage": lang === "es" ? "es-ES" : "en",
    "isPartOf": {
      "@type": "WebSite",
      "url": siteUrl,
    },
  };

  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseSchema,
      articleSchema
    ],
  };

  return (
    <Head>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"} />
      <meta name="author" content={author} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={lang === "es" ? "es_ES" : "en_US"} />
      
      {hreflangs.map((h) => (
        <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
      ))}

      <meta property="og:site_name" content="Derecho Artificial" />
      <meta property="og:image" content={image || `${siteUrl}/logo-principal.png`} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === "article" && <meta property="article:author" content={author} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@derechoIA" />
      <meta name="twitter:creator" content="@derechoIA" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || `${siteUrl}/logo-principal.png`} />
      
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>
    </Head>
  );
}
