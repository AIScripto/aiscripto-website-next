import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { normalizePath } from './Seo';

/**
 * Topic clusters. Several pages cover neighbouring intents (e.g. "AI agents" vs
 * "custom chatbot" vs "ready-made chat widget"); each page states its own job and
 * links to its siblings with descriptive anchor text, so search engines see one
 * clear target per query and visitors can jump to the right page.
 */
type RelatedLink = { path: string; label: string; summary: string };

const CLUSTERS: { title: string; links: RelatedLink[] }[] = [
  {
    title: 'AI agents & chatbots',
    links: [
      { path: '/services/ai', label: 'AI agent development & automation', summary: 'Autonomous agents that take actions across your systems.' },
      { path: '/services/ai-chatbot-development', label: 'Custom AI chatbot development', summary: 'A chatbot built for your data, workflows and brand.' },
      { path: '/products/ai-agent-web', label: 'AI website chat widget (ready-made)', summary: 'Drop-in concierge that captures leads from day one.' },
      { path: '/case-studies/ai-chatbot-customer-service', label: 'Case study: AI customer-service chatbot', summary: 'How a support chatbot cut response times.' },
      { path: '/blog/building-enterprise-ai-chatbots-rag', label: 'Guide: building enterprise RAG chatbots', summary: 'Architecture, grounding and guardrails.' },
    ],
  },
  {
    title: 'AI voice receptionist',
    links: [
      { path: '/products/ai-voice-booking', label: 'AI voice receptionist & booking agent', summary: 'Answers calls 24/7 and books appointments.' },
      { path: '/solutions/ai-receptionist-for-hvac', label: 'AI receptionist for HVAC companies', summary: 'The voice receptionist, tuned for HVAC dispatch.' },
      { path: '/products/nexus-agent', label: 'NexusAgent voice support platform', summary: 'Voice-first support with incident intelligence.' },
      { path: '/blog/duplex-ai-voice-receptionist-telephony', label: 'Guide: how AI voice receptionists work', summary: 'Telephony, latency and handoff explained.' },
    ],
  },
  {
    title: 'ERP & CRM',
    links: [
      { path: '/services/erp', label: 'ERP integration services', summary: 'Connect ERP, accounting and CRM data in both directions.' },
      { path: '/services/custom-crm-development', label: 'Custom CRM development', summary: 'A CRM built around your sales process.' },
      { path: '/products/erp-financials', label: 'ERP Financials platform', summary: 'Ledger, invoicing and reconciliation out of the box.' },
      { path: '/blog/erp-crm-integration-roadmap', label: 'Guide: ERP & CRM integration roadmap', summary: 'Phases, pitfalls and timelines.' },
    ],
  },
];

export function getRelatedLinks(pathname: string) {
  const current = normalizePath(pathname);
  const cluster = CLUSTERS.find((c) => c.links.some((l) => l.path === current));
  if (!cluster) return null;
  return { title: cluster.title, links: cluster.links.filter((l) => l.path !== current) };
}

export default function RelatedPages() {
  const { pathname } = useLocation();
  const related = getRelatedLinks(pathname);
  if (!related) return null;

  return (
    <section aria-labelledby="related-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
      <h2 id="related-heading" className="text-h3 font-bold mb-2">
        Related: {related.title}
      </h2>
      <p className="text-muted-foreground mb-8">Not quite what you need? These pages cover the neighbouring options.</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
            >
              <span className="font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">{link.label}</span>
              <span className="text-sm text-muted-foreground leading-relaxed flex-grow">{link.summary}</span>
              <ArrowRight className="w-4 h-4 text-primary mt-3" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
