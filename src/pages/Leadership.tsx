import { Cpu, Cloud, Code, ShieldCheck, CheckCircle2, Layers, Users, Shield, Target } from 'lucide-react';
import Seo from "../components/Seo";
import EnterpriseCta from '../components/EnterpriseCta';
import Eyebrow from '../components/Eyebrow';

export default function Leadership() {
  const practices = [
    {
      title: "AI & Autonomous Systems Practice",
      icon: Cpu,
      focus: "Agentic Workflows, Voice AI & RAG",
      description: "Steered by specialist architects focused on multi-agent frameworks (LangGraph, AutoGen), sub-second duplex voice pipelines, and enterprise knowledge grounding with strict role-based access control.",
      standards: [
        "Deterministic JSON schema validation for all tool actions",
        "Automated prompt-injection and hallucination guardrails",
        "Sub-second streaming voice latency benchmarks",
        "Continuous accuracy evaluation against synthetic datasets"
      ]
    },
    {
      title: "Cloud, DevOps & SRE Practice",
      icon: Cloud,
      focus: "Cloud-Native Infrastructure & Automation",
      description: "Directs our cloud migration, containerization, and platform engineering initiatives across AWS, Microsoft Azure, and Google Cloud, ensuring enterprise workloads are resilient and cost-optimized.",
      standards: [
        "100% Infrastructure as Code via Terraform & Pulumi",
        "Automated CI/CD security scanning (SAST/DAST) in pipeline",
        "GitOps Kubernetes cluster deployments with automated rollback",
        "Zero-downtime blue/green and canary deployment strategies"
      ]
    },
    {
      title: "Enterprise Solutions & ERP Integration Practice",
      icon: Layers,
      focus: "Financial Accounting, Odoo & CRM",
      description: "Oversees enterprise business application deployments, custom ERP development, and transactional bridges, bridging front-office operations with strict IFRS/GAAP accounting ledgers.",
      standards: [
        "Double-entry ledger validation (Debit = Credit) at database level",
        "Universal Voucher Key traceability across business lifecycles",
        "PDC (Post-Dated Check) lifecycle and automated clearance audits",
        "Three-way matching for PO, Goods Receipt, and Vendor Invoices"
      ]
    },
    {
      title: "Custom Software & Product Engineering Practice",
      icon: Code,
      focus: "Full-Stack Web & Distributed APIs",
      description: "Leads custom web application engineering, microservices development, and legacy modernization, enforcing modern TypeScript, React, and Python engineering standards.",
      standards: [
        "Strict end-to-end TypeScript and static type safety",
        "Modular microservice boundaries with documented OpenAPI specs",
        "Comprehensive automated unit, integration, and visual regression suites",
        "Sub-200ms API response targets with distributed Redis caching"
      ]
    }
  ];

  return (
    <>
      <Seo
        title="Practice Leadership & Engineering Governance"
        description="How AIScripto is led and delivers: our engineering practice leadership across AI, cloud DevOps and ERP, and the governance model that keeps projects on track."
      />
      <div className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="max-w-4xl">
            <Eyebrow className="mb-6">
              Engineering Governance & Practice Leadership
            </Eyebrow>
            <h1 className="text-h1 font-bold mb-6">
              Architect-Led Delivery, <span className="text-gradient">Engineered for Reliability</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              At AIScripto, client engagements are led by experienced Practice Leads and Principal Solutions Architects who bring hands-on technical discipline to every project from architecture review to production rollout.
            </p>
          </div>
        </section>

        {/* Practice Leadership Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="max-w-2xl mb-10">
            <h2 className="text-h2 font-bold mb-3">Our Core Engineering Practices</h2>
            <p className="text-muted-foreground text-sm">
              Each practice is governed by dedicated architectural guidelines, reusable blueprints, and continuous quality audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practices.map((practice) => (
              <div key={practice.title} className="p-8 rounded-3xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between reveal">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <practice.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary-ink">
                        {practice.focus}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">{practice.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {practice.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-border/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                      Practice Standards:
                    </span>
                    {practice.standards.map((std, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{std}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Governance Framework */}
        <section className="section-y bg-muted/30 border-y border-border section-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Governance</h2>
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">How We Keep Delivery on Track</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                We combine agile flexibility with corporate accountability to keep delivery on schedule, code transparent, and architecture decisions visible.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Direct Architect Access",
                  icon: Users,
                  desc: "Clients collaborate directly with senior architects and technical leads via Slack, Microsoft Teams, and bi-weekly sprint demos."
                },
                {
                  title: "Transparent Source Code",
                  icon: ShieldCheck,
                  desc: "All source code is committed daily to client-owned GitHub or GitLab repositories with pull-request reviews on every commit."
                },
                {
                  title: "Automated Quality Gates",
                  icon: Target,
                  desc: "Quality gates enforced by continuous integration, strict TypeScript checking, unit testing, and automated security scans."
                },
                {
                  title: "Full IP Ownership",
                  icon: Shield,
                  desc: "All intellectual property, proprietary configurations, models, and custom software belong 100% to our clients upon delivery."
                }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Leadership CTA */}
        <EnterpriseCta
          badge="Practice Advisory & Leadership"
          heading="Engage Directly with Our Senior Engineering Leaders"
          description="Schedule a technical architecture session with our practice leads to evaluate system design, AI feasibility, or delivery squad governance."
          primaryButtonText="Book a consultation"
          primaryButtonLink="/contact"
          secondaryButtonText="Review Service Offerings"
          secondaryButtonLink="/services"
          trustPoints={[
            "Direct Solutions Architect Discussion",
            "Mutual NDA Execution on Request",
            "Actionable Engineering Feasibility Feedback"
          ]}
        />
      </div>
    </>
  );
}
