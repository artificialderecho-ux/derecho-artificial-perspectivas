import { MetadataRoute } from 'next'
import { listContentSlugs, getContentEntry } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.derechoartificial.com'

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/firma-scarpa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/jurisprudencia`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/normativa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/actualidad-ia`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/recursos/guias`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/quienes-somos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Artículos normales de Firma Scarpa
  const contentSlugs = await listContentSlugs('firma-scarpa')
  const contentEntries = await Promise.all(
    contentSlugs.map(slug => getContentEntry('firma-scarpa', slug))
  )

  const articlePages = contentEntries.map(entry => ({
    url: `${baseUrl}/firma-scarpa/${entry.slug}`,
    lastModified: new Date(entry.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...articlePages]
}