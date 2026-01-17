// Category.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Chip } from '@/components/ui/Chip';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { ListingCard } from '@/components/cards/ListingCard';
import { DealCard } from '@/components/cards/DealCard';
import { EventCard } from '@/components/cards/EventCard';
import { NewsCard } from '@/components/cards/NewsCard';
import { ObituaryCard } from '@/components/cards/ObituaryCard';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import {
  categories,
  businesses,
  listings,
  deals,
  events,
  news,
  obituaries,
  filtersByCategory,
} from '@/data/mockData';
import { matchesAllFilters, matchesListingFilter, normalizeText } from '@/lib/tagUtils';
import { getBusinessTags } from '@/lib/businessTags';

export default function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const category = categories.find((c) => c.id === categoryId);
  const filters = filtersByCategory[categoryId || ''] || [];

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));
  };

  const clearFilters = () => setActiveFilters([]);

  const filteredBusinesses = useMemo(() => {
    let filtered = businesses.filter((b) => b.categorySlug === categoryId);

    if (activeFilters.length > 0) {
      filtered = filtered.filter((business) =>
        matchesAllFilters(getBusinessTags(business), activeFilters, {
          hours: business.hours,
          checkOpenNow: true,
        })
      );
    }

    return filtered;
  }, [categoryId, activeFilters]);

  const filteredListings = useMemo(() => {
    if (activeFilters.length === 0) return listings;
    return listings.filter((listing) => matchesListingFilter(listing, activeFilters));
  }, [activeFilters]);

  const filteredDeals = useMemo(() => {
    if (activeFilters.length === 0) return deals;

    const normalizedFilters = activeFilters.map((f) => normalizeText(f));

    return deals.filter((deal) => {
      if (normalizedFilters.includes('valido hoje')) {
        const today = new Date().toISOString().split('T')[0];
        if (deal.validUntil < today) return false;
      }

      if (normalizedFilters.includes('entrega')) {
        const text = `${deal.title} ${deal.subtitle || ''}`.toLowerCase();
        if (!text.includes('entrega') && !text.includes('delivery')) return false;
      }

      return true;
    });
  }, [activeFilters]);

  const filteredEvents = useMemo(() => {
    if (activeFilters.length === 0) return events;

    const normalizedFilters = activeFilters.map((f) => normalizeText(f));

    return events.filter((event) => {
      if (normalizedFilters.includes('entrada gratuita')) {
        const price = event.priceText.toLowerCase();
        const ok =
          price.includes('grátis') ||
          price.includes('gratuito') ||
          price.includes('free') ||
          price === 'entrada livre';
        if (!ok) return false;
      }

      if (normalizedFilters.includes('hoje')) {
        const today = new Date().toISOString().split('T')[0];
        if (!event.dateTime.startsWith(today)) return false;
      }

      if (normalizedFilters.includes('fim de semana')) {
        const eventDate = new Date(event.dateTime);
        const day = eventDate.getDay();
        if (day !== 0 && day !== 6) return false;
      }

      // Mantém só os filtros que não são "regras especiais"
      const remainin
