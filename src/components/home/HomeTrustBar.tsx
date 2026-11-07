import type { CSSProperties } from 'react';
import { techLogos, type TechLogo } from '../../data/techLogos';

/**
 * Home logo strip: technologies we build with, as a continuous, edge-faded marquee.
 * - Logos in brand colours (lighter variants in dark mode where needed); names in body text colour.
 * - Pauses on hover/focus. With reduced motion it becomes a static, wrapped row.
 * - The second copy of the track exists only for the seamless loop and is hidden
 *   from assistive tech.
 */
function Logo({ logo }: { logo: TechLogo }) {
  const style = { '--logo': logo.color, '--logo-dark': logo.darkColor ?? logo.color } as CSSProperties;
  return (
    <li style={style} className="flex shrink-0 items-center gap-3 px-8 sm:px-10 opacity-90 transition-opacity duration-300 hover:opacity-100">
      {logo.path ? (
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 text-[color:var(--logo)] dark:text-[color:var(--logo-dark)]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={logo.path} />
        </svg>
      ) : null}
      <span
        className={
          logo.path
            ? 'whitespace-nowrap text-base sm:text-lg font-semibold tracking-tight text-foreground'
            : 'whitespace-nowrap text-lg sm:text-xl font-bold tracking-tight text-[color:var(--logo)] dark:text-[color:var(--logo-dark)]'
        }
      >
        {logo.name}
      </span>
    </li>
  );
}

export default function HomeTrustBar() {
  return (
    <section aria-labelledby="tech-strip-heading" className="relative border-b border-border/60 bg-muted/25 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p id="tech-strip-heading" className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Technologies we build with
        </p>
      </div>

      {/* Marquee (motion allowed) */}
      <div className="tech-marquee group relative overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="tech-marquee-track flex w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          <ul className="flex shrink-0 items-center" aria-label="Technologies we build with">
            {techLogos.map((l) => (
              <Logo key={l.name} logo={l} />
            ))}
          </ul>
          <ul className="flex shrink-0 items-center" aria-hidden="true">
            {techLogos.map((l) => (
              <Logo key={`dup-${l.name}`} logo={l} />
            ))}
          </ul>
        </div>
      </div>

      {/* Static wrapped row (reduced motion) */}
      <ul className="hidden motion-reduce:flex max-w-7xl mx-auto px-4 flex-wrap justify-center gap-y-6" aria-label="Technologies we build with">
        {techLogos.map((l) => (
          <Logo key={`static-${l.name}`} logo={l} />
        ))}
      </ul>
    </section>
  );
}
