import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { cn } from '../utils/cn';

export interface PageHeroFact {
  label: string;
  value: string;
  icon?: LucideIcon;
}

/**
 * Shared header for inner pages, so every page opens with the same brand frame
 * instead of a half-empty text column.
 *
 * Layout: eyebrow + H1 + lead (+ optional actions) on the left; on large screens the
 * right column shows `aside` if given, otherwise a compact "at a glance" panel built
 * from `facts`. With neither, the text block spans the full width.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  facts,
  aside,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  facts?: PageHeroFact[];
  aside?: ReactNode;
  className?: string;
}) {
  const hasSide = Boolean(aside) || Boolean(facts && facts.length);

  return (
    <section className={cn('relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap', className)}>
      {/* Soft brand backdrop so the header reads as a designed band, not bare text. */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[28rem] overflow-hidden -z-10" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-brand-secondary/10 blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      </div>

      <div className={cn('grid gap-10 items-center', hasSide && 'lg:grid-cols-12')}>
        <div className={cn(hasSide ? 'lg:col-span-7' : 'max-w-4xl')}>
          {eyebrow && <Eyebrow className="mb-6 animate-fade-up">{eyebrow}</Eyebrow>}
          <h1 className="text-h1 font-bold mb-6 animate-fade-up [animation-delay:0.1s]">{title}</h1>
          {description && (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl animate-fade-up [animation-delay:0.2s]">
              {description}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:0.3s]">{actions}</div>}
        </div>

        {hasSide && (
          <div className="lg:col-span-5 animate-fade-up [animation-delay:0.25s]">
            {aside ?? (
              <dl className="card-elevated rounded-3xl p-6 sm:p-8 grid grid-cols-2 gap-x-6 gap-y-6">
                {facts!.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="min-w-0">
                    <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                      {Icon && <Icon className="h-4 w-4 text-brand-primary-ink shrink-0" aria-hidden="true" />}
                      {label}
                    </dt>
                    <dd className="mt-1 text-lg font-bold text-foreground leading-snug">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
