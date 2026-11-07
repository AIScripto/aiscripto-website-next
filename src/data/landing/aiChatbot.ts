/** Content for /services/ai-chatbot-development (rendered by src/pages/AiChatbotDevelopment.tsx). */
import { MessageSquare, Database, Lock, Workflow, Server, Gauge } from 'lucide-react';
import type { Feature } from '../../components/landing/FeatureGrid';

export const serviceMeta = {
  "path": "/services/ai-chatbot-development",
  "name": "Custom AI Chatbot Development Services",
  "serviceType": "AI Chatbot Development Company",
  "description": "Enterprise custom AI chatbot development services. We engineer production-ready conversational AI, deterministic RAG pipelines, and LLM chatbot applications.",
  "areaServed": [
    "United States",
    "United Kingdom",
    "European Union"
  ]
};

export const faqs = [
  {
    q: "Why hire a custom AI chatbot development company instead of using an off-the-shelf bot?",
    a: "Off-the-shelf chatbots run on rigid decision trees or unconstrained LLM prompts that frequently hallucinate, lack real-time access to your proprietary databases and CRMs, and expose sensitive company data. As a dedicated custom AI chatbot development company, AIScripto engineers enterprise RAG pipelines, deterministic JSON schema boundaries, and custom multi-agent workflows connected directly to your internal APIs with full data sovereignty."
  },
  {
    q: "How does AIScripto keep enterprise chatbot answers grounded and accurate?",
    a: "We implement deterministic Retrieval-Augmented Generation (RAG) using hybrid vector embeddings (pgvector / Pinecone) and cross-encoder reranking. We enforce strict JSON schema output contracts, validation guardrails (Guardrails AI / NeMo), and context-grounded source citations. If a request falls outside the approved knowledge base, the agent says so and hands off to a human with full context."
  },
  {
    q: "Can your custom AI chatbots integrate with our existing business systems and CRMs?",
    a: "Yes. Our custom AI chatbot development services natively integrate with Salesforce, HubSpot, Infor CRM, Odoo ERP, Zendesk, ServiceNow, custom PostgreSQL/MongoDB databases, and custom REST/GraphQL APIs. Chatbots execute authorized actions such as querying customer invoices, creating support tickets, and scheduling consultations in real time."
  },
  {
    q: "Can we hire dedicated chatbot developers or an engineering squad for our project?",
    a: "Yes. In addition to turnkey enterprise chatbot development, clients can hire chatbot developers and senior AI systems engineers on a dedicated monthly engagement model. Our delivery model: Client-facing architects in the US, UK and Italy; engineering and QA centre in Pakistan, with a 4–5 hour daily overlap with US business hours. Work runs in transparent agile sprints under mutual non-disclosure agreements (NDAs)."
  },
  {
    q: "How do your conversational AI development practices safeguard corporate data security?",
    a: "Every deployment is built to support SOC 2, GDPR and HIPAA requirements where applicable. We use zero-data-retention enterprise LLM endpoints, role-based access control (RBAC), end-to-end TLS 1.3 encryption, and VPC-isolated database instances to ensure your intellectual property is never used for foundation model training."
  }
];

export const features: Feature[] = [
  {
    icon: Database,
    title: "Grounded Enterprise RAG",
    desc: "Answers grounded in your documents, with citations and human hand-off when unsure. Connect your knowledge base, PDFs, Confluence spaces and databases with semantic chunking, vector indexing and hybrid BM25 reranking.",
    badge: "Grounded answers"
  },
  {
    icon: Workflow,
    title: "Multi-Agent Workflow Orchestration",
    desc: "Engineer collaborative multi-agent systems using LangGraph. Agents reason through multi-step workflows, call internal APIs, and verify output consistency.",
    badge: "Agentic AI"
  },
  {
    icon: MessageSquare,
    title: "Omnichannel App Development",
    desc: "Deploy AI chatbots across web apps, iOS, Android, Slack, Microsoft Teams, and WhatsApp with synchronized conversational state and unified analytics.",
    badge: "Cross-Platform"
  },
  {
    icon: Lock,
    title: "Enterprise Guardrails & Security",
    desc: "Enforce strict schema validation, PII redaction, prompt injection defense, and role-based access control (RBAC) designed to support SOC 2 controls.",
    badge: "SOC 2-aligned controls"
  },
  {
    icon: Server,
    title: "Bi-Directional CRM & ERP APIs",
    desc: "Direct integration with Salesforce, Infor CRM, Odoo, and custom SQL databases so chatbots can execute actions rather than just generating text.",
    badge: "Live Action Execution"
  },
  {
    icon: Gauge,
    title: "Low-Latency Token Economics",
    desc: "Optimized model routing across Claude 3.5, GPT-4o-mini, and open-source Llama 3 models to achieve sub-second TTFT (Time to First Token) while slashing API costs.",
    badge: "Cost & Speed"
  }
];
