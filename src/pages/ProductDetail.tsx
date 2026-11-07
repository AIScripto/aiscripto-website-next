import { useParams, Link } from 'react-router-dom';
import { PlayCircle, ExternalLink, CheckCircle2, Sparkles, AlertTriangle, Lock, Building2, Server } from 'lucide-react';
import Seo from '../components/Seo';
import NotFound from './NotFound';
import EnterpriseCta from '../components/EnterpriseCta';
import RelatedPages from '../components/RelatedPages';
import Disclosure from '../components/Disclosure';
import { productsData, type Product } from '../data/products';
import { productSpotlights, type ProductSpotlight } from '../data/productSpotlight';
import ProductSpotlightHero from '../components/ProductSpotlightHero';
import { formatGradientText } from '../utils/textGradient';
import { buildSoftwareApplicationSchema } from '../utils/schema';
import RoiCalculator, { type RoiDefaults } from '../components/RoiCalculator';
import { buttonClasses } from '../components/ui/Button';

/** Voice products get a missed-call ROI calculator; defaults are editable starting points. */
const ROI_DEFAULTS: Record<string, RoiDefaults> = {
  'ai-voice-booking': { missedCallsPerWeek: 20, bookingRatePct: 35, averageJobValue: 180 },
  'nexus-agent': { missedCallsPerWeek: 25, bookingRatePct: 25, averageJobValue: 300 },
};

