import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { LegalLayout } from "@/components/layout/LegalLayout";
import {
  StructuredData,
  createArticleJsonLd,
  createGenericArticleJsonLd,
} from "@/components/seo/StructuredData";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getPostBySlug, getAllPosts } from "@/lib/mdx-utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// PDFs que tienen recuadro especial
const PDF_BOXES: Record<string, string> = {
  "3050901.pdf": "SENTENCIA",
  "ABC_SentenciaIA_T323De2024.pdf": "SENTENCIA", 
  "Fletcher_v_Experian_Analisis_Juridico.pdf": "SENTENCIA",
  "NYT_Complaint_Dec2023.pdf": "DEMANDA",
  "Nippon_Life_v_OpenAI_20260304.pdf": "DEMANDA",
  "USCOURTS-cand-3_23-cv-00770-1.pdf": "SENTENCIA",
  "EFD_USA_v_BAND_PRO_FILM_AND_DIGITAL_IN_USA_18_February_2026.pdf": "SENTENCIA",
  "Kettering_USA_25_February_2026.pdf": "SENTENCIA",
  "Medal_v._Amazon_USA_27_February_2026.pdf": "SENTENCIA",
  "BeijingInternetCourtCivilJudgment112792023.pdf": "SENTENCIA",
  "ewhc_1383_2025.pdf": "SENTENCIA",
  "TA_Orleans_n_2506461_France_29_dec._2025.pdf": "SENTENCIA",
  "D085584.pdf": "SENTENCIA",
  "thaler-perlmutter-certiorari-copyright-ia.pdf": "SENTENCIA",
  "Zapata Vargas.pdf": "SENTENCIA",
  "amparo-directo-6-2025-scjn-jurisprudencia.pdf": "SENTENCIA",
  "jurisprudencia-ia-voice-cloning-lgberlin.pdf": "SENTENCIA",
  "analisis_ukut_ai_hallucinations_supervision_2026.pdf": "SENTENCIA",
  "caa_bordeaux_hallucinations_analisis.pdf": "SENTENCIA",
  "boligportal-redata-scraping-api-bases-datos-ia.pdf": "SENTENCIA",
  "usa_vs_heppner.pdf": "SENTENCIA",
  "xai-openai-trade-secrets-analisis.pdf": "SENTENCIA"
};

export async function generateStaticParams() {
  const [jsonSlugs, resourceSlugs] = await Promise.all([
    listContentSlugs("jurisprudencia"),
    listSectionResourceSlugs("jurisprudencia"),
  ]);
  
  // Incluir slugs de posts MDX que tengan sección jurisprudencia
  const mdxPosts = getAllPosts().filter(p => 
    (p.frontmatter.section || "").toLowerCase() === "jurisprudencia" ||
    (p.frontmatter.category || "").toLowerCase() === "jurisprudencia"
  );
  const mdxSlugs = mdxPosts.map(p => p.slug);

  const allSlugs = new Set<string>([...jsonSlugs, ...resourceSlugs, ...mdxSlugs]);
  const seed = allSlugs.size ? Array.from(allSlugs) : ["nota-editorial-inaugural"];
  return seed.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Priorizar MDX nativo
  const mdxPost = getPostBySlug(slug);
  if (mdxPost && ((mdxPost.frontmatter.category || "").toLowerCase() === "jurisprudencia" || (mdxPost.frontmatter.section || "").toLowerCase() === "jurisprudencia")) {
    const { title, description, category, date } = mdxPost.frontmatter;
    const metaDescription =
      mdxPost.excerpt || description || "Análisis jurídico experto sobre IA por Ricardo Scarpa.";
    const canonical = `https://www.derechoartificial.com/jurisprudencia/${slug}`;
    return {
      title: `${title} | Derecho Artificial`,
      description: metaDescription,
      alternates: { canonical },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        type: "article",
        title,
        description: metaDescription,
        url: canonical,
        siteName: "Derecho Artificial",
        locale: "es_ES",
        publishedTime: date ? new Date(date).toISOString() : undefined,
        authors: ["Ricardo Scarpa"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: metaDescription,
        creator: "@RicardoScarpa",
      },
    };
  }

  // Fallback a JSON legacy
  const jsonEntry = await getContentEntry("jurisprudencia", slug);
  if (jsonEntry) {
    const { title, description, datePublished } = jsonEntry;
    const metaDescription = description || "Análisis de jurisprudencia sobre inteligencia artificial.";
    const canonical = `https://www.derechoartificial.com/jurisprudencia/${slug}`;
    return {
      title: `${title} | Derecho Artificial`,
      description: metaDescription,
      alternates: { canonical },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        type: "article",
        title,
        description: metaDescription,
        url: canonical,
        siteName: "Derecho Artificial",
        locale: "es_ES",
        publishedTime: datePublished,
        authors: ["Ricardo Scarpa"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: metaDescription,
        creator: "@RicardoScarpa",
      },
    };
  }

  return notFound();
}

