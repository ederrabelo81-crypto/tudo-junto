import type React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getCategoryLucideIcon } from '@/lib/categoryIcons';

interface CategoryCardProps {
  id: string;
  name: string;
  iconKey: string;
  className?: string;
  size?: 'sm' | 'md';
  onClickOverride?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * COMPONENTE UNIFICADO: Card de Categoria/Listing Type
 * 
 * REGRAS VISUAIS (não negociáveis):
 * - Container: flex flex-col items-center justify-center
 * - Ícone: h-12 w-12 rounded-2xl bg-primary/10 com ícone 24px
 * - Label: span (não <p>) com line-clamp-2 e min-height fixo
 * - Fallback: Grid icon via getCategoryLucideIcon()
 * 
 * Usado em: Home (CategoryGrid), Buscar (grid de tipos)
 */
export function CategoryCard({ id, name, iconKey, className, size = 'md', onClickOverride }: CategoryCardProps) {
  // Rotas especiais para verticais
  const getRoute = () => {
    const specialRoutes: Record<string, string> = {
      'lugares': '/lugares',
      'carros': '/carros',
      'empregos': '/empregos',
      'imoveis': '/imoveis',
    };
    return specialRoutes[id] || `/categoria/${id}`;
  };

  // Obtém ícone com fallback seguro (nunca undefined)
  const Icon = getCategoryLucideIcon(iconKey || id);

  // Configurações por tamanho
  const isSmall = size === 'sm';
  const containerSize = isSmall ? 'h-10 w-10 rounded-xl' : 'h-12 w-12 rounded-2xl';
  const iconSize = isSmall ? 'h-5 w-5' : 'h-6 w-6';
  const textSize = isSmall ? 'text-[12px]' : 'text-sm';
  const cardPadding = isSmall ? 'p-3 min-h-[84px]' : 'p-4 min-h-[100px]';

  return (
    <Link
      to={getRoute()}
      onClick={onClickOverride}
      className={cn(
        "flex flex-col items-center justify-center",
        "bg-card rounded-2xl card-shadow hover:card-shadow-hover",
        "transition-all active:scale-95 touch-target",
        cardPadding,
        className
      )}
    >
      {/* Container do ícone - tamanho fixo */}
      <div 
        className={cn(
          "flex items-center justify-center",
          "bg-primary/10",
          containerSize
        )}
      >
        <Icon 
          className={cn(iconSize, "text-primary object-contain")} 
          strokeWidth={2}
        />
      </div>

      {/* Label - SEMPRE span, nunca <p> */}
      <span 
        className={cn(
          "mt-2 font-semibold text-foreground text-center",
          "leading-tight line-clamp-2 break-words min-h-[2.5em]",
          textSize
        )}
      >
        {name}
      </span>
    </Link>
  );
}
