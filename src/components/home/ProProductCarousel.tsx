import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Pause, Play, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { productsData, type Product } from '../../data/products';
import { productSpotlights } from '../../data/productSpotlight';
import { formatGradientText } from '../../utils/textGradient';
import Eyebrow from '../Eyebrow';
import { buttonClasses } from '../ui/Button';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../utils/cn';

const INTERVAL_MS = 7000;

/** Five flagship products for the home showcase (all seven are on /products). */
const FLAGSHIP_IDS = ['nexus-agent', 'business-analytics-ai', 'pos-fast-food', 'erp-financials', 'ai-voice-booking'];

/**
 * Home product showcase.
 * - One-row switcher: short product names with an accent dot, a progress line in the active
 *   tab while auto-advancing, and prev / next / pause controls at the end of the row.
 * - Auto-advance pauses on hover/focus or when off-screen, and stops for good once the
 *   visitor picks a product (so nothing moves while they read).
 * - SEO: every panel is rendered; inactive ones are `hidden`, so each flagship's name,
 *   summary and link are in the prerendered HTML.
 */
export default function ProProductCarousel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);
  const [userChose, setUserChose] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const flagships = FLAGSHIP_IDS.map((id) => productsData.find((p) => p.id === id)).filter(
    (p): p is Product => Boolean(p),
  );
  const total = flagships.length;
  const autoPlaying = !hovered && !paused && !userChose && onScreen && !reducedMotion && total > 1;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlaying) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % total), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [autoPlaying, index, total]);

  if (total === 0) return null;

  const choose = (i: number) => {
    setUserChose(true);
    setIndex(((i % total) + total) % total);
  };

  return (
    <section
      ref={sectionRef}
      id="flagship-systems"
      aria-roledescription="carousel"
      aria-label="AIScripto products"
      className="relative section-y border-b border-border/70 overflow-hidden scroll-mt-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(false);
      }}
    >
      {/* Background ambient lighting & grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute top-10 left-1/4 -translate-x-1/2 w-[700px] h-[400px] opacity-20 dark:opacity-10 blur-3xl rounded-full bg-primary" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Eyebrow className="mb-4">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Our products</span>
            </Eyebrow>
            <h2 className="text-h2 font-extrabold text-foreground tracking-tight leading-tight mb-4">
              Products built for <span className="text-gradient">real operations</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Ready-to-run AI products for retail, hospitality, healthcare and finance: answer every call,
              protect your margins, run your counters and keep your books balanced.
            </p>
          </div>
          <Link to="/products" className={buttonClasses('outline', 'md', 'shrink-0 self-start lg:self-end')}>
            View all products <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Switcher row: tabs + controls */}
        <div className="mb-6 flex items-center gap-3">
          <div
            role="tablist"
            aria-label="Choose a product"
            className="flex flex-1 gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory max-lg:[mask-image:linear-gradient(to_right,#000_85%,transparent)]"
          >
            {flagships.map((f, i) => {
              const active = i === index;
              const accent = productSpotlights[f.id]?.accent ?? 'hsl(var(--primary))';
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  id={`flagship-tab-${f.id}`}
                  aria-selected={active}
                  aria-controls={`flagship-panel-${f.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') { e.preventDefault(); choose(i + 1); }
                    if (e.key === 'ArrowLeft') { e.preventDefault(); choose(i - 1); }
                  }}
                  style={{ '--tab-accent': accent } as CSSProperties}
                  className={cn(
                    'relative snap-start shrink-0 overflow-hidden inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all',
                    active
                      ? 'bg-card text-foreground border-[color:var(--tab-accent)]/60 shadow-md'
                      : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-card hover:text-foreground',
                  )}
                >
                  <span className="h-2 w-2 rounded-full bg-[color:var(--tab-accent)]" aria-hidden="true" />
                  {f.shortName}
                  {active && autoPlaying && (
                    <span
                      key={`progress-${index}`}
                      className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-[color:var(--tab-accent)] hud-progress"
                      style={{ animationDuration: `${INTERVAL_MS}ms` }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => choose(index - 1)}
              aria-label="Previous product"
              className="p-2.5 rounded-full border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => choose(index + 1)}
              aria-label="Next product"
              className="p-2.5 rounded-full border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
            {!reducedMotion && !userChose && (
              <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
                aria-pressed={paused}
                className="p-2.5 rounded-full border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-sm"
              >
                {paused ? <Play className="w-4 h-4" aria-hidden="true" /> : <Pause className="w-4 h-4" aria-hidden="true" />}
              </button>
            )}
          </div>
        </div>

        {/* Panels: all rendered for SEO, only the active one visible */}
        {flagships.map((p, i) => (
          <ProductPanel key={p.id} product={p} active={i === index} eager={i === 0} />
        ))}
      </div>
    </section>
  );
}

function ProductPanel({ product, active, eager }: { product: Product; active: boolean; eager: boolean }) {
  const isWebp = product.image.endsWith('.webp');
  const points =
    productSpotlights[product.id]?.cards ?? product.keyCapabilities.slice(0, 3).map((c) => ({ title: c, description: '' }));
  const accent = productSpotlights[product.id]?.accent ?? 'hsl(var(--primary))';

  return (
    <div
      role="tabpanel"
      id={`flagship-panel-${product.id}`}
      aria-labelledby={`flagship-tab-${product.id}`}
      hidden={!active}
      style={{ '--panel-accent': accent } as CSSProperties}
      className="card-elevated relative rounded-3xl p-6 sm:p-10 lg:p-12 animate-fade-in overflow-hidden shadow-2xl"
    >
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[color:var(--panel-accent)] to-transparent" aria-hidden="true" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
                <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                {product.badge}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary-ink">{product.category}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight font-display">
              <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
                {formatGradientText(product.name, undefined, { gradient: true })}
              </Link>
            </h3>
            <p className="text-base sm:text-lg font-semibold text-foreground/85 dark:text-foreground/90 mb-4 leading-snug">{product.tagline}</p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{product.shortDescription}</p>

            <ul className="space-y-3 mb-8">
              {points.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary-ink shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm sm:text-base text-foreground/90">
                    <span className="font-semibold text-foreground">{point.title}</span>
                    {point.description && <span className="text-muted-foreground">: {point.description}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-border/70 flex flex-wrap items-center gap-4">
            {product.demoUrl && (
              <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses('accent', 'md', 'shadow-md')}>
                <Zap className="w-4 h-4" aria-hidden="true" />
                Try a live demo
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
            <Link to={`/products/${product.id}`} className={buttonClasses('outline', 'md')}>
              View {product.shortName}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl border border-border bg-card shadow-2xl shadow-black/20 overflow-hidden">
            <div className="px-4 py-3 bg-muted/60 border-b border-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="flex-1 text-center text-xs font-semibold text-muted-foreground truncate">{product.shortName} · product preview</span>
              <span className="w-12" aria-hidden="true" />
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <img
                src={isWebp ? product.image.replace('.webp', '-640.webp') : product.image}
                srcSet={
                  isWebp
                    ? `${product.image.replace('.webp', '-480.webp')} 480w, ${product.image.replace('.webp', '-640.webp')} 640w, ${product.image} 1200w`
                    : undefined
                }
                sizes="(max-width: 1024px) 100vw, 640px"
                alt={`${product.name} dashboard`}
                className="w-full h-full object-cover object-top"
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                width={1200}
                height={750}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
