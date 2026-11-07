import React from 'react';
import { Users, CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import EnterpriseCta from '../components/EnterpriseCta';
import RelatedPages from '../components/RelatedPages';
import { buildLandingServiceSchema } from '../utils/schema';
import Breadcrumbs from '../components/landing/Breadcrumbs';
import LandingHero from '../components/landing/LandingHero';
import FeatureGrid from '../components/landing/FeatureGrid';
import { serviceMeta, features } from '../data/landing/customCrm';

export default function CustomCrmDevelopment() {





  return (
    <>
      <Seo
        title="Custom CRM Development Company | AI-Powered CRM"
        description="Custom CRM software development company. AIScripto engineers scalable, AI-powered CRM systems, automated sales workflows, and ERP integrations for US business."
        schema={buildLandingServiceSchema(serviceMeta)}
      />

      <div className="pt-32">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "Custom CRM Development Company" }]} />


        <LandingHero
          eyebrow={<><Users className="w-4 h-4" /> Modern AI CRM Systems</>}
          title={<>Custom <span className="text-gradient">CRM Development Company</span></>}
          intro={<>Stop paying per-seat licence fees for software that does not fit how you sell. We build custom CRM software with AI agents, automated sales pipelines and two-way ERP integrations, designed around your operations.</>}
          primary={{ label: "Book a consultation", to: "/contact" }}
          secondary={{ label: "Explore ERP & CRM Integrations", to: "/services/erp" }}
        />

        {/* Commercial Comparison: Custom vs SaaS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-xl">
            <div className="max-w-3xl mb-12">
              <h2 className="text-h3 font-bold">
                Off-the-Shelf CRMs vs. AIScripto Custom AI CRM Systems
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Evaluate why growing mid-market enterprises migrate from commercial SaaS subscriptions to proprietary custom CRM architectures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-muted/40 border border-border space-y-4">
                <div className="text-red-700 dark:text-red-500 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <span>Traditional SaaS CRMs (Salesforce / HubSpot)</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-700 dark:text-red-500 font-bold">✕</span>
                    <span>Cost scales aggressively with headcount ($150–$350+/seat/mo).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-700 dark:text-red-500 font-bold">✕</span>
                    <span>Workflows must bend to match standard vendor schemas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-700 dark:text-red-500 font-bold">✕</span>
                    <span>AI capabilities are gated behind expensive top-tier enterprise tiers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-700 dark:text-red-500 font-bold">✕</span>
                    <span>Complex API throttling and rate limits on data syncs.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
                <div className="text-brand-primary-ink font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>AIScripto Custom AI-Powered CRM</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 dark:text-emerald-500 font-bold">✓</span>
                    <span>Zero per-user license fees—add unlimited sales reps and staff.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 dark:text-emerald-500 font-bold">✓</span>
                    <span>Workflows built around your own operational rules.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 dark:text-emerald-500 font-bold">✓</span>
                    <span>Native autonomous AI agents built directly into the data layer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 dark:text-emerald-500 font-bold">✓</span>
                    <span>Complete source code and enterprise intellectual property ownership.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FeatureGrid
          kicker="Enterprise Capabilities"
          title="Full-Lifecycle CRM Development Services & AI Integration"
          description="Our CRM development services cover everything from early consulting and data design to AI agents running inside your pipeline, so mid-market companies get a CRM that supports growth."
          items={features}
        />

        {/* Specialized Solutions: Lead Gen & Agentic Workflows */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink">Beyond Simple SaaS Templates</span>
                <h3 className="text-2xl font-bold text-foreground">Why Build a CRM with AI Instead of Using a Generic Tool?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Off-the-shelf software and generic no-code CRM builders force your sales process into predefined boxes. When AIScripto builds your AI CRM, you get engineering for your specific process:
                </p>
                <div className="space-y-3 pt-2 text-xs sm:text-sm text-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Lead generation:</strong> Automated account enrichment, ideal-customer scoring, and multichannel outreach sequences.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Lead qualification chatbot:</strong> Conversational inbound capture that books meetings straight onto your reps' calendars.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Pipeline AI agent:</strong> An assistant that watches deal progress, logs calls, and alerts managers to stalled deals.</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-muted/40 border border-border space-y-3">
                <div className="text-xs font-mono font-bold text-foreground flex items-center justify-between pb-2 border-b border-border">
                  <span>Custom CRM AI Engine Spec</span>
                  <span className="text-primary">Reference stack</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-muted-foreground">
                  <div>• Architecture: Microservices on Docker / Kubernetes</div>
                  <div>• DB Layer: PostgreSQL with Row-Level Security</div>
                  <div>• AI Layer: LangGraph / pgvector / GPT-4o Tool-Calling</div>
                  <div>• ERP Sync: Infor CRM, Odoo, SAP &amp; Agicap Treasury</div>
                  <div>• Licensing: 100% Perpetual Client IP Ownership</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="p-8 sm:p-10 rounded-3xl bg-muted/30 border border-border">
            <div className="max-w-2xl mb-8">
              <h2 className="text-xl font-bold text-foreground">Production-Grade Enterprise Architecture</h2>
              <p className="text-xs text-muted-foreground mt-1">Built with modern, scalable, and auditable open technologies.</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-mono font-semibold">
              <span className="px-4 py-2 rounded-xl bg-card border border-border text-foreground">TypeScript / React 19</span>
              <span className="px-4 py-2 rounded-xl bg-card border border-border text-foreground">Node.js / Express / NestJS</span>
              <span className="px-4 py-2 rounded-xl bg-card border border-border text-foreground">PostgreSQL (Row-Level Security)</span>
              <span className="px-4 py-2 rounded-xl bg-card border border-border text-foreground">Redis Cache &amp; Queues</span>
              <span className="px-4 py-2 rounded-xl bg-card border border-border text-foreground">Docker / Kubernetes</span>
              <span className="px-4 py-2 rounded-xl bg-card border border-border text-foreground">Infor CRM &amp; Odoo ERP Bridges</span>
              <span className="px-4 py-2 rounded-xl bg-card border border-border text-foreground">LangGraph Agent Workflows</span>
            </div>
          </div>
        </section>


        {/* Conversion CTA */}
        <RelatedPages />
        <EnterpriseCta
          badge="Custom CRM Architecture"
          heading="Ready to Build Your Proprietary AI-Powered CRM?"
          description="Speak directly with a solutions architect to review your sales pipeline automation, ERP data mapping, and custom CRM engineering roadmap."
          primaryButtonText="Book a consultation"
          primaryButtonLink="/contact"
          secondaryButtonText="Explore ERP Integration Services"
          secondaryButtonLink="/services/erp"
          trustPoints={[
            "Direct Solutions Architect Consultation",
            "Mutual NDA Execution on Request",
            "100% Client Intellectual Property Ownership"
          ]}
        />
      </div>
    </>
  );
}
