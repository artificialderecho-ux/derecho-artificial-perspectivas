type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

function toJsonLd(data: JsonLdValue) {
  return JSON.stringify(data);
}

export function StructuredData({ data }: { data: JsonLdValue }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(data) }} />;
}

const siteUrl = "https://derechoartificial.com";

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Derecho Artificial",
    url: siteUrl,
    logo: `${siteUrl}/logo-principal.png`,
  };
}

export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Derecho Artificial",
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: ["es-ES", "en-US"],
  };
}

export function createPersonJsonLd(params: {
  name: string;
  url: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${params.url}#person`,
    name: params.name,
    url: params.url,
    description: params.description,
    worksFor: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function createArticleJsonLd(params: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: params.url,
    headline: params.headline,
    description: params.description,
    datePublished: params.datePublished,
    author: {
      "@type": "Person",
      name: params.authorName ?? "Ricardo Scarpa",
    },
    publisher: {
      "@type": "Organization",
      name: "Derecho Artificial",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-principal.png`,
      },
    },
  };
}

export function createLegalServiceJsonLd(params: {
  url: string;
  name: string;
  description: string;
  providerName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: params.name,
    url: params.url,
    description: params.description,
    provider: {
      "@type": "Organization",
      name: params.providerName ?? "Derecho Artificial",
      url: siteUrl,
      logo: `${siteUrl}/logo-principal.png`,
    },
  };
}

export function createLegalArticleJsonLd(params: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalArticle",
    mainEntityOfPage: params.url,
    headline: params.headline,
    description: params.description,
    datePublished: params.datePublished,
    author: {
      "@type": "Person",
      name: params.authorName ?? "Ricardo Scarpa",
    },
    publisher: {
      "@type": "Organization",
      name: "Derecho Artificial",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-principal.png`,
      },
    },
  };
}
