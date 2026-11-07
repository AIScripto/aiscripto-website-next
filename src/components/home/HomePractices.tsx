import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Bot, Cloud, Code2, GitBranch, MessagesSquare, PhoneCall, ShieldCheck, Users, Workflow } from 'lucide-react';
import Eyebrow from '../Eyebrow';
import TechBackdrop from '../TechBackdrop';
import { featuredSolutions } from '../../data/home';
import { serviceSpotlights } from '../../data/serviceSpotlight';

const inlineLink =
  'text-foreground font-semibold hover:text-brand-primary-ink transition-colors underline decoration-primary/40 underline-offset-4';

/** All six services, in the same order as the Services page. Labels double as keyword anchor text. */
const SERVICE_TILES = [
  { id: 'ai', label: 'AI agent development & automation', icon: Bot },
  { id: 'devops', label: 'DevOps & site reliability', icon: GitBranch },
  { id: 'erp', label: 'ERP, CRM & Odoo integration', icon: Workflow },
  { id: 'software', label: 'Custom software development', icon: Code2 },
  { id: 'cloud', label: 'Cloud migration & modernization', icon: Cloud },
  { id: 'security', label: 'Cybersecurity & compliance', icon: ShieldCheck },
] as const;
const SOLUTION_ICONS = { chatbot: MessagesSquare, voice: PhoneCall, crm: Users } as const;

/**
 * Home "services" section:
 * 1. Intro with keyword links to the four main practices.
 * 2. Six compact service tiles (icon + name + arrow), accents matching each service page.
 *    Descriptions live on the service pages.
 * 3. Three dark solution cards with an accent icon and glow.
 */
export default function HomePractices() {
  return (
    <section className="section-band section-gap relative overflow-hidden">
      {/* Science & technology backdrop: network photo, graph grid and data lines */}
      <TechBackdrop />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-secondary/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Intro */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end mb-14">
          <div className="lg:col-span-8">
            <Eyebrow className="mb-6">What we do</Eyebrow>
            <h2 className="text-h2 font-bold text-foreground mb-5">
              Services built around <span className="text-gradient">how your business runs</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              We partner with businesses in the US, UK and Europe on{' '}
              <Link to="/services/ai" className={inlineLink}>enterprise AI agent development</Link>,{' '}
              <Link to="/services/erp" className={inlineLink}>ERP &amp; CRM integration</Link>,{' '}
              <Link to="/services/cloud" className={inlineLink}>cloud infrastructure</Link> and{' '}
              <Link to="/services/software" className={inlineLink}>custom software</Link>, from first workshop to go-live.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              View all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 2. Six compact service tiles (icon + name), linking to each service page */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {SERVICE_TILES.map((tile) => {
            const Icon = tile.icon;
            const spot = serviceSpotlights[tile.id];
            const style = { '--card-accent': spot?.accent ?? '#2dd4bf' } as CSSProperties;
            return (
              <li key={tile.id} style={style}>
                <Link
                  to={`/services/${tile.id}`}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--card-accent)]/60 hover:shadow-lg"
                >
                  <span className="absolute inset-y-0 left-0 w-1 bg-[color:var(--card-accent)] opacity-80" aria-hidden="true" />
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ring-[color:var(--card-accent)]/30"
                    style={{ background: 'color-mix(in srgb, var(--card-accent) 14%, transparent)' }}
                  >
                    <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-base font-semibold text-foreground">{tile.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 3. Specialized solutions */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-2">Popular solutions</span>
            <h3 className="text-h3 font-bold text-foreground">AI chatbots, AI receptionists and custom CRM</h3>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSolutions.map((item) => {
            const style = { '--card-accent': item.accent } as CSSProperties;
            const SolutionIcon = SOLUTION_ICONS[item.icon];
            return (
              <li key={item.path} style={style}>
                <Link
                  to={item.path}
                  className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1222] to-[#070a14] p-7 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--card-accent)]/50 hover:shadow-2xl"
                >
                  {/* Accent glow + faint grid (no photo) */}
                  <span
                    className="absolute -top-24 -right-16 -z-10 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: 'var(--card-accent)' }}
                    aria-hidden="true"
                  />
                  <span className="absolute inset-0 -z-20 bg-grid-pattern opacity-[0.12] [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]" aria-hidden="true" />

                  <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors group-hover:bg-[color:var(--card-accent)] group-hover:text-[#070a14]">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <span
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset ring-white/15"
                    style={{ background: 'color-mix(in srgb, var(--card-accent) 22%, transparent)' }}
                  >
                    <SolutionIcon className="h-7 w-7 text-[color:var(--card-accent)]" aria-hidden="true" />
                  </span>
                  <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--card-accent)]" aria-hidden="true" />
                    {item.badge}
                  </span>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-white/80 leading-relaxed mb-5">{item.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--card-accent)]">
                    {item.link}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
