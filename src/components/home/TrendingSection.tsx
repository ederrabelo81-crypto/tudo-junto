import { useMemo } from "react";
import { ListingCard } from "@/components/cards/ListingCard";
import { DealCard } from "@/components/cards/DealCard";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { EventCard } from "@/components/cards/EventCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { Badge } from "@/components/ui/Badge";

// Se você já tem tipos melhores no seu projeto, pode trocar estes.
type TrendingItemType = "listing" | "deal" | "business" | "event" | "news";

type TrendingItem = {
  title?: string;
  type: TrendingItemType;
  data?: any[]; // cada tipo tem um shape diferente; deixo flexível aqui
};

interface TrendingSectionProps {
  items: TrendingItem[];
}

export function TrendingSection({ items }: TrendingSectionProps) {
  // Normaliza e remove seções vazias ANTES de renderizar
  const safeItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items
      .map((it) => ({
        ...it,
        data: Array.isArray(it.data) ? it.data.filter(Boolean) : [],
      }))
      .filter((it) => it.data.length > 0);
  }, [items]);

  if (safeItems.length === 0) return null;

  return (
    <section className="space-y-6">
      {safeItems.map((item, idx) => {
        const sectionTitle = item.title ?? "Em alta";

        return (
          <div key={`${item.type}-${idx}`} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">{sectionTitle}</h2>
            </div>

            {item.type === "listing" && (
              <div className="grid grid-cols-2 gap-3">
                {item.data.map((l: any, i: number) => (
                  <div key={l?.id ?? `listing-${i}`} className="relative">
                    <Badge text="Classificado" />
                    <ListingCard listing={l} />
                  </div>
                ))}
              </div>
            )}

            {item.type === "deal" && (
              <div className="space-y-3">
                {item.data.map((d: any, i: number) => (
                  <div key={d?.id ?? `deal-${i}`} className="relative">
                    <Badge text="Oferta" />
                    <DealCard deal={d} />
                  </div>
                ))}
              </div>
            )}

            {item.type === "business" && (
              <div className="grid grid-cols-1 gap-4">
                {item.data.map((b: any, i: number) => (
                  <div key={b?.id ?? `business-${i}`} className="relative">
                    <Badge text="Negócio" />
                    <BusinessCard business={b} />
                  </div>
                ))}
              </div>
            )}

            {item.type === "event" && (
              <div className="space-y-3">
                {item.data.map((e: any, i: number) => (
                  <div key={e?.id ?? `event-${i}`} className="relative">
                    <Badge text="Evento" />
                    <EventCard event={e} />
                  </div>
                ))}
              </div>
            )}

            {item.type === "news" && (
              <div className="space-y-3">
                {item.data.map((n: any, i: number) => (
                  <div key={n?.id ?? `news-${i}`} className="relative">
                    <Badge text="Notícia" />
                    <NewsCard news={n} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
