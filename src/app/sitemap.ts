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

  // Artículos de Firma Scarpa
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

  // ✅ NUEVO: Artículos de /posts/
  let postsPages: MetadataRoute.Sitemap = []
  try {
    const postsSlugs = await listContentSlugs('posts')
    const postsEntries = await Promise.all(
      postsSlugs.map(slug => getContentEntry('posts', slug))
    )
    postsPages = postsEntries.map(entry => ({
      url: `${baseUrl}/posts/${entry.slug}`,
      lastModified: new Date(entry.datePublished || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.warn('No se encontraron artículos en /posts/', error)
  }

  return [...staticPages, ...articlePages, ...postsPages]
}
