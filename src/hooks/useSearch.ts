
import { useSearchEngine, type SearchFilters, type SearchResults } from './useSearchEngine';

// Exporta os tipos para que a página de busca possa usá-los se necessário
export type { ContentType } from './useSearchEngine';

/**
 * Hook de busca para a UI. 
 * Ele atua como um wrapper para o motor de busca principal (`useSearchEngine`),
 * passando os filtros e retornando os resultados, incluindo o estado de carregamento.
 */
export function useSearch(query: string, activeFilters: string[]): SearchResults {
  // O `useSearchEngine` espera um objeto de filtros, então nós o montamos.
  const filters: SearchFilters = {
    query,
    activeFilters,
  };

  // Chama o motor de busca principal e retorna seus resultados diretamente.
  // A página que consome este hook agora receberá o estado `isLoading` automaticamente.
  const searchResults = useSearchEngine(filters);

  return searchResults;
}
