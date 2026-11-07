/**
 * Spotlight hero content for each service page (/services/:id).
 * Restates what services.ts already describes, in short, plain language.
 * `photo` overrides the service's own image for the round stage photo (stock id or path).
 */
import type { SpotlightCard } from '../components/SpotlightHero';

export interface ServiceSpotlight {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  accent: string;
  accentInk: string;
  cards: [SpotlightCard, SpotlightCard, SpotlightCard];
  photo?: string;
  photoAlt?: string;
}

export const serviceSpotlights: Record<string, ServiceSpotlight> = {
  ai: {
    eyebrow: 'AI agents & automation',
    titleLead: 'AI agents that',
    titleAccent: 'do the busywork',
    lead: 'We design and build AI agents that work inside your systems: they read your data, take actions through your APIs and hand off to your team when judgement is needed.',
    accent: '#2dd4bf',
    accentInk: '#042f2e',
    cards: [
      { title: 'Connected to your systems', description: 'Agents work with your CRM, ERP, databases and internal APIs.' },
      { title: 'Grounded in your knowledge', description: 'Answers come from your own documents, with citations and guardrails.' },
      { title: 'Human in the loop', description: 'Clear escalation rules send edge cases to the right person.' },
    ],
  },
  devops: {
    eyebrow: 'DevOps & SRE',
    titleLead: 'Ship faster,',
    titleAccent: 'sleep better',
    lead: 'We build reliable delivery pipelines, infrastructure as code and the monitoring that tells you about problems before your customers do.',
    accent: '#38bdf8',
    accentInk: '#082f49',
    cards: [
      { title: 'Automated CI/CD', description: 'Every change is built, tested and deployed the same way, every time.' },
      { title: 'Infrastructure as code', description: 'Environments you can recreate, review and roll back.' },
      { title: 'Observability', description: 'Metrics, logs and alerts tied to what your users actually feel.' },
    ],
  },
  erp: {
    eyebrow: 'ERP & CRM integration',
    titleLead: 'One source of truth',
    titleAccent: 'for your business',
    lead: 'We implement and connect ERP and CRM systems such as Odoo, Salesforce and Dynamics 365 so finance, sales and operations work from the same data.',
    accent: '#fbbf24',
    accentInk: '#422006',
    cards: [
      { title: 'Implementation', description: 'Odoo and other ERP platforms configured around your processes.' },
      { title: 'Two-way sync', description: 'Customers, orders and invoices stay consistent across systems.' },
      { title: 'Clean migration', description: 'Legacy data moved, checked and reconciled before go-live.' },
    ],
  },
  software: {
    eyebrow: 'Custom software engineering',
    titleLead: 'Software built',
    titleAccent: 'around how you work',
    lead: 'We design and build web platforms, SaaS products and backends, and modernize legacy systems step by step instead of a risky big-bang rewrite.',
    accent: '#818cf8',
    accentInk: '#1e1b4b',
    cards: [
      { title: 'Product-grade web apps', description: 'Fast, accessible front ends on scalable backends.' },
      { title: 'Legacy modernization', description: 'Replace old systems in stages, with no big-bang cutover.' },
      { title: 'You own the code', description: 'Full source code and IP handed over on every project.' },
    ],
  },
  cloud: {
    eyebrow: 'Cloud solutions',
    titleLead: 'Move to the cloud',
    titleAccent: 'without the drama',
    lead: 'We plan and run cloud migrations on AWS, Azure and Google Cloud in staged waves, with cost controls built in from day one.',
    accent: '#a78bfa',
    accentInk: '#1e1b4b',
    cards: [
      { title: 'Migration planning', description: 'Workloads assessed and moved in safe, staged waves.' },
      { title: 'Multi-cloud architecture', description: 'Designs for AWS, Azure and Google Cloud.' },
      { title: 'Cost governance', description: 'Budgets, tagging and right-sizing to keep spend in check.' },
    ],
  },
  security: {
    eyebrow: 'Cybersecurity & compliance',
    titleLead: 'Find the gaps',
    titleAccent: 'before attackers do',
    lead: 'We test your applications and cloud setup, fix what matters most and help you prepare for SOC 2, ISO 27001 and HIPAA audits.',
    accent: '#fb7185',
    accentInk: '#4c0519',
    cards: [
      { title: 'Penetration testing', description: 'Application and API testing with clear, prioritised fixes.' },
      { title: 'Audit readiness', description: 'Controls, policies and evidence for SOC 2, ISO 27001 and HIPAA.' },
      { title: 'Monitoring & response', description: 'Threat detection and an incident plan your team can follow.' },
    ],
  },
};
