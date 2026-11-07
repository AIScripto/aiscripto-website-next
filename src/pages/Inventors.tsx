import { Lightbulb, ShieldCheck, Zap, Terminal } from 'lucide-react';
import Seo from "../components/Seo";
import EnterpriseCta from '../components/EnterpriseCta';
import Eyebrow from '../components/Eyebrow';

export default function Inventors() {
  const researchPillars = [
    {
      title: 'Sub-Second Duplex Voice AI Architecture',
      category: 'Conversational Intelligence',
      focus: 'Sub-Second End-to-End Latency',
      description: 'Continuous research into duplex audio streaming, WebRTC optimization, speculative turn-taking models, and low-latency Whisper fine-tuning for natural customer phone interactions.',
      deliverables: ['NexusAgent Voice Receptionist', 'Sub-Second AI Booking Scheduler']
    },
    {
      title: 'Offline-First Transactional State Queuing',
      category: 'Edge & Systems Architecture',
      focus: 'Zero-Downtime Resilience',
      description: 'Engineering local browser and register persistence using IndexedDB, optimistic UI commits, and deterministic multi-register ledger conflict resolution when network connections drop.',
      deliverables: ['AI POS (Fast Food)', 'AI POS (Restaurant & KDS)']
    },
    {
      title: 'Deterministic Multi-Agent Coordination',
      category: 'Agentic Workflows & Safety',
      focus: 'Human-in-the-Loop Governance',
      description: 'Developing multi-agent orchestration patterns with LangGraph and AutoGen that enforce strict role boundaries, automated JSON schema tool execution, and reliable escalation protocols.',
      deliverables: ['AI Agent Web Concierge', 'Enterprise Workflow Automation']
    },
    {
      title: 'Algorithmic Loss Prevention & Ledger Integrity',
      category: 'Financial Engineering',
      focus: 'Statistical Z-Score Anomaly Radar',
      description: 'Algorithmic models that isolate margin leakage, unbilled demurrage, return shrinkage beyond ±2.5σ, and mathematically guarantee double-entry balance across distributed databases.',
      deliverables: ['Business Analytics AI', 'ERP Financial Core']
    }
  ];

  return (
    <>
      <Seo
        title="AIScripto Innovation Lab & Applied AI Research"
        description="Discover AIScripto's engineering research initiatives in low-latency voice AI, offline-first architectures, multi-agent systems, and financial algorithms."
      />
      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-4xl mb-20 animate-fade-up [animation-duration:0.5s]">
            <Eyebrow className="mb-6">
              <Lightbulb className="w-4 h-4" /> AIScripto Technology & Innovation Lab
            </Eyebrow>
            <h1 className="text-h1 font-bold mb-6">
              Applied Research Driving <span className="text-gradient">Production Engineering</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Our engineering lab focuses on solving hard technical problems in latency, resilience, and deterministic AI reasoning. We turn modern technology into production-ready software for our clients and proprietary products.
            </p>
          </div>

          {/* Research Focus Areas Grid */}
          <div className="mb-10">
            <div className="max-w-2xl mb-12">
              <h2 className="text-h2 font-bold mb-3">Core Research & Prototyping Tracks</h2>
              <p className="text-muted-foreground text-sm">
                Each research track directly hardens the tools and platforms we deploy for clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {researchPillars.map((pillar, i) => (
                <div key={i} className="p-8 rounded-3xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between reveal">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-ink bg-primary/10 px-3 py-1 rounded-full">
                        {pillar.category}
                      </span>
                      <span className="text-xs font-mono font-semibold text-brand-secondary-ink bg-brand-secondary/10 px-3 py-1 rounded-full">
                        {pillar.focus}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-foreground">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                      Powers In Production:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pillar.deliverables.map((item, idx) => (
                        <span key={idx} className="text-xs font-medium bg-muted/60 text-foreground px-3 py-1 rounded-lg border border-border/40">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Philosophy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-8 rounded-3xl border border-border bg-card">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Benchmark Before Deploy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We stress-test inference speeds, token consumption, concurrency thresholds, and failure modes using automated synthetic workloads before any AI model touches production.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border bg-card">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 text-brand-secondary-ink flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero-Data Leakage RAG</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our architectures enforce strict tenant isolation, column-level access controls, and prompt-injection barriers to protect proprietary enterprise databases.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border bg-card">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Modular Micro-Prototypes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rather than building heavy monolithic systems, we build composable, micro-engineered modules that integrate cleanly into your existing cloud infrastructure.
              </p>
            </div>
          </div>

          {/* Applied R&D Innovation CTA */}
          <EnterpriseCta
            badge="Applied AI R&D Partnership"
            heading="Explore Our Live Working AI Deployments"
            description="See the direct output of our applied research by interacting with our live voice agents, restaurant registers, and executive dashboards—or commission a custom R&D initiative."
            primaryButtonText="Try a live demo"
            primaryButtonLink="/live-demos"
            secondaryButtonText="Discuss Custom R&D Project"
            secondaryButtonLink="/contact"
            trustPoints={[
              "Production Benchmarked Latency",
              "Mutual NDA Protection",
              "Custom Sandbox Prototyping"
            ]}
          />
        </div>
      </div>
    </>
  );
}
