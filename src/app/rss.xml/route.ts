import { NextResponse } from 'next/server'
import { listContentSlugs, getContentEntry, listSectionResourceSlugs, getSectionResourceEntry } from '@/lib/content'

export async function GET() {
  const baseUrl = 'https://www.derechoartificial.com'

  // Cargar artículos normales
  const contentSlugs = await listContentSlugs('firma-scarpa')
  const contentItems = await Promise.all(
    contentSlugs.map(slug => getContentEntry('firma-scarpa', slug))
  )

  // Cargar recursos
  const resourceSlugs = await listSectionResourceSlugs('firma-scarpa')
  const resourceItems = await Promise.all(
    resourceSlugs.map(slug => getSectionResourceEntry('firma-scarpa', slug))
  )

  // Unir y ordenar por fecha descendente
  const allItems = [...contentItems, ...resourceItems]
    .sort((a, b) => new Date(b.datePublished || b.date).getTime() - new Date(a.datePublished || a.date).getTime())

  // Generar XML RSS
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Derecho Artificial - Análisis jurídico sobre IA</title>
    <link>${baseUrl}</link>
    <description>Análisis crítico e independiente sobre la intersección del Derecho, la Ética y la Inteligencia Artificial para el mundo hispanohablante.</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />

    ${allItems.map(item => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${baseUrl}/firma-scarpa/${item.slug}</link>
      <guid>${baseUrl}/firma-scarpa/${item.slug}</guid>
      <pubDate>${new Date(item.datePublished || item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.description || item.excerpt || '')}</description>
    </item>`).join('')}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}

// Función auxiliar para escapar caracteres XML
function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, c => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[c]!))
}