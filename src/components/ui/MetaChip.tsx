import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetaChipProps {
  children: ReactNode;
  className?: string;
}

/**
 * Chip pequeno para sobrepor em imagens (estilo MyListing):
 * rating, status, verificado, preço etc.
 */
export function MetaChip({ children, className }: MetaChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold',
        'bg-black/55 text-white backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </span>
  );
}
