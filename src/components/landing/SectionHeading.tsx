import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

/** Centered section header: small uppercase kicker, H2, optional intro paragraph. */
export default function SectionHeading({
  kicker,
  title,
  description,
  size = 'lg',
  className,
}: {
  kicker: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** 'lg' for feature sections, 'md' for FAQ-style sections. */
  size?: 'md' | 'lg';
  className?: string;
}) {
  const lg = size === 'lg';
  return (
    <div className={cn('max-w-3xl mb-10', className)}>
      <div className={cn('inline-block text-xs font-bold uppercase tracking-widest text-brand-primary-ink', lg ? 'mb-3' : 'mb-2')}>{kicker}</div>
      <h2 className="text-h2 font-bold">{title}</h2>
      {description && (
        <p className={cn('text-muted-foreground', lg ? 'text-sm sm:text-base mt-3' : 'text-sm mt-2')}>{description}</p>
      )}
    </div>
  );
}
