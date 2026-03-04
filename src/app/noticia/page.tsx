import type { Metadata } from "next";
import Link from "next/link";
import { getAllNoticias } from "@/lib/mdx-utils";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Noticias - Derecho Artificial",
  description: "Últimas noticias sobre inteligencia artificial, derecho, tecnología y regulación. Mantente informado sobre los desarrollos más recientes en IA legal.",
  keywords: ["noticias IA", "derecho artificial", "tecnología legal", "regulación IA", "actualidad jurídica"],
  alternates: {
    canonical: "/noticia",
  },
  openGraph: {
    type: "website",
    title: "Noticias - Derecho Artificial",
    description: "Últimas noticias sobre inteligencia artificial y derecho",
    url: "/noticia",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function NoticiaPage() {
  const noticiaPosts = getAllNoticias();

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Noticias",
        url: "https://derechoartificial.com/noticia",
      },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-4">Noticias</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Últimas noticias sobre inteligencia artificial, derecho, tecnología y regulación. 
              Mantente informado sobre los desarrollos más recientes en IA legal.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6">
            {noticiaPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No hay noticias disponibles en este momento.</p>
              </div>
            ) : (
              noticiaPosts.map((post) => {
                // Si el post tiene una URL externa, mostrar como enlace externo
                if (post.frontmatter.url && post.frontmatter.url.startsWith('http')) {
                  return (
                    <article key={post.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            <a 
                              href={post.frontmatter.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-blue-600 transition-colors"
                            >
                              {post.frontmatter.title}
                            </a>
                          </h2>
                          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <span>📅 {new Date(post.frontmatter.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            {post.frontmatter.source && <span>📰 {post.frontmatter.source}</span>}
                            <span>🔗 Enlace externo</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                }

                // Si no tiene URL externa, mostrar como enlace interno
                return (
                  <article key={post.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                          <Link href={post.url} className="hover:text-blue-600 transition-colors">
                            {post.frontmatter.title}
                          </Link>
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>📅 {new Date(post.frontmatter.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          {post.frontmatter.source && <span>📰 {post.frontmatter.source}</span>}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
