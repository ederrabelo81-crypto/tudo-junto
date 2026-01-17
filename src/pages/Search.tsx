// Search.tsx
import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Chip } from '@/components/ui/Chip';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { ListingCard } from '@/components/cards/ListingCard';
import { DealCard } from '@/components/cards/DealCard';
import { EventCard } from '@/components/cards/EventCard';
import { NewsCard } from '@/components/cards/NewsCard';
import { categories, businesses, listings, deals, events, news, filtersByCategory } from '@/data/mockData';
import { matchesAllFilters, normalizeText, matchesListingFilter } from '@/lib/tagUtils';
import { getBusinessTags } from '@/lib/businessTags';

type SearchResults = {
  businesses: typeof businesses;
  listings: typeof listings;
  deals: typeof deals;
  events: typeof events;
  news: typeof news;
  total: number;
};

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const allFilters = useMemo(() => {
    const s = new Set<string>();
    Object.values(filtersByCategory).flat().forEach((f) => s.add(f));
    return Array.from(s);
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));
  };

  const clearFilters = () => setActiveFilters([]);

  const searchResults = useMemo<SearchResults | null>(() => {
    const hasQuery = !!query.trim();
    const hasFilters = activeFilters.length > 0;

    if (!hasQuery && !hasFilters) return null;

    const lowerQuery = query.toLowerCase().trim();

    // Businesses
    let filteredBusinesses = businesses;

    if (hasQuery) {
      filteredBusinesses = filteredBusinesses.filter((b) => {
        const tagHit = getBusinessTags(b).some((t) => t.toLowerCase().includes(lowerQuery));
        return (
          b.name.toLowerCase().includes(lowerQuery) ||
          b.category.toLowerCase().includes(lowerQuery) ||
          b.neighborhood.toLowerCase().includes(lowerQuery) ||
          tagHit
        );
      });
    }

    if (hasFilters) {
      filteredBusinesses = filteredBusinesses.filter((business) =>
        matchesAllFilters(getBusinessTags(business), activeFilters, { hours: business.hours, checkOpenNow: true })
      );
    }

    // Listings
    let filteredListings = listings;

    if (hasQuery) {
      filteredListings = filteredListings.filter(
        (l) => l.title.toLowerCase().includes(lowerQuery) || l.neighborhood.toLowerCase().includes(lowerQuery)
      );
    }

    if (hasFilters) {
      filteredListings = filteredListings.filter((listing) => matchesListingFilter(listing, activeFilters));
    }

    // Deals
    let filteredDeals = deals;

    if (hasQuery) {
      filteredDeals = filteredDeals.filter(
        (d) => d.title.toLowerCase().includes(lowerQuery) || d.businessName?.toLowerCase().includes(lowerQuery)
      );
    }

    if (hasFilters) {
      const normalizedFilters = activeFilters.map((f) => normalizeText(f));

      filteredDeals = filteredDeals.filter((deal) => {
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
    }

    // Events
    let filteredEvents = events;

    if (hasQuery) {
      filteredEvents = filteredEvents.filter(
        (e) =>
          e.title.toLowerCase().includes(lowerQuery) ||
          e.location.toLowerCase().includes(lowerQuery) ||
          e.tags.some((t) => t.toLowerCase().includes(lowerQuery))
      );
    }

    if (hasFilters) {
      const normalizedFilters = activeFilters.map((f) => normalizeText(f));

      filteredEvents = filteredEvents.filter((event) => {
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

        const remainingFilters = activeFilters.filter((f) =>
          !['entrada gratuita', 'hoje', 'fim de semana'].includes(normalizeText(f))
        );

        return matchesAllFilters(event.tags, remainingFilters, {});
      });
    }

    // News
    let filteredNews = news;

    if (hasQuery) {
      filteredNews = filteredNews.filter(
        (n) =>
          n.title.toLowerCase().includes(lowerQuery) ||
          n.tag.toLowerCase().includes(lowerQuery) ||
          n.snippet.toLowerCase().includes(lowerQuery)
      );
    }

    const total =
      filteredBusinesses.length +
      filteredListings.length +
      filteredDeals.length +
      filteredEvents.length +
      filteredNews.length;

    return {
      businesses: filteredBusinesses,
      listings: filteredListings,
      deals: filteredDeals,
      events: filteredEvents,
      news: filteredNews,
      total,
    };
  }, [query, activeFilters]);

  const hasResults = !!searchResults && searchResults.total > 0;
  const showCategories = !query.trim() && activeFilters.length === 0;
  const hasActiveSearch = query.trim() || activeFilters.length > 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-top">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Buscar</h1>
          </div>

          <SearchBar value={query} onChange={setQuery} placeholder="O que você procura agora?" size="large" />
        </div>

        <div className="px-4 pb-3 -mx-4">
          <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {allFilters.map((filter) => (
              <Chip
                key={filter}
                isActive={activeFilters.includes(filter)}
                onClick={() => toggleFilter(filter)}
                size="sm"
              >
                {filter}
              </Chip>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {showCategories && (
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">Categorias</h2>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  iconKey={category.iconKey}
                  size="sm"
                />
              ))}
            </div>
          </section>
        )}

        {hasActiveSearch && !hasResults && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-semibold text-foreground mb-1">Nenhum resultado</p>
            <p className="text-muted-foreground mb-4">Tente buscar por outro termo ou remover filtros</p>
            {activeFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {hasResults && searchResults && (
          <div className="space-y-6">
            {searchResults.businesses.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">
                  Comércios e Serviços ({searchResults.businesses.length})
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {searchResults.businesses.slice(0, 4).map((business) => (
                    <BusinessCard key={business.id} business={business} variant="compact" />
                  ))}
                </div>
              </section>
            )}

            {searchResults.listings.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">
                  Classificados ({searchResults.listings.length})
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  {searchResults.listings.slice(0, 4).map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </section>
            )}

            {searchResults.deals.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">Ofertas ({searchResults.deals.length})</h2>
                <div className="space-y-3">
                  {searchResults.deals.slice(0, 3).map((deal) => (
                    <DealCard key={deal.id} deal={deal} variant="compact" />
                  ))}
                </div>
              </section>
            )}

            {searchResults.events.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">Eventos ({searchResults.events.length})</h2>
                <div className="space-y-3">
                  {searchResults.events.slice(0, 3).map((event) => (
                    <EventCard key={event.id} event={event} variant="compact" />
                  ))}
                </div>
              </section>
            )}

            {searchResults.news.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">Notícias ({searchResults.news.length})</h2>
                <div className="space-y-3">
                  {searchResults.news.slice(0, 3).map((n) => (
                    <NewsCard key={n.id} news={n} variant="compact" />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
