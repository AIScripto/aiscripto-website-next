import React from 'react';
import { Code, Cloud, Cpu, BarChart, ShieldCheck, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import Seo from "../components/Seo";
import { SERVICE_TITLES } from '../data/serviceTitles';
import EnterpriseCta from '../components/EnterpriseCta';
import { buildServiceCatalogSchema } from '../utils/schema';
import SpotlightHero, { SpotlightPhoto } from '../components/SpotlightHero';
import { stockImage, stockSrcSet } from '../utils/images';

/** Stage photo for the services overview hero (self-hosted stock id). */
const SERVICES_HERO_PHOTO = '1519389950473-47ba0277781c';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  color: string;
  bg: string;
}

const services: ServiceItem[] = [
  {
    id: "ai",
    title: SERVICE_TITLES.ai,
    description: "Architect and deploy autonomous AI agents, multi-agent frameworks, and deterministic agentic workflows connected to enterprise systems and knowledge bases.",
    icon: Cpu,
    features: ["Autonomous AI Agents", "Multi-Agent Systems", "Deterministic Agentic Workflows", "Enterprise RAG Pipelines", "Duplex Voice AI Agents", "Human-in-the-Loop Governance"],
    color: "text-brand-primary-ink",
    bg: "bg-brand-accent/10",
  },
  {
    id: "devops",
    title: SERVICE_TITLES.devops,
    description: "Build resilient cloud platforms, automated CI/CD pipelines, container orchestration, and comprehensive observability architectures.",
    icon: Zap,
    features: ["Zero-Downtime CI/CD", "Infrastructure as Code", "Production Kubernetes", "Full-Stack Observability", "SRE & SLO Governance", "DevSecOps Automation"],
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "erp",
    title: SERVICE_TITLES.erp,
    description: "Unify core business operations across finance, sales, inventory, and support through robust ERP and CRM implementation, data migration, and bidirectional API synchronization.",
    icon: BarChart,
    features: ["Odoo Enterprise Deployment", "Salesforce CRM Integration", "SAP & Dynamics 365 Bridges", "Zero-Loss Data Migration", "Event-Driven Sync APIs", "Executive BI Dashboards"],
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
  },
  {
    id: "software",
    title: SERVICE_TITLES.software,
    description: "Engineer secure, scalable, and maintainable web applications, SaaS platforms, and distributed backend systems tailored to your business operations.",
    icon: Code,
    features: ["Enterprise SaaS Applications", "High-Throughput Backends", "Legacy Monolith Refactoring", "Typed REST & GraphQL APIs", "Real-Time Streaming Systems", "Automated QA & Testing"],
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
  },
  {
    id: "cloud",
    title: SERVICE_TITLES.cloud,
    description: "Deliver cloud strategy, workload migration, cloud-native architecture, and ongoing platform governance across AWS, Microsoft Azure, and Google Cloud Platform.",
    icon: Cloud,
    features: ["Low-Downtime Migration", "Multi-Cloud Architecture", "Serverless Implementations", "Terraform Infrastructure as Code", "FinOps Spend Optimization", "24/7 SRE Operations"],
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "security",
    title: SERVICE_TITLES.security,
    description: "Protect enterprise digital assets through comprehensive security assessments, penetration testing, compliance readiness (SOC 2, ISO 27001, HIPAA), and managed threat monitoring.",
    icon: ShieldCheck,
    features: ["Application Penetration Testing", "Audit Readiness (SOC 2, ISO, HIPAA)", "Managed Detection & Response", "Cloud Security Posture (CSPM)", "DevSecOps Pipeline Scanning", "Incident Response Playbooks"],
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
  }
];

const techCompetencies = [
  {
    category: "AI & Agentic Frameworks",
    icon: Cpu,
    items: ["LangGraph", "LlamaIndex", "FastAPI", "OpenAI / Claude API", "Hugging Face", "Pinecone & Pgvector", "Deepgram & Twilio Voice"]
  },
  {
    category: "Cloud & Infrastructure",
    icon: Cloud,
    items: ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform", "Kubernetes (EKS/GKE)", "Terraform IaC", "Docker & Helm"]
  },
  {
    category: "Software & Web Platforms",
    icon: Code,
    items: ["React & Next.js", "TypeScript & Node.js", "Python & Django/FastAPI", "Go & Microservices", "PostgreSQL & Redis", "GraphQL & REST"]
  },
  {
    category: "Enterprise Systems & ERP",
    icon: BarChart,
    items: ["Odoo / OpenERP", "Salesforce API", "SAP Connector Bridges", "Microsoft Dynamics 365", "Infor CRM Sync", "QuickBooks Online"]
  }
];

