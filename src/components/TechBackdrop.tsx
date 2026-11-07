import { stockImage } from '../utils/images';

/** Self-hosted abstract "network of glowing nodes" photo (Unsplash, free licence). */
const NETWORK_PHOTO = '1644088379091-d574269d422f';

/**
 * Decorative science & technology backdrop for content sections:
 * 1. a faded network-of-nodes photo (masked to fade out towards the edges),
 * 2. a fine graph-paper grid,
 * 3. two flowing line charts with data points along the lower part of the section.
 * Purely decorative: aria-hidden, pointer-events none, and toned down in light mode so
 * text and cards on top stay readable.
 */
export default function TechBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 1. Network photo */}
      <img
        src={stockImage(NETWORK_PHOTO, 1440)}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.07] dark:opacity-[0.22] mix-blend-multiply dark:mix-blend-screen [mask-image:radial-gradient(ellipse_75%_70%_at_70%_30%,#000_30%,transparent_80%)]"
      />

      {/* 2. Graph-paper grid */}
      <svg className="absolute inset-0 h-full w-full text-foreground opacity-[0.06] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tb-grid-minor" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <pattern id="tb-grid-major" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect width="120" height="120" fill="url(#tb-grid-minor)" />
            <path d="M120 0H0V120" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tb-grid-major)" />
      </svg>

      {/* 3. Line charts (stretched across the section width, bottom aligned) */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[55%] w-full opacity-40 dark:opacity-60"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tb-line-a" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="0.25" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--color-brand-secondary)" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="tb-fill-a" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
            <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tb-line-b" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="0.3" stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Area + main trend line */}
        <path
          d="M0 330 C 120 320, 200 280, 300 290 S 480 230, 600 240 S 780 170, 900 190 S 1080 120, 1200 130 S 1360 70, 1440 60 L 1440 400 L 0 400 Z"
          fill="url(#tb-fill-a)"
        />
        <path
          d="M0 330 C 120 320, 200 280, 300 290 S 480 230, 600 240 S 780 170, 900 190 S 1080 120, 1200 130 S 1360 70, 1440 60"
          fill="none"
          stroke="url(#tb-line-a)"
          strokeWidth="2.5"
        />
        {/* Secondary dashed series */}
        <path
          d="M0 370 C 150 360, 240 340, 360 345 S 560 300, 700 310 S 900 260, 1040 265 S 1260 210, 1440 190"
          fill="none"
          stroke="url(#tb-line-b)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        {/* Data points on the main line */}
        {[
          [300, 290],
          [600, 240],
          [900, 190],
          [1200, 130],
        ].map(([cx, cy]) => (
          <g key={cx}>
            <circle cx={cx} cy={cy} r="9" fill="hsl(var(--primary))" opacity="0.15" />
            <circle cx={cx} cy={cy} r="3.5" fill="hsl(var(--primary))" />
          </g>
        ))}
      </svg>
    </div>
  );
}
