/** Service practice pages (/services/:id). Single source for the page, sitemap and nav checks. */
import { SERVICE_TITLES } from './serviceTitles';
import { Code, Cloud, Cpu, BarChart, ShieldCheck, CheckCircle2, Zap, Layers3, Bot, Workflow, LockKeyhole, ServerCog, DatabaseZap, GitBranch, Sparkles, Shield, RefreshCcw, AlertTriangle, Fingerprint, Search, Radio, Target, Headphones, PenTool, Gauge, Users, MessageSquare, Clock } from 'lucide-react';

export const serviceData = {
  ai: {
    title: SERVICE_TITLES.ai,
    h1: "Autonomous AI Agent Development & Workflow Automation Services",
    seoTitle: "Enterprise AI Agent Development & Automation Services",
    seoDescription: "Build and deploy production-grade autonomous AI agents, multi-agent workflows, and RAG systems connected to your enterprise APIs, databases, and CRMs.",
    shortTitle: "AI Agents",
    description: "We architect and deploy autonomous AI agents, multi-agent frameworks, and deterministic agentic workflows connected to enterprise systems and knowledge bases.",
    icon: Cpu,
    image: "/images/stock/1677442136019-21780ecad995-960.webp",
    color: "text-brand-primary-ink",
    bg: "bg-brand-accent/10",
    overview: "We design and deploy production-grade AI agents and multi-agent systems engineered for enterprise reliability. Moving beyond conversational chatbots, our autonomous agents reason across complex business workflows, interact deterministically with proprietary APIs and databases, ground their context in secure enterprise knowledge repositories (RAG), and escalate to human operators with complete context when judgment boundaries are reached. For organizations seeking turnkey voice and messaging reception, our [NexusAgent](/products/nexus-agent) and [AetherVoice](/products/ai-voice-booking) products deliver sub-second voice conversations directly integrated into your existing CRMs and calendars. Every deployment operates strictly within your organizational security boundaries, access controls, and compliance frameworks.",
    approach: "We begin with a structured workflow audit to determine where autonomous decision-making and agentic execution drive measurable efficiency. We then design the multi-agent orchestration architecture—defining tool execution interfaces, semantic retrieval strategies, deterministic validation schemas, and human-in-the-loop escalation criteria. We build iteratively, execute rigorous synthetic boundary testing, and implement granular observability covering inference latency, token economics, and response accuracy.",
    process: [
      { title: "Workflow & Opportunity Audit", desc: "Map enterprise processes, identify execution bottlenecks, and evaluate ROI for autonomous agent orchestration.", icon: Search },
      { title: "Agent System Architecture", desc: "Define tool specifications, state machines, semantic search schemas, and human-in-the-loop handoff rules.", icon: Cpu },
      { title: "Integration & Orchestration", desc: "Develop autonomous agents and connect them directly to your internal APIs, databases, CRMs, and ERP systems.", icon: Code },
      { title: "Verification & Guardrailing", desc: "Execute adversarial edge-case testing, hallucination benchmarks, and deterministic JSON schema validation.", icon: Shield },
      { title: "Telemetry & Gradual Rollout", desc: "Deploy in canary stages with end-to-end tracing, latency monitoring, cost-per-execution tracking, and audit logging.", icon: Radio },
      { title: "Continuous Optimization", desc: "Refine prompts, fine-tune retrieval weights, and expand agent capabilities based on production telemetry.", icon: Sparkles }
    ],
    technologies: [
      { name: "LangChain / LangGraph", desc: "Agent orchestration and stateful multi-agent coordination frameworks for enterprise automation workflows." },
      { name: "OpenAI / Anthropic / Gemini", desc: "Frontier LLM foundation models utilized for reasoning, complex planning, structured output, and tool invocation." },
      { name: "LlamaIndex", desc: "Advanced data framework for indexing and connecting LLMs to heterogeneous proprietary enterprise data sources." },
      { name: "Hugging Face & Fine-Tuning", desc: "Open-source model adaptation, parameter-efficient fine-tuning (LoRA), and specialized local inference deployment." },
      { name: "Duplex Voice AI (Deepgram, ElevenLabs)", desc: "Sub-second speech-to-text, low-latency streaming text-to-speech, and bidirectional telephony agents." },
      { name: "Vector Databases (Pinecone, Qdrant)", desc: "High-scale vector indexing and hybrid semantic retrieval supporting low-latency enterprise RAG pipelines." }
    ],
    features: [
      "Autonomous AI Agents executing deterministic multi-step workflows",
      "Multi-Agent Orchestration with specialized delegation and state management",
      "Enterprise RAG with strict role-based document access controls",
      "Duplex Voice AI Agents engineered for sub-second conversational latency",
      "Human-in-the-Loop escalation protocols with full audit trails",
      "Automated prompt-injection and hallucination mitigation guardrails",
      "Comprehensive telemetry tracking token usage, latency, and task completion"
    ],
    benefits: [
      { title: "Continuous Operations", desc: "Autonomous agents execute asynchronous and real-time operations 24/7 without operational fatigue." },
      { title: "Significant Overhead Reduction", desc: "Automating routine multi-system tasks can substantially reduce operational overhead." },
      { title: "Elastic Organizational Scale", desc: "Handle surging customer or data volumes dynamically without linear headcount expansion." },
      { title: "Consistent Execution Quality", desc: "Deterministic schema validation ensures uniform compliance with operational business rules." },
      { title: "Accelerated Decision Cycles", desc: "Ingest, analyze, and synthesize heterogeneous operational signals in near real-time." },
      { title: "Native Stack Compatibility", desc: "Integrates directly with Salesforce, Slack, Postgres, custom REST APIs, and core ERP systems." }
    ],
    outcomes: [
      { title: "Autonomous Process Execution", desc: "Automate complex multi-step processes across operational teams with tested, monitored reliability.", icon: Workflow },
      { title: "Production-Ready Reliability", desc: "Production-ready agent deployments backed by deterministic guardrails and human oversight.", icon: Bot },
      { title: "Unified System Interoperability", desc: "Connect disjointed SaaS applications and legacy databases into a cohesive automated workflow.", icon: Layers3 }
    ],
    caseStudies: [
      { metric: "95%", label: "Routine Workflows Executed Autonomously", icon: MessageSquare },
      { metric: "4 hrs → 12 min", label: "Transaction Processing Cycle Time", icon: Clock },
      { metric: "$1.2M", label: "Annualized Operational Cost Savings", icon: BarChart }
    ],
    caseStudyDesc: "A multi-modal logistics enterprise previously required 12 operations specialists spending over 4 hours per order manually reconciling shipment manifests across three disconnected systems. We engineered a multi-agent orchestration architecture that autonomously ingests manifests, performs inventory validation, and triggers status updates. The human team now focuses solely on high-value partner relationships and exceptions.",
    whyUs: [
      "Production track record deploying enterprise autonomous agents and voice pipelines",
      "Deep expertise across LangGraph, AutoGen, and custom deterministic agent runtimes",
      "Security-first engineering: RBAC, tenant isolation, and comprehensive audit logs",
      "Continuous partnership from architecture design through post-launch performance tuning"
    ],
    architectureTracks: [
      {
        title: "Deterministic Multi-Agent Workflows",
        desc: "We construct stateful multi-agent systems using LangGraph and state machines where each agent has specialized tool boundaries, deterministic schema validation, and human-in-the-loop escalation paths."
      },
      {
        title: "Enterprise RAG & Hybrid Semantic Retrieval",
        desc: "Our retrieval pipelines combine dense vector embeddings (Pinecone, Qdrant) with sparse keyword matching (BM25) and reranking models, strictly respecting document-level access permissions."
      },
      {
        title: "Model Evaluation, Telemetry & Guardrails",
        desc: "Continuous evaluation pipelines benchmark inference accuracy, detect prompt injections, monitor token consumption, and measure hallucination rates across production workloads."
      },
      {
        title: "Sub-Second Duplex Voice AI Systems",
        desc: "Duplex voice conversational agents utilizing streaming speech-to-text (Whisper), low-latency LLM generation, and telephony SIP/WebRTC bridging for customer service automation."
      }
    ],
    relatedLinks: [
      {
        title: "NexusAgent™ Contact OS",
        path: "/products/nexus-agent",
        desc: "Sub-second natural-turn duplex AI receptionist for 24/7 call answering and CRM ticketing.",
        type: "Product"
      },
      {
        title: "AetherVoice™ Smart Booking",
        path: "/products/ai-voice-booking",
        desc: "AI phone booking with sub-50ms slot reservation and Google Calendar and CalDAV synchronization.",
        type: "Product"
      },
      {
        title: "ConciergeWeb™ Cognitive Assistant",
        path: "/products/ai-agent-web",
        desc: "Website assistant that answers visitors in real-time voice and text from your approved knowledge base.",
        type: "Product"
      },
      {
        title: "E-Commerce AI Agent Scaling",
        path: "/case-studies/ai-agent-ecommerce-scaling",
        desc: "Case study: 45% conversion uplift and 60% reduction in support ticket overhead.",
        type: "Case Study"
      }
    ],
    faqs: [
      {
        q: "How do autonomous AI agents differ from standard conversational chatbots?",
        a: "Standard chatbots generate conversational text in response to queries, often without tool execution capability. In contrast, autonomous AI agents operate with stateful reasoning loops (e.g., ReAct, LangGraph), plan multi-step actions, interact with external APIs and databases via structured JSON tool calling, validate outputs against deterministic business rules, and execute operational workflows asynchronously."
      },
      {
        q: "How does AIScripto prevent hallucinations and enforce deterministic execution?",
        a: "We implement defense-in-depth engineering: strict Pydantic/JSON schema validation for tool outputs, retrieval-augmented generation (RAG) that restricts the model's context to verified organizational knowledge, deterministic rule-based checks before database writes, and human-in-the-loop escalation when confidence scores fall below defined operational thresholds."
      },
      {
        q: "How do your enterprise RAG pipelines handle document permissions and data security?",
        a: "Our RAG architectures enforce role-based access control (RBAC) at query time. Document embeddings in vector databases are indexed with metadata tags corresponding to organizational access levels. When an agent queries the vector store on behalf of a user, it filters embeddings so that unauthorized data is never retrieved into the LLM context window."
      },
      {
        q: "Can AI agents integrate with legacy internal APIs and on-premise systems?",
        a: "Yes. We engineer secure API facade connectors and lightweight webhook bridges that allow autonomous agents to authenticate and exchange structured JSON payloads with on-premise SQL databases, legacy ERPs, internal ticketing platforms, and third-party SaaS applications without requiring a complete rewrite of your existing infrastructure."
      }
    ]
  },
  devops: {
    title: SERVICE_TITLES.devops,
    h1: "DevOps Consulting & Site Reliability Engineering (SRE) Services",
    seoTitle: "DevOps Consulting & SRE Engineering Services",
    seoDescription: "Accelerate release velocity and eliminate downtime with automated CI/CD pipelines, Kubernetes orchestration, Infrastructure as Code, and 24/7 SRE observability.",
    shortTitle: "DevOps & SRE",
    description: "We partner with engineering organizations to build resilient cloud platforms, automated CI/CD pipelines, container orchestration, and comprehensive observability architectures.",
    icon: Zap,
    image: "/images/stock/1558494949-ef010cbdcc31-960.webp",
    color: "text-primary",
    bg: "bg-primary/10",
    overview: "Modern engineering velocity requires reliable, automated infrastructure and predictable release cycles. We transform deployment workflows by establishing automated CI/CD pipelines with integrated security gates, infrastructure defined as declarative code, containerized application runtimes on Kubernetes, and telemetry systems that surface actionable performance metrics. Our approach reduces deployment risk, accelerates release frequency, and minimizes mean time to recovery (MTTR).",
    approach: "We execute an incremental modernization roadmap aligned to your system architecture and team topology. Beginning with an infrastructure and delivery pipeline audit, we establish version-controlled Infrastructure as Code (IaC), GitOps-driven deployment workflows, automated security scanning, and distributed telemetry. Working directly alongside your engineering leads, we build repeatable operational practices that scale without introducing operational friction.",
    process: [
      { title: "Infrastructure & Delivery Audit", desc: "Evaluate existing CI/CD pipelines, environment drift, operational bottlenecks, and observability gaps.", icon: Search },
      { title: "Automated Pipeline Engineering", desc: "Construct multi-stage CI/CD pipelines with automated unit testing, security scanning, and quality gates.", icon: GitBranch },
      { title: "Declarative Infrastructure as Code", desc: "Define reproducible, version-controlled cloud environments using Terraform, OpenTofu, or Pulumi.", icon: ServerCog },
      { title: "Containerization & Orchestration", desc: "Deploy production-hardened Kubernetes clusters with automated pod scaling, ingress control, and RBAC.", icon: Layers3 },
      { title: "SRE Observability Architecture", desc: "Implement distributed tracing, structured logging, SLI/SLO dashboards, and intelligent alerting.", icon: Gauge },
      { title: "Continuous Reliability & Chaos Testing", desc: "Conduct post-incident reviews, automated failover verification, and ongoing resilience testing.", icon: RefreshCcw }
    ],
    technologies: [
      { name: "GitHub Actions / GitLab CI", desc: "Enterprise CI/CD automation with parallel job execution, matrix builds, and secure secret management." },
      { name: "Docker / Kubernetes / Helm", desc: "Standardized container packaging and production-grade orchestration across hybrid and multi-cloud environments." },
      { name: "Terraform / Pulumi", desc: "Declarative Infrastructure as Code tools for automated multi-cloud provisioning with strict state locking." },
      { name: "Prometheus / Grafana", desc: "Cloud-native metrics scraping, dimensional time-series data storage, and customizable executive dashboards." },
      { name: "Datadog / OpenTelemetry", desc: "Unified full-stack observability featuring distributed APM tracing, log correlation, and real-time alerts." },
      { name: "ArgoCD / Flux", desc: "GitOps deployment engines providing automated synchronization, drift detection, and immediate rollbacks." }
    ],
    features: [
      "Zero-downtime CI/CD pipelines with automated canary and blue/green deployments",
      "Modular Infrastructure as Code (IaC) supporting multi-environment replication",
      "Production Kubernetes cluster provisioning, security hardening, and day-2 operations",
      "Comprehensive APM, distributed tracing, and centralized log aggregation",
      "Site Reliability Engineering (SRE) frameworks: SLIs, SLOs, and error budget governance",
      "DevSecOps integration: automated SAST, DAST, and container image vulnerability scans",
      "Automated disaster recovery protocols and cross-region failover automation"
    ],
    benefits: [
      { title: "Accelerated Release Cadence", desc: "Transition from sporadic, high-risk deployments to automated, low-risk releases multiple times per day." },
      { title: "Drastic Reduction in MTTR", desc: "Automated telemetry and root-cause correlation identify and resolve production incidents rapidly." },
      { title: "Optimized Cloud Expenditure", desc: "Dynamic autoscaling, workload rightsizing, and resource cleanup reduce cloud infrastructure costs by 30–40%." },
      { title: "Enhanced Developer Productivity", desc: "Self-service developer environments and automated testing eliminate deployment bottlenecks." },
      { title: "Continuous Security Compliance", desc: "Automated vulnerability scanning and compliance checks executed natively in every build." },
      { title: "High-Availability Architecture", desc: "Resilient distributed systems engineered to maintain high availability under traffic surges." }
    ],
    outcomes: [
      { title: "Predictable Release Engineering", desc: "Automated build and deployment pipelines featuring automated rollbacks and clear quality gates.", icon: Workflow },
      { title: "Resilient Cloud Infrastructure", desc: "Containerized, auto-healing workloads orchestrated on enterprise Kubernetes clusters.", icon: ServerCog },
      { title: "Full-Stack System Telemetry", desc: "Unified dashboards providing immediate visibility into system health, latency, and error rates.", icon: BarChart }
    ],
    caseStudies: [
      { metric: "10+ / day", label: "Production Deployment Frequency (from 1/week)", icon: GitBranch },
      { metric: "85%", label: "Reduction in Change Failure Rate", icon: ShieldCheck },
      { metric: "4 hrs → 18 min", label: "Mean Time to Recovery (MTTR)", icon: Clock }
    ],
    caseStudyDesc: "A high-growth fintech provider struggled with high-risk manual releases and frequent downtime during product updates. AIScripto restructured their monolithic delivery into microservice CI/CD pipelines on AWS EKS using GitHub Actions, Terraform, and Datadog. Deployment frequency increased to over 10 times daily with an 85% drop in release failures.",
    whyUs: [
      "Experienced Kubernetes and cloud solutions architects across AWS, Azure, and GCP",
      "Proven delivery on core, high-concurrency production platforms",
      "Data-backed SRE metrics: deployment frequency, lead time, change failure rate, and MTTR",
      "Flexible engagement: turnkey pipeline buildout or embedded SRE squads"
    ],
    architectureTracks: [
      {
        title: "Zero-Downtime Automated CI/CD",
        desc: "Constructing multi-stage deployment pipelines with automated canary releases, blue/green traffic shifting, automated unit testing, and instant rollback triggers."
      },
      {
        title: "Production Kubernetes & Service Meshes",
        desc: "Hardening container orchestration clusters (EKS, GKE, AKS) with dynamic horizontal pod autoscaling, ingress control, mutual TLS, and role-based access security."
      },
      {
        title: "Full-Stack Observability & Distributed Tracing",
        desc: "Implementing OpenTelemetry, Prometheus, Datadog, and Grafana for end-to-end distributed transaction tracing, SLI/SLO dashboards, and intelligent anomaly alerting."
      },
      {
        title: "GitOps Infrastructure as Code (IaC)",
        desc: "Eliminating configuration drift by managing cloud environments declaratively with Terraform, OpenTofu, and ArgoCD directly from audited Git repositories."
      }
    ],
    relatedLinks: [
      {
        title: "Cloud Solutions & Migration",
        path: "/services/cloud",
        desc: "Architect and migrate infrastructure to secure, scalable AWS, Azure, and GCP platforms.",
        type: "Service"
      },
      {
        title: "Cybersecurity & Compliance",
        path: "/services/security",
        desc: "Integrate automated DevSecOps vulnerability scanning into your CI/CD delivery pipelines.",
        type: "Service"
      },
      {
        title: "Custom Software Engineering",
        path: "/services/software",
        desc: "Engineer resilient, high-throughput microservices ready for containerized Kubernetes deployment.",
        type: "Service"
      },
      {
        title: "Fintech Fraud Platform Modernization",
        path: "/case-studies/fintech-fraud-risk-platform",
        desc: "Case study: 100% automated compliance reporting and 52% faster incident response.",
        type: "Case Study"
      }
    ],
    faqs: [
      {
        q: "How does AIScripto help engineering teams eliminate deployment failures and rollbacks?",
        a: "We engineer automated CI/CD pipelines that incorporate automated smoke tests, container vulnerability scans, and progressive canary deployments. Rather than releasing to 100% of traffic simultaneously, updates roll out to 5% of traffic while synthetic monitors track error rates and latency. If anomalies are detected, the pipeline automatically aborts and rolls back with zero user disruption."
      },
      {
        q: "What is your approach to Site Reliability Engineering (SRE) and SLAs?",
        a: "We define precise Service Level Indicators (SLIs) and Service Level Objectives (SLOs) around user-facing transactions. We establish error budgets that balance engineering release velocity with platform stability, configure distributed telemetry with OpenTelemetry and Datadog, and establish automated incident escalation runbooks so availability targets are agreed, measured and defended."
      },
      {
        q: "Can you help migrate our workloads to Kubernetes without downtime?",
        a: "Yes. We create production-hardened EKS, AKS, or GKE clusters with GitOps automation (ArgoCD/Flux). We containerize applications with optimized multi-stage Docker builds, establish service mesh traffic routing, and shift live production traffic incrementally using weighted DNS and ingress controllers."
      },
      {
        q: "How does GitOps prevent environment configuration drift?",
        a: "Under GitOps, your Git repository acts as the single source of truth for your entire infrastructure and application state. Continuous reconciliation agents (such as ArgoCD) compare actual cluster state against the Git definitions. Any manual changes or drift in production are automatically flagged or overridden, ensuring strict auditable compliance."
      }
    ]
  },
  erp: {
    title: SERVICE_TITLES.erp,
    h1: "Enterprise ERP & CRM Integration Services",
    seoTitle: "ERP & CRM Integration Services: Infor, Odoo & Agicap",
    seoDescription: "Smoothly integrate Infor CRM, Odoo ERP, Salesforce, and Agicap accounting. Experienced OpenERP integrators eliminating manual data silos.",
    shortTitle: "ERP & CRM",
    description: "We unify core business operations across finance, sales, inventory, and support through robust ERP and CRM implementation, data migration, and bidirectional API synchronization.",
    icon: BarChart,
    image: "/images/stock/1460925895917-afdab827c52f-960.webp",
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
    overview: "Disconnected enterprise systems create inventory inaccuracies, delayed financial reconciliation, and fragmented customer visibility. As experienced OpenERP and CRM integration specialists, we connect Odoo, Salesforce, Infor CRM, SAP, and custom accounting tools into an automated single source of truth. Using our [custom software development practices](/services/software) and [autonomous AI agent workflows](/services/ai), our integration architectures automate data flows between disparate systems, eliminating manual reconciliation and keeping inventory, order-to-cash, and general ledgers synchronized in real time.",
    approach: "We start by analyzing cross-departmental data flows, transaction volumes, and operational dependencies. We design an integration architecture that preserves data integrity, ensures transactional consistency, and minimizes operational disruption during migration. Every data migration undergoes automated validation and deduplication with comprehensive audit logs, followed by role-based user training and post-go-live hypercare.",
    process: [
      { title: "Operational Workflow Mapping", desc: "Document departmental processes, master data models, and legacy integration dependencies.", icon: Search },
      { title: "Target Architecture Design", desc: "Architect ERP/CRM modules, data schemas, and API bridges tailored to your business model.", icon: Layers3 },
      { title: "System Configuration & Customization", desc: "Configure core modules and develop custom business logic while preserving standard upgradability.", icon: Code },
      { title: "Audited Data Migration", desc: "Execute schema validation, deduplication, and transformation with reconciliation checks and full auditability.", icon: DatabaseZap },
      { title: "Bidirectional Integration Bridges", desc: "Implement secure event-driven API synchronization between ERP, CRM, payment, and logistics platforms.", icon: Workflow },
      { title: "User Enablement & Hypercare", desc: "Deliver tailored training programs, establish governance protocols, and provide post-launch support.", icon: Headphones }
    ],
    technologies: [
      { name: "Odoo & OpenERP Integration", desc: "Full-suite modular ERP implementation, migration, and custom module engineering across accounting, inventory, and CRM." },
      { name: "Salesforce (Sales & Service Cloud)", desc: "Enterprise CRM customization, Apex automation, Lightning components, and external system integrations." },
      { name: "SAP Business One & Dynamics 365", desc: "Mid-market enterprise ERP configuration for financials, purchasing, inventory, and supply chain control." },
      { name: "Infor CRM & Treasury Connectors", desc: "Two-way CRM, ERP, and treasury accounting synchronization including Agicap, QuickBooks, and NetSuite." },
      { name: "MuleSoft / Apache Camel", desc: "Enterprise integration platforms for high-volume message routing, protocol translation, and API mediation." },
      { name: "Event-Driven Webhooks & REST APIs", desc: "Custom software development for integrating CRM, ERP, and accounting tools into a unified real-time pipeline." }
    ],
    features: [
      "OpenERP & Odoo full-suite implementation, version upgrade, and custom module engineering",
      "Salesforce Sales Cloud, Service Cloud, and Infor CRM bidirectional integrations",
      "Two-way CRM, ERP, and treasury accounting synchronization (including Agicap and QuickBooks)",
      "Automated multi-currency reconciliation pipelines eliminating manual spreadsheet entries",
      "Automated data migration with pre-migration validation and post-load reconciliation",
      "Real-time e-commerce, POS, and payment gateway synchronization",
      "Consolidated financial and operational executive dashboards"
    ],
    benefits: [
      { title: "Unified Single Source of Truth", desc: "Eliminate conflicting departmental spreadsheets with consolidated real-time operational data." },
      { title: "Elimination of Manual Re-Entry", desc: "Automate cross-platform data synchronization, saving hundreds of administrative hours monthly." },
      { title: "Complete Executive Visibility", desc: "Real-time consolidated reporting across sales pipelines, inventory levels, and financial statements." },
      { title: "Scalable Architecture", desc: "Modular architecture designed to support new regional entities, warehouses, and business lines." },
      { title: "Regulatory & Financial Compliance", desc: "Built-in audit trails and financial controls aligned to GAAP, IFRS, and local statutory requirements." },
      { title: "Superior Customer Experience", desc: "Unified customer records across sales, service, and fulfillment prevent communication silos." }
    ],
    outcomes: [
      { title: "Cohesive Enterprise Core", desc: "A connected enterprise backbone synchronizing sales, procurement, inventory, and accounting.", icon: Layers3 },
      { title: "Audited Data Integrity", desc: "Clean migration of core historical records with zero business downtime.", icon: DatabaseZap },
      { title: "Actionable Operational Intelligence", desc: "Executive dashboards providing immediate visibility into operational KPIs and margin health.", icon: BarChart }
    ],
    caseStudies: [
      { metric: "99.5%", label: "Inventory Data Accuracy Across Locations", icon: ShieldCheck },
      { metric: "40%", label: "Faster Order Fulfillment Cycle", icon: Clock },
      { metric: "25 hrs / wk", label: "Finance Team Hours Saved on Reconciliation", icon: Users }
    ],
    caseStudyDesc: "A multi-facility manufacturing business faced severe delays due to fragmented tracking across legacy spreadsheets and disconnected software. AIScripto deployed a unified Odoo Enterprise environment with automated two-way Salesforce CRM sync and integrated barcode tracking. Inventory discrepancy dropped below 0.5%, and weekly finance reconciliation overhead was cut by 25 hours.",
    whyUs: [
      "Extensive implementation background across Odoo Enterprise and Salesforce architectures",
      "Validated data migration methodology with record-level reconciliation to protect data integrity",
      "Pragmatic business analysis: we adapt software to business reality, avoiding over-customization",
      "Full lifecycle commitment: from initial business mapping to ongoing SLA-backed support"
    ],
    architectureTracks: [
      {
        title: "Odoo & OpenERP Enterprise Engineering",
        desc: "Full-lifecycle implementation, version migration, and custom Python module engineering for Odoo and legacy OpenERP environments covering inventory, manufacturing, sales, and accounting."
      },
      {
        title: "Infor CRM & Salesforce Data Synchronization",
        desc: "Bidirectional API integration connecting Infor CRM, Salesforce Sales/Service Cloud, and core ERP databases to ensure real-time contact, opportunity, and order-to-cash consistency."
      },
      {
        title: "Treasury & Cash Management (Agicap & Accounting)",
        desc: "Direct synchronization between ERP ledgers and automated cash-flow management platforms like Agicap, QuickBooks, and NetSuite, providing real-time cash position visibility and multi-entity reconciliation."
      },
      {
        title: "Transactional Event Bridges & Webhooks",
        desc: "High-throughput asynchronous event pipelines built on modern message queues and webhooks that prevent race conditions and guarantee atomic transactional consistency across distributed systems."
      }
    ],
    relatedLinks: [
      {
        title: "ScriptoERP™ Financial & Ledger Core",
        path: "/products/erp-financials",
        desc: "Double-entry general ledger engine with immutable audit trails and multi-currency reporting.",
        type: "Product"
      },
      {
        title: "Custom Software Engineering",
        path: "/services/software",
        desc: "Bespoke backend APIs, microservices, and custom middleware connecting disparate databases.",
        type: "Service"
      },
      {
        title: "Cloud Solutions & Migration",
        path: "/services/cloud",
        desc: "Migrate on-premise ERP databases to scalable, secure AWS, Azure, or GCP infrastructure.",
        type: "Service"
      },
      {
        title: "B2B CRM Support Automation",
        path: "/case-studies/nexus-agent-b2b-support-automation",
        desc: "Case study: 78% autonomous CRM ticket resolution with bi-directional synchronization.",
        type: "Case Study"
      }
    ],
    faqs: [
      {
        q: "What ERP and CRM platforms does AIScripto support for enterprise integration?",
        a: "We engineer custom integrations and data pipelines for Odoo (and legacy OpenERP), Infor CRM, Salesforce Sales & Service Cloud, SAP Business One, Microsoft Dynamics 365, as well as accounting and cash-flow platforms including Agicap, QuickBooks, and NetSuite."
      },
      {
        q: "How does AIScripto synchronize treasury platforms like Agicap with our core ERP?",
        a: "We build secure bidirectional API connectors that automatically sync bank transaction feeds, accounts receivable/payable, and invoice settlement statuses between Agicap and your ERP general ledger. This eliminates manual CSV uploads and provides real-time cash position monitoring across multiple bank accounts and business entities."
      },
      {
        q: "How do you protect financial data integrity and avoid duplicate ledger entries?",
        a: "Our integration architectures utilize idempotent API endpoints, atomic database transactions, unique transaction hash deduplication, and staging validation tables. Financial entries are verified against double-entry balancing rules before committing to the primary general ledger, accompanied by comprehensive immutable audit logs."
      },
      {
        q: "Can you modernize a legacy OpenERP or custom on-premise ERP system without disrupting daily operations?",
        a: "Yes. We employ a phased strangler integration approach: we build a modern REST or GraphQL API facade over your legacy database, allowing new cloud services and CRMs to interact with your data in real time while your existing operational teams continue using their familiar interfaces until module-by-module cutovers are complete."
      }
    ]
  },
  software: {
    title: SERVICE_TITLES.software,
    h1: "Custom Software Development & Enterprise Application Engineering",
    seoTitle: "Custom Software Development Company USA | Web & SaaS",
    seoDescription: "Bespoke software development for US businesses. We engineer scalable web applications, enterprise SaaS platforms, and secure multi-system API integrations.",
    shortTitle: "Software Engineering",
    description: "We engineer secure, scalable, and maintainable web applications, SaaS platforms, and distributed backend systems tailored to your business operations.",
    icon: Code,
    image: "/images/stock/1517694712202-14dd9538aa97-960.webp",
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
    overview: "We build enterprise software designed to solve complex business challenges. From multi-tenant SaaS products and high-throughput transaction backends to core internal platforms and real-time distributed applications, our engineering teams emphasize domain-driven design, clean architecture, high test coverage, and long-term maintainability. Our squads regularly integrate bespoke applications with [enterprise AI agent workflows](/services/ai) and [ERP & CRM platforms](/services/erp), engineering software that performs reliably under production load and adapts as your business evolves.",
    approach: "We apply an agile, milestone-driven delivery model. Starting with detailed requirements analysis and architectural modeling, we deliver working software in focused two-week sprints. Every release undergoes peer code review, automated unit and integration testing, and vulnerability scanning. We maintain transparent reporting through daily standups, sprint reviews, and shared delivery metrics, ensuring complete alignment from discovery to production handover.",
    process: [
      { title: "Product Discovery & Scope Alignment", desc: "Analyze business goals, define technical acceptance criteria, and map out architectural requirements.", icon: Search },
      { title: "UX/UI Architecture & Prototyping", desc: "Design intuitive user journeys, wireframes, and interactive design systems before implementation.", icon: PenTool },
      { title: "System & Domain Architecture", desc: "Select optimal tech stacks, design scalable database schemas, and define API contract interfaces.", icon: Layers3 },
      { title: "Iterative Sprint Development", desc: "Execute focused two-week agile sprints with daily standups, automated testing, and working software demos.", icon: Code },
      { title: "Quality Assurance & Security Audits", desc: "Execute comprehensive unit, integration, end-to-end performance, and vulnerability test suites.", icon: ShieldCheck },
      { title: "Production Deployment & Handover", desc: "Deploy via automated CI/CD pipelines with comprehensive documentation and engineering knowledge transfer.", icon: Cloud }
    ],
    technologies: [
      { name: "React / Next.js / TypeScript", desc: "Modern, type-safe frontend architectures providing server-side rendering, speed, and responsive UI." },
      { name: "Node.js / Python / Go / .NET", desc: "High-throughput backend runtimes utilized for distributed microservices, APIs, and background processing." },
      { name: "PostgreSQL / MongoDB / Redis", desc: "Relational, document, and in-memory caching data tiers optimized for high-read/high-write concurrency." },
      { name: "AWS / Azure / GCP", desc: "Cloud-native compute, storage, serverless functions, and managed database infrastructure." },
      { name: "Docker & Kubernetes", desc: "Standardized containerization ensuring parity between development, staging, and production environments." },
      { name: "GraphQL & RESTful APIs", desc: "Strictly typed, versioned API architectures supporting high-throughput external and internal consumption." }
    ],
    features: [
      "Custom multi-tenant SaaS application architecture and development",
      "Enterprise web application engineering and internal operational portals",
      "Legacy system modernization: refactoring monoliths into resilient microservices",
      "High-throughput RESTful and GraphQL API design and documentation",
      "Real-time streaming and event-driven architectures utilizing WebSockets",
      "Strict type safety and automated unit, integration, and E2E test coverage",
      "Secure authentication, RBAC, OAuth2, and multi-factor authorization flows"
    ],
    benefits: [
      { title: "Tailored to Your Operating Model", desc: "Every capability is engineered to support your exact business workflows without template bloat." },
      { title: "Built for Elastic Scale", desc: "Architected from day one with caching, database indexing, and horizontal scaling patterns." },
      { title: "High Code Maintainability", desc: "Modular architecture, clean documentation, and high test coverage allow smooth internal ownership." },
      { title: "Rapid Time-to-Market", desc: "Agile delivery sprints produce working, demonstrable software increments every two weeks." },
      { title: "Secure by Design", desc: "OWASP-aligned engineering practices, data encryption at rest and in transit, and secure auth." },
      { title: "Zero Vendor Lock-In", desc: "Clean codebases, modern open standards, and comprehensive architectural documentation." }
    ],
    outcomes: [
      { title: "Scalable Digital Products", desc: "Modern, high-performance web applications built to delight enterprise users and customers.", icon: Code },
      { title: "Robust API Ecosystem", desc: "Well-documented, secure APIs enabling smooth integration across internal and external systems.", icon: Layers3 },
      { title: "Legacy System De-Risking", desc: "Staged modernization that eliminates technical debt without disrupting day-to-day operations.", icon: ServerCog }
    ],
    caseStudies: [
      { metric: "10x", label: "Query & API Performance Acceleration", icon: Gauge },
      { metric: "35%", label: "Increase in User Engagement & Adoption", icon: Users },
      { metric: "2x", label: "Engineering Sprint Delivery Velocity", icon: GitBranch }
    ],
    caseStudyDesc: "A healthcare technology organization required modernizing their patient engagement platform from an unmaintainable legacy monolith. AIScripto re-architected the solution into a modular React and Node.js microservice architecture with FHIR-compliant API endpoints and real-time scheduling. The migration was completed with zero downtime, cutting API response times by 10x.",
    whyUs: [
      "Senior full-stack engineers with extensive experience building high-concurrency systems",
      "Outcome-focused delivery: we prioritize business value and user adoption over lines of code",
      "Proven delivery across complex, regulated domains (fintech, healthcare, logistics)",
      "Transparent engineering: shared git repositories, daily standups, and bi-weekly sprint demos"
    ],
    architectureTracks: [
      {
        title: "Enterprise Multi-Tenant SaaS Platforms",
        desc: "Engineering scalable multi-tenant SaaS architectures with strict tenant data isolation (row-level security or isolated schemas), role-based access control, subscription billing, and usage telemetry."
      },
      {
        title: "Legacy Monolith Modernization (Strangler Fig)",
        desc: "De-risking legacy application upgrades by deploying modern API gateways and incrementally extracting business domains into resilient microservices without requiring high-risk total rewrites."
      },
      {
        title: "High-Throughput Distributed Backends",
        desc: "Constructing high-concurrency microservices with Node.js, Go, Python, and PostgreSQL, optimized with Redis caching layers, connection pooling, and asynchronous job workers."
      },
      {
        title: "Strictly Typed Contract-Driven APIs",
        desc: "Developing versioned RESTful and GraphQL APIs with OpenAPI/Swagger contracts, automated schema validation, and mock servers for rapid frontend and third-party partner integration."
      }
    ],
    relatedLinks: [
      {
        title: "Cloud Solutions & Migration",
        path: "/services/cloud",
        desc: "Deploy custom software on auto-scaling, resilient AWS, Microsoft Azure, or GCP infrastructure.",
        type: "Service"
      },
      {
        title: "DevOps & Site Reliability (SRE)",
        path: "/services/devops",
        desc: "Automate delivery with zero-downtime CI/CD pipelines, containerization, and 24/7 monitoring.",
        type: "Service"
      },
      {
        title: "AI Agents & Automation",
        path: "/services/ai",
        desc: "Integrate autonomous AI workflows and intelligent search directly into your bespoke web applications.",
        type: "Service"
      },
      {
        title: "Public Sector Registration Automation",
        path: "/case-studies/online-registration-automation",
        desc: "Case study: 64% reduction in processing time through custom digital intake workflows.",
        type: "Case Study"
      }
    ],
    faqs: [
      {
        q: "How does AIScripto approach legacy software modernization without business interruption?",
        a: "We use the proven Strangler Fig pattern. Instead of a risky 'big bang' rewrite, we establish an API facade in front of the existing system. We then incrementally extract domain capabilities—such as user authentication, billing, or inventory—into modern microservices. The legacy system remains fully operational throughout the transition until all modules are modernized."
      },
      {
        q: "What technology stacks does AIScripto specialize in for custom enterprise software?",
        a: "Our core stacks include TypeScript, React 19, and Next.js for high-performance web frontends; Node.js, Python (FastAPI), Go, and .NET for scalable backend services; PostgreSQL, MongoDB, and Redis for persistence; and Docker, Kubernetes, and Terraform for containerized cloud deployment."
      },
      {
        q: "How are software quality, security, and maintainability enforced during sprints?",
        a: "Every pull request requires peer architectural review, passes automated unit and integration tests (aiming for >80% coverage on core business logic), and undergoes automated SAST vulnerability and dependency scanning before merging. We adhere strictly to domain-driven design and clean architecture principles."
      }
    ]
  },
  cloud: {
    title: SERVICE_TITLES.cloud,
    h1: "Cloud Migration, Multi-Cloud Architecture & FinOps Optimization",
    seoTitle: "Cloud Migration & Multi-Cloud Architecture Services",
    seoDescription: "Migrate legacy workloads and optimize multi-cloud spend across AWS, Azure, and GCP. FinOps cost reduction, zero-downtime cutover, and 24/7 managed cloud ops.",
    shortTitle: "Cloud Solutions",
    description: "We deliver cloud strategy, workload migration, cloud-native architecture, and ongoing platform governance across AWS, Microsoft Azure, and Google Cloud Platform.",
    icon: Cloud,
    image: "/images/stock/1451187580459-43490279c0fa-960.webp",
    color: "text-primary",
    bg: "bg-primary/10",
    overview: "Enterprise cloud adoption requires balancing engineering velocity with cost governance, resilience, and security. We architect and implement modern cloud infrastructures—guiding organizations through legacy workload migrations, serverless implementations, and containerized microservice deployments. Whether executing a staged multi-cloud migration or optimizing existing cloud expenditures, our experienced architects provide practical, outcome-focused solutions.",
    approach: "Our cloud lifecycle follows an Assess, Architect, Migrate, and Optimize methodology. We analyze application dependencies, compliance mandates, and workload profiles to determine the optimal migration path—rehosting, refactoring, or re-architecting. We build declarative infrastructure blueprints using Terraform or Pulumi, incorporate FinOps practices from the outset to eliminate idle spend, and establish automated disaster recovery and backup protocols.",
    process: [
      { title: "Workload & Readiness Assessment", desc: "Evaluate infrastructure inventory, workload dependencies, compliance obligations, and spend patterns.", icon: Search },
      { title: "Well-Architected Cloud Design", desc: "Design high-availability, secure architectures adhering to AWS, Azure, and GCP Well-Architected Frameworks.", icon: Layers3 },
      { title: "Zero-Downtime Migration Execution", desc: "Execute phased cutovers with continuous data replication, rollback safety nets, and validation gates.", icon: Cloud },
      { title: "Security Baseline & IAM Hardening", desc: "Establish zero-trust network boundaries, KMS encryption, role-based access, and compliance policies.", icon: LockKeyhole },
      { title: "FinOps Spend Optimization", desc: "Implement rightsizing, spot instances, savings plans, auto-shutdown policies, and expenditure anomaly alerts.", icon: BarChart },
      { title: "24/7 SRE Operations & Monitoring", desc: "Provide continuous infrastructure telemetry, automated incident alerting, and regular backup drills.", icon: Headphones }
    ],
    technologies: [
      { name: "Amazon Web Services (AWS)", desc: "Deep architecture expertise across EKS, Lambda, ECS, RDS Aurora, S3, CloudFront, and IAM governance." },
      { name: "Microsoft Azure", desc: "Enterprise cloud implementations utilizing AKS, Azure Functions, Cosmos DB, and Azure Virtual WAN." },
      { name: "Google Cloud Platform (GCP)", desc: "Cloud-native compute, Google Kubernetes Engine (GKE), Cloud Run, and BigQuery analytics data lakes." },
      { name: "Terraform / OpenTofu", desc: "Multi-cloud declarative Infrastructure as Code enabling immutable, auditable cloud environments." },
      { name: "Cloudflare Enterprise", desc: "Global edge CDN, DDoS mitigation, Web Application Firewall (WAF), and edge compute execution." },
      { name: "Datadog / CloudWatch / Prometheus", desc: "Unified cloud observability monitoring infrastructure saturation, cost anomalies, and application health." }
    ],
    features: [
      "Comprehensive cloud migration strategy: rehosting, replatforming, and re-architecting",
      "Multi-cloud and hybrid infrastructure design, deployment, and management",
      "Serverless architecture and event-driven computing implementations",
      "Infrastructure as Code (IaC) with automated compliance scanning",
      "Cloud security posture management (CSPM) and zero-trust IAM frameworks",
      "Continuous FinOps cost optimization and cloud spend governance",
      "Disaster recovery planning, automated snapshotting, and multi-region replication"
    ],
    benefits: [
      { title: "Predictable Infrastructure Costs", desc: "Reduce wasteful over-provisioning through autoscaling and rightsizing, often lowering cloud spend significantly." },
      { title: "Elastic Traffic Resilience", desc: "Auto-scaling infrastructure smoothly absorbs unexpected seasonal and campaign traffic surges." },
      { title: "Production-Ready Security", desc: "Cloud-native encryption, network isolation, and identity governance implemented from day one." },
      { title: "Business Continuity by Design", desc: "Multi-zone and multi-region failover configurations keep operations running during outages." },
      { title: "Increased Engineering Focus", desc: "Managed cloud services relieve your internal teams from maintaining hardware and hypervisors." },
      { title: "Global Low-Latency Delivery", desc: "Deploy computing workloads and CDN edge caches in close geographical proximity to global users." }
    ],
    outcomes: [
      { title: "De-Risked Migration Strategy", desc: "Core applications transitioned to cloud infrastructure with zero unplanned downtime.", icon: Cloud },
      { title: "Sustainable FinOps Savings", desc: "Continuous cloud cost reductions achieved through rightsizing, reserved instances, and waste removal.", icon: BarChart },
      { title: "Hardened Security Foundation", desc: "Centralized IAM, network segmentation, and automated security controls across all environments.", icon: LockKeyhole }
    ],
    caseStudies: [
      { metric: "40%", label: "Cloud Infrastructure Expenditure Reduction", icon: BarChart },
      { metric: "Multi-AZ", label: "High-Availability Architecture", icon: ShieldCheck },
      { metric: "10x", label: "Concurrent Traffic Handling Capacity", icon: Gauge }
    ],
    caseStudyDesc: "A high-volume e-commerce brand operating on aging on-premise colocation infrastructure suffered critical downtime during major shopping events. AIScripto designed and executed a phased migration to AWS utilizing EKS, RDS Aurora Multi-AZ, and CloudFront. The new architecture slashed ongoing hosting costs by 40% and effortlessly handled a 10x traffic surge during holiday flash sales.",
    whyUs: [
      "Experienced multi-cloud solutions architects across AWS, Microsoft Azure, and GCP",
      "Proven zero-downtime database and application migration track record",
      "FinOps discipline built into every architecture decision to prevent cloud bill shock",
      "End-to-end partnership: from migration assessment to ongoing managed SRE support"
    ],
    architectureTracks: [
      {
        title: "Structured 6-R Cloud Migration",
        desc: "Systematic workload migration using AWS/Azure/GCP Well-Architected Frameworks—assessing workloads for Rehosting (lift-and-shift), Replatforming (managed databases), or Refactoring (serverless/microservices)."
      },
      {
        title: "Zero-Downtime Database Cutovers",
        desc: "Designing continuous Change Data Capture (CDC) replication pipelines that keep on-premise and cloud databases perfectly synchronized until an instantaneous, zero-data-loss cutover window is triggered."
      },
      {
        title: "Multi-Cloud & Kubernetes Infrastructure as Code",
        desc: "Provisioning version-controlled, auditable cloud estates using Terraform and OpenTofu across AWS (EKS), Microsoft Azure (AKS), and Google Cloud (GKE) to eliminate single-vendor lock-in."
      },
      {
        title: "Continuous FinOps Cloud Spend Governance",
        desc: "Implementing workload rightsizing, automated non-production shutdown policies, commitment discount planning (Reserved Instances / Savings Plans), and real-time spend anomaly alerting to curb cloud bills."
      }
    ],
    relatedLinks: [
      {
        title: "DevOps Consulting & SRE",
        path: "/services/devops",
        desc: "Continuous integration, Kubernetes management, GitOps deployments, and 24/7 site reliability.",
        type: "Service"
      },
      {
        title: "Cybersecurity & Compliance",
        path: "/services/security",
        desc: "Cloud security posture management (CSPM), identity governance audits, and penetration testing.",
        type: "Service"
      },
      {
        title: "Custom Software Engineering",
        path: "/services/software",
        desc: "Build cloud-native web applications and microservices tailored to your cloud architecture.",
        type: "Service"
      },
      {
        title: "Cloud Migration Pitfalls to Avoid",
        path: "/blog/cloud-migration-pitfalls-to-avoid",
        desc: "Engineering guide: 5 critical architectural mistakes to avoid during cloud workload transitions.",
        type: "Blog Article"
      }
    ],
    faqs: [
      {
        q: "How does AIScripto minimize downtime during cloud and database migrations?",
        a: "We employ dual-write architectures and continuous Change Data Capture (CDC) replication tools. The source and target databases run in parallel synchronization with automated data validation checks. The final cutover involves a brief traffic re-route at the DNS or load balancer layer, eliminating system downtime and protecting business operations."
      },
      {
        q: "How do your FinOps practices reduce cloud infrastructure costs across AWS, Azure, and GCP?",
        a: "We audit your cloud environment to uncover idle resources, over-provisioned compute instances, unattached storage volumes, and inefficient data transfer routes. We implement automated scheduled shutdowns for non-production environments, workload autoscaling, container rightsizing, and optimal commitment purchase plans, which typically reduces monthly cloud spend."
      },
      {
        q: "When should an enterprise choose a multi-cloud architecture versus a single provider?",
        a: "Multi-cloud is best suited for organizations with strict regulatory data residency requirements, specific best-of-breed workload needs (e.g., GCP for BigQuery analytics paired with AWS for application compute), or enterprise resilience mandates that require cross-cloud failover. For most organizations, we design cloud-agnostic Kubernetes and Terraform blueprints that preserve portability without adding undue operational complexity."
      },
      {
        q: "What security and access governance standards are established during cloud migration?",
        a: "We engineer zero-trust network boundaries, enforce multi-factor authentication and role-based IAM policies with least-privilege principles, implement envelope encryption using AWS KMS or Azure Key Vault, configure centralized audit logging (CloudTrail, CloudWatch), and establish automated Cloud Security Posture Management (CSPM)."
      }
    ]
  },
  security: {
    title: SERVICE_TITLES.security,
    h1: "Cybersecurity Consulting & Compliance Engineering Services",
    seoTitle: "Cybersecurity Consulting & SOC 2 Compliance Services",
    seoDescription: "Protect your enterprise with penetration testing, cloud security posture audits, and rapid SOC 2, ISO 27001, and HIPAA compliance readiness frameworks.",
    shortTitle: "Cybersecurity",
    description: "We protect enterprise digital assets through comprehensive security assessments, penetration testing, compliance readiness (SOC 2, ISO 27001, HIPAA), and managed threat monitoring.",
    icon: ShieldCheck,
    image: "/images/stock/1555066931-4365d14bab8c-960.webp",
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
    overview: "Cybersecurity is essential for operational continuity and client trust. We help organizations identify vulnerabilities, prioritize remediation based on actual business risk, and build resilient security programs tailored to their risk profile. Our services span application security, cloud posture management, penetration testing, compliance certification readiness (SOC 2 Type II, ISO 27001, HIPAA, PCI-DSS), and incident response planning.",
    approach: "We assess your organizational risk landscape using established frameworks including NIST CSF, CIS Controls, and OWASP. Rather than generating unprioritized vulnerability lists, we provide actionable risk assessments with business-contextualized remediation roadmaps. We work directly with your engineering teams to remediate identified gaps, automate security controls within deployment pipelines, and prepare comprehensive evidence for third-party audits.",
    process: [
      { title: "Threat Landscape & Risk Assessment", desc: "Identify business-critical digital assets, threat vectors, existing controls, and regulatory obligations.", icon: Search },
      { title: "Vulnerability & Code Auditing", desc: "Perform automated and manual static/dynamic application security testing across codebases and cloud assets.", icon: AlertTriangle },
      { title: "Offensive Penetration Testing", desc: "Simulate real-world adversary attacks against web applications, mobile APIs, and cloud perimeters.", icon: Fingerprint },
      { title: "Compliance Readiness & Control Design", desc: "Engineer the technical controls, policies, and evidence-gathering systems required for SOC 2, ISO, and HIPAA.", icon: ShieldCheck },
      { title: "Threat Detection & Monitoring", desc: "Deploy SIEM, automated endpoint detection (EDR), and real-time security alerting.", icon: Radio },
      { title: "Incident Response & Security Culture", desc: "Draft practical incident response playbooks, conduct simulation drills, and train development teams.", icon: Target }
    ],
    technologies: [
      { name: "AWS Security Hub / GuardDuty", desc: "Automated cloud security posture management, anomaly detection, and continuous compliance checks." },
      { name: "Microsoft Sentinel / Defender", desc: "Cloud-native SIEM and extended detection and response (XDR) with intelligent threat analytics." },
      { name: "Wazuh / Splunk Enterprise", desc: "Open-source and enterprise SIEM platforms for security log aggregation, analysis, and alerting." },
      { name: "CrowdStrike / SentinelOne", desc: "Industry-standard endpoint detection and response (EDR) utilizing machine learning for threat mitigation." },
      { name: "Burp Suite Professional", desc: "Comprehensive web application security scanner and manual penetration testing toolkit." },
      { name: "Trivy / Snyk / SonarQube", desc: "Integrated DevSecOps scanning tools for container images, open-source dependencies, and code vulnerabilities." }
    ],
    features: [
      "Full-scope penetration testing: web applications, mobile apps, APIs, and cloud perimeters",
      "Continuous vulnerability management and prioritized remediation tracking",
      "Audit readiness engineering: SOC 2 Type II, ISO 27001, HIPAA, and PCI-DSS compliance",
      "Cloud Security Posture Management (CSPM) and identity governance audits",
      "DevSecOps pipeline integration: automated SAST, DAST, and container vulnerability scanning",
      "Incident response planning, threat containment playbooks, and forensic analysis",
      "Security architecture reviews for new software platforms and third-party integrations"
    ],
    benefits: [
      { title: "Actionable Risk Prioritization", desc: "Focus remediation resources on exploitable, high-impact vulnerabilities rather than raw alert noise." },
      { title: "Audit & Certification Readiness", desc: "Implement documented controls and automated evidence collection so your team is ready for external audits." },
      { title: "Rapid Incident Containment", desc: "Pre-configured playbooks and automated threat detection minimize damage during security events." },
      { title: "Protection Against Operational Disruption", desc: "Proactive defenses against ransomware, unauthorized credential access, and data exfiltration." },
      { title: "Accelerated Enterprise Sales", desc: "Audit reports and a clear, documented security posture help you pass enterprise procurement reviews." },
      { title: "Strategic Security Investment", desc: "Direct budget toward security controls that measurably reduce business exposure." }
    ],
    outcomes: [
      { title: "Validated Application Security", desc: "Systematic penetration testing uncovering and remediating vulnerabilities before release.", icon: ShieldCheck },
      { title: "Simplified Audit Clearance", desc: "Technical controls and documented compliance evidence ready for external auditor evaluation.", icon: CheckCircle2 },
      { title: "Proactive Threat Containment", desc: "Real-time detection and structured response workflows safeguarding core data.", icon: LockKeyhole }
    ],
    caseStudies: [
      { metric: "4 months", label: "To SOC 2 Type II Report", icon: ShieldCheck },
      { metric: "100%", label: "Third-Party Audit Pass Rate", icon: CheckCircle2 },
      { metric: "Zero", label: "Critical Vulnerabilities Post-Remediation", icon: Shield }
    ],
    caseStudyDesc: "A B2B SaaS platform handling sensitive enterprise financial data needed a SOC 2 Type II report to unlock enterprise sales opportunities. AIScripto conducted a gap analysis, implemented AWS KMS encryption, automated CI/CD security scanning, deployed EDR monitoring, and created end-to-end audit documentation. The client achieved its SOC 2 Type II report in 4 months with zero audit exceptions.",
    whyUs: [
      "Experienced security engineers with deep offensive (OSCP) and defensive security backgrounds",
      "Pragmatic, risk-first methodology: clear remediation steps rather than overwhelming generic PDF outputs",
      "Smooth integration with engineering teams: we write code and fix vulnerabilities alongside you",
      "Long-term security partnership: continuous vulnerability tracking and audit support"
    ],
    architectureTracks: [
      {
        title: "Offensive Application Penetration Testing",
        desc: "Thorough black-box and grey-box security assessments simulating real-world adversaries across web applications, REST/GraphQL APIs, mobile endpoints, and cloud perimeters."
      },
      {
        title: "Audit Readiness & Compliance Engineering",
        desc: "Designing and implementing technical security controls, automated evidence collection, and security policies for SOC 2 Type II, ISO 27001, HIPAA, and PCI-DSS compliance."
      },
      {
        title: "Cloud Security Posture Management (CSPM)",
        desc: "Auditing multi-cloud environments for IAM privilege creep, misconfigured storage buckets, unencrypted database volumes, and unmonitored egress traffic."
      },
      {
        title: "DevSecOps Automated Pipeline Security",
        desc: "Embedding static application security testing (SAST), software composition analysis (SCA), container vulnerability scanning, and secret leak detection into CI/CD pipelines."
      }
    ],
    relatedLinks: [
      {
        title: "DevOps Consulting & SRE",
        path: "/services/devops",
        desc: "Automate security scanning and zero-trust controls within your continuous delivery pipelines.",
        type: "Service"
      },
      {
        title: "Cloud Solutions & Migration",
        path: "/services/cloud",
        desc: "Architect secure multi-cloud foundations with zero-trust networking and KMS envelope encryption.",
        type: "Service"
      },
      {
        title: "Custom Software Engineering",
        path: "/services/software",
        desc: "Build secure, OWASP-aligned web applications and microservices with verified authentication.",
        type: "Service"
      },
      {
        title: "Cybersecurity Trends 2026",
        path: "/blog/cybersecurity-trends-to-watch-in-2026",
        desc: "Engineering guide: AI threat defense, zero-trust architectures, and automated compliance.",
        type: "Blog Article"
      }
    ],
    faqs: [
      {
        q: "What types of penetration testing does AIScripto perform?",
        a: "We conduct comprehensive penetration testing covering modern web applications, mobile APIs, cloud infrastructure, and internal networks. Our security engineers assess authentication flaws, business logic vulnerabilities, access control bypasses, injection attacks, and API authorization issues using both automated tooling and deep manual exploit verification."
      },
      {
        q: "How does AIScripto accelerate SOC 2, ISO 27001, or HIPAA compliance?",
        a: "We don't merely generate policy templates. We engineer the required technical controls: implementing KMS key management, automated access reviews, centralized audit logging, multi-factor authentication, endpoint monitoring, and automated vulnerability scanning in your CI/CD pipeline. We also assist your team in compiling auditor-ready evidence."
      },
      {
        q: "How is security integrated into continuous delivery (DevSecOps)?",
        a: "We integrate automated scanning into pull request workflows: SAST scanners inspect code for vulnerabilities, SCA tools detect compromised open-source dependencies, Trivy inspects container base images, and secret scanners prevent API keys from leaking into version control. Vulnerable builds are gated before reaching staging or production."
      },
      {
        q: "What deliverables do clients receive following a security assessment?",
        a: "You receive an executive summary contextualizing business risk, a comprehensive technical report detailing vulnerabilities with reproducible proof-of-concept steps, prioritized CVSS scores, remediation code snippets, and a post-fix re-test validation confirming all vulnerabilities have been resolved."
      }
    ]
  }
};
