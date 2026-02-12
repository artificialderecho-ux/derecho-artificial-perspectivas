import Link from 'next/link'

interface BreadcrumbItem {
  name: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.derechoartificial.com${item.href}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="py-4 text-sm text-gray-500">
        <ol className="flex space-x-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <Link href={item.href} className="hover:text-blue-600">
                {item.name}
              </Link>
              {index < items.length - 1 && <span className="mx-2">›</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}