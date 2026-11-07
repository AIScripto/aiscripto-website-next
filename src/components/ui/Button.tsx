import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

/** primary = main brand action; accent = secondary "try it live" action; outline = quiet secondary. */
type Variant = 'primary' | 'accent' | 'outline';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 text-center font-semibold tracking-tight transition-all disabled:opacity-50 disabled:cursor-not-allowed';
const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20',
  accent: 'bg-brand-secondary text-brand-secondary-foreground hover:opacity-90 shadow-lg shadow-brand-secondary/25',
  outline: 'border border-border bg-card/60 backdrop-blur-sm hover:bg-muted text-foreground',
};
/** One pill shape everywhere; size only changes padding and type. Width is set by the caller. */
const sizes: Record<Size, string> = {
  md: 'px-5 py-3 rounded-full text-sm',
  lg: 'px-7 py-3.5 rounded-full text-base',
};

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'lg', className?: string) =>
  cn(base, variants[variant], sizes[size], className);

/** Router link styled as a button (all site CTAs are navigations, not actions). */
export function ButtonLink({
  to,
  variant = 'primary',
  size = 'lg',
  className,
  children,
}: {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}
