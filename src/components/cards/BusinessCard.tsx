import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, Star } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { MapsButton } from '@/components/ui/MapsButton';
import { CallButton } from '@/components/ui/CallButton';
import { MetaChip } from '@/components/ui/MetaChip';
import type { Business } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { formatHours, parseAndFormatHours } from '@/lib/hoursUtils';
import { getBusinessTags } from '@/lib/businessTags';
import { isOpenNow } from '@/lib/tagUtils';

interface BusinessCardProps {
  business: Business;
  variant?: 'default' | 'compact';
  className?: string;
}

export function BusinessCard({ business, variant = 'default', className }: BusinessCardProps) {
  const isCompact = variant === 'compact';
  const tags = getBusinessTags(business);
  const open = isOpenNow(business.hours);

  // Extrai rating da descrição se existir (ex: "Nota 5.0 (21 avaliações)")
  const ratingMatch = business.description?.match(/Nota\s+(\d+(?:\.\d+)?)\s*\((\d+)/i);
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : undefined;
  const reviewCount = ratingMatch ? parseInt(ratingMatch[2]) : undefined;

  return (
    <div
      className={cn(
        'bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all',
        className,
      )}
    >
      <Link to={`/comercio/${business.id}`} className="block">
        <div className={cn('relative overflow-hidden', isCompact ? 'h-28' : 'h-36')}>
          <img
            src={business.coverImages[0]}
            alt={business.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Meta chips (estilo MyListing) */}
          <div className="absolute top-2 left-2 flex gap-2 items-center">
            <StatusBadge status={open === true ? 'open' : open === false ? 'closed' : 'unknown'} />
            {typeof rating === 'number' && !Number.isNaN(rating) && (
              <MetaChip>
                <Star className="w-3.5 h-3.5" />
                <span>{rating.toFixed(1)}</span>
                {typeof reviewCount === 'number' && reviewCount > 0 && (
                  <span className="opacity-90">({reviewCount})</span>
                )}
              </MetaChip>
            )}
          </div>

          {business.isVerified && (
            <div className="absolute top-2 right-2">
              <MetaChip className="bg-primary/85">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verificado</span>
              </MetaChip>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/comercio/${business.id}`}>
          <h3 className="font-bold text-foreground text-base mb-0.5 line-clamp-1">{business.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{business.category}</p>
        </Link>

        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">{business.neighborhood}</span>
          <span className="mx-2">•</span>
          <span className="truncate">{formatHours(parseAndFormatHours(business.hours), open === true)}</span>
        </div>

        {!isCompact && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-accent text-accent-foreground text-[11px] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={cn('flex gap-2', isCompact ? '' : '')}>
          <WhatsAppButton whatsapp={business.whatsapp} size="sm" className={cn(isCompact ? 'flex-1' : 'flex-1')} />
          <MapsButton
            size="sm"
            label="Mapa"
            query={`${business.name} ${business.address ?? business.neighborhood ?? ''}`}
            className="shrink-0"
          />
          {business.phone && <CallButton phone={business.phone} size="sm" className="shrink-0" />}
        </div>
      </div>
    </div>
  );
}
