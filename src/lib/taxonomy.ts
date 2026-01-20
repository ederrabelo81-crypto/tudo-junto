// ==================== TAXONOMIA CENTRAL ====================
// Sistema de 3 camadas: Listing Type → Categoria → Tags
// Este arquivo é a ÚNICA fonte de verdade para a estrutura de dados

// ==================== INTERFACES ====================

export interface ListingTypeDefinition {
  id: string;
  name: string;
  description: string;
  iconKey: string;
  categories: string[];
  tags: string[];
}

export interface TaxonomyConfig {
  listingTypes: Record<string, ListingTypeDefinition>;
}

// ==================== LISTING TYPES ====================

export const LISTING_TYPES: Record<string, ListingTypeDefinition> = {
  // 🍽️ Comer Agora
  'comer-agora': {
    id: 'comer-agora',
    name: 'Comer Agora',
    description: 'Urgência alimentar',
    iconKey: 'food',
    categories: [
      'Restaurantes',
      'Lanchonetes',
      'Pizzarias',
      'Cafés',
      'Padarias',
      'Sorveterias',
    ],
    tags: [
      'Delivery',
      'Aberto Agora',
      'Retirada no Local',
      'Self-Service',
      'Rodízio',
      'Espaço Kids',
    ],
  },

  // 🏪 Negócios
  'negocios': {
    id: 'negocios',
    name: 'Negócios',
    description: 'Comércio com ponto físico',
    iconKey: 'store',
    categories: [
      'Lojas de Roupas',
      'Mercados',
      'Farmácias',
      'Pet Shops',
      'Lojas de Eletrônicos',
      'Materiais de Construção',
    ],
    tags: [
      'Aceita Cartão',
      'Estacionamento Próprio',
      'Loja Física',
      'Promoções',
      'Atendimento no Local',
    ],
  },

  // 🧰 Serviços
  'servicos': {
    id: 'servicos',
    name: 'Serviços',
    description: 'Prestação de serviços',
    iconKey: 'services',
    categories: [
      'Saúde',
      'Beleza e Estética',
      'Casa e Construção',
      'Automotivo',
      'Tecnologia',
      'Serviços Profissionais',
    ],
    tags: [
      'Atende em Domicílio',
      'Orçamento Sem Compromisso',
      'Emergência 24h',
      'Com Agendamento',
      'Atendimento Online',
    ],
  },

  // 🛒 Classificados
  'classificados': {
    id: 'classificados',
    name: 'Classificados',
    description: 'Compra, venda ou doação entre pessoas',
    iconKey: 'classifieds',
    categories: [
      'Móveis',
      'Eletrônicos',
      'Eletrodomésticos',
      'Roupas e Acessórios',
      'Animais',
      'Ferramentas',
      'Veículos',
      'Outros',
    ],
    tags: [
      'Produto Novo',
      'Produto Usado',
      'Para Doação',
      'Aceita Troca',
      'Preço Negociável',
      'Retirada no Local',
      'Faz Entrega',
    ],
  },

  // 💸 Ofertas
  'ofertas': {
    id: 'ofertas',
    name: 'Ofertas',
    description: 'Estado promocional (overlay sobre listings existentes)',
    iconKey: 'deals',
    categories: [], // Herda do listing original
    tags: [
      'Desconto',
      'Promoção por Tempo Limitado',
      'Cupom',
      'Oferta do Dia',
    ],
  },

  // 📅 Agenda (Eventos)
  'agenda': {
    id: 'agenda',
    name: 'Agenda',
    description: 'Eventos com data',
    iconKey: 'events',
    categories: [
      'Shows e Música',
      'Festas Religiosas',
      'Feiras e Bazares',
      'Cursos e Workshops',
      'Eventos Esportivos',
      'Vida Noturna',
    ],
    tags: [
      'Entrada Gratuita',
      'Ao Ar Livre',
      'Para Família',
      'Música ao Vivo',
      'Ingressos Online',
    ],
  },

  // 📍 Lugares
  'lugares': {
    id: 'lugares',
    name: 'Lugares',
    description: 'Pontos físicos e turísticos',
    iconKey: 'places',
    categories: [
      'Praças',
      'Parques',
      'Pontos Turísticos',
      'Igrejas',
      'Trilhas',
      'Espaços Públicos',
    ],
    tags: [
      'Acesso Livre',
      'Histórico',
      'Área Verde',
      'Ideal para Crianças',
    ],
  },

  // 🏠 Imóveis
  'imoveis': {
    id: 'imoveis',
    name: 'Imóveis',
    description: 'Moradia ou investimento',
    iconKey: 'realestate',
    categories: [
      'Casas (Venda)',
      'Casas (Aluguel)',
      'Apartamentos',
      'Terrenos e Lotes',
      'Imóveis Rurais',
      'Comercial',
    ],
    tags: [
      'Aceita Financiamento',
      'Mobiliado',
      'Piscina',
      'Garagem',
      'Aceita Permuta',
    ],
  },

  // 📰 Notícias
  'noticias': {
    id: 'noticias',
    name: 'Notícias',
    description: 'Conteúdo editorial',
    iconKey: 'news',
    categories: [
      'Cidade',
      'Política',
      'Economia',
      'Cultura',
      'Esportes',
    ],
    tags: [
      'Urgente',
      'Comunicado Oficial',
      'Interesse Público',
    ],
  },

  // 🕊️ Falecimentos
  'falecimentos': {
    id: 'falecimentos',
    name: 'Falecimentos',
    description: 'Serviço comunitário',
    iconKey: 'obituary',
    categories: [
      'Nota de Falecimento',
      'Missa de Sétimo Dia',
      'Agradecimento',
    ],
    tags: [
      'Velório',
      'Sepultamento',
      'Comunicado da Família',
    ],
  },

  // 🚗 Carros
  'carros': {
    id: 'carros',
    name: 'Carros',
    description: 'Vertical automotiva',
    iconKey: 'cars',
    categories: [
      'Carros',
      'Motos',
      'Caminhonetes',
    ],
    tags: [
      'Novo',
      'Usado',
      'Financiamento',
      'Único Dono',
    ],
  },

  // 💼 Empregos
  'empregos': {
    id: 'empregos',
    name: 'Empregos',
    description: 'Oportunidades profissionais',
    iconKey: 'jobs',
    categories: [
      'Comércio e Vendas',
      'Administrativo',
      'Serviços Gerais',
      'Saúde',
      'Tecnologia',
      'Estágios',
      'Freelance',
    ],
    tags: [
      'CLT',
      'Meio Período',
      'Home Office',
      'Urgente',
      'Sem Experiência',
    ],
  },
};

