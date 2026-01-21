import { cn } from '@/lib/utils';
import { getCategoryIcon } from '@/assets/icons/categoryIcons';
import {
  Utensils,
  Store,
  Wrench,
  Tag,
  Calendar,
  Newspaper,
  Heart,
  MapPin,
  Car,
  Briefcase,
  Home,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';

export type GlassCategorySize = 'xs' | 'sm' | 'md' | 'lg';

interface GlassCategoryIconProps {
  categoryId: string;
  size?: GlassCategorySize;
  className?: string;
  useLucide?: boolean; // Force Lucide icons instead of 3D PNGs
}

const sizeConfig: Record<GlassCategorySize, { container: string; icon: string; image: string }> = {
  xs: { container: 'w-8 h-8 rounded-xl', icon: 'w-4 h-4', image: 'w-5 h-5' },
  sm: { container: 'w-10 h-10 rounded-xl', icon: 'w-5 h-5', image: 'w-6 h-6' },
  md: { container: 'w-12 h-12 rounded-2xl', icon: 'w-6 h-6', image: 'w-8 h-8' },
  lg: { container: 'w-14 h-14 rounded-2xl', icon: 'w-7 h-7', image: 'w-10 h-10' },
};

// Category color mapping for glassmorphism effect
const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  food: { bg: 'bg-orange-500/12', border: 'border-orange-500/20', text: 'text-orange-600' },
  'comer-agora': { bg: 'bg-orange-500/12', border: 'border-orange-500/20', text: 'text-orange-600' },
  store: { bg: 'bg-blue-500/12', border: 'border-blue-500/20', text: 'text-blue-600' },
  negocios: { bg: 'bg-blue-500/12', border: 'border-blue-500/20', text: 'text-blue-600' },
  services: { bg: 'bg-purple-500/12', border: 'border-purple-500/20', text: 'text-purple-600' },
  servicos: { bg: 'bg-purple-500/12', border: 'border-purple-500/20', text: 'text-purple-600' },
  classifieds: { bg: 'bg-emerald-500/12', border: 'border-emerald-500/20', text: 'text-emerald-600' },
  classificados: { bg: 'bg-emerald-500/12', border: 'border-emerald-500/20', text: 'text-emerald-600' },
  deals: { bg: 'bg-yellow-500/12', border: 'border-yellow-500/20', text: 'text-yellow-600' },
  ofertas: { bg: 'bg-yellow-500/12', border: 'border-yellow-500/20', text: 'text-yellow-600' },
  events: { bg: 'bg-pink-500/12', border: 'border-pink-500/20', text: 'text-pink-600' },
  agenda: { bg: 'bg-pink-500/12', border: 'border-pink-500/20', text: 'text-pink-600' },
  news: { bg: 'bg-sky-500/12', border: 'border-sky-500/20', text: 'text-sky-600' },
  noticias: { bg: 'bg-sky-500/12', border: 'border-sky-500/20', text: 'text-sky-600' },
  obituary: { bg: 'bg-slate-500/12', border: 'border-slate-500/20', text: 'text-slate-600' },
  falecimentos: { bg: 'bg-slate-500/12', border: 'border-slate-500/20', text: 'text-slate-600' },
  places: { bg: 'bg-teal-500/12', border: 'border-teal-500/20', text: 'text-teal-600' },
  lugares: { bg: 'bg-teal-500/12', border: 'border-teal-500/20', text: 'text-teal-600' },
  cars: { bg: 'bg-red-500/12', border: 'border-red-500/20', text: 'text-red-600' },
  carros: { bg: 'bg-red-500/12', border: 'border-red-500/20', text: 'text-red-600' },
  jobs: { bg: 'bg-indigo-500/12', border: 'border-indigo-500/20', text: 'text-indigo-600' },
  empregos: { bg: 'bg-indigo-500/12', border: 'border-indigo-500/20', text: 'text-indigo-600' },
  realestate: { bg: 'bg-amber-500/12', border: 'border-amber-500/20', text: 'text-amber-600' },
  imoveis: { bg: 'bg-amber-500/12', border: 'border-amber-500/20', text: 'text-amber-600' },
};

// Lucide icon mapping for categories
const categoryLucideIcons: Record<string, LucideIcon> = {
  food: Utensils,
  'comer-agora': Utensils,
  store: Store,
  negocios: Store,
  services: Wrench,
  servicos: Wrench,
  classifieds: ShoppingBag,
  classificados: ShoppingBag,
  deals: Tag,
  ofertas: Tag,
  events: Calendar,
  agenda: Calendar,
  news: Newspaper,
  noticias: Newspaper,
  obituary: Heart,
  falecimentos: Heart,
  places: MapPin,
  lugares: MapPin,
  cars: Car,
  carros: Car,
  jobs: Briefcase,
  empregos: Briefcase,
  realestate: Home,
  imoveis: Home,
};

const defaultColors = { bg: 'bg-primary/12', border: 'border-primary/20', text: 'text-primary' };

export function GlassCategoryIcon({ categoryId, size = 'md', className, useLucide = false }: GlassCategoryIconProps) {
  const sizeStyles = sizeConfig[size];
  const colors = categoryColors[categoryId] || defaultColors;
  const iconSrc = getCategoryIcon(categoryId);
  const LucideIcon = categoryLucideIcons[categoryId];

  // Use 3D PNG icons if available and not forcing Lucide
  if (iconSrc && !useLucide) {
    return (
      <div
        className={cn(
          'flex items-center justify-center aspect-square',
          'backdrop-blur-sm border',
          'transition-all duration-200',
          sizeStyles.container,
          colors.bg,
          colors.border,
          className
        )}
      >
        <img
          src={iconSrc}
          alt=""
          loading="lazy"
          className={cn('object-contain drop-shadow-sm', sizeStyles.image)}
        />
      </div>
    );
  }

  // Fallback to Lucide icons
  if (LucideIcon) {
    return (
      <div
        className={cn(
          'flex items-center justify-center aspect-square',
          'backdrop-blur-sm border',
          'transition-all duration-200',
          sizeStyles.container,
          colors.bg,
          colors.border,
          className
        )}
      >
        <LucideIcon
          className={cn(sizeStyles.icon, colors.text)}
          strokeWidth={2.2}
        />
      </div>
    );
  }

  // Final fallback: emoji placeholder
  return (
    <div
      className={cn(
        'flex items-center justify-center aspect-square',
        'backdrop-blur-sm border',
        'transition-all duration-200',
        sizeStyles.container,
        'bg-muted/50 border-muted-foreground/10',
        className
      )}
    >
      <span className="text-lg">📦</span>
    </div>
  );
}

export { GlassCategoryIcon as default };
