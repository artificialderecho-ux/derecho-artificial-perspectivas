import { redirect } from 'next/navigation';

// Redirect for legacy section path
export default async function RecursosGuiasSlugRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/guias-ia/${slug}`);
}
