import type { MetadataRoute } from "next";
import { listContentSlugs } from "@/lib/content";

const siteUrl = "https://derechoartificial.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Rutas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/firma-scarpa`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/jurisprudencia`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/actualidad-ia`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/legislacion`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/guias-protocolos`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/quienes-somos`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/contacto`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/aviso-legal`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/politica-de-privacidad`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/en`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/en/scarpa-firm`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/en/jurisprudence`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/en/ai-news`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/en/legislation`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/en/guides-protocols`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/en/about-us`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/en/contact`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];

  // Rutas dinámicas de Firma Scarpa
  const firmaScarpaSlugs = await listContentSlugs("firma-scarpa");
  const firmaScarpaRoutes: MetadataRoute.Sitemap = firmaScarpaSlugs.map((slug) => ({
    url: `${siteUrl}/firma-scarpa/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Ruta específica de Sentencia BOSCO
  const boscoRoute: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/jurisprudencia/sentencia-bosco-transparencia-algoritmica`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...firmaScarpaRoutes, ...boscoRoute];
}
