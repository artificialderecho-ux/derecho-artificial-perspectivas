import Link from 'next/link'
import { listContentSlugs, getContentEntry } from '@/lib/content'

interface RelatedArticlesProps {
  currentSlug: string
}

export default async function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
  // Cargar todos los artículos normales
  const contentSlugs = await listContentSlugs('firma-scarpa')
  const contentItems = await Promise.all(
    contentSlugs.map(slug => getContentEntry('firma-scarpa', slug))
  )

  // Unir todo y filtrar el actual
  const allArticles = [...contentItems]
    .filter(item => item.slug !== currentSlug)
    .sort((a, b) => new Date(b.datePublished || b.date).getTime() - new Date(a.datePublished || a.date).getTime())
    .slice(0, 3) // solo 3

  if (allArticles.length === 0) return null

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Artículos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/firma-scarpa/${article.slug}`}
            className="group block"
          >
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-semibold text-lg leading-tight group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                  {article.description || article.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}