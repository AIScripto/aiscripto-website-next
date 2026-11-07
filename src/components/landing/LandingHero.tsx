import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import Eyebrow from '../Eyebrow';
import { ButtonLink } from '../ui/Button';

export interface HeroAction {
  label: string;
  to: string;
  /** Optional leading icon for the secondary action. */
  icon?: ReactNode;
}

/** Centered landing-page hero: eyebrow, H1, intro, primary + secondary actions. */
export default function LandingHero({
  eyebrow,
  eyebrowClassName,
  title,
  intro,
  primary,
  secondary,
}: {
  eyebrow: ReactNode;
  /** Overrides the eyebrow's colour scheme (e.g. the HVAC page uses orange). */
  eyebrowClassName?: string;
  title: ReactNode;
  intro: ReactNode;
  primary: HeroAction;
  secondary: HeroAction;
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
      <div className="max-w-4xl">
        <Eyebrow className={eyebrowClassName ?? 'mb-6'}>{eyebrow}</Eyebrow>
        <h1 className="text-display font-black mb-6">{title}</h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">{intro}</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <ButtonLink to={primary.to} className="w-full sm:w-auto">
            {primary.label} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to={secondary.to} variant="outline" className="w-full sm:w-auto">
            {secondary.icon}
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
