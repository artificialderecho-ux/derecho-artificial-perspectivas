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
  title: "Thaler v. Perlmutter ante el Tribunal Supremo de EE. UU.: ¿puede la IA ser autora de una obra protegida por derechos de autor?",
  description: "Análisis IRAC de la petición de certiorari en Thaler v. Perlmutter (octubre 2025): la batalla legal por el copyright de obras generadas autónomamente por inteligencia artificial y sus implicaciones para el marco europeo de propiedad intelectual.",
  keywords: [
    "Thaler v. Perlmutter",
    "copyright inteligencia artificial",
    "autoría IA derechos de autor",
    "Tribunal Supremo Estados Unidos IA",
    "obras generadas por IA",
    "Creativity Machine copyright",
    "Copyright Act autoría no humana",
    "propiedad intelectual IA Europa",
    "certiorari IA 2025",
    "Reglamento IA derechos autor"
  ],
  alternates: {
    canonical: "/jurisprudencia/thaler-perlmutter-certiorari-supremo-copyright-ia",
    languages: {
      "es-ES": "/jurisprudencia/thaler-perlmutter-certiorari-supremo-copyright-ia",
      "en-US": "/en/jurisprudence/thaler-perlmutter-certiorari-supreme-court-copyright-ai",
    },
  },
  openGraph: {
    type: "article",
    title: "Thaler v. Perlmutter ante el Tribunal Supremo: ¿puede la IA ser autora de una obra con copyright?",
    description: "Análisis IRAC de la petición de certiorari en Thaler v. Perlmutter: la batalla legal por el copyright de obras generadas autónomamente por inteligencia artificial.",
    url: "/jurisprudencia/thaler-perlmutter-certiorari-supremo-copyright-ia",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function ThalerPerlmutterPage() {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === "thaler-perlmutter-certiorari-supremo-copyright-ia");
  
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
        name: "Thaler v. Perlmutter",
        url: "https://derechoartificial.com/jurisprudencia/thaler-perlmutter-certiorari-supremo-copyright-ia",
      },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <LegalLayout
        title={post.frontmatter.title}
        category="Jurisprudencia IA"
        author={{ name: "Derecho Artificial", href: "/quienes-somos" }}
        date={post.frontmatter.date}
      >
        {/* Metadatos del artículo */}
        <div className="mb-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>📅 {new Date(post.frontmatter.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>📝 {post.frontmatter.authors?.[0] || 'Derecho Artificial'}</span>
          <span>🏷️ {post.frontmatter.category}</span>
          {post.frontmatter.readingTime && (
            <span>⏱️ {post.frontmatter.readingTime} min</span>
          )}
          {post.frontmatter.lastModified && (
            <span>🔄 Actualizado: {new Date(post.frontmatter.lastModified).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          )}
        </div>

        {/* PDF Download Box */}
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 4H9m0 4h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">SENTENCIA</h3>
                <p className="text-sm text-blue-700">Petición de Certiorari - Thaler v. Perlmutter</p>
              </div>
            </div>
            <Link
              href="/fuentes/thaler-perlmutter-certiorari-copyright-ia.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar PDF
            </Link>
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
        }

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
            currentCategory={post.frontmatter.category || "jurisprudencia ia"}
          />
        </div>
      </LegalLayout>
    </>
  );
}
