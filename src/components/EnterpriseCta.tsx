import type React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';
import { COMPANY } from '../data/company';

export interface EnterpriseCtaProps {
  badge?: string;
  heading?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  trustPoints?: string[];
  className?: string;
  /**
   * `compact` (default): one slim row for content pages.
   * `full`: the larger two-column band, used on Home and the Products/Services hubs.
   */
  variant?: 'compact' | 'full';
}

export default function EnterpriseCta({
  badge = "Talk to our team",
  heading = "Ready to start your AI project?",
  description = "Tell us what slows your team down. A solutions architect will review it, suggest an approach and give you an honest estimate.",
  primaryButtonText = "Book a consultation",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Try a live demo",
  secondaryButtonLink = "/live-demos",
  trustPoints = [
    "Reply within one business day",
    "Mutual NDA on request",
    "You own the code and IP"
  ],
  className,
  variant = 'compact',
}: EnterpriseCtaProps) {
  // Buttons sit on the dark CTA panel (same in both themes), so they use on-dark styles.
  const primaryCls = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold bg-[#2dd4bf] text-[#042f2e] shadow-lg shadow-black/30 transition hover:brightness-110',
    variant === 'full' && 'w-full',
  );
  const secondaryCls = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold border border-white/25 text-white transition hover:bg-white/10',
    variant === 'full' && 'w-full',
  );
  const actions = (
    <>
      <Link to={primaryButtonLink} className={primaryCls}>
        <span>{primaryButtonText}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
      {secondaryButtonText && secondaryButtonLink && (
        <Link to={secondaryButtonLink} className={secondaryCls}>
          <span>{secondaryButtonText}</span>
        </Link>
      )}
    </>
  );

  /** Dark stage panel with a soft teal glow, matching the spotlight heroes. */
  const stage = (inner: React.ReactNode, pad: string) => (
    <div className={cn('relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#070a14] text-white', pad)}>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-[#2dd4bf]/25 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#38bdf8]/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-dashed border-white/10" />
      </div>
      {inner}
    </div>
  );

  if (variant === 'compact') {
    return (
      <section className={cn('section-gap', className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {stage(
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-h3 font-bold text-white mb-2">{heading}</h2>
                <p className="text-base text-white/75 leading-relaxed">{description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">{actions}</div>
            </div>,
            'px-6 py-10 sm:px-10',
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={cn('section-gap', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {stage(
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#2dd4bf]">{badge}</span>
              <h2 className="text-h2 font-bold text-white">{heading}</h2>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">{description}</p>
              {trustPoints && trustPoints.length > 0 && (
                <ul className="pt-2 flex flex-wrap gap-y-2.5 gap-x-6">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm font-medium text-white/85">
                      <CheckCircle2 className="w-4 h-4 text-[#2dd4bf] shrink-0" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md p-6 sm:p-8 flex flex-col space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-1.5">Direct line</span>
                  <h3 className="text-xl font-bold text-white mb-2">Talk to a solutions architect</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Share your goals and constraints. We review requirements, outline an approach and estimate timelines with you.
                  </p>
                </div>
                <div className="space-y-3">{actions}</div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-sm text-white/65">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#2dd4bf] shrink-0" aria-hidden="true" />
                    Confidential
                  </span>
                  <a href={`mailto:${COMPANY.email}`} className="truncate hover:text-white transition-colors">{COMPANY.email}</a>
                </div>
              </div>
            </div>
          </div>,
          'p-8 sm:p-12 lg:p-16',
        )}
      </div>
    </section>
  );
}
