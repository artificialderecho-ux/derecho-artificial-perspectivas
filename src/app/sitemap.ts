import { MetadataRoute } from 'next';
import { listContentSlugs, getContentEntry, ContentSection } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.derechoartificial.com';

  // 1. Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/firma-scarpa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/jurisprudencia`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/normativa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/actualidad-ia`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/recursos/guias`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/quienes-somos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // 2. Artículos dinámicos de todas las secciones de contenido
  const contentSections: ContentSection[] = ['firma-scarpa', 'actualidad-ia', 'normativa', 'posts'];
  let allArticlePages: MetadataRoute.Sitemap = [];

  for (const section of contentSections) {
    try {
      const slugs = await listContentSlugs(section);
      const entries = await Promise.all(
        slugs.map(slug => getContentEntry(section, slug))
      );

      const sectionPages = entries
        .filter(entry => entry !== null)
        .map(entry => ({
          url: `${baseUrl}/${section}/${entry!.slug}`,
          lastModified: new Date(entry!.datePublished),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }));
      
      allArticlePages = [...allArticlePages, ...sectionPages];
    } catch (error) {
      console.error(`Error processing section ${section}:`, error);
    }
  }

  return [...staticPages, ...allArticlePages];
}

