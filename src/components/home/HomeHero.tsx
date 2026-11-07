import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import HoloNeuralCore from './HoloNeuralCore';
import CosmicConstellation from './CosmicConstellation';

/**
 * Home hero:
 * - Animated constellation canvas behind a self-contained navy panel (same in both themes)
 * - The page's single <h1>: what we build and the outcome, in plain words
 * - One filled primary CTA (consultation) and one outline secondary CTA (live demo)
 * - Rotating capability HUD on the right (HoloNeuralCore)
 */
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28 border-b border-border/60 bg-gradient-to-br from-[#061e52] via-[#0a3182] to-[#04163d] text-white">
      {/* Living Cosmic Constellation Network & Holographic World Map Animation */}
      <CosmicConstellation />

      {/* Soft ambient lighting (decorative only) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Central volumetric light sheen (blurred; no hard line through the headline) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-96 h-full bg-gradient-to-b from-white/15 via-cyan-400/10 to-transparent blur-3xl opacity-70" />

        {/* Ambient radial lighting nodes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />

        {/* Subtle high-tech grid texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value proposition & actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* SEO heading (the page's single <h1>), styled as the hero kicker */}
            <h1 className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-200 text-sm font-semibold tracking-wide mb-6 self-start animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" aria-hidden="true" />
              Enterprise AI Solutions &amp; Software Development
            </h1>

            {/* Display headline: the plain-language promise */}
            <p className="font-display text-display font-extrabold text-white mb-6 tracking-tight leading-[1.08] animate-fade-up [animation-delay:0.1s]">
              AI agents and software that{' '}
              <span className="text-cyan-300">take manual work off your team</span>
            </p>

            {/* Value Proposition Subtitle */}
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-2xl animate-fade-up [animation-delay:0.2s]">
              We build autonomous AI agents, voice receptionists, ERP integrations, cloud platforms and
              offline-first POS systems for growing businesses in the US, UK and Europe.
            </p>

            {/* CTA row: one filled primary, one outline secondary */}
            <div className="flex flex-wrap items-center gap-4 mb-8 animate-fade-up [animation-delay:0.3s]">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold tracking-tight bg-white text-slate-950 hover:bg-slate-100 shadow-2xl shadow-black/30 hover:shadow-cyan-500/20 transition-all duration-300 active:scale-95 group"
              >
                <span>Book a consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                to="/live-demos"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold tracking-tight border border-white/30 text-white hover:bg-white/10 backdrop-blur-xs transition-all duration-300"
              >
                <PlayCircle className="w-4 h-4 text-cyan-300" aria-hidden="true" />
                <span>Try a live demo</span>
              </Link>
            </div>

            {/* Assurances */}
            <ul className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-medium text-white/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                <span>Reply within one business day</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                <span>Mutual NDA on request</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                <span>You own the code and IP</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Rotating capability HUD */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <HoloNeuralCore />
          </div>
        </div>
      </div>
    </section>
  );
}
