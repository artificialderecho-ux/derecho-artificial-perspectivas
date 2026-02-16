import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Ética IA",
  description:
    "Análisis sobre ética algorítmica, responsabilidad profesional y gobernanza de sistemas de IA.",
  alternates: { canonical: "/etica-ia" },
  openGraph: {
    type: "website",
    title: "Ética IA",
    description:
      "Análisis sobre ética algorítmica, responsabilidad profesional y gobernanza de sistemas de IA.",
    url: "/etica-ia",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default async function EticaIAPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Ética IA", url: "https://derechoartificial.com/etica-ia" },
    ],
  });

  const mdxPosts = getAllPosts().filter(
    (post) => (post.frontmatter.category || "").toLowerCase() === "etica-ia",
  );

  const items = mdxPosts
    .map((post) => {
      const date = new Date(post.frontmatter.date);
      const safeDate = Number.isNaN(date.getTime())
        ? post.frontmatter.date
        : date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
      return {
        slug: post.slug,
        title: post.frontmatter.title,
        href: post.url,
        excerpt: post.excerpt,
        dateLabel: safeDate,
        author: post.frontmatter.author || "Ricardo Scarpa",
        dateMs: new Date(post.frontmatter.date).getTime(),
      };
    })
    .sort((a, b) => b.dateMs - a.dateMs);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Ética IA", href: "/etica-ia" },
        ]}
      />
      <LegalLayout
        title="Ética IA"
        category="Secciones"
        date={new Date().toISOString().slice(0, 10)}
        hero={
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/images/sections/etica.jpg"
              alt="Ética IA"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">
                Ética IA
              </h1>
            </div>
          </div>
        }
      >
        <div className="space-y-8">
          <div className="container mx-auto px-4 py-8">
            <p className="text-body">
              Casos y guías sobre riesgos éticos, negligencia profesional, seguridad de modelos de
              propósito general y su impacto en derechos fundamentales.
            </p>
          </div>
          {items.length === 0 ? (
            <p className="text-body">Próximamente contenido.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="card-elevated p-6 hover:border-primary/30 transition-all duration-300 flex flex-col gap-3"
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] text-caption">
                    Análisis
                  </p>
                  <h2 className="font-serif text-xl md:text-2xl text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-sm text-body line-clamp-3">{item.excerpt}</p>
                  <p className="text-xs text-caption mt-2">
                    {item.dateLabel} · {item.author}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </LegalLayout>
    </>
  );
}
