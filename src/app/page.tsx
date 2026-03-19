import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Derecho, ética y regulación de la IA",
  description: "Análisis jurídico del Reglamento IA y su impacto legal.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-4">Derecho Artificial</h1>
      <p className="text-lg text-gray-600 mb-8">Derecho, ética y regulación de la IA</p>
      
      <div className="flex gap-4">
        <Link href="/firma-scarpa" className="bg-blue-600 text-white px-6 py-3 rounded">
          Ir a Firma Scarpa
        </Link>
      </div>
    </main>
  );
}
