import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SpotlightCard {
  title: string;
  description: string;
}

export interface SpotlightAction {
  label: string;
  /** Internal route (react-router) */
  to?: string;
  /** External or in-page link */
  href?: string;
  external?: boolean;
}

/**
 * Site-wide "spotlight" hero: a dark stage that looks the same in both themes, with copy
 * on the left, a visual on a glowing orbit in the centre and three feature cards on the
 * right. Each page passes its own accent colour.
 *
 * lg: 3 columns (copy | visual | cards). Below lg it stacks in that order.
 * The Navbar switches to its light-on-dark style on pages listed in utils/darkHeroRoutes.
 */
export default function SpotlightHero({
  eyebrow,
  badge,
  titleLead,
  titleAccent,
  lead,
  primary,
  secondary,
  cards,
  media,
  accent,
  accentInk,
  breadcrumb,
  heading,
}: {
  /** SEO page heading. When given it becomes the <h1> (small accent line) and the
   *  two-tone title below is rendered as a large display line instead. */
  heading?: string;
  eyebrow: string;
  badge?: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  primary: SpotlightAction;
  secondary?: SpotlightAction;
  cards: SpotlightCard[];
  media: ReactNode;
  accent: string;
  accentInk: string;
  breadcrumb?: ReactNode;
}) {
  const vars = { '--spot': accent, '--spot-ink': accentInk } as CSSProperties;

  return (
    <section style={vars} className="relative isolate overflow-hidden bg-[#070a14] text-white pt-32 pb-16 sm:pt-36 lg:pb-20 border-b border-white/10">
      {/* Stage lighting: accent glow behind the visual, faint stars, orbit rings */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute left-1/2 top-[55%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, var(--spot) 0%, transparent 65%)' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_12%_20%,rgba(255,255,255,0.5),transparent),radial-gradient(1px_1px_at_80%_12%,rgba(255,255,255,0.4),transparent),radial-gradient(1px_1px_at_68%_78%,rgba(255,255,255,0.35),transparent),radial-gradient(1px_1px_at_30%_85%,rgba(255,255,255,0.3),transparent),radial-gradient(1px_1px_at_92%_60%,rgba(255,255,255,0.35),transparent)]" />
        <div className="absolute left-1/2 top-[55%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />
        <div className="absolute left-1/2 top-[55%] h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.06]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb && <div className="mb-8 text-sm text-white/70">{breadcrumb}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: copy and actions */}
          <div className="lg:col-span-5 animate-fade-up">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-[color:var(--spot)]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {eyebrow}
              </span>
              {badge && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--spot)]" aria-hidden="true" />
                  {badge}
                </span>
              )}
            </div>

            {heading && <h1 className="text-base sm:text-lg font-semibold text-white/85 leading-snug mb-3">{heading}</h1>}
            {(() => {
              const Title = heading ? 'p' : 'h1';
              return (
                <Title className="font-display text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] font-bold tracking-tight leading-[1.05] mb-6">
                  <span className="block text-white">{titleLead}</span>
                  <span className="block text-[color:var(--spot)]">{titleAccent}</span>
                </Title>
              );
            })()}

            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">{lead}</p>

            <div className="flex flex-wrap items-center gap-3">
              <ActionLink action={primary} variant="primary" />
              {secondary && <ActionLink action={secondary} variant="secondary" />}
            </div>
          </div>

          {/* Centre: visual on the stage */}
          <div className="lg:col-span-3 relative flex items-center justify-center min-h-[18rem] sm:min-h-[22rem] lg:min-h-[28rem] animate-fade-up [animation-delay:0.1s]">
            <span className="absolute right-[12%] top-[18%] h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_16px_4px_rgba(251,191,36,0.5)]" aria-hidden="true" />
            {media}
          </div>

          {/* Right: three feature cards */}
          <ul className="lg:col-span-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 animate-fade-up [animation-delay:0.2s]">
            {cards.map((card) => (
              <li
                key={card.title}
                className={cn(
                  'rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-colors',
                  'hover:border-[color:var(--spot)]/40 hover:bg-white/[0.06]',
                )}
              >
                <h2 className="text-lg font-semibold text-white mb-1.5">{card.title}</h2>
                <p className="text-sm text-white/70 leading-relaxed">{card.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ActionLink({ action, variant }: { action: SpotlightAction; variant: 'primary' | 'secondary' }) {
  const cls =
    variant === 'primary'
      ? 'inline-flex items-center gap-2 rounded-full px-5 py-3 text-base font-semibold bg-[color:var(--spot)] text-[color:var(--spot-ink)] shadow-lg shadow-black/30 transition hover:brightness-110'
      : 'inline-flex items-center gap-2 rounded-full border border-[color:var(--spot)]/60 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10';
  const inner = (
    <>
      {variant === 'secondary' && action.external && <PlayCircle className="h-4 w-4 text-[color:var(--spot)]" aria-hidden="true" />}
      {action.label}
      {variant === 'primary' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </>
  );
  if (action.to) return <Link to={action.to} className={cls}>{inner}</Link>;
  return (
    <a href={action.href} className={cls} {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  );
}

/** Round, glowing photo for the centre of the stage (works with any landscape photo). */
export function SpotlightPhoto({ src, srcSet, alt }: { src: string; srcSet?: string; alt: string }) {
  return (
    <div className="relative">
      <div
        className="absolute -inset-4 rounded-full blur-2xl opacity-60"
        style={{ background: 'radial-gradient(circle, var(--spot) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative h-64 w-64 sm:h-72 sm:w-72 lg:h-[17rem] lg:w-[17rem] xl:h-[19rem] xl:w-[19rem] rounded-full p-1.5 bg-gradient-to-br from-[color:var(--spot)] via-white/20 to-transparent shadow-2xl shadow-black/60">
        <img
          src={src}
          srcSet={srcSet}
          sizes="(max-width: 640px) 256px, (max-width: 1280px) 288px, 304px"
          alt={alt}
          width={704}
          height={704}
          className="h-full w-full rounded-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}

/** Browser-framed screenshot for the centre of the stage. */
export function SpotlightScreenshot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full max-w-md lg:max-w-none">
      <div
        className="absolute -inset-6 rounded-[2rem] blur-2xl opacity-50"
        style={{ background: 'radial-gradient(circle, var(--spot) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-2 shadow-2xl shadow-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-2 pb-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </div>
        <img src={src} alt={alt} width={960} height={600} className="w-full rounded-xl object-cover aspect-[16/10]" loading="eager" decoding="async" />
      </div>
    </div>
  );
}
