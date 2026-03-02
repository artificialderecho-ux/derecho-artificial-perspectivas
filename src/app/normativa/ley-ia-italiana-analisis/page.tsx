import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";
import { MDXContent } from "@/components/MDXContent";

export const metadata: Metadata = {
  title: "Análisis Jurídico de la Ley Italiana 132/2025 sobre Inteligencia Artificial",
  description: "Estudio comprehensivo de la Ley italiana 23 septiembre 2025 n. 132 en materia de IA con análisis de gobernanza, transparencia, regulación sectorial y responsabilidad.",
  keywords: [
    "Ley italiana IA",
    "AI Act",
    "regulación inteligencia artificial",
    "gobernanza IA",
    "derecho digital",
    "Ley 132/2025",
    "Italia IA",
  ],
  alternates: {
    canonical: "/normativa/ley-ia-italiana-analisis",
    languages: {
      "es-ES": "/normativa/ley-ia-italiana-analisis",
      "en-US": "/en/legislation/italian-ai-law-analysis",
    },
  },
  openGraph: {
    type: "article",
    title: "Análisis Jurídico de la Ley Italiana 132/2025 sobre Inteligencia Artificial",
    description: "Estudio comprehensivo de la Ley italiana 23 septiembre 2025 n. 132 en materia de IA con análisis de gobernanza, transparencia, regulación sectorial y responsabilidad.",
    url: "/normativa/ley-ia-italiana-analisis",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function LeyIAItalianaPage() {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === "ley-ia-italiana-analisis");
  
  if (!post) {
    return <div>Post no encontrado</div>;
  }

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Normativa",
        url: "https://derechoartificial.com/normativa",
      },
      {
        name: "Ley Italiana IA",
        url: "https://derechoartificial.com/normativa/ley-ia-italiana-analisis",
      },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <main className="section-spacing">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src="/images/normativa.jpg"
            alt="Normativa de Inteligencia Artificial Italiana"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl mb-4">
                Ley Italiana 132/2025
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                Análisis Jurídico de la Regulación de Inteligencia Artificial en Italia
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Recuadro de descarga del PDF */}
            <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50/70 p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="h-8 w-8 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-amber-900 mb-1">Documento Original</h3>
                  <p className="text-sm text-amber-700 mb-3">
                    Accede al análisis completo en formato PDF con todas las referencias bibliográficas y notas jurídicas.
                  </p>
                  <Link
                    href="/fuentes/ley-ia-italiana-analisis.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    LEY
                  </Link>
                </div>
              </div>
            </div>

            {/* Metadatos del artículo */}
            <div className="mb-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>📅 {new Date(post.frontmatter.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>📝 {post.frontmatter.author || 'Ricardo Scarpa'}</span>
              <span>🏷️ {post.frontmatter.category}</span>
            </div>

            {/* Palabras clave */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.keywords?.map((keyword: string) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Contenido del artículo */}
            <article className="prose prose-lg max-w-none">
              <MDXContent source={post.content} />
            </article>

            {/* Navegación */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex justify-between">
                <Link
                  href="/normativa"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Volver a Normativa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
