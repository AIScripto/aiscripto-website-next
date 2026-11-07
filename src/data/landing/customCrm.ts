/** Content for /services/custom-crm-development (rendered by src/pages/CustomCrmDevelopment.tsx). */
import { Workflow, BarChart, Cpu, Lock, DollarSign, RefreshCcw } from 'lucide-react';
import type { Feature } from '../../components/landing/FeatureGrid';

export const serviceMeta = {
  "path": "/services/custom-crm-development",
  "name": "Custom CRM Software Development Services",
  "serviceType": "Custom CRM Development Company",
  "description": "Custom CRM development company engineering AI-powered CRM systems, automated sales workflows, and bidirectional ERP/accounting integrations.",
  "areaServed": [
    "United States",
    "United Kingdom",
    "European Union"
  ]
};

export const faqs = [
  {
    q: "Why should an enterprise choose custom CRM development over Salesforce or HubSpot?",
    a: "Commercial off-the-shelf CRMs charge escalating per-seat monthly subscription fees ($150 to $350+/user/month), enforce rigid data schemas, and lock your proprietary customer data inside vendor ecosystems. As an experienced CRM software development company, AIScripto builds custom AI CRM systems that fit your actual workflows, remove per-seat licensing costs, and give your company full ownership of the intellectual property."
  },
  {
    q: "How do you integrate autonomous AI agents into a custom CRM?",
    a: "We run AI agents as background workers inside your CRM's data layer. They parse incoming customer emails and phone transcripts, auto-populate lead qualification fields, calculate predictive deal-closing probabilities, flag churn risks, and draft context-aware follow-ups for your sales team."
  },
  {
    q: "What is the typical custom CRM development cost and timeline?",
    a: "Custom CRM development costs generally range from $25,000 for mid-market core sales pipeline automation to $85,000+ for complex enterprise multi-entity platforms with full ERP reconciliation, omnichannel telephony, and custom AI agents. Development typically spans 8 to 14 weeks delivered in milestone-based agile sprints."
  },
  {
    q: "Can AIScripto handle CRM integration with our existing ERP and accounting systems?",
    a: "Yes. Our CRM integration work focuses on two-way data pipelines connecting your custom CRM with ERP platforms such as Odoo, Infor CRM, SAP Business One, NetSuite, and cash-flow tools like Agicap. We ensure orders, customer balances, and ledger entries sync without manual data re-entry."
  },
  {
    q: "How does AIScripto handle data security, multi-tenancy, and compliance in custom CRM systems?",
    a: "We engineer custom CRM software with production-ready security from day one: role-based access control (RBAC), multi-tenant database isolation (row-level security in PostgreSQL), field-level encryption for sensitive PII/financial data, comprehensive audit trails, and controls built to support SOC 2, HIPAA, and GDPR requirements."
  }
];

export const features: Feature[] = [
  {
    icon: Cpu,
    title: "Custom CRM with AI Agents",
    desc: "Deploy autonomous AI agents that qualify incoming leads, summarize sales call transcripts, predict deal velocity, and automate repetitive data entry."
  },
  {
    icon: RefreshCcw,
    title: "Bidirectional ERP & Financial Sync",
    desc: "Smooth CRM integration with Infor CRM, Odoo ERP, SAP, Salesforce, and Agicap treasury. Keep customer ledgers and orders synchronized in real time."
  },
  {
    icon: Workflow,
    title: "Bespoke Sales & Pipeline Automation",
    desc: "Tailor-made pipeline stages and automated progression rules built around your actual operational workflow rather than vendor-imposed constraints."
  },
  {
    icon: Lock,
    title: "Enterprise Multi-Tenant Security",
    desc: "PostgreSQL row-level security, tenant data partitioning, field-level encryption, and role-based access control (RBAC) designed to support your compliance requirements."
  },
  {
    icon: BarChart,
    title: "Predictive Analytics & Executive Dashboards",
    desc: "Consolidated executive reporting across sales pipelines, customer lifetime value (LTV), rep conversion rates, and revenue forecasting."
  },
  {
    icon: DollarSign,
    title: "Zero Per-Seat License Tax",
    desc: "Your organization owns 100% of the intellectual property and source code. Add unlimited team members without paying monthly per-user fees."
  }
];
