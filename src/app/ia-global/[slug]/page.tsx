import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  StructuredData,
  createArticleJsonLd,
  createGenericArticleJsonLd,
} from "@/components/seo/StructuredData";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getPostBySlug, getAllPosts } from "@/lib/mdx-utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const mdxPosts = getAllPosts().filter(
    (p) => (p.frontmatter.category || "").toLowerCase() === "ia-global",
  );
  return mdxPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mdxPost = getPostBySlug(slug);

  if (!mdxPost || (mdxPost.frontmatter.category || "").toLowerCase() !== "ia-global") {
    return {};
  }

  const { title, description, category, date } = mdxPost.frontmatter;
  const canonical = `https://www.derechoartificial.com/${category}/${slug}`;
  const metaDescription =
    mdxPost.excerpt ||
    description ||
    "Análisis comparado sobre regulación, justicia y gobernanza de la inteligencia artificial en el mundo.";

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
      authors: [mdxPost.frontmatter.author || "Ricardo Scarpa"],
    },
  };
}

export default async function IAGlobalSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const mdxPost = getPostBySlug(slug);

  if (!mdxPost || (mdxPost.frontmatter.category || "").toLowerCase() !== "ia-global") {
    notFound();
  }

  const { title, date, category, pdf, author } = mdxPost.frontmatter;

  const jsonLd = createArticleJsonLd({
    url: `https://www.derechoartificial.com/${category}/${slug}`,
    headline: title,
    description: mdxPost.excerpt,
    datePublished: date,
    authorName: author || "Ricardo Scarpa",
  });

  const genericJsonLd = createGenericArticleJsonLd({
    url: `https://www.derechoartificial.com/${category}/${slug}`,
    headline: title,
    description: mdxPost.excerpt,
    datePublished: date,
    authorName: author || "Ricardo Scarpa",
  });

  return (
    <>
      <StructuredData data={jsonLd} />
      <StructuredData data={genericJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "IA Global", href: "/ia-global" },
          { label: title, href: `/${category}/${slug}` },
        ]}
      />
      <LegalLayout
        title={title}
        category="IA Global"
        author={{ name: author || "Ricardo Scarpa", href: "/quienes-somos" }}
        date={date}
      >
        {pdf && (
          <div className="mb-12 p-8 bg-slate-50 border border-slate-200 rounded-sm not-prose">
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-slate-800 transition"
            >
              Descargar documento original
            </a>
          </div>
        )}
        <div className="mx-auto">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              img: (props: any) => <img {...props} loading="lazy" decoding="async" />,
            }}
          >
            {mdxPost.content}
          </ReactMarkdown>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-200">
          <RelatedArticles
            currentSlug={slug}
            currentTags={mdxPost.frontmatter.tags || []}
            currentCategory={mdxPost.frontmatter.category || "ia-global"}
          />
        </div>
      </LegalLayout>
    </>
  );
}