export default function Services() {

  return (
    <>
      <Seo
        title="Enterprise Technology & Software Engineering Services"
        description="Explore AIScripto's technology services: autonomous AI agents, cloud-native DevOps, custom software engineering, ERP integration, and cybersecurity."
        schema={buildServiceCatalogSchema(services)}
      />
    <SpotlightHero
      eyebrow="AIScripto services"
      titleLead="Engineering for"
      titleAccent="the systems you run on"
      lead="AI agents, DevOps, ERP and CRM integration, custom software, cloud and security, delivered by one team that owns the outcome from discovery to go-live."
      accent="#38bdf8"
      accentInk="#082f49"
      primary={{ label: 'Book a consultation', to: '/contact' }}
      secondary={{ label: 'Explore services', href: '#services-list' }}
      cards={[
        { title: 'Six practices, one team', description: 'Architects and engineers who work across AI, cloud and core systems.' },
        { title: 'Fixed scope or dedicated squad', description: 'Choose a defined project or a team that plugs into your sprints.' },
        { title: 'You own everything', description: 'Source code, infrastructure and IP are handed over in full.' },
      ]}
      media={<SpotlightPhoto src={stockImage(SERVICES_HERO_PHOTO, 960)} srcSet={stockSrcSet(SERVICES_HERO_PHOTO)} alt="Engineering team collaborating" />}
    />
    <div id="services-list" className="pt-16 sm:pt-20 scroll-mt-24">
      {/* Services overview: one compact card per practice; detail lives on each service page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              id={service.id}
              to={`/services/${service.id}`}
              className="group card-elevated flex flex-col rounded-3xl p-7 hover:border-primary/50 transition-all scroll-mt-28"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", service.bg, service.color)}>
                <service.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.description}</p>
              <ul className="space-y-2 mb-6 flex-grow">
                {service.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                Explore practice <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Core Technology Competencies Matrix */}
      <section className="section-band section-gap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3">Enterprise Technology Matrix</div>
            <h2 className="text-h2 font-bold">Technology Stacks & Engineering Standards</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Our engineering squads build with production-ready, battle-tested technologies and open protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCompetencies.map((comp) => (
              <div key={comp.category} className="p-6 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <comp.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{comp.category}</h3>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
                  {comp.items.map((item) => (
                    <span key={item} className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-muted text-foreground/90">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Engagement Models */}
      <section className="section-gap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-3">Engagement Models</div>
            <h2 className="text-h2 font-bold mb-4">Flexible Structures Aligned to Your Goals</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Whether you need end-to-end delivery of a greenfield system or elastic scaling of your existing engineering capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-ink bg-primary/10 px-3 py-1 rounded-full mb-4 inline-block">
                  Dedicated Squads
                </span>
                <h3 className="text-xl font-bold mb-3">Dedicated Engineering Teams</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Cross-functional squads (Frontend, Backend, AI/ML, DevOps, QA) integrated directly into your agile sprints and product ceremonies.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Full-time dedicated engineers</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Elastic team scaling within 2 weeks</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Direct management & daily standups</li>
                </ul>
              </div>
              <Link to="/contact" className="text-sm font-bold text-primary hover:underline">
                Book a consultation →
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-primary/40 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Most Common
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-ink bg-primary/10 px-3 py-1 rounded-full mb-4 inline-block">
                  Fixed Milestone
                </span>
                <h3 className="text-xl font-bold mb-3">Turnkey Project Delivery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  End-to-end execution of scoped products, migrations, or integrations with defined milestone deliverables and SLA commitments.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Discovery & architecture blueprint</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Bi-weekly milestone demonstrations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Post-launch warranty & handover</li>
                </ul>
              </div>
              <Link to="/contact" className="text-sm font-bold text-primary hover:underline">
                Book a consultation →
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-ink bg-primary/10 px-3 py-1 rounded-full mb-4 inline-block">
                  Technical Advisory
                </span>
                <h3 className="text-xl font-bold mb-3">Architecture & AI Consulting</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  High-level advisory with our principal architects for legacy code audits, cloud cost optimization, and AI automation feasibility.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Comprehensive technical audits</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Vendor & technology stack evaluation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Proof-of-concept prototyping</li>
                </ul>
              </div>
              <Link to="/contact" className="text-sm font-bold text-primary hover:underline">
                Book a consultation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Engineering Squads CTA */}
      <EnterpriseCta
        variant="full"
        badge="Dedicated Engineering Squads & Sprints"
        heading="Need a Dedicated Engineering Squad for Your Product Roadmap?"
        description="Client-facing architects in the US, UK and Italy; engineering and QA centre in Pakistan, with a 4–5 hour daily overlap with US business hours. Choose fixed-milestone delivery or a sprint retainer."
        primaryButtonText="Book a consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore Ready AI Products"
        secondaryButtonLink="/products"
        trustPoints={[
          "4–5 Hour Daily Overlap with US Business Hours",
          "Mutual NDA Execution on Request",
          "100% Direct Client Code & IP Ownership"
        ]}
      />
    </div>
    </>
  );
}
