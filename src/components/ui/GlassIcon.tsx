import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export type GlassIconSize = 'xs' | 'sm' | 'md' | 'lg';
export type GlassIconVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive' | 'muted';

interface GlassIconProps {
  icon: LucideIcon;
  size?: GlassIconSize;
  variant?: GlassIconVariant;
  className?: string;
}

const sizeConfig: Record<GlassIconSize, { container: string; icon: string }> = {
  xs: { container: 'w-8 h-8 rounded-xl', icon: 'w-4 h-4' },
  sm: { container: 'w-10 h-10 rounded-xl', icon: 'w-5 h-5' },
  md: { container: 'w-12 h-12 rounded-2xl', icon: 'w-6 h-6' },
  lg: { container: 'w-14 h-14 rounded-2xl', icon: 'w-7 h-7' },
};

const variantConfig: Record<GlassIconVariant, { bg: string; border: string; text: string }> = {
  primary: {
    bg: 'bg-primary/12',
    border: 'border-primary/20',
    text: 'text-primary',
  },
  secondary: {
    bg: 'bg-secondary/12',
    border: 'border-secondary/20',
    text: 'text-secondary-foreground',
  },
  accent: {
    bg: 'bg-accent/20',
    border: 'border-accent/30',
    text: 'text-accent-foreground',
  },
  success: {
    bg: 'bg-green-500/12',
    border: 'border-green-500/20',
    text: 'text-green-600',
  },
  warning: {
    bg: 'bg-yellow-500/12',
    border: 'border-yellow-500/20',
    text: 'text-yellow-600',
  },
  destructive: {
    bg: 'bg-destructive/12',
    border: 'border-destructive/20',
    text: 'text-destructive',
  },
  muted: {
    bg: 'bg-muted/50',
    border: 'border-muted-foreground/10',
    text: 'text-muted-foreground',
  },
};

export function GlassIcon({ icon: Icon, size = 'md', variant = 'primary', className }: GlassIconProps) {
  const sizeStyles = sizeConfig[size];
  const variantStyles = variantConfig[variant];

  return (
    <div
      className={cn(
        'flex items-center justify-center aspect-square',
        'backdrop-blur-sm border',
        'transition-all duration-200',
        sizeStyles.container,
        variantStyles.bg,
        variantStyles.border,
        className
      )}
    >
      <Icon
        className={cn(sizeStyles.icon, variantStyles.text)}
        strokeWidth={2.2}
      />
    </div>
  );
}

// Category-specific icon mapping with Lucide icons
export { GlassIcon as default };
