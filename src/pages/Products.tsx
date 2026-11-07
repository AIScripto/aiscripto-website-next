import { useState, useMemo, useEffect } from 'react';
import { Search, ArrowRight, CheckCircle2, ShieldCheck, Zap, Server, Code, Lock } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import ProductCard from '../components/ProductCard';
import EnterpriseCta from '../components/EnterpriseCta';
import { productsData, productCategories } from '../data/products';
import { cn } from '../utils/cn';
import { buildProductCatalogSchema } from '../utils/schema';
import { buttonClasses } from '../components/ui/Button';
import SpotlightHero from '../components/SpotlightHero';
import ProductOrbit from '../components/ProductOrbit';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") || "");
  const [selectedBadge, setSelectedBadge] = useState<string>("all");

  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Products" || product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(f => f.title.toLowerCase().includes(searchQuery.toLowerCase()) || f.businessBenefit.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.useCases.some(u => u.industry.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesBadge =
        selectedBadge === "all" ||
        (selectedBadge === "live-demo" && product.badge === "Live Demo") ||
        (selectedBadge === "pilot" && product.badge === "Pilot Ready") ||
        (selectedBadge === "enterprise" && product.badge === "Enterprise Blueprint");

      return matchesCategory && matchesSearch && matchesBadge;
    });
  }, [selectedCategory, searchQuery, selectedBadge]);

  return (
    <>
      <Seo
        title="Enterprise AI Products: Agents, Voice & POS Systems"
        description="Explore AIScripto's AI products: NexusAgent customer support, AetherVoice phone booking, MarginGuard loss prevention, offline-first restaurant POS and ScriptoERP."
        schema={buildProductCatalogSchema(productsData)}
      />

      <SpotlightHero
        eyebrow="AIScripto products"
        titleLead="Practical AI tools"
        titleAccent="for real operations"
        lead="Seven ready-to-run products that answer calls, book appointments, spot margin leaks and run restaurant, retail and finance operations, without the enterprise bloat."
        accent="#2dd4bf"
        accentInk="#042f2e"
        primary={{ label: 'Try a live demo', to: '/live-demos' }}
        secondary={{ label: 'Book a consultation', to: '/contact?demo=true' }}
        cards={[
          { title: 'Live demos for every product', description: 'Click through a working version before you talk to us.' },
          { title: 'Free pilot programme', description: 'Try it with your own data first; each product lists its pilot terms.' },
          { title: 'Fits your existing tools', description: 'Connects to the calendars, CRMs, POS and ERP systems you already use.' },
        ]}
        media={<ProductOrbit names={productsData.map((p) => p.shortName)} />}
      />

      <div className="pt-16 sm:pt-20 relative overflow-hidden">
        {/* Enterprise Pilot Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="card-elevated rounded-3xl border-primary/40 bg-gradient-to-r from-primary/10 via-brand-secondary/5 to-transparent p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary-ink">Free pilot programme</span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Try a dedicated sandbox pre-loaded with your operational data</h2>
              <p className="text-sm text-muted-foreground">Test drive voice agent duplex flows, POS offline queuing, or automated loss prevention in an isolated VPC sandbox.</p>
            </div>
            <Link
              to="/contact?pilot=true"
              className={buttonClasses('primary', 'md', 'shrink-0')}
            >
              Ask about a pilot <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Filters and Search Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search Box */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by feature, industry, or problem..."
                  className="w-full rounded-2xl border border-input bg-card pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                />
              </div>

              {/* Status Badge Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1 shrink-0">Status:</span>
                {[
                  { id: "all", label: "All Statuses" },
                  { id: "live-demo", label: "Live Demo Available" },
                  { id: "pilot", label: "Pilot Ready" },
                  { id: "enterprise", label: "Enterprise Blueprint" }
                ].map((badge) => (
                  <button
                    key={badge.id}
                    onClick={() => setSelectedBadge(badge.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border",
                      selectedBadge === badge.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-muted-foreground border-border hover:bg-muted"
                    )}
                  >
                    {badge.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {productCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 border",
                    selectedCategory === category
                      ? "bg-foreground text-background border-foreground shadow-sm"
                      : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-card p-12">
              <p className="text-lg font-bold text-foreground mb-2">No matching products found</p>
              <p className="text-sm text-muted-foreground mb-6">Try clearing your search query or switching categories.</p>
              <button
                onClick={() => { setSelectedCategory("All Products"); setSearchQuery(""); setSelectedBadge("all"); }}
                className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={cn(
                    'flex [&>*]:w-full',
                    // Centre a lone last card instead of leaving it stranded on the left.
                    i === filteredProducts.length - 1 && filteredProducts.length % 3 === 1 && 'lg:col-start-2',
                    i === filteredProducts.length - 1 && filteredProducts.length % 2 === 1 && 'md:max-lg:col-span-2 md:max-lg:justify-self-center md:max-lg:w-1/2',
                  )}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Why Choose AIScripto Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="card-elevated rounded-3xl p-8 sm:p-12">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3">Our Product Principles</div>
              <h2 className="text-h2 font-bold">Built for Immediate Utility and Rapid ROI</h2>
              <p className="text-sm text-muted-foreground mt-2">
                We design AI tools with zero vanity metrics. Every feature is tied to real operational outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Fast setup</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No multi-month engineering project to get started. Embed a single snippet or connect phone lines with standard call-forwarding rules.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary-ink flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Zero Double-Booking & Strict Integrity</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Database-level concurrency locks, immutable voucher keys, and offline transaction queues protect your business operations.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Predictable, Budget-Friendly Costs</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Transparent starter tiers beginning under $99/mo so growing businesses can modernize their workflows without financial risk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Customization & White-Label Option */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="p-8 sm:p-12 rounded-3xl bg-muted/30 border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3">Enterprise Customization</div>
                <h2 className="text-h2 font-bold mb-4">
                  Need a Customized Version or Private Cloud Deployment?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  Every product in the AIScripto catalog can be licensed as source code, customized with your branding, integrated into internal enterprise databases, or deployed inside your company's private AWS, Azure, or GCP VPC.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Single-tenant isolated cloud deployments (VPC / On-premise)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Proprietary LLM fine-tuning on your company knowledge bases</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Custom API bridges to legacy ERP, CRM, and accounting engines</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className={buttonClasses('primary', 'md')}
                  >
                    Book a consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/services/software"
                    className={buttonClasses('outline', 'md')}
                  >
                    Custom Software Practice
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
                  <Server className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">Private VPC Hosting</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Run entirely within your corporate boundary under your own security controls.</p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
                  <Lock className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">Zero Public Training</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Your data remains confidential. Prompts and conversations are never shared.</p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
                  <Code className="w-6 h-6 text-emerald-700 dark:text-emerald-500" />
                  <h3 className="font-bold text-sm text-foreground">Custom Integrations</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Engineered connectors to your active ERP, CRM, or POS hardware.</p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">Enterprise SLA options</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Defined response times in your SLA, health monitoring and active maintenance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Demonstration & Sandbox Pilot CTA */}
        <div className="mt-12">
          <EnterpriseCta
            variant="full"
            badge="Free pilot programme"
            heading="Ready to Pilot AIScripto Enterprise Systems in Your VPC?"
            description="Run a free pilot in a secure sandbox, connected to your test webhooks, POS feeds or general ledger, with dedicated onboarding support."
            primaryButtonText="Ask about a pilot"
            primaryButtonLink="/contact?demo=true"
            secondaryButtonText="Try a live demo"
            secondaryButtonLink="/live-demos"
            trustPoints={[
              "Free pilot programme",
              "Private Cloud & Air-Gapped Deployment Available",
              "Custom Integrations by Senior Engineers"
            ]}
          />
        </div>
      </div>

    </>
  );
}
