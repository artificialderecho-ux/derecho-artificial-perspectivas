import { getAllPosts } from "@/lib/mdx-utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debug Posts",
  description: "Debug posts information",
};

export default async function DebugPostsPage() {
  const posts = getAllPosts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Debug Posts Information</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Total Posts: {posts.length}</h2>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{post.frontmatter.title}</h3>
            <div className="text-sm space-y-1">
              <p><strong>Slug:</strong> {post.slug}</p>
              <p><strong>URL:</strong> {post.url}</p>
              <p><strong>Category:</strong> {post.frontmatter.category}</p>
              <p><strong>Date:</strong> {post.frontmatter.date}</p>
              <p><strong>File:</strong> {post.slug}.mdx</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Looking for BoligPortal Post</h2>
        <div className="border p-4 rounded-lg">
          <p className="mb-2"><strong>Searching for slug:</strong> "boligportal-redata-scraping-api-bases-datos-ia-dinamarca-2025"</p>
          <p className="mb-2">
            <strong>Found:</strong> {
              posts.find(p => p.slug === "boligportal-redata-scraping-api-bases-datos-ia-dinamarca-2025") 
                ? "YES" 
                : "NO"
            }
          </p>
          <p className="mb-2">
            <strong>Searching in URL:</strong> {
              posts.find(p => p.url.includes("boligportal")) 
                ? "YES" 
                : "NO"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
