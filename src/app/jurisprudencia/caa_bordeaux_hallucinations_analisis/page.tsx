import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";
import { LegalLayout } from "@/components/layout/LegalLayout";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { defaultSchema } from 'hast-util-sanitize';
import { RelatedArticles } from "@/components/RelatedArticles";

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema as any).tagNames,
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'caption'
  ],
  attributes: {
    ...(defaultSchema as any).attributes,
    table: ['className'],
    thead: [],
    tbody: [],
    tr: [],
    th: ['align', 'colspan', 'rowspan'],
    td: ['align', 'colspan', 'rowspan'],
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    code: ['className']
  }
};

export const metadata: Metadata = {
  title: "CAA Bordeaux 2026: Hallucinations de IA en Procedimiento Judicial - Primera Sentencia sobre Alucinaciones Generadas por IA",
  description: "Análisis jurídico de sentencia francesa (CAA Bordeaux, 26 febrero 2026) que documenta el rechazo de una apelación basada en referencias jurídicas falsas generadas por sistema de IA. Caso histórico sobre confabulation, responsabilidad profesional abogados, y validez de argumentos basados en IA.",
  keywords: [
    "Hallucinations IA",
    "Alucinaciones ChatGPT",
    "Confabulation Legal",
    "Sentencia IA",
    "Responsabilidad Abogados IA",
    "CAA Bordeaux",
    "Jurisprudencia IA",
  ],
  alternates: {
    canonical: "/jurisprudencia/caa_bordeaux_hallucinations_analisis",
    languages: {
      "es-ES": "/jurisprudencia/caa_bordeaux_hallucinations_analisis",
      "en-US": "/en/jurisprudence/caa-bordeaux-hallucinations-ai-judgment",
    },
  },
  openGraph: {
    type: "article",
    title: "CAA Bordeaux 2026: Hallucinations de IA en Procedimiento Judicial - Primera Sentencia sobre Alucinaciones Generadas por IA",
    description: "Análisis jurídico de sentencia francesa que documenta el rechazo de una apelación basada en referencias jurídicas falsas generadas por sistema de IA. Caso histórico sobre confabulation y responsabilidad profesional.",
    url: "/jurisprudencia/caa_bordeaux_hallucinations_analisis",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function CAABordeauxHallucinationsPage() {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === "caa_bordeaux_hallucinations_analisis");
  
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
        name: "Jurisprudencia",
        url: "https://derechoartificial.com/jurisprudencia",
      },
      {
        name: "CAA Bordeaux Hallucinations",
        url: "https://derechoartificial.com/jurisprudencia/caa_bordeaux_hallucinations_analisis",
      },
    ],
  });

  const pdfUrl = "/fuentes/caa_bordeaux_hallucinations_analisis.pdf";

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <LegalLayout
        title={post.frontmatter.title}
        category="Jurisprudencia IA"
        author={{ name: "Análisis Jurídico", href: "/quienes-somos" }}
        date={post.frontmatter.date}
      >
        {/* Recuadro de descarga del PDF */}
        <div className="mb-12 p-8 bg-red-50 border border-red-200 rounded-sm not-prose">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-red-600"
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
              <h3 className="text-lg font-semibold text-red-900 mb-1">Sentencia Original</h3>
              <p className="text-sm text-red-700 mb-3">
                Accede al análisis completo en formato PDF con la sentencia histórica del CAA Bordeaux sobre hallucinations de IA, el rechazo de apelación basada en referencias falsas generadas por inteligencia artificial, y el análisis detallado de responsabilidad profesional de abogados.
              </p>
              <Link
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
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
                SENTENCIA
              </Link>
            </div>
          </div>
        </div>

        {/* Metadatos del artículo */}
        <div className="mb-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>📅 {new Date(post.frontmatter.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>📝 {post.frontmatter.author || 'Análisis Jurídico'}</span>
          <span>🏷️ {post.frontmatter.category}</span>
          {post.frontmatter.lastmod && (
            <span>🔄 Actualizado: {new Date(post.frontmatter.lastmod).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          )}
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

        {/* Tags */}
        {post.frontmatter.tags && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contenido del artículo */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, { schema: sanitizeSchema }]]}
            components={{
              img: (props: any) => <img {...props} loading="lazy" decoding="async" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <RelatedArticles
            currentSlug={post.slug}
            currentTags={post.frontmatter.tags || []}
            currentCategory={post.frontmatter.category || "jurisprudencia"}
          />
        </div>
      </LegalLayout>
    </>
  );
}
