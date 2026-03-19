import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import type { Post } from "@/types";

export const metadata: Metadata = {
  title: "IA Global",
  description: "Análisis y perspectivas globales sobre inteligencia artificial y derecho",
};

export async function generateStaticParams() {
  const posts = await getAllPosts("ia-global");
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
