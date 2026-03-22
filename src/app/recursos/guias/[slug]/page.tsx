import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import {
  StructuredData,
  createArticleJsonLd,
  createBreadcrumbJsonLd
} from "@/components/seo/StructuredData";
import { getPostBySlug, getAllPosts } from "@/lib/mdx-utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate } from "@/../date-utils";
import remarkGfm from "remark-gfm";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const mdxSlugs = getAllPosts()
    .filter((p) => {
      const category = (p.frontmatter.category || "").toLowerCase();
      const section = (p.frontmatter.section || "").toLowerCase();
      return category === "guias" || section === "guias";
    })
    .map(p => p.slug);

  return mdxSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const mdxPost = getPostBySlug(slug);

  if (mdxPost && (((mdxPost.frontmatter.category || "").toLowerCase() === "guias") || ((mdxPost.frontmatter.section || "").toLowerCase() === "guias"))) {
    const title = `${mdxPost.frontmatter.title} | Derecho Artificial`;
    const description = mdxPost.excerpt || mdxPost.frontmatter.description || "Análisis jurídico experto sobre recursos y guías en IA.";
    const canonical = `https://www.derechoartificial.com/recursos/guias/${slug}`;
    const ogImage = "/logo-principal.png";

    return {
      title,
      description,
      alternates: { canonical },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        type: "article",
        title: mdxPost.frontmatter.title,
        description,
        url: canonical,
        siteName: "Derecho Artificial",
        locale: "es_ES",
        images: [{ url: ogImage, width: 1200, height: 630, alt: mdxPost.frontmatter.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: mdxPost.frontmatter.title,
        description,
        images: [ogImage],
        creator: "@RicardoScarpa",
      },
    };
  }

  return {};
}

export default async function GuiasSlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const mdxPost = getPostBySlug(slug);

  if (mdxPost && (((mdxPost.frontmatter.category || "").toLowerCase() === "guias") || ((mdxPost.frontmatter.section || "").toLowerCase() === "guias"))) {
    const url = `https://derechoartificial.com/recursos/guias/${slug}`;
    const description = mdxPost.frontmatter.description || mdxPost.excerpt;
    const datePublished = new Date(mdxPost.frontmatter.date).toISOString().slice(0, 10);

    const jsonLd = createArticleJsonLd({
      url,
      headline: mdxPost.frontmatter.title,
      description,
      datePublished,
    });

    const breadcrumbJsonLd = createBreadcrumbJsonLd({
      items: [
        { name: "Derecho Artificial", url: "https://derechoartificial.com" },
        { name: "Actualidad IA", url: "https://derechoartificial.com/actualidad-ia" },
        { name: "Guías y Protocolos", url: "https://derechoartificial.com/recursos/guias" },
        { name: mdxPost.frontmatter.title, url },
      ],
    });

    return (
      <>
        <StructuredData data={jsonLd} />
        <StructuredData data={breadcrumbJsonLd} />
        <LegalLayout
          title={mdxPost.frontmatter.title}
          category="Guías y Protocolos"
          date={mdxPost.frontmatter.date}
          author={mdxPost.frontmatter.author ? { name: mdxPost.frontmatter.author } : undefined}
        >
          {mdxPost.frontmatter.pdf && (
            <div className="mb-12 p-8 bg-slate-50 border border-slate-200 rounded-sm not-prose">
              <a
                href={mdxPost.frontmatter.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-slate-800 transition !text-white"
              >
                Descargar documento original
              </a>
            </div>
          )}
          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-a:text-primary">
            <MDXRemote 
              source={mdxPost.content} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200">
            <RelatedArticles
              currentSlug={slug}
              currentTags={mdxPost.frontmatter.tags || []}
              currentCategory={mdxPost.frontmatter.category || "recursos"}
            />
          </div>
        </LegalLayout>
      </>
    );
  }

  notFound();
}
