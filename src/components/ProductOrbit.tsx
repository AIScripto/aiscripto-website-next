/**
 * Centre visual for the Products overview hero: the AI core image in a glowing ring with
 * the product names orbiting it as chips. Chips are positioned around the circle on lg;
 * on smaller screens they wrap below the image.
 */
const POSITIONS = [
  'lg:left-1/2 lg:-translate-x-1/2 lg:-top-6',
  'lg:-right-12 lg:top-[14%]',
  'lg:-right-16 lg:top-[60%]',
  'lg:right-[8%] lg:-bottom-6',
  'lg:left-[4%] lg:-bottom-6',
  'lg:-left-16 lg:top-[60%]',
  'lg:-left-12 lg:top-[14%]',
];

export default function ProductOrbit({ names }: { names: string[] }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <div
          className="absolute -inset-4 rounded-full blur-2xl opacity-60"
          style={{ background: 'radial-gradient(circle, var(--spot) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative h-60 w-60 sm:h-72 sm:w-72 lg:h-60 lg:w-60 xl:h-64 xl:w-64 rounded-full p-1.5 bg-gradient-to-br from-[color:var(--spot)] via-white/20 to-transparent shadow-2xl shadow-black/60">
          <img
            src="/images/hero-ai-neural-core-640.webp"
            srcSet="/images/hero-ai-neural-core-480.webp 480w, /images/hero-ai-neural-core-640.webp 640w, /images/hero-ai-neural-core-960.webp 960w"
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, 320px"
            alt="Illustration of an AI core"
            width={640}
            height={640}
            className="h-full w-full rounded-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
        {/* Orbiting chips (lg only) */}
        <ul className="hidden lg:block" aria-label="Products">
          {names.slice(0, POSITIONS.length).map((name, i) => (
            <li
              key={name}
              className={`absolute ${POSITIONS[i]} whitespace-nowrap rounded-full border border-white/15 bg-[#0b1020]/80 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md`}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      {/* Wrapped chips (below lg) */}
      <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden" aria-label="Products">
        {names.map((name) => (
          <li key={name} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