function PdfRecuadro({ pdf, pdfLabel }: { pdf?: string; pdfLabel?: string }) {
  if (!pdf) return null;

  // Extraer nombre del archivo de la ruta
  const fileName = pdf.split('/').pop() || '';
  
  // Buscar en el mapa de PDFs especiales
  const specialLabel = PDF_BOXES[fileName];
  const displayLabel = pdfLabel || specialLabel || "DOCUMENTO";

  return (
    <div className="mb-12 p-8 bg-slate-50 border border-slate-200 rounded-sm not-prose">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-8 bg-red-600 rounded-sm"></div>
        <span className="text-red-600 font-bold text-sm tracking-wider">
          {displayLabel}
        </span>
      </div>
      <p className="text-slate-700 mb-6 leading-relaxed">
        El documento completo en PDF incluye el análisis exhaustivo de la sentencia, 
        los argumentos de las partes, el fundamento jurídico del tribunal y las 
        implicaciones para la práctica profesional del derecho.
      </p>
      <Link
        href={pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 text-white font-medium rounded-sm hover:bg-red-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Descargar documento completo (PDF)
      </Link>
    </div>
  );
}

export default async function JurisprudenciaSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Intentar cargar desde MDX nativo primero
  const mdxPost = getPostBySlug(slug);
  if (mdxPost && ((mdxPost.frontmatter.category || "").toLowerCase() === "jurisprudencia" || (mdxPost.frontmatter.section || "").toLowerCase() === "jurisprudencia")) {
    const { title, date, category } = mdxPost.frontmatter;
    return (
      <LegalLayout
        title={title}
        category={category === "jurisprudencia" ? "Jurisprudencia IA" : (category || "Jurisprudencia IA")}
        author={{ name: "Ricardo Scarpa", href: "/quienes-somos" }}
        date={date}
      >
        {mdxPost.frontmatter.pdf && (
          <PdfRecuadro 
            pdf={mdxPost.frontmatter.pdf} 
            pdfLabel={mdxPost.frontmatter.pdfLabel} 
          />
        )}
        <article className="prose prose-slate prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({children, ...props}) => (
                <h1 className="text-4xl font-bold text-slate-900 mb-6" {...props}>
                  {children}
                </h1>
              ),
              h2: ({children, ...props}) => (
                <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8" {...props}>
                  {children}
                </h2>
              ),
            }}
          >
            {mdxPost.content}
          </ReactMarkdown>
        </article>
        <RelatedArticles 
          currentSlug={slug} 
          currentCategory="jurisprudencia"
        />
        <StructuredData 
          data={createArticleJsonLd({
            title,
            description: mdxPost.excerpt || "",
            url: `https://www.derechoartificial.com/jurisprudencia/${slug}`,
            date: date || "",
            author: "Ricardo Scarpa",
          })}
        />
      </LegalLayout>
    );
  }

  // Fallback a JSON legacy
  const jsonEntry = await getContentEntry("jurisprudencia", slug);
  if (jsonEntry) {
    const { title, datePublished, body } = jsonEntry;
    return (
      <LegalLayout
        title={title}
        category="Jurisprudencia IA"
        author={{ name: "Ricardo Scarpa", href: "/quienes-somos" }}
        date={datePublished}
      >
        <article className="prose prose-slate prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </article>
        <StructuredData 
          data={createGenericArticleJsonLd({
            title,
            description: jsonEntry.description || "",
            url: `https://www.derechoartificial.com/jurisprudencia/${slug}`,
            date: datePublished || "",
            author: "Ricardo Scarpa",
          })}
        />
      </LegalLayout>
    );
  }

  // Fallback a recursos
  const resourceEntry = await getSectionResourceEntry("jurisprudencia", slug);
  if (resourceEntry) {
    const { title, summaryHtml, displayDateMs } = resourceEntry;
    return (
      <LegalLayout
        title={title}
        category="Jurisprudencia IA"
        author={{ name: "Derecho Artificial", href: "/quienes-somos" }}
        date={displayDateMs ? new Date(displayDateMs).toISOString().split('T')[0] : undefined}
      >
        <article className="prose prose-slate prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: summaryHtml }} />
        </article>
      </LegalLayout>
    );
  }

  return notFound();
}
