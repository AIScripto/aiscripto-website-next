import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, CheckCircle2, Terminal, Radio } from 'lucide-react';
import Seo from '../components/Seo';
import EnterpriseCta from '../components/EnterpriseCta';
import RelatedPages from '../components/RelatedPages';
import { buildLandingServiceSchema } from '../utils/schema';
import Breadcrumbs from '../components/landing/Breadcrumbs';
import LandingHero from '../components/landing/LandingHero';
import FeatureGrid from '../components/landing/FeatureGrid';
import { serviceMeta, features } from '../data/landing/aiChatbot';
import { buttonClasses } from '../components/ui/Button';

export default function AiChatbotDevelopment() {





  return (
    <>
      <Seo
        title="AI Chatbot Development Company | Custom AI Chatbots"
        description="Custom AI chatbot development company. AIScripto engineers enterprise RAG chatbots, multi-agent workflows, and conversational AI integrated with your APIs."
        schema={buildLandingServiceSchema(serviceMeta)}
      />

      <div className="pt-32">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "AI Chatbot Development Company" }]} />


        <LandingHero
          eyebrow={<><Bot className="w-4 h-4" /> Custom AI Chatbot Development Services</>}
          title={<>Enterprise <span className="text-gradient">AI Chatbot Development</span> Company</>}
          intro={<>We engineer production-grade custom AI chatbots, autonomous agentic workflows, and deterministic RAG systems connected directly to your enterprise APIs, databases, and CRMs. Keep answers grounded in your own data, protect corporate IP, and automate complex customer journeys.</>}
          primary={{ label: "Book a consultation", to: "/contact" }}
          secondary={{ label: "Try a live demo", to: "/live-demos", icon: <Radio className="w-4 h-4 text-primary animate-pulse" aria-hidden="true" /> }}
        />

        {/* Real-World Pain vs Engineering Solution */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-brand-primary-ink">Beyond Off-The-Shelf Wrappers</div>
              <h2 className="text-h2 font-bold">
                Why Generic Chatbots Fail in Enterprise Environments
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most companies experiment with off-the-shelf chatbot platforms only to discover severe limitations: unpredictable responses, context window drift, zero transaction capabilities with internal ERPs, and unacceptable data privacy risks.
              </p>
              <div className="space-y-4 pt-2">
                {[
                  { title: "Hallucination Liabilities", desc: "Generic LLMs fabricate answers when boundaries are not deterministically constrained." },
                  { title: "Disjointed Data Silos", desc: "Third-party bots cannot securely query internal PostgreSQL, MongoDB, or ERP ledgers." },
                  { title: "Security & Compliance Gaps", desc: "Enterprise teams cannot risk customer conversations training third-party public models." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    <span className="font-mono text-xs font-bold text-foreground">AIScripto Grounded RAG Pipeline</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-600 border border-emerald-500/20">Guardrails on</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-background/80 border border-border/60">
                    <span className="text-muted-foreground">01: INCOMING_QUERY:</span> "Can you check invoice INV-84920 and refund status?"
                  </div>
                  <div className="p-3 rounded-lg bg-background/80 border border-border/60">
                    <span className="text-muted-foreground">02: RAG_RETRIEVAL:</span> Hybrid BM25 + pgvector cosine similarity (Score: 0.942)
                  </div>
                  <div className="p-3 rounded-lg bg-background/80 border border-border/60">
                    <span className="text-muted-foreground">03: API_TOOL_CALL:</span> ERP_Bridge.getInvoiceStatus("INV-84920") -&gt; JSON [Status: Paid]
                  </div>
                  <div className="p-3 rounded-lg bg-background/80 border border-border/60 text-emerald-700 dark:text-emerald-400">
                    <span className="text-muted-foreground">04: GUARDRAIL_VERIFY:</span> Schema validated. Answer grounded in source.
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every answer is grounded in your approved enterprise data and authenticated database actions, with human hand-off when the agent is unsure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FeatureGrid
          kicker="Engineering Rigor"
          title="Full-Stack Custom AI Chatbot Development Services"
          description="From customer-facing conversational assistants to internal LLM tools and autonomous AI agents, our engineering team builds production chatbot systems designed to scale."
          items={features}
        />

        {/* Hire Chatbot Developers / Engagement Models */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="p-8 sm:p-12 rounded-3xl bg-muted/40 border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink">Flexible Engagement</span>
                <h2 className="text-h3 font-bold text-foreground">
                  Hire Chatbot Developers & Dedicated AI Engineering Squads
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Whether you need end-to-end chatbot development or want specialist developers to extend your in-house team, AIScripto provides senior full-stack AI engineers under clear agile governance. Client-facing architects in the US, UK and Italy; engineering and QA centre in Pakistan, with a 4–5 hour daily overlap with US business hours.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold">
                  <span className="px-3 py-1.5 rounded-lg bg-card border border-border">LangChain &amp; LangGraph</span>
                  <span className="px-3 py-1.5 rounded-lg bg-card border border-border">Python &amp; FastAPI</span>
                  <span className="px-3 py-1.5 rounded-lg bg-card border border-border">TypeScript &amp; Next.js</span>
                  <span className="px-3 py-1.5 rounded-lg bg-card border border-border">pgvector &amp; Pinecone</span>
                  <span className="px-3 py-1.5 rounded-lg bg-card border border-border">Llama 3 &amp; GPT-4o</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <Link
                  to="/contact"
                  className={buttonClasses('primary', 'md', 'text-center')}
                >
                  Book a consultation
                </Link>
                <Link
                  to="/products/nexus-agent"
                  className={buttonClasses('outline', 'md', 'text-center')}
                >
                  See NexusAgent Platform
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Conversion CTA */}
        <RelatedPages />
        <EnterpriseCta
          badge="Enterprise AI Engineering"
          heading="Ready to Engineer Your Custom AI Chatbot Solution?"
          description="Connect with a senior AI systems architect to evaluate your workflow automation requirements, knowledge base integration, and API architecture."
          primaryButtonText="Book a consultation"
          primaryButtonLink="/contact"
          secondaryButtonText="Try a live demo"
          secondaryButtonLink="/live-demos"
          trustPoints={[
            "Direct Solutions Architect Consultation",
            "Mutual NDA Prior to Technical Review",
            "Production-Grade Security & Governance"
          ]}
        />
      </div>
    </>
  );
}
