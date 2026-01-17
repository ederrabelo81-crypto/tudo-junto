import type { Business } from "@/data/mockData";

/**
 * Centraliza as tags usadas para filtros e chips.
 *
 * - Usa `b.tags` quando existir.
 * - Também suporta flags opcionais (acceptsCard, delivery, etc.) caso existam no futuro.
 */
export function getBusinessTags(b: Business): string[] {
  const tags = new Set<string>(b.tags ?? []);

  // Campos opcionais (podem vir do scraper/BD no futuro)
  const extra = b as any;

  // Comer Agora
  if (extra.acceptsCard) tags.add("Aceita Cartão");
  if (extra.delivery) tags.add("Entrega");
  if (extra.eatNow) tags.add("Comer Agora");

  // Serviços
  if (extra.homeService) tags.add("Atende em domicílio");
  if (extra.freeQuote) tags.add("Orçamento sem compromisso");
  if (extra.service24h) tags.add("Atendimento 24h");
  if (extra.petFriendly) tags.add("Pet friendly");

  return Array.from(tags);
}
