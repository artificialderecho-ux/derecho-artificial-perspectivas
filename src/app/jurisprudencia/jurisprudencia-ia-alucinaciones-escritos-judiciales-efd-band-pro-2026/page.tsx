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
  title: "IA en el Derecho: Cuando las Alucinaciones Cuestan 900 Dolares — EFD USA v. Band Pro (2026)",
  description: "Analisis juridico del caso EFD USA, Inc. v. Band Pro Film & Digital Inc. (Cal. App. 2d Dist. 2026), primer precedente relevante sobre sanciones por uso indebido de IA generativa en escritos judiciales. Implicaciones para abogados en Espana y la UE.",
  keywords: [
    "IA en el derecho",
    "alucinaciones IA escritos judiciales",
    "responsabilidad abogados IA",
    "etica profesional abogacia",
    "sanciones IA tribunal",
    "EFD USA v Band Pro",
    "jurisprudencia IA",
  ],
  alternates: {
    canonical: "/jurisprudencia/jurisprudencia-ia-alucinaciones-escritos-judiciales-efd-band-pro-2026",
    languages: {
      "es-ES": "/jurisprudencia/jurisprudencia-ia-alucinaciones-escritos-judiciales-efd-band-pro-2026",
      "en-US": "/en/jurisprudence/ai-hallucinations-legal-documents-efd-band-pro-2026",
    },
  },
  openGraph: {
    type: "article",
    title: "IA en el Derecho: Cuando las Alucinaciones Cuestan 900 Dolares — EFD USA v. Band Pro (2026)",
    description: "Analisis juridico del caso EFD USA v. Band Pro Film & Digital Inc., primer precedente relevante sobre sanciones por uso indebido de IA generativa en escritos judiciales.",
    url: "/jurisprudencia/jurisprudencia-ia-alucinaciones-escritos-judiciales-efd-band-pro-2026",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function EFDUSABandProPage() {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === "jurisprudencia-ia-alucinaciones-escritos-judiciales-efd-band-pro-2026");
  
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
        name: "EFD USA v. Band Pro",
        url: "https://derechoartificial.com/jurisprudencia/jurisprudencia-ia-alucinaciones-escritos-judiciales-efd-band-pro-2026",
      },
    ],
  });

  const pdfUrl = "/fuentes/EFD_USA_v_BAND_PRO_FILM_AND_DIGITAL_IN_USA_18_February_2026.pdf";

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <LegalLayout
        title={post.frontmatter.title}
        category="Jurisprudencia IA"
        author={{ name: "Derecho Artificial", href: "/quienes-somos" }}
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
                Accede al análisis completo en formato PDF con la sentencia del caso EFD USA v. Band Pro Film & Digital Inc., el primer precedente relevante sobre sanciones por uso indebido de IA generativa en escritos judiciales. Análisis detallado de responsabilidad profesional y ética forense.
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
          <span>📝 {post.frontmatter.author || 'Derecho Artificial'}</span>
          <span>🏷️ {post.frontmatter.category}</span>
          {post.frontmatter.readingTime && (
            <span>⏱️ {post.frontmatter.readingTime}</span>
          )}
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
