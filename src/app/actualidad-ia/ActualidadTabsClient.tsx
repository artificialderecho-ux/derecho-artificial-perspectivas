"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentPreviewGrid, type PreviewItem } from "@/components/ContentPreviewCard";

type TabKey = "todas" | "noticias" | "guias";

type Props = {
  initialTab: TabKey;
  allItems: PreviewItem[];
  noticiasItems: PreviewItem[];
  guiasItems: PreviewItem[];
};

const tabLabels: Record<TabKey, string> = {
  todas: "Todas",
  noticias: "Noticias",
  guias: "Guías y Protocolos",
};

const getPlaceholder = (tab: TabKey) => {
  if (tab === "noticias") return "No hay noticias disponibles por ahora.";
  if (tab === "guias") return "No hay guías disponibles por ahora.";
  return "No hay contenidos disponibles por ahora.";
};

export function ActualidadTabsClient({
  initialTab,
  allItems,
  noticiasItems,
  guiasItems,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const items =
    activeTab === "noticias" ? noticiasItems : activeTab === "guias" ? guiasItems : allItems;
  const currentLabel = tabLabels[activeTab];

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabKey)}>
        <TabsList className="mb-6">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="noticias">Noticias</TabsTrigger>
          <TabsTrigger value="guias">Guías y Protocolos</TabsTrigger>
        </TabsList>
      </Tabs>

      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">{currentLabel}</h2>

      {items.length > 0 ? (
        <ContentPreviewGrid items={items} columns={2} size="medium" />
      ) : (
        <div className="rounded-lg border border-divider bg-surface p-8 text-sm text-body">
          {getPlaceholder(activeTab)}
        </div>
      )}
    </div>
  );
}

