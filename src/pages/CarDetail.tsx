import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Fuel, Gauge, Phone, MessageCircle } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { cars } from "@/data/newListingTypes";

export default function CarDetail() {
  const { id } = useParams();

  const car = cars.find((c: any) => c.id === id);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

  if (!car) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Link to="/carros" className="text-primary underline">Voltar para Carros</Link>
        <p className="mt-4 text-muted-foreground">Carro não encontrado.</p>
      </div>
    );
  }

  const whatsapp = car.contact?.whatsapp || car.whatsapp;
  const phone = car.contact?.phone || car.phone;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/carros" className="p-2 -ml-2 rounded-full hover:bg-muted touch-target">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-lg font-bold truncate">{car.title}</h1>
            <p className="text-xs text-muted-foreground truncate">{car.year} • {car.condition} • {car.sellerType}</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        <div className="bg-card rounded-2xl overflow-hidden card-shadow">
          <div className="relative aspect-video">
            <img src={car.coverImage} alt={car.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <p className="text-lg font-bold text-primary">{formatPrice(car.price)}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" />
                {(car.mileageKm / 1000).toFixed(0)} mil km
              </span>
              <span className="flex items-center gap-1 capitalize">
                <Fuel className="w-3.5 h-3.5" />
                {car.fuel}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {car.neighborhood}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {(car.tags || []).slice(0, 12).map((t: string) => (
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
