export interface Business {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  tags: string[];
  neighborhood: string;
  hours: string;
  phone?: string;
  whatsapp: string;
  coverImages: string[];
  isOpenNow: boolean;
  isVerified: boolean;
  description: string;
  address: string;
}

const DEFAULT_IMAGE = '/placeholder.svg';

const GOOGLE_MAPS_TAG_BLACKLIST = new Set(['point_of_interest', 'establishment']);

/**
 * Tenta adivinhar a "lesma" da categoria (categorySlug) com base no nome, categoria e descrição.
 * Esta função é um fallback crucial para garantir que os negócios sejam exibidos nas seções corretas,
 * mesmo que o campo `categorySlug` não esteja explicitamente definido no banco de dados.
 */
function guessCategorySlug(rawData: any): string {
  const name = (rawData.name || '').toLowerCase();
  const category = (rawData.category || '').toLowerCase();
  const description = (rawData.description || '').toLowerCase();
  const textToSearch = `${name} ${category} ${description}`;

  // Palavras-chave para a categoria 'comer-agora'
  const foodKeywords = [
    'restaurante', 'pizza', 'pizzaria', 'comer', 'lanchonete', 'comida', 
    'bar', 'marmita', 'marmitex', 'espetinho', 'churrasco', 'açaí', 
    'sorvete', 'hamburguer', 'delivery', 'fast food', 'refeição'
  ];
  if (foodKeywords.some(key => textToSearch.includes(key))) {
    return 'comer-agora';
  }

  // Palavras-chave para a categoria 'servicos'
  const serviceKeywords = [
    'serviço', 'profissional', 'auto', 'mecânica', 'conserto', 'manutenção', 
    'consultório', 'advogado', 'contador', 'eletricista', 'encanador', 
    'pedreiro', 'salão', 'beleza', 'cabelo', 'estética', 'clínica'
  ];
  if (serviceKeywords.some(key => textToSearch.includes(key))) {
    return 'servicos';
  }

  // Se não for comida nem serviço, assume-se que é uma loja ou negócio geral.
  return 'negocios';
}

function extractGoogleMapsTags(rawData: any): string[] {
  const tags: string[] = [];
  const sources = [
    rawData?.types,
    rawData?.placeTypes,
    rawData?.googleMapsTypes,
    rawData?.googleMaps?.types,
    rawData?.googleMaps?.placeTypes,
    rawData?.googleMaps?.primaryType,
    rawData?.googleMaps?.primaryTypeDisplayName,
    rawData?.primaryType,
    rawData?.primaryTypeDisplayName,
  ];

  sources.forEach((source) => {
    if (Array.isArray(source)) {
      tags.push(...source.filter((value) => typeof value === 'string'));
      return;
    }
    if (typeof source === 'string') {
      tags.push(source);
    }
  });

  const normalized = new Set<string>();
  tags.forEach((tag) => {
    const cleaned = tag.trim();
    if (!cleaned) return;
    if (GOOGLE_MAPS_TAG_BLACKLIST.has(cleaned)) return;
    normalized.add(cleaned.replace(/\s+/g, ' '));
  });

  return Array.from(normalized);
}

// Função helper para normalizar dados da API
export function normalizeBusinessData(rawData: any): Business {
  const googleMapsTags = extractGoogleMapsTags(rawData);
  const combinedTags = new Set<string>([...googleMapsTags, ...(rawData.tags || [])]);

  return {
    id: rawData.id || `temp_${Date.now()}`,
    name: rawData.name || 'Sem nome',
    category: rawData.category || 'Não categorizado',
    // Usa o `categorySlug` do banco de dados, se existir; caso contrário, usa a função para adivinhar.
    categorySlug: rawData.categorySlug || guessCategorySlug(rawData),
    tags: Array.from(combinedTags),
    neighborhood: rawData.neighborhood || 'Sem bairro',
    hours: rawData.hours || 'Consultar horários',
    phone: rawData.phone || undefined,
    whatsapp: rawData.whatsapp || '5535990000000',
    coverImages: rawData.coverImages?.length ? rawData.coverImages : [DEFAULT_IMAGE],
    isOpenNow: rawData.isOpenNow ?? false,
    isVerified: rawData.isVerified ?? false, // Corrigido: rawAta -> rawData
    description: rawData.description || '',
    address: rawData.address || '',
  };
}
