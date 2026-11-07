import { useState } from 'react';
import { PlayCircle, ExternalLink, Key, CheckCircle2, ArrowRight, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import DemoBookingModal from '../components/DemoBookingModal';
import EnterpriseCta from '../components/EnterpriseCta';
import { liveDemoItems } from '../data/products';
import { buttonClasses } from '../components/ui/Button';

export default function LiveDemos() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <Seo
        title="Live Interactive AI Demos: Voice & ERP Sandbox"
        description="Test-drive live working environments: autonomous AI voice receptionists, restaurant POS & kitchen displays, and real-time ERP financial reconciliation."
      />

      <div className="pt-32">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary-ink text-xs font-bold uppercase tracking-wider mb-6">
            <PlayCircle className="w-4 h-4" /> Live Working Environments
          </div>
          <h1 className="text-h1 font-bold mb-6">
            Experience Our AI Products <span className="text-gradient">In Action</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
            We don't just show slide decks or static mockups. Test our genuine web applications, voice interfaces, and restaurant operations systems directly in your browser.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact?demo=true"
              className={buttonClasses('primary', 'lg')}
            >
              Book a guided tour
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className={buttonClasses('outline', 'lg')}
            >
              View all products
            </Link>
          </div>
        </section>

        {/* Live Demos Directory Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {liveDemoItems.map((item) => (
              <div
                key={item.id}
                className="group card-elevated relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-brand-secondary/50 h-full"
              >
                <div className="flex flex-col flex-grow">
                  {/* Header Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4 h-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink truncate">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold bg-brand-secondary/15 text-brand-secondary-ink border border-brand-secondary/30 shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary animate-pulse" />
                      Live demo
                    </span>
                  </div>

                  {/* Visual Dashboard Preview Image */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-muted/60 mb-4 transition-all">
                    <img width={960} height={600}
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <PlayCircle className="w-3.5 h-3.5 text-brand-secondary-ink" />
                        Open live demo
                      </span>
                    </div>
                  </div>

                  {/* Title with standardized height */}
                  <div className="h-14 flex items-center mb-1">
                    <h2 className="text-xl font-bold tracking-tight text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                  </div>

                  {/* Product Subtitle */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 truncate h-4">
                    Product: <span className="text-foreground">{item.product}</span>
                  </p>

                  {/* Description with standardized height */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 h-10 mb-4">
                    {item.description}
                  </p>

                  {/* Authentication / Access Instructions Box */}
                  <div className="mb-4 text-xs h-[58px] flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 font-bold text-foreground mb-0.5 text-xs">
                      <Key className="w-3.5 h-3.5 text-brand-secondary-ink shrink-0" />
                      Access Instructions:
                    </div>
                    <div className="text-muted-foreground truncate text-xs">
                      {item.credentials}
                    </div>
                  </div>

                  {/* Recommended Test Scenarios */}
                  <div className="space-y-1.5 mb-6 flex-grow">
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Recommended Test Scenarios:
                    </div>
                    {item.featuresToTest.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-foreground/90 h-5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary-ink shrink-0" />
                        <span className="truncate text-xs">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-4 border-t border-border grid grid-cols-1 gap-3 w-full mt-auto">
                  {item.isWidgetTrigger ? (
                    <button
                      type="button"
                      onClick={() => {
                        const btn = document.querySelector('[data-chat-launcher]') as HTMLButtonElement;
                        if (btn) btn.click();
                      }}
                      className="h-11 w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-secondary text-slate-950 text-sm font-bold uppercase tracking-wider shadow-md shadow-brand-secondary/20 hover:opacity-95 hover:shadow-lg hover:shadow-brand-secondary/30 active:scale-95 transition-all"
                    >
                      <Headphones className="w-4 h-4 shrink-0" />
                      <span>{item.buttonLabel}</span>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses('accent', 'md', 'h-11 w-full')}
                    >
                      <PlayCircle className="w-4 h-4 shrink-0" />
                      <span>{item.buttonLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    </a>
                  )}

                  <Link
                    to={`/contact?product=${item.productId}&demo=true`}
                    className="h-11 w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card text-foreground text-sm font-bold uppercase tracking-wider hover:bg-muted active:scale-95 transition-all"
                  >
                    <span>Book a guided tour</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guided Walkthrough Callout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-14 border border-white/10 shadow-2xl">
            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary-ink mb-3 block">
                Enterprise Sandbox Evaluation
              </span>
              <h2 className="text-h2 font-bold mb-4 text-white">
                Need a Private Sandbox Demo With Your Own Data?
              </h2>
              <p className="text-base text-slate-300 leading-relaxed mb-8">
                We can load your enterprise workflows, service catalogs, or internal knowledge bases into an isolated sandbox environment. Test how the AI agents and voice systems perform with your data before committing to a production deployment.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="rounded-full bg-white text-slate-950 px-8 py-3.5 text-sm font-bold hover:bg-slate-100 transition-all shadow-lg active:scale-95"
                >
                  Ask about a private sandbox
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise CTA */}
        <div className="mt-12">
          <EnterpriseCta
            badge="Tailored Walkthrough"
            heading="Want an Architect to Guide Your Evaluation?"
            description="Schedule a 20-minute screen-share where our solutions architect walks through the codebase, architectural diagrams, and real-time integration points of any product."
            primaryButtonText="Book a guided tour"
            primaryButtonLink="/contact?demo=true"
            secondaryButtonText="Explore Enterprise Services"
            secondaryButtonLink="/services"
            trustPoints={[
              "Direct Screen-Share with Solutions Architect",
              "Private Sandbox Setup on Request",
              "Zero Sales Pressure"
            ]}
          />
        </div>
      </div>

      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
}
