import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.derechoartificial.com/firma-scarpa/guia-aepd-uso-de-imagenes-de-terceros-en-sistemas-ia",
  },
};

export default function RedirectOldAepdImagesPage() {
  redirect("/firma-scarpa/guia-aepd-uso-de-imagenes-de-terceros-en-sistemas-ia");
}

