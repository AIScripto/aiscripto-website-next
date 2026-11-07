import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, KeyRound, ShieldCheck, UserRound } from 'lucide-react';
import Eyebrow from '../Eyebrow';
import { homeSecurityPillars } from '../../data/home';

const ICONS = { cloud: Cloud, training: ShieldCheck, ownership: KeyRound, architect: UserRound } as const;

/**
 * Home "Why AIScripto": four plain trust points (data control, no model training,
 * code ownership, dedicated architect). Technical security detail lives on /services/security.
 */
export default function HomeSecurityCompliance() {
  return (
    <section className="relative section-y border-b border-border/60 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-6">Why AIScripto</Eyebrow>
            <h2 className="text-h2 font-bold text-foreground mb-5 tracking-tight">
              Secure by design, <span className="text-gradient">yours by contract</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Built for finance, healthcare and retail teams that need private, auditable systems.
            </p>
            <Link
              to="/services/security"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-ink"
            >
              How we approach security
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {homeSecurityPillars.map((pillar) => {
              const Icon = ICONS[pillar.key];
              return (
                <li key={pillar.key} className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-inset ring-primary/20">
                    <Icon className="h-5 w-5 text-brand-primary-ink" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