/** Used only if a product has no entry in productSpotlight.ts yet. */
function fallbackSpotlight(product: Product): ProductSpotlight {
  const firstThree = product.features.slice(0, 3).map((f) => ({ title: f.title, description: f.businessBenefit || f.description }));
  while (firstThree.length < 3) firstThree.push({ title: product.shortName, description: product.shortDescription });
  return {
    eyebrow: product.category,
    titleLead: product.shortName,
    titleAccent: product.tagline,
    lead: product.shortDescription,
    accent: '#2dd4bf',
    accentInk: '#042f2e',
    cards: [firstThree[0], firstThree[1], firstThree[2]],
  };
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return <NotFound />;
  }

  const spotlight = productSpotlights[product.id] ?? fallbackSpotlight(product);

  return (
    <>
      <Seo
        title={product.seoTitle ?? `${product.name} — ${product.tagline}`}
        description={product.seoDescription ?? product.shortDescription}
        schema={buildSoftwareApplicationSchema(product)}
      />

      {/* A. PRODUCT SPOTLIGHT HERO (dark stage, per-product accent) */}
      <ProductSpotlightHero product={product} spotlight={spotlight} />

      <div id="product-details" className="pt-16 sm:pt-20 scroll-mt-24">
        {/* A2. OVERVIEW: full description and key stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink">
                  {product.category}
                </span>
              </div>
              <h2 className="text-h2 font-bold mb-5">{formatGradientText(product.headline)}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{product.fullDescription}</p>
            </div>
            <dl className="lg:col-span-5 grid grid-cols-2 gap-4 p-6 rounded-3xl bg-card border border-border shadow-sm">
              {product.keyStats.map((stat) => (
                <div key={stat.label} className="p-3">
                  <dd className="text-2xl sm:text-3xl font-black text-foreground mb-1">{stat.value}</dd>
                  <dt className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-1">{stat.label}</dt>
                  <p className="text-sm text-muted-foreground leading-snug">{stat.desc}</p>
                </div>
              ))}
            </dl>
          </div>

          {/* Dashboard preview: only when the spotlight shows a dedicated illustration instead */}
          {spotlight.art && (
            <div className="mt-12">
            {/* Live Dashboard Preview Window */}
            <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-2xl text-left">
              <div className="bg-muted/70 px-4 py-3 border-b border-border/60 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-muted-foreground hidden sm:inline">
                    {product.shortName} — live demo
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live demo
                  </span>
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground px-3 py-1 text-xs font-bold transition-all"
                  >
                    <span>Open live demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="relative aspect-[16/9] w-full bg-background overflow-hidden group">
                <img width={960} height={600} fetchPriority="high"
                  src={product.image}
                  alt={`${product.name} dashboard interface`}
                  className="w-full h-full object-cover object-top"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-brand-primary-ink font-bold block">
                      Live demo
                    </span>
                    <p className="text-white text-lg font-bold">
                      {product.name} Operating Console
                    </p>
                  </div>
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses('accent', 'md')}
                  >
                    <PlayCircle className="w-4 h-4" />
                    Open live demo
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
            </div>
          )}
        </section>

        {/* B. MARKET PROBLEM */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 sm:p-12">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold uppercase tracking-wider mb-3">
                <AlertTriangle className="w-3.5 h-3.5" /> The Market Problem
              </div>
              <h2 className="text-h3 font-bold text-foreground">
                {product.marketProblem.title}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
                {product.marketProblem.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-destructive/15">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">The Current Frustrating Workflow</h3>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {product.marketProblem.currentWorkflow}
                </p>
                <h3 className="text-xs font-bold uppercase tracking-widest text-destructive">Operational & Commercial Consequence</h3>
                <p className="text-sm text-destructive-foreground/90 leading-relaxed">
                  {product.marketProblem.businessConsequence}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Critical Pain Points</h3>
                {product.marketProblem.keyPainPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-xs sm:text-sm text-foreground">
                    <span className="text-destructive font-black shrink-0">✕</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* C & E. OUR SOLUTION & HOW IT WORKS */}
        <section className="section-band section-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3 block">Solution Architecture</span>
              <h2 className="text-h2 font-bold">How {product.shortName} works</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                {product.shortDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {product.solutionWorkflow.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <div>
                    <span className="text-3xl font-black text-primary/30 mb-4 block font-mono">{step.step}</span>
                    <h3 className="font-bold text-base mb-2 text-foreground">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING & PILOT TRANSPARENCY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3 block">Transparent Pricing</span>
            <h2 className="text-h2 font-bold">Start Small, Scale as You Grow</h2>
            <p className="text-sm text-muted-foreground mt-2">{product.pricingPilot.model}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
              <h3 className="font-bold text-lg text-foreground">Starter</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.pricingPilot.starter}</p>
            </div>
            <div className="rounded-3xl border border-primary bg-card p-6 space-y-4 shadow-lg shadow-primary/5">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                Recommended
              </div>
              <h3 className="font-bold text-lg text-foreground">Growth / Multi-Location</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.pricingPilot.growth}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
              <h3 className="font-bold text-lg text-foreground">Enterprise</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.pricingPilot.enterprise}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
              Risk-Free Pilot Option
            </span>
            <p className="text-sm font-semibold text-foreground">{product.pricingPilot.pilotOffer}</p>
          </div>
        </section>

        {ROI_DEFAULTS[product.id] && (
          <RoiCalculator context={product.name} defaults={ROI_DEFAULTS[product.id]} />
        )}

        {/* Secondary detail: collapsed by default to keep the page focused */}
        <div className="section-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h2 className="text-h2 font-bold">More about {product.name}</h2>
            <p className="text-muted-foreground mt-2">Capabilities, industries, technology and an illustrative customer scenario.</p>
          </div>
          <Disclosure label="Capabilities" hint="Every feature and the outcome it drives">
          {/* D. KEY FEATURES BREAKDOWN */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3 block">Feature Breakdown</span>
              <h2 className="text-h2 font-bold">Capabilities Grounded in Real Utility</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Every feature is built around user goals and concrete operational outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-border bg-card p-7 hover:border-primary/40 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary/10 text-brand-primary-ink">
                        {feature.tag}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {feature.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Business Outcome:
                    </span>
                    <p className="text-sm font-semibold text-foreground/90">
                      {feature.businessBenefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          </Disclosure>
          <Disclosure label="Industries & use cases" hint="How teams in each sector use it">
          {/* G. INDUSTRIES AND USE CASES */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
            <div>
              <div className="max-w-3xl mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3 block">Industry Fit</span>
                <h2 className="text-h2 font-bold">Tailored Workflows by Sector</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Example use cases showing where and how {product.shortName} creates value.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.useCases.map((uc) => (
                  <div key={uc.industry} className="rounded-2xl border border-border bg-card p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-lg text-foreground">{uc.industry}</h3>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Typical Challenge:</span>
                      <p className="text-sm text-foreground/90 mt-0.5 leading-relaxed">{uc.painPoint}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink">How {product.shortName} helps:</span>
                      <p className="text-sm text-foreground/90 mt-0.5 leading-relaxed">{uc.howProductHelps}</p>
                    </div>
                    <div className="pt-3 border-t border-border/60">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Example outcome:</span>
                      <p className="text-sm font-bold text-foreground mt-0.5">{uc.expectedOutcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          </Disclosure>
          <Disclosure label="Technology" hint="Stack, security and integrations">
          {/* I. TECHNOLOGY STACK PRESENTATION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3 block">Technology stack</span>
              <h2 className="text-h2 font-bold">The Technology Behind {product.shortName}</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                The main frameworks, services and infrastructure {product.shortName} is built on.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {product.techStack.map((stack) => (
                <div key={stack.category} className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink block">
                    {stack.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.technologies.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-muted text-xs font-mono font-medium text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
                    {stack.purpose}
                  </p>
                </div>
              ))}
            </div>

            {/* Security & Integrations box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl border border-border bg-card">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-lg">Security & Isolation Controls</h3>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {product.securityAndIntegrations.security.map((sec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Server className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-lg">Supported Integrations</h3>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground mb-4">
                  {product.securityAndIntegrations.integrations.map((integ, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{integ}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-muted-foreground/80 italic border-t border-border pt-3">
                  {product.securityAndIntegrations.complianceNotes}
                </div>
              </div>
            </div>
          </section>
          </Disclosure>
          <Disclosure label="Customer scenario" hint="Before and after: an illustrative scenario">
          {/* K. CASE STUDY / SCENARIO SHOWCASE */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
            <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-brand-primary-ink border border-primary/20">
                    {product.caseStudy.type === 'Illustrative Case Study' ? 'Illustrative scenario' : product.caseStudy.type}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground px-3 py-1 rounded-full bg-muted border border-border">
                    {product.caseStudy.organization}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Example impact: {product.caseStudy.quantifiableImpact}
                </span>
              </div>

              <h2 className="text-h3 font-bold mb-6">
                {product.caseStudy.title}
              </h2>

              {/* Challenge & Solution Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive">
                    <AlertTriangle className="w-4 h-4" />
                    Operational Challenge
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed pt-2">
                    {product.caseStudy.challenge}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary-ink">
                    <Sparkles className="w-4 h-4" />
                    Solution
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed pt-2">
                    {product.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Before vs After Transformation Matrix */}
              <div className="my-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Before and after
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before Column */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                      Before
                    </span>
                    {product.caseStudy.beforeMetrics.map((metric, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                        <span className="text-destructive font-black shrink-0 mt-0.5">✕</span>
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* After Column */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-3">
                      After
                    </span>
                    {product.caseStudy.afterMetrics.map((metric, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-500 shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Outcomes */}
              <div className="pt-6 border-t border-border/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Example outcomes (illustrative)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {product.caseStudy.outcomes.map((outcome, idx) => (
                    <div key={idx} className="text-xs leading-relaxed text-foreground/90 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-500 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Case Study Live Validation Banner */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-sm font-bold text-foreground">See it for yourself</div>
                    <div className="text-xs text-muted-foreground">Open the {product.shortName} live demo in a new tab.</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses('accent', 'md')}
                    >
                      <PlayCircle className="w-4 h-4" />
                      Open live demo
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      to={`/contact?product=${product.id}&demo=true`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-all"
                    >
                      Book a consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </Disclosure>
        </div>

        <RelatedPages />
        <EnterpriseCta
          badge="Enterprise Customization & VPC Deployment"
          heading={`Need Custom Architecture or Private Cloud Hosting for ${product.shortName}?`}
          description={`Our solutions architects and engineering team can customize ${product.shortName} with your branding, build dedicated API bridges to your ERP/CRM systems, or deploy single-tenant instances inside your private AWS, Azure, or GCP infrastructure.`}
          primaryButtonText="Book a consultation"
          primaryButtonLink={`/contact?product=${product.id}&demo=true`}
          secondaryButtonText={
            product.category.includes('Voice') || product.category.includes('AI')
              ? "Explore AI Agent Practice"
              : product.category.includes('ERP') || product.category.includes('Financial')
              ? "Explore ERP Practice"
              : "Explore Software Engineering"
          }
          secondaryButtonLink={
            product.category.includes('Voice') || product.category.includes('AI')
              ? "/services/ai"
              : product.category.includes('ERP') || product.category.includes('Financial')
              ? "/services/erp"
              : "/services/software"
          }
          trustPoints={[
            "Single-Tenant Private VPC Deployment",
            "Custom API Bridges to Existing Backends",
            "Mutual NDA Execution on Request"
          ]}
        />
      </div>

    </>
  );
}
