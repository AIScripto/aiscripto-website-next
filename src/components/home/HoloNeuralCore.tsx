import { useState, useEffect, useRef, useId } from 'react';
import { Link } from 'react-router-dom';
import { Mic, ShieldCheck, Layers, Lock, ArrowRight, ChevronRight, Pause, Play } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface CapabilityStep {
  id: string;
  stepNum: string;
  name: string;
  shortTitle: string;
  badge: string;
  /** Plain capability facts (no invented performance numbers). */
  facts: { label: string; value: string }[];
  path: string;
  linkLabel: string;
  accentColor: string;
  icon: typeof Mic;
}

const CAPABILITY_STEPS: CapabilityStep[] = [
  {
    id: 'nexus-agent',
    stepNum: '01',
    name: 'NexusAgent™ Contact OS',
    shortTitle: 'Voice AI',
    badge: 'Voice AI',
    facts: [
      { label: 'Answers calls', value: '24/7' },
      { label: 'Languages', value: 'EN · UR · HI' },
      { label: 'Hand-off', value: 'To your team' },
    ],
    path: '/products/nexus-agent',
    linkLabel: 'View product',
    accentColor: '#38bdf8',
    icon: Mic,
  },
  {
    id: 'marginguard',
    stepNum: '02',
    name: 'MarginGuard™ AI Loss Prevention',
    shortTitle: 'Loss radar',
    badge: 'Retail analytics',
    facts: [
      { label: 'Reads', value: 'CSV & PDF' },
      { label: 'Flags', value: 'Margin drops' },
      { label: 'ERP change', value: 'None' },
    ],
    path: '/products/business-analytics-ai',
    linkLabel: 'View product',
    accentColor: '#34d399',
    icon: ShieldCheck,
  },
  {
    id: 'scripto-erp',
    stepNum: '03',
    name: 'ScriptoERP™ Financial & Ledger Core',
    shortTitle: 'ERP & ledger',
    badge: 'Finance & ERP',
    facts: [
      { label: 'Ledger', value: 'Double-entry' },
      { label: 'Audit trail', value: 'Built in' },
      { label: 'Syncs with', value: 'ERP & CRM' },
    ],
    path: '/products/erp-financials',
    linkLabel: 'View product',
    accentColor: '#fbbf24',
    icon: Layers,
  },
  {
    id: 'enterprise-rag',
    stepNum: '04',
    name: 'Private AI on your cloud',
    shortTitle: 'Private AI',
    badge: 'Data stays yours',
    facts: [
      { label: 'Hosting', value: 'Your cloud' },
      { label: 'Encryption', value: 'AES-256' },
      { label: 'Trains on your data', value: 'Never' },
    ],
    path: '/services/ai',
    linkLabel: 'View service',
    accentColor: '#a78bfa',
    icon: Lock,
  },
];

const ROTATION_INTERVAL_MS = 6000;

export default function HoloNeuralCore() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const labelId = useId();

  const current = CAPABILITY_STEPS[activeIdx] ?? CAPABILITY_STEPS[0];
  const Icon = current.icon;
  const running = !hoverPaused && !userPaused && onScreen && tabVisible && !prefersReducedMotion;

  // Only rotate while the HUD is on screen and the tab is visible.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // One timeout per step; the progress bar is a CSS animation (no per-frame React renders).
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActiveIdx((i) => (i + 1) % CAPABILITY_STEPS.length), ROTATION_INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [running, activeIdx]);

  return (
    <div
      ref={rootRef}
      className="relative w-full max-w-xl mx-auto flex flex-col items-center select-none"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHoverPaused(false);
      }}
      aria-labelledby={labelId}
    >
      {/* Soft radial backlight */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-radial from-cyan-400/25 via-blue-600/15 to-transparent blur-3xl opacity-80"
        aria-hidden="true"
      />

      {/* Borderless holographic core image */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] flex items-center justify-center">
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse 82% 78% at 50% 50%, black 45%, rgba(0,0,0,0.4) 68%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(ellipse 82% 78% at 50% 50%, black 45%, rgba(0,0,0,0.4) 68%, transparent 88%)',
          }}
        >
          <img
            src="/images/hero-ai-neural-core-640.webp"
            srcSet="/images/hero-ai-neural-core-480.webp 480w, /images/hero-ai-neural-core-640.webp 640w, /images/hero-ai-neural-core-960.webp 960w, /images/hero-ai-neural-core.webp 1376w"
            sizes="(max-width: 1024px) 100vw, 580px"
            alt="Illustration of an AI neural network core"
            width={1376}
            height={768}
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Single corner link to the product showcase (no fake telemetry pill) */}
        <div className="absolute top-2 right-2 z-20">
          <a
            href="#flagship-systems"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-xs font-semibold text-white transition-all shadow-md group/btn"
          >
            <span>See all products</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Active capability */}
      <div className="w-full mt-1 px-2 z-20" aria-live="polite">
        <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md"
              style={{ backgroundColor: `${current.accentColor}25`, color: current.accentColor }}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold tracking-wide uppercase text-cyan-300">{current.badge}</span>
              <p id={labelId} className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                {current.name}
              </p>
            </div>
          </div>
          <Link
            to={current.path}
            className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors shrink-0 group/link"
          >
            <span>{current.linkLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <dl className="grid grid-cols-3 gap-2 mt-2 text-center">
          {current.facts.map((f) => (
            <div key={f.label} className="py-2 px-2 rounded-xl bg-white/[0.05] backdrop-blur-xs border border-white/10">
              <dt className="block text-xs text-white/70">{f.label}</dt>
              <dd className="text-sm font-bold text-white tracking-tight">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Step rail with a visible pause control (works for touch and keyboard) */}
      <div className="w-full mt-3 px-1 z-20 flex items-stretch gap-1.5">
        <div
          role="tablist"
          aria-label="Featured capabilities"
          className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
        >
          {CAPABILITY_STEPS.map((step, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveIdx(idx)}
                className={`relative py-2 px-2 rounded-xl text-left transition-colors duration-300 cursor-pointer overflow-hidden ${
                  isSelected ? 'bg-white/15 text-white shadow-sm ring-1 ring-cyan-400/50' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {isSelected && running && (
                  <span
                    key={`${activeIdx}-progress`}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 origin-left pointer-events-none hud-progress"
                    style={{ animationDuration: `${ROTATION_INTERVAL_MS}ms` }}
                    aria-hidden="true"
                  />
                )}
                <span className="block text-xs font-bold text-cyan-300">{step.stepNum}</span>
                <span className="block text-xs font-semibold truncate">{step.shortTitle}</span>
              </button>
            );
          })}
        </div>
        {!prefersReducedMotion && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-pressed={userPaused}
            aria-label={userPaused ? 'Resume rotation' : 'Pause rotation'}
            className="shrink-0 w-10 rounded-2xl border border-white/15 bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            {userPaused ? <Play className="w-4 h-4" aria-hidden="true" /> : <Pause className="w-4 h-4" aria-hidden="true" />}
          </button>
        )}
      </div>

      {/* Delivery footprint */}
      <p className="w-full mt-3 pt-2 border-t border-white/10 text-center sm:text-left text-xs text-white/75 z-10 px-1">
        Teams in the US, UK and Italy · Engineering centre in Pakistan
      </p>
    </div>
  );
}
