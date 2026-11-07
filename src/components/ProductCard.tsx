import { Link } from 'react-router-dom';
import { ArrowRight, Activity } from 'lucide-react';
import { Product } from '../data/products';
import { cn } from '../utils/cn';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

/**
 * Enterprise-grade product showcase card:
 * - macOS browser chrome & high-contrast live badge
 * - Polished micro-kicker category pill
 * - High-contrast typography (zero muddy colors)
 * - Quantitative telemetry readout box
 * - Smooth magnetic hover interaction
 */
export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const isWebp = product.image.endsWith('.webp');
  const primaryStat = product.keyStats[0];

  return (
    <Link
      to={`/products/${product.id}`}
      className={cn(
        'group card-elevated relative flex flex-col h-full rounded-3xl p-6 transition-all duration-300 hover:border-primary/50',
        featured && 'ring-1 ring-primary/40 border-primary/50',
      )}
    >
      {/* Top Preview Image in Browser Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted/60 mb-5 border border-border/70 shadow-xs">
        {/* Subtle browser chrome dots in top right */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/60 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
        </div>

        <img
          src={isWebp ? product.image.replace('.webp', '-480.webp') : product.image}
          srcSet={isWebp ? `${product.image.replace('.webp', '-480.webp')} 480w, ${product.image.replace('.webp', '-640.webp')} 640w` : undefined}
          sizes="(max-width: 640px) 360px, (max-width: 1024px) 500px, 380px"
          alt={`${product.name} dashboard preview`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          width={480}
          height={300}
        />

        {product.badge === 'Live Demo' ? (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/95 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/35 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Demo
          </span>
        ) : (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-background/95 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-bold text-foreground border border-border/70 shadow-xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* Category Micro-Kicker Pill */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-primary/10 text-brand-primary-ink border border-primary/20 w-fit mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span>{product.category}</span>
      </div>

      {/* System Headline */}
      <h3 className="text-xl font-bold font-display text-card-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
        {product.name}
      </h3>

      {/* Tagline: High-contrast, clean typography */}
      <p className="text-sm font-semibold text-foreground/85 dark:text-foreground/90 mb-3 line-clamp-2 leading-snug">
        {product.tagline}
      </p>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-grow mb-5 line-clamp-3">
        {product.shortDescription}
      </p>

      {/* Primary Quantitative Telemetry Readout */}
      {primaryStat && (
        <div className="mb-5 p-3 rounded-xl bg-muted/40 border border-border/70 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate mr-2">
            <Activity className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
            <span className="text-xs text-muted-foreground font-medium truncate">{primaryStat.label}:</span>
          </div>
          <span className="text-xs font-mono font-bold text-foreground bg-background px-2.5 py-1 rounded-lg border border-border/80 shadow-xs shrink-0">
            {primaryStat.value}
          </span>
        </div>
      )}

      {/* Interactive Action Footer */}
      <div className="mt-auto pt-3.5 border-t border-border/70 flex items-center justify-between text-xs font-bold text-primary">
        <span className="uppercase tracking-wider">Explore Architecture</span>
        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xs">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