// ==================== HELPERS ====================

/**
 * Retorna todos os Listing Types disponíveis
 */
export function getAllListingTypes(): ListingTypeDefinition[] {
  return Object.values(LISTING_TYPES);
}

/**
 * Retorna um Listing Type pelo ID
 */
export function getListingType(id: string): ListingTypeDefinition | undefined {
  return LISTING_TYPES[id];
}

/**
 * Retorna as categorias permitidas para um Listing Type
 */
export function getCategoriesForType(typeId: string): string[] {
  return LISTING_TYPES[typeId]?.categories || [];
}

/**
 * Retorna as tags permitidas para um Listing Type
 */
export function getTagsForType(typeId: string): string[] {
  return LISTING_TYPES[typeId]?.tags || [];
}

/**
 * Valida se uma categoria pertence a um Listing Type
 */
export function isValidCategory(typeId: string, category: string): boolean {
  const categories = getCategoriesForType(typeId);
  return categories.some(c => 
    c.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Valida se uma tag pertence a um Listing Type
 */
export function isValidTag(typeId: string, tag: string): boolean {
  const tags = getTagsForType(typeId);
  return tags.some(t => 
    t.toLowerCase() === tag.toLowerCase()
  );
}

/**
 * Normaliza string para comparação (lowercase, sem acentos, underscores)
 */
export function normalizeForComparison(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s-]+/g, '_')
    .trim();
}

/**
 * Mapeia slugs legados para os novos IDs
 */
export const LEGACY_SLUG_MAP: Record<string, string> = {
  'food': 'comer-agora',
  'store': 'negocios',
  'services': 'servicos',
  'classifieds': 'classificados',
  'bazar': 'classificados',
  'deals': 'ofertas',
  'events': 'agenda',
  'evento': 'agenda',
  'places': 'lugares',
  'realestate': 'imoveis',
  'imovel': 'imoveis',
  'news': 'noticias',
  'obituary': 'falecimentos',
  'cars': 'carros',
  'carro': 'carros',
  'jobs': 'empregos',
  'emprego': 'empregos',
};

/**
 * Resolve um slug (legado ou novo) para o ID canônico
 */
export function resolveListingTypeId(slug: string): string {
  const normalized = normalizeForComparison(slug);
  return LEGACY_SLUG_MAP[normalized] || LISTING_TYPES[normalized]?.id || slug;
}

/**
 * Retorna filtros formatados para UI a partir de um Listing Type
 */
export function getFiltersForType(typeId: string): { key: string; label: string }[] {
  const tags = getTagsForType(typeId);
  return tags.map(tag => ({
    key: normalizeForComparison(tag),
    label: tag,
  }));
}

// ==================== CONSTANTES DE COMPATIBILIDADE ====================

/**
 * Mapeamento de categorySlug existente para Listing Type ID
 */
export const CATEGORY_SLUG_TO_TYPE: Record<string, string> = {
  'comer-agora': 'comer-agora',
  'negocios': 'negocios',
  'servicos': 'servicos',
  'classificados': 'classificados',
  'ofertas': 'ofertas',
  'agenda': 'agenda',
  'lugares': 'lugares',
  'imoveis': 'imoveis',
  'noticias': 'noticias',
  'falecimentos': 'falecimentos',
  'carros': 'carros',
  'empregos': 'empregos',
};

/**
 * Retorna o Listing Type baseado no categorySlug de um business
 */
export function getTypeFromCategorySlug(categorySlug: string): string {
  return CATEGORY_SLUG_TO_TYPE[categorySlug] || 'servicos';
}
