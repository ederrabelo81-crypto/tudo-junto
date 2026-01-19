import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, MessageCircle, Bed, Bath, Car, Maximize } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { realEstate } from "@/data/newListingTypes";

export default function RealEstateDetail() {
  const { id } = useParams();
  const item = realEstate.find((r: any) => r.id === id);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

  if (!item) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Link to="/imoveis" className="text-primary underline">Voltar para Imóveis</Link>
        <p className="mt-4 text-muted-foreground">Imóvel não encontrado.</p>
      </div>
    );
  }

  const whatsapp = item.contact?.whatsapp || item.whatsapp;
  const phone = item.contact?.phone || item.phone;

  const priceText =
    item.transactionType === "alugar"
      ? `${formatPrice(item.rentPrice || 0)}/mês`
      : formatPrice(item.price || 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/imoveis" className="p-2 -ml-2 rounded-full hover:bg-muted touch-target">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-lg font-bold truncate">{item.title}</h1>
            <p className="text-xs text-muted-foreground truncate">
              {item.transactionType} • {item.propertyType}
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        <div className="bg-card rounded-2xl overflow-hidden card-shadow">
          <div className="relative aspect-video">
            <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
          </div>

          <div className="p-4">
            <p className="text-lg font-bold text-primary">
              {priceText}
              {item.condoFee ? (
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  + {formatPrice(item.condoFee)} cond.
                </span>
              ) : null}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
              {item.bedrooms ? (
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5" /> {item.bedrooms}
                </span>
              ) : null}
              {item.bathrooms ? (
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5" /> {item.bathrooms}
                </span>
              ) : null}
              {item.parkingSpots ? (
                <span className="flex items-center gap-1">
                  <Car className="w-3.5 h-3.5" /> {item.parkingSpots}
                </span>
              ) : null}
              <span className="flex items-center gap-1">
                <Maximize className="w-3.5 h-3.5" /> {item.areaM2}m²
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {item.neighborhood}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {(item.tags || []).slice(0, 12).map((t: string) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            {(whatsapp || phone) && (
              <div className="flex gap-2 mt-4">
                {whatsapp && (
                  <a
                    href={`https://wa.me/${String(whatsapp).replace(/\D/g, "")}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${String(phone).replace(/\s/g, "")}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted font-medium"
                  >
                    <Phone className="w-4 h-4" /> Ligar
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
