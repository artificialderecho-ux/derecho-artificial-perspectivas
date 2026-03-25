import { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import LegalLayout from "@/components/LegalLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import RelatedArticles from "@/components/RelatedArticles";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = getAllPosts().filter(
    (post) => (post.frontmatter.category || "").toLowerCase() === "jurisprudencia"
  );
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado | Derecho Artificial",
      description: "El artículo solicitado no existe en nuestro archivo.",
    };
  }

  const { title, description, date } = post.frontmatter;
  const metaDescription =
    post.excerpt || description || "Análisis jurídico experto sobre IA y derecho.";

  return {
    title: `${title} | Derecho Artificial`,
    description: metaDescription,
    openGraph: {
      type: "article",
      title,
      description: metaDescription,
      url: `https://www.derechoartificial.com/jurisprudencia/${slug}`,
      siteName: "Derecho Artificial",
      locale: "es_ES",
      publishedTime: date ? new Date(date).toISOString() : undefined,
      authors: ["Ricardo Scarpa"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
    },
  };
}

export default async function JurisprudenciaSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post || (post.frontmatter.category || "").toLowerCase() !== "jurisprudencia") {
    notFound();
  }

  const { title, date, category } = post.frontmatter;

  return (
    <LegalLayout
      title={title}
      category="Jurisprudencia IA"
      author={{ name: "Ricardo Scarpa", href: "/quienes-somos" }}
      date={date}
    >
      <div className="mx-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            img: (props: any) => <img {...props} loading="lazy" decoding="async" />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-200">
        <RelatedArticles
          currentSlug={slug}
          currentCategory="jurisprudencia"
          currentTags={post.frontmatter.tags || []}
        />
      </div>
    </LegalLayout>
  );
}
