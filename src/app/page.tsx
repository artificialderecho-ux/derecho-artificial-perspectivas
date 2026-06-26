import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listContentSlugs, getContentEntry, ContentSection } from '@/lib/content';
import { getSectionResourceEntry, listSectionResourceSlugs } from '@/lib/resources';
import { getAllPosts } from '@/lib/mdx-utils';
import { formatDateFromMs, isNew } from '@/lib/badges';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cache } from 'react';

// Revalidación automática cada hora
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Derecho, ética y regulación de la IA",
  description:
    "Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.",
  keywords: [
    "derecho artificial",
    "inteligencia artificial",
    "regulación IA",
    "AI Act",
    "RGPD",
    "jurisprudencia",
    "cumplimiento",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    title: "Derecho, ética y regulación de la IA",
    description:
      "Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.",
    url: "https://www.derechoartificial.com",
    siteName: "Derecho Artificial",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
        width: 1200,
        height: 630,
        alt: "Derecho Artificial - Perspectivas Legales sobre IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Derecho, ética y regulación de la IA",
    description:
      "Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.",
    images: ["/logo-principal.png"],
    creator: "@RicardoScarpa", // Assuming this from previous context
  },
};

export default async function HomePage() {
  const [
    actualidadJsonSlugs,
    actualidadResourceSlugs,
    firmaJsonSlugs,
    firmaResourceSlugs,
    normativaSlugs,
    jurisprudenciaSlugs,
    guiasSlugs,
  ] = await Promise.all([
    listContentSlugs("guias-ia"),
    listSectionResourceSlugs("guias-ia"),
    listContentSlugs("firma-scarpa"),
    listSectionResourceSlugs("firma-scarpa"),
    listSectionResourceSlugs("normativa"),
    listSectionResourceSlugs("jurisprudencia"),
    listSectionResourceSlugs("guias"),
  ]);

  const [actualidadJsonEntries, actualidadResourceEntries, firmaJsonEntries, firmaResourceEntries] =
    await Promise.all([
      Promise.all(actualidadJsonSlugs.map((slug) => getContentEntry("guias-ia", slug))),
      Promise.all(actualidadResourceSlugs.map((slug) => getSectionResourceEntry("guias-ia", slug))),
      Promise.all(firmaJsonSlugs.map((slug) => getContentEntry("firma-scarpa", slug))),
      Promise.all(firmaResourceSlugs.map((slug) => getSectionResourceEntry("firma-scarpa", slug))),
    ]);

  const resolvedActualidadJson = actualidadJsonEntries.filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );
  const resolvedActualidadResources = actualidadResourceEntries.filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );
  const resolvedFirmaJson = firmaJsonEntries.filter((e): e is NonNullable<typeof e> => Boolean(e));
  const resolvedFirmaResources = firmaResourceEntries.filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );

  const unifiedActualidad = [
    ...resolvedActualidadJson.map((e) => ({
      title: e.title,
      description: e.description,
      date: (() => {
        const publishedMs =
          typeof e.datePublished === "string" ? new Date(e.datePublished).getTime() : NaN;
        const fallback = typeof e.dateMs === "number" && !Number.isNaN(e.dateMs) ? e.dateMs : 0;
        return Number.isNaN(publishedMs) ? fallback : publishedMs;
      })(),
      urlPath: e.urlPath,
      author: e.author,
    })),
    ...resolvedActualidadResources.map((e) => ({
      title: e.title,
      description: e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
      date: e.displayDateMs ?? e.dateMs ?? 0,
      urlPath: `/actualidad-ia/${e.slug}`,
      author: "Derecho Artificial",
    })),
  ];

  const unifiedFirma = [
    // Priorizar posts MDX de Firma Scarpa
    ...getAllPosts().filter(post =>
      post.frontmatter.category &&
      (post.frontmatter.category.toLowerCase().replace(/-/g, ' ') === 'firma scarpa' ||
       post.frontmatter.category.toLowerCase().replace(/-/g, ' ') === 'firma-scarpa' ||
       post.frontmatter.category.toLowerCase() === 'firma scarpa' ||
       post.frontmatter.category.toLowerCase() === 'firma-scarpa' ||
       (post.frontmatter.section || "").toLowerCase() === 'firma-scarpa')
    ).map(post => ({
      title: post.frontmatter.title,
      description: post.excerpt,
      date: new Date(post.frontmatter.date).getTime(),
      urlPath: post.url,
      author: post.frontmatter.author || "Ricardo Scarpa",
    })),
    // Luego añadir recursos JSON legacy
    ...resolvedFirmaJson.map((e) => ({
      title: e.title,
      description: e.description,
      date: (() => {
        const publishedMs =
          typeof e.datePublished === "string" ? new Date(e.datePublished).getTime() : NaN;
        const fallback = typeof e.dateMs === "number" && !Number.isNaN(e.dateMs) ? e.dateMs : 0;
        return Number.isNaN(publishedMs) ? fallback : publishedMs;
      })(),
      urlPath: e.urlPath,
      author: e.author,
    })),
    // Finalmente añadir recursos PDF
    ...resolvedFirmaResources.map((e) => ({
      title: e.title,
      description: e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
      date: e.displayDateMs ?? e.dateMs ?? 0,
      urlPath: `/firma-scarpa/${e.slug}`,
      author: "Derecho Artificial",
    })),
  ].sort((a, b) => b.date - a.date);

  unifiedActualidad.sort((a, b) => b.date - a.date);

  const latestActualidad = unifiedActualidad[0] ?? null;
  const latestFirma = unifiedFirma[0] ?? null;

  const homeFeaturedSlugs = [
    "ai-act-guia-completa",
    "rgpd-gobernanza-datos-ia",
    "analisis-negligencia-chatgpt"
  ];

  const [latestNormativa, latestJurisprudencia, latestGuias] = await Promise.all([
    Promise.all(normativaSlugs.map((slug) => getSectionResourceEntry("normativa", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items[0] ?? null;
    }),
    Promise.all(jurisprudenciaSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items[0] ?? null;
    }),
    Promise.all(guiasSlugs.map((slug) => getSectionResourceEntry("guias", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items[0] ?? null;
    }),
  ]);

  const [normativaEntriesAll, jurisprudenciaEntriesAll, guiasEntriesAll] = await Promise.all([
    Promise.all(normativaSlugs.map((slug) => getSectionResourceEntry("normativa", slug))),
    Promise.all(jurisprudenciaSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug))),
    Promise.all(guiasSlugs.map((slug) => getSectionResourceEntry("guias", slug))),
  ]);

  // Crear una lista unificada de todas las entradas recientes para la sección "Actualidad y Análisis"
  const mdxPosts = getAllPosts();
  const normalizeLangText = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const detectLanguage = (title: string, description: string): "es" | "other" => {
    const text = normalizeLangText(`${title} ${description}`.toLowerCase());
    const countMatches = (words: string[]) =>
      words.reduce((acc, word) => acc + (text.match(new RegExp(`\\b${word}\\b`, "g"))?.length ?? 0), 0);
    const esScore = countMatches([
      "el",
      "los",
      "las",
      "del",
      "y",
      "para",
      "datos",
      "proteccion",
      "privacidad",
      "agencia",
      "inteligencia",
    ]);
    const frScore = countMatches(["le", "les", "des", "dans", "droits", "effacement"]);
    if (esScore === 0) return "other";
    if (esScore > frScore) return "es";
    return "other";
  };
  const isAllowedLanguage = (title: string, description: string) => detectLanguage(title, description) === "es";
  const newsMdxCandidates = mdxPosts
    .filter((post) => {
      const cat = (post.frontmatter.category || "").toLowerCase();
      const tags = (post.frontmatter.tags || []).map((t: string) => t.toLowerCase());
      return (
        cat === "noticia" ||
        cat === "guias-ia" ||
        tags.includes("noticia") ||
        tags.includes("guias-ia") ||
        tags.includes("actualidad") ||
        tags.includes("news")
      );
    })
    .filter((post) => isAllowedLanguage(post.frontmatter.title, post.excerpt))
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    .slice(0, 6);
  const newsEntries =
    newsMdxCandidates.length > 0
      ? newsMdxCandidates.map((post) => ({
          title: post.frontmatter.title,
          description: post.excerpt,
          date: new Date(post.frontmatter.date).getTime(),
          urlPath: post.url,
          author: post.frontmatter.author || "Derecho Artificial",
          type: "Noticias IA" as const,
        }))
      : unifiedActualidad.slice(0, 6).map((e) => ({
          title: e.title,
          description: e.description,
          date: e.date,
          urlPath: e.urlPath,
          author: e.author,
          type: "Noticias IA" as const,
        }));

  const allRecentEntries: any[] = [];

  const formatDate = (value: string | number) => {
    // Si es un timestamp numérico (milisegundos desde 1970)
    if (typeof value === 'number') {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
    }

    // Si es una string de fecha (como "2026-02-10")
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const toMs = (value: string | number | Date | null | undefined) => {
    if (value == null) return 0;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return 0;
    return d.getTime();
  };

  const [normativaTopEntries, jurisprudenciaTopEntries, guiasTopEntries] = await Promise.all([
    Promise.all(normativaSlugs.map((slug) => getSectionResourceEntry("normativa", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items.slice(0, 2);
    }),
    Promise.all(jurisprudenciaSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items.slice(0, 2);
    }),
    Promise.all(guiasSlugs.map((slug) => getSectionResourceEntry("guias", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items.slice(0, 2);
    }),
  ]);

  const normativaItems =
    normativaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/normativa/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.displayDateMs ?? 0, "es-ES")} · Análisis normativo con fuentes oficiales`,
        dateMs: e.displayDateMs ?? e.dateMs ?? 0,
      })) ?? [];

  const jurisprudenciaItems =
    jurisprudenciaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/jurisprudencia/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.displayDateMs ?? 0, "es-ES")} · Resoluciones clave sobre algoritmos y derechos`,
        dateMs: e.displayDateMs ?? e.dateMs ?? 0,
      })) ?? [];

  const guiasItems =
    guiasTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/recursos/guias/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.displayDateMs ?? 0, "es-ES")} · Repositorio de documentación técnica y ética`,
        dateMs: e.displayDateMs ?? e.dateMs ?? 0,
      })) ?? [];

  const latestActualidadMs = toMs(unifiedActualidad[0]?.date);
  const latestJurisprudenciaMs =
    jurisprudenciaTopEntries[0]?.displayDateMs ?? jurisprudenciaTopEntries[0]?.dateMs ?? 0;
  const latestNormativaMs =
    normativaTopEntries[0]?.displayDateMs ?? normativaTopEntries[0]?.dateMs ?? 0;
  const latestGuiasMs = guiasTopEntries[0]?.displayDateMs ?? guiasTopEntries[0]?.dateMs ?? 0;
  const latestFirmaMs = toMs(unifiedFirma[0]?.date);
  const actualidadWeeklyCount = unifiedActualidad.filter((e) => isNew(e.date)).length;
  const firmaWeeklyCount = unifiedFirma.filter((e) => isNew(e.date)).length;

  const normativaWeeklyCount = normativaEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.displayDateMs ?? 0)).length;
  const jurisprudenciaWeeklyCount = jurisprudenciaEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.displayDateMs ?? 0)).length;
  const guiasWeeklyCount = guiasEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.displayDateMs ?? 0)).length;

  const uniqueByHref = <T extends { href: string }>(arr: T[]) => {
    const seen = new Set<string>();
    const res: T[] = [];
    for (const it of arr) {
      if (seen.has(it.href)) continue;
      seen.add(it.href);
      res.push(it);
    }
    return res;
  };

  const sectionCards = [
    {
      key: "firma-scarpa",
      label: "Firma Scarpa",
      href: "/firma-scarpa",
      items: uniqueByHref(
        [unifiedFirma[0], unifiedFirma[1]]
          .filter((e): e is NonNullable<typeof e> => Boolean(e))
          .map((e) => ({
            title: e.title,
            href: e.urlPath,
            description: e.description ?? "",
            meta: `${formatDate(e.date)} · ${e.author}`,
            dateMs: e.date,
          })),
      ),
    },
    {
      key: "jurisprudencia",
      label: "Jurisprudencia",
      href: "/jurisprudencia",
      items: uniqueByHref(jurisprudenciaItems).slice(0, 2),
    },
    {
      key: "normativa",
      label: "Normativa",
      href: "/normativa",
      items: uniqueByHref(normativaItems).slice(0, 2),
    },
    {
      key: "guias",
      label: "Guías y Protocolos",
      href: "/recursos/guias",
      items: uniqueByHref(guiasItems).slice(0, 2),
    },
    {
      key: "glosario",
      label: "Glosario IA legal",
      href: "/glosario-ia-legal",
    },
    {
      key: "quienes-somos",
      label: "Quiénes somos",
      href: "/quienes-somos",
    },
    {
      key: "contacto",
      label: "Contacto",
      href: "/contacto",
    },
  ];

  const getCtaLabel = (key: string) => {
    switch (key) {
      case "normativa":
        return "Ver normativa";
      case "jurisprudencia":
        return "Ver jurisprudencia";
      case "guias":
        return "Navegar guías";
      case "firma-scarpa":
        return "Conocer la firma";
      case "glosario":
        return "Ver glosario";
      case "quienes-somos":
        return "Conocer el proyecto";
      case "contacto":
        return "Contactar";
      default:
        return "Ver sección";
    }
  };

  const latestMdxCards = mdxPosts
    .filter((post) => isAllowedLanguage(post.frontmatter.title, post.excerpt))
    .sort((a, b) => b.dateMs - a.dateMs)
    .slice(0, 7)
    .map((post) => ({
      title: post.frontmatter.title,
      description: post.excerpt,
      href: post.url,
      meta: `${formatDate(post.dateMs)} · ${post.frontmatter.author || "Derecho Artificial"}`,
      dateMs: post.dateMs,
      section: post.frontmatter.category || post.frontmatter.section || "Análisis",
    }));

  const hero = unifiedFirma[0]
    ? {
        title: unifiedFirma[0].title,
        description: unifiedFirma[0].description,
        href: unifiedFirma[0].urlPath,
        meta: `${formatDate(unifiedFirma[0].date)} · ${unifiedFirma[0].author}`,
        section: "Firma Scarpa",
      }
    : latestMdxCards[0];

  const heroSidebar = latestMdxCards.filter((item) => item.href !== hero?.href).slice(0, 4);
  const topGrid = latestMdxCards.filter((item) => item.href !== hero?.href).slice(4, 7);
  const firmaRow = unifiedFirma.slice(1, 4).map((entry) => ({
    title: entry.title,
    description: entry.description,
    href: entry.urlPath,
    meta: `${formatDate(entry.date)} · ${entry.author}`,
    dateMs: entry.date,
    section: "Firma Scarpa",
  }));

  const featuredPair = [normativaItems[0], jurisprudenciaItems[0]].filter(Boolean);
  const newestBySection = [
    { label: "Firma", value: latestFirmaMs },
    { label: "Normativa", value: latestNormativaMs },
    { label: "Jurisprudencia", value: latestJurisprudenciaMs },
    { label: "Guías", value: latestGuiasMs },
  ];

  const SectionHeading = ({ eyebrow, title, href }: { eyebrow: string; title: string; href?: string }) => (
    <div className="mb-5 flex items-end justify-between gap-4 border-b-4 border-black pb-2">
      <div>
        <p className="font-display text-xs font-black uppercase tracking-[0.22em] text-caption">{eyebrow}</p>
        <h2 className="font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] md:text-5xl">{title}</h2>
      </div>
      {href ? <Link href={href} className="hidden text-xs font-black uppercase tracking-[0.18em] underline underline-offset-4 sm:inline-flex">Ver todo</Link> : null}
    </div>
  );

  const ArticleLink = ({ item, large = false }: { item: { title: string; description?: string; href: string; meta?: string; section?: string }; large?: boolean }) => (
    <Link href={item.href} className="group block border-b border-black py-4 last:border-b-0">
      <p className="mb-2 font-display text-[11px] font-black uppercase tracking-[0.22em] text-caption">{item.section || "Derecho Artificial"}</p>
      <h3 className={`font-display font-black uppercase leading-[0.92] tracking-[-0.045em] group-hover:underline ${large ? "text-4xl md:text-6xl lg:text-7xl" : "text-xl md:text-2xl"}`}>{item.title}</h3>
      {item.description ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-body md:text-base">{item.description}</p> : null}
      {item.meta ? <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-caption">{item.meta}</p> : null}
    </Link>
  );

  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }]} />
      <main className="bg-white text-black">
        <section className="border-y-4 border-black">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[1fr_360px]">
            <div className="border-black p-4 md:p-8 lg:border-r">
              <p className="font-display text-xs font-black uppercase tracking-[0.35em]">Derecho, ética y regulación de la IA</p>
              {hero ? <ArticleLink item={hero} large /> : null}
            </div>
            <aside className="divide-y divide-black border-t border-black lg:border-t-0">
              <div className="bg-black px-4 py-3 text-white"><h2 className="font-display text-xl font-black uppercase tracking-[-0.03em]">Últimos titulares</h2></div>
              {heroSidebar.map((item) => <div key={item.href} className="px-4"><ArticleLink item={item} /></div>)}
            </aside>
          </div>
        </section>
        <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-8">
          <div className="mb-8 grid grid-cols-2 gap-2 border-y border-black py-3 text-center md:grid-cols-4">
            {newestBySection.map((item) => <div key={item.label} className="border-black px-2 md:border-r md:last:border-r-0"><p className="font-display text-xs font-black uppercase tracking-[0.2em]">{item.label}</p><p className="text-xs text-caption">{item.value ? formatDate(item.value) : "Sin fecha"}</p></div>)}
          </div>
          <SectionHeading eyebrow="Radar editorial" title="Lo último" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{topGrid.map((item) => <ArticleLink key={item.href} item={item} />)}</div>
        </section>
        <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-8">
          <SectionHeading eyebrow="Selección" title="Normativa y jurisprudencia" />
          <div className="grid grid-cols-1 border-y border-black md:grid-cols-2">{featuredPair.map((item, index) => <div key={item.href} className={`p-4 md:p-6 ${index === 0 ? "md:border-r md:border-black" : ""}`}><ArticleLink item={{ ...item, section: index === 0 ? "Normativa" : "Jurisprudencia" }} large /></div>)}</div>
        </section>
        <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-8">
          <SectionHeading eyebrow="Opinión y análisis" title="Firma Scarpa" href="/firma-scarpa" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{firmaRow.map((item) => <ArticleLink key={item.href} item={item} />)}</div>
        </section>
        <section className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-4 py-8 md:px-8 lg:grid-cols-2">
          <div><SectionHeading eyebrow="Fuentes oficiales" title="Normativa" href="/normativa" />{normativaItems.map((item) => <ArticleLink key={item.href} item={{ ...item, section: "Normativa" }} />)}</div>
          <div><SectionHeading eyebrow="Resoluciones" title="Jurisprudencia" href="/jurisprudencia" />{jurisprudenciaItems.map((item) => <ArticleLink key={item.href} item={{ ...item, section: "Jurisprudencia" }} />)}</div>
        </section>
        <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-8">
          <SectionHeading eyebrow="Práctica profesional" title="Guías" href="/guias-ia" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{guiasItems.map((item) => <ArticleLink key={item.href} item={{ ...item, section: "Guías" }} />)}</div>
        </section>
      </main>
    </>
  );
}
