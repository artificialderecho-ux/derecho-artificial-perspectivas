import { redirect } from 'next/navigation';

// Redirect for legacy section path
export default async function IAGlobalSlugRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/global-ia/${slug}`);
}
