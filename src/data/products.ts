/**
 * Live demo endpoints — the ONLY place demo URLs are defined.
 * TODO: move these to HTTPS subdomains (e.g. https://demo-pos.aiscripto.com) and
 * update the values here; every product card, detail page and the Live Demos
 * page picks the change up automatically.
 */
export const DEMO_URLS = {
  analytics: "http://161.97.110.121:3010/",
  nexusAgent: "http://161.97.110.121:3020/",
  voiceBooking: "http://161.97.110.121:3030/",
  posFastFood: "http://161.97.110.121:3040/",
  posRestaurant: "http://161.97.110.121:3050/",
  webConcierge: "http://161.97.110.121:3060/voice?tenant=ai-scripto&token=testToken123Abcd",
  erp: "http://161.97.110.121:3070/",
} as const;

export interface ProductFeature {
  title: string;
  description: string;
  businessBenefit: string;
  tag?: string;
}

export interface ProductUseCase {
  industry: string;
  painPoint: string;
  howProductHelps: string;
  expectedOutcome: string;
}

export interface TechStackCategory {
  category: string;
  technologies: string[];
  purpose: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface DemoLink {
  label: string;
  url: string;
  type: 'live-app' | 'dashboard' | 'interactive' | 'request';
  note?: string;
}

export interface ProductCaseStudy {
  type: 'Verified Enterprise Architecture' | 'Commercial Implementation' | 'Illustrative Case Study';
  title: string;
  organization: string;
  challenge: string;
  solution: string;
  beforeMetrics: string[];
  afterMetrics: string[];
  outcomes: string[];
  quantifiableImpact: string;
}

export interface Product {
  id: string;
  name: string;
  shortName: string;
  seoTitle?: string;
  seoDescription?: string;
  category: string;
  tagline: string;
  headline: string;
  badge: 'Live Demo' | 'Pilot Ready' | 'Production Platform' | 'Enterprise Blueprint';
  badgeColor: string;
  image: string;
  demoUrl: string;
  shortDescription: string;
  fullDescription: string;
  keyStats: { label: string; value: string; desc: string }[];
  marketProblem: {
    title: string;
    description: string;
    currentWorkflow: string;
    businessConsequence: string;
    keyPainPoints: string[];
  };
  solutionWorkflow: {
    step: string;
    title: string;
    description: string;
  }[];
  keyCapabilities: string[]; // Exactly 4 symmetrical capabilities per product
  features: ProductFeature[];
  useCases: ProductUseCase[];
  techStack: TechStackCategory[];
  securityAndIntegrations: {
    security: string[];
    integrations: string[];
    complianceNotes: string;
  };
  caseStudy: ProductCaseStudy;
  demoLinks: DemoLink[];
  faqs: ProductFaq[];
  pricingPilot: {
    model: string;
    starter: string;
    growth: string;
    enterprise: string;
    pilotOffer: string;
  };
}

export const productsData: Product[] = [
  {
    id: "business-analytics-ai",
    name: "MarginGuard™ AI Loss Prevention",
    shortName: "MarginGuard",
    seoTitle: "MarginGuard AI Loss Prevention & Retail Analytics",
    seoDescription: "Spot margin leaks, till cash variances and inventory shrinkage across your branches using the CSV and PDF reports you already have. No ERP migration.",
    category: "Executive AI & Loss Prevention",
    tagline: "Spot margin leaks and shrinkage in the reports you already have",
    headline: "Turn the Reports You Already Have into Early Warnings on Lost Margin",
    badge: "Live Demo",
    badgeColor: "bg-sky-500/10 text-sky-700 dark:text-sky-600 border-sky-500/20",
    image: "/images/products/analytics-dashboard.webp",
    demoUrl: DEMO_URLS.analytics,
    shortDescription: "Executive dashboard that reads the CSV and PDF reports you already have, flags unusual drops in margin, and recommends clear steps to recover the money.",
    fullDescription: "MarginGuard works directly on top of your existing files. It reads daily store dispatches, returns and POS register exports, detects margin leakage and return shrinkage, and generates account recovery playbooks, with no ERP overhaul.",
    keyStats: [
      { value: "Up to 3.5–5%", label: "Typical Revenue Recovery", desc: "In example deployments: return shrinkage, cold-chain loss & unbilled demurrage" },
      { value: "Up to 90%", label: "Less Manual Reporting", desc: "Replaces brittle spreadsheets with on-demand briefings" }
    ],
    keyCapabilities: [
      "Zero-code dynamic ingestion for raw CSV, PDF and database dumps",
      "Statistical alerts that flag unusual margin losses as they happen",
      "Algorithmic account recovery playbooks and EBITDA what-if simulators",
      "Single-source data integrity with sub-50ms Redis cache retrieval"
    ],
    marketProblem: {
      title: "Data Trapped in Static Silos Causing Undetected Margin Leakage",
      description: "Across multi-branch retail, FMCG supply chains, and distribution networks, critical operational data is trapped in daily PDF reports and CSV dumps. By the time discrepancies reach spreadsheets, financial loss has occurred.",
      currentWorkflow: "Branch managers submit disjointed daily spreadsheets. Manual analysts spend hundreds of hours reconciling dispatches against recognized sales.",
      businessConsequence: "Unrecorded shrinkage, transit spoilage, billing slippage, and high-value commercial accounts churning without leadership warning.",
      keyPainPoints: [
        "Dispatched inventory not reconciled against recognized sales in real time",
        "Changing column headers in store exports breaks traditional ETL pipelines",
        "Lack of forensic root-cause analysis distinguishing transit delay from fraud",
        "No dynamic what-if simulation to project EBITDA impact of operational fixes"
      ]
    },
    solutionWorkflow: [
      { step: "01", title: "Format-Agnostic Drag & Drop Ingestion", description: "Upload raw operational files. The schema normalizer adapts to header changes on the fly." },
      { step: "02", title: "Cryptographic SHA-256 Deduplication", description: "Instantly recognizes overlapping dates and prevents double-counting of ledger facts." },
      { step: "03", title: "Z-Score & IQR Forensic Anomaly Radar", description: "Statistical algorithms isolate operating units and line items deviating beyond ±2.5σ." },
      { step: "04", title: "Automated Root-Cause Diagnostic", description: "Cross-references unstructured delivery manifests to pinpoint quality vs. pricing resistance." },
      { step: "05", title: "Algorithmic Mitigation & Boardroom Brief", description: "Generates custom negotiation playbooks, text-to-speech voice summaries, and PDF packs." }
    ],
    features: [
      {
        title: "Dynamic Zero-Code Schema Normalizer",
        description: "Accepts raw daily exports without fragile ETL pipelines or database migration friction.",
        businessBenefit: "Deploys in days instead of multi-year multimillion-dollar data warehouse overhauls.",
        tag: "Ingestion Engine"
      },
      {
        title: "Forensic Variance Three-Way Accounting",
        description: "Real-time three-way reconciliation (Target vs. Dispatched vs. Realized Sale) at line-item level.",
        businessBenefit: "Isolates exact store and transit shrinkage before monthly accounting close.",
        tag: "Forensic Auditing"
      },
      {
        title: "Scripted Account Recovery Playbooks",
        description: "Synthesizes tailored commercial negotiation scripts and retention offers for at-risk accounts.",
        businessBenefit: "Gives sales managers a clear plan to win back lapsing wholesale buyers.",
        tag: "Revenue Defense"
      },
      {
        title: "Interactive EBITDA What-If Simulator",
        description: "Dynamic sliders allow leadership to model operational interventions and calculate EBITDA expansion.",
        businessBenefit: "Gives CFOs and board members instant clarity on highest-ROI operational fixes.",
        tag: "Decision Support"
      }
    ],
    useCases: [
      {
        industry: "Multi-Branch Retail & FMCG",
        painPoint: "High return rates and cutting losses go untracked across 40 regional grocery outlets.",
        howProductHelps: "Ingests daily store dispatches and flags outlier branches exceeding 6% return thresholds.",
        expectedOutcome: "Example outcome: recovers up to 4.2% of net margin leakage within the first 60 days."
      },
      {
        industry: "Logistics & Cold-Chain Distribution",
        painPoint: "Unbilled demurrage fees and temperature excursions cause severe transit margin erosion.",
        howProductHelps: "Reconciles fleet telematics against waybills and generates automated demurrage claim briefs.",
        expectedOutcome: "Example outcome: recovers up to 6.5% in unbilled fees and reduces perishable transit waste."
      }
    ],
    techStack: [
      { category: "Core Intelligence", technologies: ["pgvector (1536-dim)", "RAG Engine", "LLM Analysis Agent"], purpose: "Hybrid search combining structured numeric facts with unstructured notes." },
      { category: "High-Throughput Cache", technologies: ["Redis 7.4", "PostgreSQL Materialized Views"], purpose: "Sub-50ms board-level query response without duplicating data." },
      { category: "Container Architecture", technologies: ["Docker Microservices", "Nginx Reverse Proxy"], purpose: "Air-gapped on-premise or sovereign cloud deployment readiness." },
      { category: "Dynamic Schema & Security", technologies: ["SHA-256 Signatures", "Schema Normalizer", "Z-Score Statistics"], purpose: "Cryptographic CSV/PDF deduplication and automatic handling of changed column headers." }
    ],
    securityAndIntegrations: {
      security: [
        "Cryptographic SHA-256 deduplication signatures for every ingested record",
        "Role-based executive access control (CFO, General Manager, Auditor)",
        "No duplicate records, enforced by canonical audit storage tables"
      ],
      integrations: [
        "Drop-folder CSV / XLSX / PDF automated file intake",
        "Export publication-ready boardroom PDF reports in one click",
        "REST API hooks for legacy SAP, Oracle, and Odoo systems"
      ],
      complianceNotes: "Designed for enterprise data isolation with complete audit traceability."
    },
    caseStudy: {
      type: "Illustrative Case Study",
      title: "Scenario: An FMCG Retail Network Recovering $420,000 in Annual Shrinkage",
      organization: "A regional grocery network (38 outlets)",
      challenge: "Store managers altered daily CSV headers regularly, crashing central data pipelines. Discrepancies between distribution warehouse dispatches and checkout scans produced $35,000/month in untracked shrinkage.",
      solution: "Deployed MarginGuard on top of existing store exports without altering register systems, connecting raw daily drop folders to the schema normalizer.",
      beforeMetrics: ["6 weeks to identify branch margin discrepancies", "$35,000 monthly unexplained shrinkage", "12 hours/week spent manually formatting Excel spreadsheets"],
      afterMetrics: ["Daily outlier detection with under 50 ms query response", "$35,000 shrinkage reduced by 82% in 45 days", "100% automated boardroom PDF generation on demand"],
      outcomes: [
        "Arrested return shrinkage by 4.8% across 38 regional retail locations",
        "Recovered $420,000 in annual net EBITDA without any ERP migration costs",
        "Empowered store supervisors with algorithmic morning action checklists"
      ],
      quantifiableImpact: "$420,000 recovered EBITDA / 90% reduction in executive reporting overhead"
    },
    demoLinks: [
      { label: "Live Demo", url: DEMO_URLS.analytics, type: "live-app", note: "Executive Loss Prevention & Radar Portal" }
    ],
    faqs: [
      { question: "Do we need to migrate our ERP or change our database schema?", answer: "No. The system acts as a non-invasive wrapper. It ingests your existing CSV exports, daily PDFs, and ledger files as they currently exist without requiring database alterations." },
      { question: "What happens if a store changes their export column names?", answer: "Our dynamic schema normalizer automatically maps synonyms and newly added columns without crashing reports or requiring developer intervention." },
      { question: "How does the anomaly detector distinguish between seasonal spikes and real margin leakage?", answer: "The algorithm calculates moving Z-Scores beyond ±2.5σ evaluated against trailing 90-day seasonal baselines and day-of-week demand trends rather than static thresholds." },
      { question: "Is our proprietary financial and sales data secure?", answer: "All financial records and raw logs are processed with AES-256 encryption at rest and TLS 1.3 in transit, with role-based access controls and support for isolated on-premise deployments." },
      { question: "Can daily executive reports and loss alerts be delivered to WhatsApp or Email?", answer: "Yes. Executive morning briefings and critical margin leakage alerts can be dispatched automatically via encrypted email PDFs or WhatsApp webhook notifications." },
      { question: "How quickly can a multi-location business connect data and see initial findings?", answer: "Most businesses connect their first daily drop folder within 48 hours. Initial anomaly scoring and margin variance reports generate immediately after the first file sync." }
    ],
    pricingPilot: {
      model: "Annual SaaS or sovereign cloud license based on operating branch count",
      starter: "Single Business Unit: Up to 5 data streams, daily loss prevention radar ($490/mo)",
      growth: "Multi-Branch Enterprise: Unlimited streams, EBITDA simulator, account playbooks ($1,490/mo)",
      enterprise: "Sovereign Corporation: Air-gapped on-premise container deployment with custom RAG",
      pilotOffer: "14-Day Proof-of-Value: Drop 30 days of historical CSVs to reveal hidden margin leakage."
    }
  },
  {
    id: "nexus-agent",
    name: "NexusAgent™ Contact OS",
    shortName: "NexusAgent",
    seoTitle: "NexusAgent Contact OS: 24/7 AI Voice Agent for Calls",
    seoDescription: "NexusAgent answers every customer call 24/7, captures lead details, flags complaints with SLA tickets and hands off to your staff when a human is needed.",
    category: "AI Voice Intelligence & Customer Experience",
    tagline: "Answer every call 24/7, capture leads and catch complaints early",
    headline: "Turn Customer Conversations Into Actionable Business Intelligence",
    badge: "Live Demo",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-600 border-emerald-500/20",
    image: "/images/products/nexus-dashboard.webp",
    demoUrl: DEMO_URLS.nexusAgent,
    shortDescription: "Voice-first 24/7 AI agent that answers incoming calls, transcribes caller intent, classifies sentiment, and escalates complaints with SLA tickets.",
    fullDescription: "NexusAgent is a voice-first AI platform for customer support, lead capture and complaint handling. Using OpenAI Whisper-1, low-latency streaming responses and multi-branch dashboards, it cuts hold times, captures structured lead data during the conversation, and gives leadership visibility across all locations.",
    keyStats: [
      { value: "24/7", label: "Always On", desc: "Voice reception that answers within one ring, day or night" },
      { value: "Sub-second", label: "Voice Response", desc: "Duplex conversation flow with human-like inflection" }
    ],
    keyCapabilities: [
      "Sub-second duplex voice conversations with natural speech synthesis",
      "Triple behavioral modes: Support Q&A, Structured Review, and Complaint SLA",
      "Silent lead extraction capturing caller name, phone, intent, and urgency",
      "Multi-branch executive dashboard with sentiment heatmap & ticket queues"
    ],
    marketProblem: {
      title: "Lost Leads and Untracked Complaints from Missed Customer Calls",
      description: "Service and retail businesses miss many customer inquiries that arrive outside operating hours, and most callers sent to voicemail hang up and try a competitor instead.",
      currentWorkflow: "Calls ring into busy counters. During rushes, phones are ignored or customer notes scribbled on paper napkins disappear.",
      businessConsequence: "Lost bookings, unaddressed customer complaints escalating to negative online reviews, and zero multi-location quality visibility.",
      keyPainPoints: [
        "Inbound calls go unanswered during peak operating hours and weekends",
        "Staff forget to log caller contact details and service requirements",
        "Complaints surface only after 1-star Google and Yelp reviews go live",
        "Multi-branch owners have no objective comparison of customer satisfaction"
      ]
    },
    solutionWorkflow: [
      { step: "01", title: "Instant Inbound Voice Answer", description: "Answers within one ring with a customized brand greeting in English, Urdu, or Hindi." },
      { step: "02", title: "Natural Knowledge-Base Dialogue", description: "Whisper speech-to-text transcribes queries and answers questions from your knowledge base." },
      { step: "03", title: "Silent Entity & Intent Extraction", description: "Parses caller phone, name, urgency, and service request without rigid robotic forms." },
      { step: "04", title: "Automated Incident Escalation", description: "Severe complaints trigger prioritized SLA tickets with instant SMTP email alerts to managers." },
      { step: "05", title: "Centralized Intelligence Sync", description: "Full transcripts, audio recaps, and satisfaction ratings sync to the central NexusAgent dashboard." }
    ],
    features: [
      {
        title: "Duplex Streaming Voice Pipeline",
        description: "Browser MediaRecorder & streaming audio connected to OpenAI Whisper and low-latency speech synthesis.",
        businessBenefit: "Callers enjoy a natural, fluid conversation without robotic pauses.",
        tag: "Voice Engine"
      },
      {
        title: "Triple Agent Behavioral Engine",
        description: "Configurable modes for Support (Q&A and lead capture), Review (ratings), and Complaint (de-escalation).",
        businessBenefit: "Adapts tone and objectives specifically to the customer's emotional state.",
        tag: "Behavior AI"
      },
      {
        title: "Multi-Branch Sentiment Heatmap",
        description: "Aggregates customer satisfaction scores and top issue categories by branch outlet and city.",
        businessBenefit: "Enables multi-unit operators to spot operational friction points instantly.",
        tag: "Executive Analytics"
      },
      {
        title: "Rapid Script / Iframe Embed",
        description: "Deploys on any website or branch kiosk tablet in minutes with domain allow-listing security.",
        businessBenefit: "Requires zero complex telephony hardware overhaul.",
        tag: "Integration"
      }
    ],
    useCases: [
      {
        industry: "Commercial & Home Services (HVAC)",
        painPoint: "No-heat and furnace failure calls after 6 PM go to voicemail while technicians are in the field.",
        howProductHelps: "NexusAgent answers 24/7, qualifies the emergency level, and sends on-call alerts.",
        expectedOutcome: "Example outcome: captures several high-margin after-hours emergency jobs each week."
      },
      {
        industry: "Multi-Location Dining Chains",
        painPoint: "Managers unaware of kitchen delays until customer satisfaction scores plummet.",
        howProductHelps: "Kiosk and phone feedback feeds sentiment alerts to branch managers in real time.",
        expectedOutcome: "Helps resolve most complaints before customers leave negative public reviews."
      }
    ],
    techStack: [
      { category: "Frontend UI", technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"], purpose: "Voice avatar, streaming transcript cards, and real-time dashboard." },
      { category: "Voice & Language", technologies: ["OpenAI Whisper-1", "GPT-4o-mini", "OpenAI TTS", "ElevenLabs"], purpose: "Accurate multilingual transcription and sub-second speech playback." },
      { category: "Data Storage", technologies: ["MongoDB with Mongoose", "Server-Sent Events", "Zod"], purpose: "Structured review storage, SLA tracking, and instant event streaming." },
      { category: "Telephony & Incident Routing", technologies: ["Twilio SIP Trunking", "WebSockets Audio", "PostgreSQL Queue"], purpose: "Low-latency VoIP transport with automated priority ticket dispatching." }
    ],
    securityAndIntegrations: {
      security: [
        "HMAC-signed session tokens in secure HTTP-only cookies",
        "Tenant domain allow-listing preventing unauthorized widget framing",
        "Role-based access control (Admin, Branch Manager, Agent)"
      ],
      integrations: [
        "SMTP email alerts with full transcript and lead highlights",
        "CSV export for CRM import (HubSpot, Salesforce, Zoho)",
        "REST API endpoints for telephony forwarding hooks"
      ],
      complianceNotes: "Encrypted transmission over TLS. Ephemeral audio stream handling."
    },
    caseStudy: {
      type: "Illustrative Case Study",
      title: "Scenario: A 6-Branch Hospitality Group Reducing Customer Churn by 42%",
      organization: "A 6-location hospitality and bistro group",
      challenge: "During peak lunch and dinner hours, phone calls went unanswered, and diners with service complaints had no fast way to notify management, resulting in deteriorating Yelp scores.",
      solution: "Connected NexusAgent across branch phone lines and deployed QR-code voice kiosks at checkout desks connected to the central command dashboard.",
      beforeMetrics: ["48% unanswered call rate during peak rushes", "Average 3 days to discover customer complaints", "No central branch comparison"],
      afterMetrics: ["100% of calls answered within 1 ring", "Urgent complaints flagged within 90 seconds", "Real-time branch CSAT ranking across all 6 outlets"],
      outcomes: [
        "Recovered 85 dissatisfied customers before negative online reviews were published",
        "Captured 140 new catering inquiry leads in the first month",
        "Front-of-house staff freed to focus entirely on table service"
      ],
      quantifiableImpact: "42% reduction in customer churn / 140 incremental catering leads captured"
    },
    demoLinks: [
      { label: "Live Demo", url: DEMO_URLS.nexusAgent, type: "live-app", note: "Voice Assistant & Incident Intelligence Portal" }
    ],
    faqs: [
      { question: "Can NexusAgent speak languages other than English?", answer: "Yes. NexusAgent natively understands and converses in English, Urdu, Hindi, and regional code-switching accents with natural acoustic inflection." },
      { question: "How are urgent complaints escalated to human management?", answer: "When negative sentiment or customer frustration is detected, the system automatically generates an SLA priority ticket and dispatches an immediate email/webhook alert with caller contact details." },
      { question: "What happens if a customer interrupts the AI while it is speaking?", answer: "NexusAgent uses full-duplex speech streaming with continuous voice activity detection (VAD), instantly stopping its speech when the user talks, just like a natural human conversation." },
      { question: "Does NexusAgent integrate with our existing CRM and ticketing software?", answer: "Yes. Native webhooks and REST APIs sync conversation transcripts, audio logs, and extracted lead data directly into Zendesk, Salesforce, HubSpot, or custom databases." },
      { question: "How does the AI prevent hallucinating inaccurate business policies or pricing?", answer: "The model is strictly grounded using Retrieval-Augmented Generation (RAG) over your approved documentation. When an answer is unknown, it transparently offers to transfer or request supervisor follow-up." },
      { question: "Can human staff listen to live interactions or take over calls?", answer: "Yes. The supervisor portal provides real-time live transcription monitoring with one-click call whisper and human agent takeover capabilities." }
    ],
    pricingPilot: {
      model: "Monthly subscription with bundled conversation minutes",
      starter: "Single Branch: 500 conversations, email summaries ($99/mo)",
      growth: "Multi-Branch: 2,500 conversations, SLA ticket queues, CRM sync ($349/mo)",
      enterprise: "Custom: Unlimited minutes, private fine-tuned model, dedicated phone trunks",
      pilotOffer: "14-Day Free Pilot with pre-loaded company FAQ and test phone number."
    }
  },
  {
    id: "ai-voice-booking",
    name: "AetherVoice™ Smart Booking",
    shortName: "AetherVoice",
    seoTitle: "AetherVoice: AI Phone Receptionist & Smart Booking",
    seoDescription: "AetherVoice answers booking calls 24/7, offers open slots, locks each appointment to prevent double-bookings and syncs with Google Calendar and CalDAV.",
    category: "Autonomous Voice Booking & Scheduling",
    tagline: "Answer every booking call instantly and never double-book a slot",
    headline: "Fill Every Appointment Slot with Instant Voice Scheduling",
    badge: "Live Demo",
    badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-600 border-blue-500/20",
    image: "/images/products/booking-dashboard.svg",
    demoUrl: DEMO_URLS.voiceBooking,
    shortDescription: "Voice assistant that answers incoming calls instantly with sub-second responses, locks booking slots in the database, and auto-syncs with Google Calendar.",
    fullDescription: "AetherVoice is a voice appointment receptionist designed for clinics, dental practices, high-end salons, and service consultants. Callers negotiate appointment times naturally. The AI verifies live calendar slots in under 50ms, places an atomic database lock on the slot to eliminate double-bookings, sends instant SMS confirmation, and writes to Google Calendar.",
    keyStats: [
      { value: "Sub-second", label: "Response Latency", desc: "Immediate conversational response with zero awkward pauses" },
      { value: "0%", label: "Double Bookings", desc: "Pessimistic database transaction locks prevent slot collision" }
    ],
    keyCapabilities: [
      "Natural voice phone conversations negotiating dates and preferred providers",
      "Sub-50ms live calendar availability check and database slot locking",
      "Bi-directional automatic synchronization with team Google Calendars",
      "Unified visual admin dashboard with caller transcripts & SMS confirmations"
    ],
    marketProblem: {
      title: "Lost Bookings and Front-Desk Double-Scheduling Bottlenecks",
      description: "Service businesses lose a significant share of prospective appointments because clients call outside operating hours or hang up after long hold times.",
      currentWorkflow: "Staff answer phones while checking in patients. When two receptionists take calls at once, overlapping bookings occur.",
      businessConsequence: "Empty appointment slots, frustrated double-booked patients, high front-desk burnout, and lost revenue.",
      keyPainPoints: [
        "Patients call after 6 PM and reach voicemail; most do not leave messages",
        "Manual scheduling errors lead to conflicting doctor appointments",
        "Front-desk staff spend hours each day on repetitive scheduling calls",
        "No unified transcript recording caller preferences before arrival"
      ]
    },
    solutionWorkflow: [
      { step: "01", title: "Instant Inbound Answer", description: "Answers phone calls within one second with a polite, professional clinic greeting." },
      { step: "02", title: "Natural Date & Time Negotiation", description: "Caller asks for 'Thursday morning or Friday afternoon'. AI checks open provider schedules." },
      { step: "03", title: "Atomic Database Lock", description: "Locks the selected time slot in the database for 90 seconds to prevent concurrent booking collision." },
      { step: "04", title: "Two-Way Google Calendar Sync", description: "Writes the appointment directly to Google Calendar and dispatches SMS confirmation." },
      { step: "05", title: "Staff Schedule Update", description: "The appointment and audio transcript appear instantly on the team visual schedule." }
    ],
    features: [
      {
        title: "24/7 Phone Receptionist",
        description: "Answers patient calls day and night, handling appointment scheduling, reschedules, and cancellations.",
        businessBenefit: "Captures new patient revenue while your competitors are closed.",
        tag: "Voice AI"
      },
      {
        title: "Pessimistic Slot Locking",
        description: "Database-level transaction locks ensure multiple callers never secure the same provider slot.",
        businessBenefit: "Prevents scheduling conflicts at the database level.",
        tag: "Concurrency Control"
      },
      {
        title: "Automated Calendar Sync",
        description: "Bi-directional integration with Google Calendar and practice management schedules.",
        businessBenefit: "Requires zero manual data re-entry from office receptionists.",
        tag: "Calendar Sync"
      },
      {
        title: "Visual Admin Schedule",
        description: "Clean web dashboard displaying daily schedule, appointment statuses, and caller transcripts.",
        businessBenefit: "Gives staff full clinical context on patient reasons for visit.",
        tag: "Practice Dashboard"
      }
    ],
    useCases: [
      {
        industry: "Dental & Healthcare Practices",
        painPoint: "High call volume during morning hours causes phone queues and patient drop-off.",
        howProductHelps: "AI handles routine scheduling calls, reserves provider chairs, and confirms via SMS.",
        expectedOutcome: "Example outcome: up to 50% less front-desk phone load and more after-hours bookings."
      },
      {
        industry: "Salons, Spas & Wellness",
        painPoint: "Stylists cannot answer phones while serving clients; voicemail bookings are slow.",
        howProductHelps: "Matches clients to requested stylists and calculates service durations automatically.",
        expectedOutcome: "Helps keep the appointment book full without front-desk interruptions."
      }
    ],
    techStack: [
      { category: "Voice Telephony", technologies: ["Twilio SIP", "OpenAI Realtime API", "WebRTC"], purpose: "Carrier-grade low-latency telephony and natural duplex voice." },
      { category: "Database & Concurrency", technologies: ["PostgreSQL", "Prisma ORM", "Redis Concurrency Locks"], purpose: "Atomic reservation locking preventing overlapping calendar slots." },
      { category: "Calendar API", technologies: ["Google Calendar API", "CalDAV / iCal"], purpose: "Instant bi-directional synchronization with existing team schedules." },
      { category: "Notification & Bridge Engine", technologies: ["Twilio SMS API", "WhatsApp Cloud API", "BullMQ Job Queue"], purpose: "Automated multi-channel appointment confirmations, reminders, and webhook alerts." }
    ],
    securityAndIntegrations: {
      security: [
        "End-to-end encrypted voice streaming over TLS/SRTP",
        "Role-based staff permissions for calendar alterations",
        "Immutable audit log of all bookings, cancellations, and reschedules"
      ],
      integrations: [
        "Google Workspace & Google Calendar 2-way sync",
        "Twilio SMS for automated appointment confirmations and reminders",
        "Webhooks for practice management software and CRM tools"
      ],
      complianceNotes: "Encrypted patient data storage, built to support HIPAA requirements."
    },
    caseStudy: {
      type: "Illustrative Case Study",
      title: "Scenario: A Dental Practice Adding 32 Monthly Patient Bookings",
      organization: "A 4-chair family dental practice",
      challenge: "A phone audit revealed that 44% of new patient inquiries arrived after 5:30 PM or on Saturdays when the clinic was closed, routing to voicemail with zero conversion.",
      solution: "Activated AetherVoice with automatic call forwarding on busy and after-hours lines, syncing directly to the clinic's Google Calendar.",
      beforeMetrics: ["44% of calls routed to voicemail after hours", "Average 18 hours to confirm an appointment request", "2-3 accidental double-bookings per month"],
      afterMetrics: ["100% of after-hours calls answered instantly", "Booking confirmation via SMS in under 1 minute", "0 double-bookings over 6 months of continuous operation"],
      outcomes: [
        "Generated 32 confirmed new patient bookings in month one without adding staff",
        "Saved front-desk team 2.5 hours of manual calendar entry every day",
        "Expanded clinic revenue by over $18,000 monthly"
      ],
      quantifiableImpact: "32 additional patient appointments / $18,000 monthly revenue gain"
    },
    demoLinks: [
      { label: "Live Demo", url: DEMO_URLS.voiceBooking, type: "live-app", note: "Voice Appointment & Calendar Portal" },
      { label: "Alternative Booking Link", url: "http://agent.aiscripto.com/", type: "interactive", note: "Hosted telephony demo" }
    ],
    faqs: [
      { question: "How does AetherVoice prevent double-bookings?", answer: "When a caller selects a time, an atomic database transaction lock is placed on that slot for 90 seconds, preventing any other caller or receptionist from securing it simultaneously." },
      { question: "Can customers reschedule or cancel an existing booking without calling staff?", answer: "Yes. Customers can verify their appointment using their phone number or SMS link and self-reschedule or cancel with immediate two-way calendar synchronization." },
      { question: "How does the AI handle vague requests like 'sometime next Thursday afternoon'?", answer: "The conversational agent interprets natural date/time phrasing, queries the doctor or provider calendar in real time, and politely suggests the top 2-3 matching open slots." },
      { question: "What happens if our clinic phone lines are already busy?", answer: "AetherVoice scales in the cloud to answer many concurrent calls on the first ring, so callers are not met with a busy tone or sent to voicemail." },
      { question: "Does it send automated SMS reminders to reduce patient no-shows?", answer: "Yes. Automated SMS confirmations are sent instantly upon booking, followed by automated reminders with 1-click confirmation or rescheduling prompts before the appointment." },
      { question: "Is AetherVoice suitable for healthcare practices with US privacy requirements?", answer: "It is built to support HIPAA requirements: patient data, transcripts and calendar appointments are encrypted, access is role-based, and your data is never used to train public models." }
    ],
    pricingPilot: {
      model: "Subscription per provider calendar with bundled appointment minutes",
      starter: "Solo Provider: 1 calendar, 300 minutes, SMS confirmations ($129/mo)",
      growth: "Multi-Provider Clinic: Up to 5 calendars, 1,200 minutes, automated reminders ($349/mo)",
      enterprise: "Hospital Network: Multi-branch clinic routing, HIPAA-ready data isolation",
      pilotOffer: "Test drive for 7 days with 50 live bookings on your forwarded phone line."
    }
  },
  {
    id: "pos-fast-food",
    name: "OmniPOS QuickServe™",
    shortName: "OmniPOS",
    seoTitle: "OmniPOS QuickServe: Offline-First POS for Fast Food",
    seoDescription: "Offline-first POS for fast food and QSR counters. Keep taking orders through internet outages with local transaction queuing and kitchen ticket routing.",
    category: "Restaurant Operations & Point of Sale",
    tagline: "Keep the counter line moving, even when the internet drops",
    headline: "Fast-Casual & Quick-Service POS Built for Extreme Rush Hours",
    badge: "Live Demo",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-600 border-amber-500/20",
    image: "/images/products/pos-ff-dashboard.webp",
    demoUrl: DEMO_URLS.posFastFood,
    shortDescription: "High-speed counter register designed for fast food, burger joints, and cafes with offline payment queuing and instant order dispatch.",
    fullDescription: "OmniPOS is built specifically for fast-food, food trucks, and high-volume quick-service counters. It prioritizes tap-and-go ordering, rapid modifier selection, and offline-first transaction persistence. When the restaurant Wi-Fi cuts out, the cashier continues ringing up orders without slowdown, syncing automatically when connectivity resumes.",
    keyStats: [
      { value: "Offline", label: "Keeps Selling", desc: "Local transaction queue operates without an internet connection" },
      { value: "Under 30s", label: "Per Order", desc: "Typical counter order time with single-tap modifiers and tap-and-go tender" }
    ],
    keyCapabilities: [
      "Ultra-responsive touch menu layout optimized for rapid counter checkouts",
      "Offline-first transaction queuing ensuring uninterrupted register operations",
      "Real-time kitchen ticket routing and ticket aging notifications via LAN",
      "Cash till float tracking, shift variance control, and fast employee PIN logins"
    ],
    marketProblem: {
      title: "Register Freezes During Lunch Rushes and Slow Counter Checkouts",
      description: "When internet drops during a peak lunch rush, cloud POS registers freeze up. Customers walk away, orders are delayed, and cash reconciliations become a nightmare.",
      currentWorkflow: "Slow multi-screen tablet systems require 10+ clicks to customize a combo meal. Disconnected registers lose track of cash drops and drawer floats.",
      businessConsequence: "Lost ticket revenue, customer walk-outs, register cash discrepancies, and delayed kitchen fulfillment.",
      keyPainPoints: [
        "Cloud registers lock up when restaurant Wi-Fi experiences micro-outages",
        "Complicated checkout interfaces slow counter lines during rush hours",
        "End-of-shift till reconciliations show unexplained cash variances",
        "Kitchen ticket printers disconnect without clear failure warnings"
      ]
    },
    solutionWorkflow: [
      { step: "01", title: "Rapid Cashier PIN Authentication", description: "Instant 4-digit PIN switches cashiers in under one second between counter shifts." },
      { step: "02", title: "Tap-and-Go Menu Selection", description: "One-touch combo selections and intuitive visual modifier sheets (extra cheese, sauce)." },
      { step: "03", title: "Local Offline-First Persistence", description: "Transaction is committed to IndexedDB / local storage with zero network dependencies." },
      { step: "04", title: "Instant Kitchen Station Routing", description: "Ticket dispatches immediately across local network to prep line printers and displays." },
      { step: "05", title: "Silent Cloud Synchronization", description: "Reconciles transactions with headquarters the moment internet connectivity returns." }
    ],
    features: [
      {
        title: "Offline Transaction Engine",
        description: "Local data persistence queues cash and card transactions during network outages.",
        businessBenefit: "Protects your restaurant from lost revenue when local Wi-Fi fails.",
        tag: "Operational Reliability"
      },
      {
        title: "Quick-Service Touch Interface",
        description: "Optimized button layouts, visual item icons, and single-tap modifier grouping.",
        businessBenefit: "Brings typical counter order time to under 30 seconds per order.",
        tag: "Speed"
      },
      {
        title: "Till Cash Variance Control",
        description: "Enforces opening float verification, mid-shift cash drops, and expected cash drawer audits.",
        businessBenefit: "Reduces cashier register shortages and unaccounted till leakage.",
        tag: "Cash Control"
      },
      {
        title: "Staff PIN Switching",
        description: "Enables multiple counter workers to share a terminal securely with individual sales tracking.",
        businessBenefit: "Ensures complete individual accountability for every order rung up.",
        tag: "Security"
      }
    ],
    useCases: [
      {
        industry: "Fast-Food & Burger Chains",
        painPoint: "High-volume lunch lines back up when order entry takes more than a minute per customer.",
        howProductHelps: "High-speed touch menu and instant modifier sheets speed up ticket ordering.",
        expectedOutcome: "Example outcome: up to 28% more transactions during peak 12–2 PM lunch hours."
      },
      {
        industry: "Cafes & Drive-Thru Operators",
        painPoint: "Internet drops freeze drive-thru terminals, creating hazardous vehicle queues.",
        howProductHelps: "Offline-first engine processes payments locally without network pauses.",
        expectedOutcome: "Keeps the drive-thru taking orders during internet outages."
      }
    ],
    techStack: [
      { category: "Terminal Client", technologies: ["React 18", "TypeScript", "Vite", "IndexedDB", "Tailwind CSS"], purpose: "Ultra-responsive touch terminal running in web browser or tablet." },
      { category: "Hardware Bridge", technologies: ["WebUSB", "ESC/POS Thermal Drivers", "Network Printers"], purpose: "Instant receipt printing and cash drawer kickout triggers." },
      { category: "Backend Sync", technologies: ["Node.js", "Express", "Prisma ORM", "PostgreSQL"], purpose: "High-concurrency cloud transaction sync and store sales reporting." },
      { category: "Transaction Queue & Auditing", technologies: ["Local Offline Queue", "AES-256 Storage"], purpose: "Offline transaction retention with automatic re-sync on reconnection, plus a cash drawer audit trail." }
    ],
    securityAndIntegrations: {
      security: [
        "Bcrypt-hashed employee PIN authentication with manager override locks",
        "Tokenized payment handoff with zero local unencrypted card retention",
        "Comprehensive cash drawer opening audit trail"
      ],
      integrations: [
        "Thermal ESC/POS receipt printers and kitchen ticket printers",
        "Barcode scanners and customer-facing secondary display screens",
        "Stripe Terminal EMV card reader integration"
      ],
      complianceNotes: "Card payments run through PCI-DSS compliant payment processors via tokenization, designed for PCI-DSS scope reduction."
    },
    caseStudy: {
      type: "Illustrative Case Study",
      title: "Scenario: A 3-Unit Burger Chain Keeps Selling Through an Internet Outage",
      organization: "A multi-location burger chain (3 fast-casual sites)",
      challenge: "A regional construction crew cut fiber lines during a Saturday lunch rush, disabling the chain's former cloud POS and halting register sales for 2 hours.",
      solution: "Deployed OmniPOS with offline transaction persistence on iPad counter registers.",
      beforeMetrics: ["Registers froze immediately during network drops", "Average counter order time: 78 seconds", "Estimated $3,200 lost revenue per network outage"],
      afterMetrics: ["100% register operation during zero-internet conditions", "Average counter order time: under 30 seconds", "$0 lost revenue during network disruptions"],
      outcomes: [
        "Processed 240 lunch orders completely offline without a single dropped transaction",
        "Transactions reconciled automatically with headquarters upon network restoration",
        "Increased peak lunch revenue by 24% through faster counter throughput"
      ],
      quantifiableImpact: "Registers kept selling offline / 24% increase in peak lunch throughput"
    },
    demoLinks: [
      { label: "Live Demo", url: DEMO_URLS.posFastFood, type: "live-app", note: "Fast Food & QSR Counter Register" }
    ],
    faqs: [
      { question: "What happens to orders when the restaurant internet drops?", answer: "Orders and cash/card transactions save locally to encrypted indexed storage. They route to kitchen printers over local LAN and sync to the cloud automatically when internet returns." },
      { question: "Can OmniPOS run on regular tablets and existing receipt printers?", answer: "Yes. It operates smoothly on standard iPads, Android tablets, touchscreen Windows terminals, and connects with ESC/POS network and Bluetooth receipt printers." },
      { question: "How fast can cashiers ring up complex combo meals and modifier substitutions?", answer: "The interface is designed for under 30 seconds per order, with single-tap combos, instant meal upsells, and modifier grouping (e.g. no onions, extra cheese)." },
      { question: "How does the cash drawer audit protect against employee float discrepancies?", answer: "Staff PIN switching tracks every drawer open event, cash drop, and shift handover with blind end-of-day reconciliation to eliminate cash float shrinkage." },
      { question: "Does the system support customer loyalty numbers and gift cards at the counter?", answer: "Yes. Cashiers can enter customer phone numbers to look up loyalty points, apply discount vouchers, and redeem physical or digital gift card balances in seconds." },
      { question: "Can high-volume drive-thru orders be handled simultaneously?", answer: "Yes. Drive-thru and walk-up counter registers share a real-time order queue with independent tender stations and kitchen runner tickets." }
    ],
    pricingPilot: {
      model: "Flat monthly fee per register with no revenue cut",
      starter: "1 Register: Offline queue, receipt printing, till audit ($69/mo)",
      growth: "Multi-Register: Up to 3 registers, LAN sync, multi-shift reports ($149/mo)",
      enterprise: "Franchise Package: Multi-location centralized menu management and royalties reporting",
      pilotOffer: "Free 14-day test drive on your existing tablets."
    }
  },
  {
    id: "pos-restaurant",
    name: "CulinaryPOS™ & Kitchen Intelligence",
    shortName: "CulinaryPOS",
    seoTitle: "CulinaryPOS: Restaurant POS with Kitchen Display (KDS)",
    seoDescription: "Cloud restaurant POS system with interactive floor tables, split billing, kitchen display systems, inventory control, and offline transactional resilience.",
    category: "Restaurant Operations & Point of Sale",
    tagline: "Run tables, tickets and the kitchen line from one system",
    headline: "Coordinate Dining Rooms, Kitchen Lines, and Multi-Branch Operations",
    badge: "Live Demo",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-600 border-amber-500/20",
    image: "/images/products/pos-res-dashboard.webp",
    demoUrl: DEMO_URLS.posRestaurant,
    shortDescription: "Complete full-service restaurant system with interactive dining room floor plans, table ordering, course pacing, and Kitchen Display Systems (KDS).",
    fullDescription: "CulinaryPOS is built for full-service dining, bistros, pizzerias, and multi-room restaurants. It unites front-of-house table floor plans, split billing, and server assignments with back-of-house Kitchen Display Systems (KDS). Servers fire appetizers and mains on tablet registers, and kitchen stations manage ticket aging with color-coded alerts.",
    keyStats: [
      { value: "Floor Plan", label: "Visual Table Map", desc: "Real-time table status (Vacant, Dining, Paid, Reserved)" },
      { value: "KDS", label: "Station Routing", desc: "Automated ticket routing to grill, sauté, and prep stations" }
    ],
    keyCapabilities: [
      "Interactive visual dining room floor plans with real-time table status tracking",
      "Digital Kitchen Display System (KDS) with color-coded order prep timers",
      "Flexible guest billing with split checks by seat, item, or percentage",
      "Centralized multi-branch sales, menu item popularity, and server productivity"
    ],
    marketProblem: {
      title: "Lost Kitchen Tickets, Table Bottlenecks, and Dining Room Miscommunication",
      description: "Paper kitchen tickets get lost, orders arrive late, and servers spend excess time running between the kitchen and dining room to resolve course pacing.",
      currentWorkflow: "Handwritten tickets or noisy ticket printers get soaked in grease. Servers argue over who rang up which modifier, and table turn rates slow down.",
      businessConsequence: "Frustrated diners, cold food comped by management, lower table turnover rates, and reduced tip satisfaction.",
      keyPainPoints: [
        "Paper tickets lost or misplaced on busy Friday and Saturday night services",
        "Lack of course timing coordination between appetizers and main entrees",
        "Complicated manual check splitting creates awkward delays for dinner guests",
        "Restaurant owners lack real-time visibility into kitchen ticket aging times"
      ]
    },
    solutionWorkflow: [
      { step: "01", title: "Visual Table Selection", description: "Server taps Table 04 on the dining room floor map to view active guest count." },
      { step: "02", title: "Course-Paced Order Entry", description: "Orders are entered with course tags (Starters, Mains, Dessert) and specific culinary modifiers." },
      { step: "03", title: "Digital KDS Routing", description: "Food items route instantly to designated kitchen station displays (Grill, Salad, Pass)." },
      { step: "04", title: "Kitchen Bump & Server Notification", description: "Line cook bumps ticket when plated; server receives visual ready alert on terminal." },
      { step: "05", title: "Split-Tender Checkout", description: "Check is split by seat or evenly with card tap, printed receipt, and auto till update." }
    ],
    features: [
      {
        title: "Visual Table Floor Plans",
        description: "Customizable visual floor plans reflecting your dining rooms, bar, patio, and booths.",
        businessBenefit: "Hostesses and managers instantly see table occupancy, spend, and open seats.",
        tag: "Dining Management"
      },
      {
        title: "Digital Kitchen Display (KDS)",
        description: "Touchscreens replace paper printers with preparation countdown timers and item status tracking.",
        businessBenefit: "Speeds up meal preparation and removes paper tickets that get lost.",
        tag: "Kitchen KDS"
      },
      {
        title: "Split-Bill Engine",
        description: "Effortlessly split bills by seat, split individual appetizers, or divide the bill evenly.",
        businessBenefit: "Avoids long check-splitting delays at large party tables.",
        tag: "Guest Checkout"
      },
      {
        title: "Server Sales & Tip Tracking",
        description: "Monitors covers turned, average ticket size, and tip payouts per server shift.",
        businessBenefit: "Incentivizes waitstaff productivity and makes end-of-night tip distribution smooth.",
        tag: "Staff Metrics"
      }
    ],
    useCases: [
      {
        industry: "Full-Service Bistros & Fine Dining",
        painPoint: "Course timing miscommunications lead to main courses arriving before appetizers are finished.",
        howProductHelps: "Course hold-and-fire buttons allow servers to pace kitchen preparation perfectly.",
        expectedOutcome: "Fewer food comps and better-paced service for guests."
      },
      {
        industry: "High-Volume Pizzerias & Trattorias",
        painPoint: "Pizza oven stations get overwhelmed without structured ticket aging visibility.",
        howProductHelps: "KDS screens display preparation timers that turn amber after 12 mins and red after 20 mins.",
        expectedOutcome: "Example outcome: average table turn time cut from about 75 to 52 minutes."
      }
    ],
    techStack: [
      { category: "Floor & Register UI", technologies: ["React 18", "TypeScript", "Tailwind CSS", "Canvas API"], purpose: "Interactive visual table canvas and intuitive server order entry." },
      { category: "Kitchen Station Sync", technologies: ["Socket.io (WebSocket)", "Web Audio alerts"], purpose: "Real-time bidirectional ticket synchronization between server terminals and kitchen pass." },
      { category: "Database & Backend", technologies: ["Node.js", "Express", "Prisma ORM", "PostgreSQL"], purpose: "High-integrity multi-terminal state coordination and multi-room management." },
      { category: "Payments & Order Orchestration", technologies: ["Stripe Terminal", "ESC/POS Printing"], purpose: "Split-bill terminal payments, course hold-and-fire pacing and kitchen station ticket routing." }
    ],
    securityAndIntegrations: {
      security: [
        "Role-based privilege hierarchy (Manager pin required for comps, voids, and refunds)",
        "Audit trail for all modified kitchen tickets and deleted items",
        "Card payments through PCI-DSS compliant payment processors (Stripe Terminal)"
      ],
      integrations: [
        "KDS touchscreens and kitchen bump bars",
        "ESC/POS thermal kitchen ticket and guest receipt printers",
        "Stripe Terminal for tableside EMV card payments"
      ],
      complianceNotes: "Encrypted tableside payment processing."
    },
    caseStudy: {
      type: "Illustrative Case Study",
      title: "Scenario: A Pizzeria Cutting Weekend Kitchen Wait Times by 40%",
      organization: "A 120-seat wood-fired pizzeria",
      challenge: "Lost paper tickets on busy Friday evenings caused 45-minute guest waits and $700 weekly in comped meals and customer apologies.",
      solution: "Installed CulinaryPOS with dining room table floor maps and 2 digital KDS screens at the pizza prep line and sauté station.",
      beforeMetrics: ["28 minutes average kitchen ticket turnaround", "10-15 lost or soaked paper tickets per weekend", "Average table turn time: 82 minutes"],
      afterMetrics: ["16 minutes average kitchen ticket turnaround", "Zero lost tickets over 4 months of operation", "Average table turn time: 54 minutes"],
      outcomes: [
        "Enabled 1.5 extra table seatings per Saturday night service",
        "Completely eliminated $700 weekly food comp costs",
        "Kitchen staff reported significantly reduced stress and shouting on the line"
      ],
      quantifiableImpact: "40% faster ticket turnaround / $2,800 monthly savings in comped meals"
    },
    demoLinks: [
      { label: "Live Demo", url: DEMO_URLS.posRestaurant, type: "live-app", note: "Restaurant Floor Plan & Kitchen KDS" }
    ],
    faqs: [
      { question: "Can we customize our restaurant floor plan and table layout?", answer: "Yes. The built-in visual floor plan editor lets you position tables, booths, bar stools, and outdoor patio sections matching your physical dining room layout." },
      { question: "Does the Kitchen Display System (KDS) support multiple cook stations?", answer: "Yes. Food items route automatically to their designated stations—such as drinks to the bar, pizzas to the oven, and steaks to the grill—with unified expediter pass tracking." },
      { question: "How does course pacing (Hold & Fire) work for multi-course dining?", answer: "Waitstaff can enter complete table orders and put entrées on 'Hold' while firing appetizers immediately, giving chefs clear prep pacing without kitchen confusion." },
      { question: "How easily can waitstaff split bills by seat, item, or percentage?", answer: "Split-bill checkout supports 1-tap splitting by individual guest seat, custom item division, or equal multi-card percentage splits directly at the table." },
      { question: "Can managers track table turnover rates and server sales in real time?", answer: "Yes. Live floor management displays seating duration timers, average spend per table, and server shift totals to optimize dining room turnover during peak dinner rushes." },
      { question: "Does the KDS track kitchen ticket prep times and flag overdue orders?", answer: "Yes. Tickets change colors dynamically (green to yellow to flashing red) based on target prep benchmarks, alerting expediters before food arrives late." }
    ],
    pricingPilot: {
      model: "Monthly subscription per terminal and kitchen display screen",
      starter: "Bistro: 1 Terminal + 1 Kitchen KDS screen, table floor plan ($99/mo)",
      growth: "Full Restaurant: 3 Terminals + 2 KDS screens, split billing ($199/mo)",
      enterprise: "Multi-Unit Group: Centralized menu distribution, franchise royalties reporting",
      pilotOffer: "Full hardware-free demo evaluation on your existing iPads or tablets."
    }
  },
  {
    id: "ai-agent-web",
    name: "ConciergeWeb™ Cognitive Assistant",
    shortName: "ConciergeWeb",
    seoTitle: "ConciergeWeb: AI Website Assistant for Lead Capture",
    seoDescription: "ConciergeWeb answers website visitors by voice or text from your approved knowledge base, qualifies buyers and sends leads to your inbox or CRM.",
    category: "Conversational Website AI & Lead Generation",
    tagline: "Answer website visitors' questions and turn them into qualified leads",
    headline: "Stop Letting Qualified Website Visitors Bounce Without Engaging",
    badge: "Live Demo",
    badgeColor: "bg-teal-500/10 text-teal-700 dark:text-teal-600 border-teal-500/20",
    image: "/images/products/webagent-dashboard.webp",
    demoUrl: DEMO_URLS.webConcierge,
    shortDescription: "Voice and text web concierge that greets website visitors, answers questions using your company knowledge base, and captures qualified leads.",
    fullDescription: "ConciergeWeb turns a static company website into an active sales channel. Embedded with a single snippet, it greets visitors, answers technical and pre-sales questions using your uploaded documents, clarifies needs through real-time voice and text, and collects qualified contact details with instant sales alerts to your inbox.",
    keyStats: [
      { value: "Up to 3x", label: "Lead Capture", desc: "In example deployments, conversational guidance converts better than static forms" },
      { value: "Voice + Text", label: "Real-Time Voice & Chat", desc: "Visitors can either speak or type naturally" }
    ],
    keyCapabilities: [
      "Real-time voice and text chat interactions right on your website",
      "Knowledge-base grounding (RAG) providing accurate business FAQ answers",
      "Real-time lead qualification panel extracting email, phone, and purchase intent",
      "Lightweight non-intrusive floating widget loading in under 150ms without slowdown"
    ],
    marketProblem: {
      title: "Website Visitors Leave Before Their Questions Are Answered",
      description: "Most prospective customers visiting commercial service websites leave without submitting a contact form, often because they cannot get immediate answers to specific pre-sales questions.",
      currentWorkflow: "Visitors read static marketing text. If they have questions regarding pricing or availability, they must fill out a generic form and wait 24 hours.",
      businessConsequence: "High digital marketing spend wasted on traffic that never converts into pipeline.",
      keyPainPoints: [
        "Visitors bounce when they cannot quickly find answers to service questions",
        "Generic contact forms feel impersonal and suffer low completion rates",
        "Sales reps spend excessive time fielding basic tier-1 informational queries",
        "Zero visitor engagement during late evening and weekend browsing hours"
      ]
    },
    solutionWorkflow: [
      { step: "01", title: "Non-Intrusive Widget Launcher", description: "A sleek, branded widget appears in the corner of your website matching your brand palette." },
      { step: "02", title: "Proactive Contextual Greeting", description: "Greets the visitor with an intelligent question tailored to the page they are viewing." },
      { step: "03", title: "RAG Grounded FAQ Answering", description: "Answers questions on pricing, services and policies only from your approved knowledge base, and hands off to your team when unsure." },
      { step: "04", title: "Organic Lead Qualification", description: "Collects the visitor's work email, company name, and project scope naturally in dialogue." },
      { step: "05", title: "Instant Sales Notification", description: "Dispatches full conversation summaries and lead scores to your email and CRM." }
    ],
    features: [
      {
        title: "Dual Voice & Text Interaction",
        description: "Visitors can either type or tap the microphone to speak naturally with instant speech recognition.",
        businessBenefit: "Accommodates all visitor preferences, especially mobile users who dislike typing.",
        tag: "Interaction"
      },
      {
        title: "Knowledge Base RAG Grounding",
        description: "Trained exclusively on your business documentation, service sheets, and pricing policies.",
        businessBenefit: "Answers only from your approved knowledge base, protecting your reputation.",
        tag: "Accuracy"
      },
      {
        title: "Real-Time Lead Capture Panel",
        description: "Automatically parses visitor names, emails, and urgency, displaying them live in the lead dashboard.",
        businessBenefit: "Transforms anonymous website traffic into actionable sales pipeline.",
        tag: "Lead Intelligence"
      },
      {
        title: "Human Escalation Alerts",
        description: "Recognizes when a buyer is ready to purchase and dispatches urgent email alerts to sales reps.",
        businessBenefit: "Connects your sales team with hot prospects at the peak of buying interest.",
        tag: "Conversion"
      }
    ],
    useCases: [
      {
        industry: "B2B SaaS & Tech Providers",
        painPoint: "High bounce rates on pricing pages because buyers want fast integration answers.",
        howProductHelps: "Answers technical API questions and qualifies company size before booking demos.",
        expectedOutcome: "Example outcome: up to 35% more demo requests, with richer qualification data."
      },
      {
        industry: "Commercial Contracting & Trades",
        painPoint: "Commercial facility managers browse websites after hours looking for certified contractors.",
        howProductHelps: "Verifies service coverage territory, records project scope, and alerts dispatchers.",
        expectedOutcome: "More qualified commercial project enquiries each week."
      }
    ],
    techStack: [
      { category: "Client Widget", technologies: ["Vanilla JavaScript", "React", "Shadow DOM", "Tailwind CSS"], purpose: "Lightweight embed loading in under 150 ms without affecting page speed." },
      { category: "AI & Vector Search", technologies: ["OpenAI GPT-4o-mini", "Vector Embeddings", "RAG Pipeline"], purpose: "Accurate context retrieval and conversational answering grounded in company docs." },
      { category: "Backend Infrastructure", technologies: ["Node.js", "Express", "Vercel / Docker", "MongoDB"], purpose: "Real-time message handling, session security, and lead analytics aggregation." },
      { category: "Lead Extraction & CRM Bridge", technologies: ["HubSpot API", "Salesforce REST", "Webhook Event Bus"], purpose: "Autonomous visitor contact extraction with instant CRM enrichment and rep notifications." }
    ],
    securityAndIntegrations: {
      security: [
        "Isolated iframe / Shadow DOM architecture protecting parent website security",
        "CORS and origin verification preventing unauthorized widget spoofing",
        "Encrypted transit via HTTPS and WebSockets"
      ],
      integrations: [
        "WordPress, Webflow, Shopify, Wix, Squarespace, and custom HTML websites",
        "Instant SMTP email lead notifications",
        "Webhook triggers for Zapier, HubSpot, and Salesforce"
      ],
      complianceNotes: "No third-party advertising trackers. Lead retention designed to support GDPR requirements."
    },
    caseStudy: {
      type: "Illustrative Case Study",
      title: "Scenario: An IT Consulting Firm Doubling Monthly Demo Inquiries",
      organization: "A mid-sized IT consulting firm",
      challenge: "The firm spent $3,000 monthly on search ads, but 94% of visitors bounced without submitting their contact form because they could not get fast answers to compliance questions.",
      solution: "Embedded ConciergeWeb on their primary landing pages, trained on their compliance whitepapers and service guides.",
      beforeMetrics: ["2.1% website visitor-to-lead conversion rate", "Average 18 hours to answer pre-sales questions", "High bounce rate on pricing page"],
      afterMetrics: ["5.4% website visitor-to-lead conversion rate", "Answers to technical pre-sales questions in under 2 seconds", "Over 60 qualified leads captured in month one"],
      outcomes: [
        "Captured 64 high-value enterprise leads in the first 30 days",
        "Cut sales rep time spent answering repetitive tier-1 FAQs by 8 hours weekly",
        "Improved Google Ads ROI by 2.5x without increasing ad spend"
      ],
      quantifiableImpact: "Lead conversion increased from 2.1% to 5.4% / 64 qualified enterprise leads captured"
    },
    demoLinks: [
      { label: "Live Demo", url: DEMO_URLS.webConcierge, type: "live-app", note: "Voice & Text Web Concierge" }
    ],
    faqs: [
      { question: "Will embedding ConciergeWeb slow down my website load time?", answer: "No. The embed script is loaded asynchronously and weighs less than 45KB. It executes in an isolated environment without affecting Core Web Vitals or SEO scores." },
      { question: "Can I receive leads directly in my email inbox or CRM?", answer: "Yes. Every time a visitor provides their contact info, a structured lead card with full dialogue context and purchase intent is emailed to your sales team immediately." },
      { question: "How do we train the AI on our company documents, services, and pricing?", answer: "You can upload PDFs, service documents, FAQs, or paste website URLs. The built-in parser indexes your content within minutes, so answers come only from your approved material." },
      { question: "What happens when a website visitor asks a question that is not in the knowledge base?", answer: "The AI politely acknowledges that the specific detail requires specialist confirmation and offers to capture the visitor's email or phone number for prompt team follow-up." },
      { question: "Can visitors interact with the concierge using voice as well as text?", answer: "Yes. Visitors can click the microphone button for real-time voice conversations, or type via standard text chat depending on their preference." },
      { question: "Can we customize the widget colors, avatar, and greeting message to match our brand?", answer: "Yes. Full white-label branding controls allow you to customize primary colors, custom avatars, position placement, greeting hooks, and lead qualification questions." }
    ],
    pricingPilot: {
      model: "Monthly SaaS based on conversation volume",
      starter: "Starter: 300 conversations, document indexing, email alerts ($49/mo)",
      growth: "Growth: 1,500 conversations, real-time voice, CRM webhook ($179/mo)",
      enterprise: "Scale: Unlimited conversations, custom branding, SLA support",
      pilotOffer: "14-Day Free Trial: Test the widget directly on your website with zero credit card required."
    }
  },
  {
    id: "erp-financials",
    name: "ScriptoERP™ Financial & Ledger Core",
    shortName: "ScriptoERP",
    seoTitle: "ScriptoERP: Double-Entry Accounting & General Ledger",
    seoDescription: "ScriptoERP is an accounting core designed around IFRS/GAAP double-entry rules, with automatic voucher numbering, PDC tracking, multi-currency and audit trails.",
    category: "Enterprise Financial Accounting & Supply Chain",
    tagline: "Books that always balance, with a clean audit trail for every entry",
    headline: "An Accounting Core Designed Around IFRS/GAAP Rules and a Clean Audit Trail",
    badge: "Production Platform",
    badgeColor: "bg-indigo-500/10 text-primary border-indigo-500/20",
    image: "/images/products/erp-dashboard.webp",
    demoUrl: DEMO_URLS.erp,
    shortDescription: "Complete accounting system that keeps every transaction balanced, numbers vouchers automatically by type and financial year, and tracks post-dated cheques from issue to clearing.",
    fullDescription: "ScriptoERP is an enterprise accounting platform designed around IFRS/GAAP double-entry rules. The financial core covers the hierarchical Chart of Accounts, General Ledger, voucher workflow, bank reconciliation and the full post-dated cheque (PDC) lifecycle. The inventory module adds real-time stock management with 3-way matching and posts every stock movement to the general ledger in the same transaction.",
    keyStats: [
      { value: "100%", label: "Double-Entry Balance", desc: "Engine-level invariant: no transaction posts unless Debit = Credit" },
      { value: "Automatic", label: "Voucher Numbering", desc: "Every voucher gets a permanent number by type and year, e.g. JV-2026-00042" }
    ],
    keyCapabilities: [
      "Engine-enforced double-entry validation guaranteeing debits equal credits to the cent",
      "Permanent, automatic voucher numbers (e.g. JV-2026-00042) with proper reversal entries",
      "Automated post-dated cheque (PDC) lifecycle tracking and maturity voucher generation",
      "Synchronous Inventory-GL Bridge with 3-way matching between PO, GRN, and vendor invoice"
    ],
    marketProblem: {
      title: "Ledger Discrepancies, Period Cut-Off Breaches, and Unaudited Manual Postings",
      description: "Growing enterprises frequently suffer from un-reconciled sub-ledgers, accidental postings into closed periods, and manual journal errors that fail financial audits.",
      currentWorkflow: "Accounting staff manually enter sales and inventory movements into separate spreadsheets, resulting in discrepancies between physical stock and general ledger value.",
      businessConsequence: "Failed tax and statutory audits, unexpected cash flow shortfalls, distorted profitability reports, and significant risk of undetected internal fraud.",
      keyPainPoints: [
        "Transactions posted into closed fiscal periods corrupting historical financial statements",
        "Discrepancies between Accounts Payable/Receivable control accounts and subsidiary ledgers",
        "Un-tracked post-dated cheques (PDC) resulting in missed bank clearing deadlines",
        "Inventory purchases recorded without 3-way matching between PO, GRN, and vendor invoices"
      ]
    },
    solutionWorkflow: [
      { step: "01", title: "Voucher Creation", description: "Voucher created (CPV, CRV, BPV, BRV, JV, PINV) with immutable system key [TYPE]-[FY]-[NNNNN]." },
      { step: "02", title: "Strict Double-Entry Validation", description: "Posting Engine verifies that Total Debit exactly equals Total Credit to the smallest currency unit." },
      { step: "03", title: "Period Status Policy Check", description: "Blocks posting if the accounting period is Hard-Closed; requires manager privilege if Soft-Closed." },
      { step: "04", title: "Synchronous General Ledger Posting", description: "Creates immutable journal entries and updates running account balances in a single atomic transaction." },
      { step: "05", title: "Real-Time Financial Reporting", description: "Instantly updates Trial Balance, Balance Sheet, Profit & Loss, and Cash Flow without batch waiting." }
    ],
    features: [
      {
        title: "Double-Entry Invariant Engine",
        description: "Zero transaction commits to the General Ledger unless debits equal credits at the database layer.",
        businessBenefit: "Prevents unbalanced entries, so the balance sheet always balances.",
        tag: "Core Invariant"
      },
      {
        title: "Automatic Voucher Numbering",
        description: "Every voucher carries an immutable key formatted as [TYPE]-[FY]-[NNNNN] (e.g. CPV-2425-00001). Posted vouchers are never edited.",
        businessBenefit: "Provides ironclad audit trails required by external statutory auditors.",
        tag: "Audit Integrity"
      },
      {
        title: "Automated Post-Dated Cheque Lifecycle",
        description: "Dedicated sub-ledger tracking for customer PDC-R and supplier PDC-I with automated maturity alerts.",
        businessBenefit: "Eliminates forgotten post-dated cheques and safeguards trade working capital.",
        tag: "Treasury"
      },
      {
        title: "Atomic Inventory-GL Bridge",
        description: "Translates every warehouse movement into GL journal entries synchronously within the same database transaction.",
        businessBenefit: "Physical inventory balances and general ledger book valuations are always 100% in sync.",
        tag: "Supply Chain Bridge"
      }
    ],
    useCases: [
      {
        industry: "Wholesale & Distribution",
        painPoint: "High volume of trade receivables handled through 30-to-90 day post-dated cheques causing cash reconciliation headaches.",
        howProductHelps: "Automates the PDC lifecycle with accounts receivable clearance and maturity alert workflows.",
        expectedOutcome: "Eliminates cash variance errors and improves working capital forecasting."
      },
      {
        industry: "Multi-Entity Commercial Enterprises",
        painPoint: "Holding companies managing multiple operating entities struggle with consolidated financial statements.",
        howProductHelps: "Multi-company architecture with configurable fiscal years, currency settings, and automated year-end closing.",
        expectedOutcome: "Example outcome: year-end close shortened from weeks to a few business days."
      }
    ],
    techStack: [
      { category: "Backend Architecture", technologies: ["Node.js (NestJS)", "Python (FastAPI)", "TypeScript", "Zod"], purpose: "Type-safe financial domain model, posting engine, and voucher validation logic." },
      { category: "Persistence & Schema", technologies: ["PostgreSQL 15+", "Prisma / SQLAlchemy", "DECIMAL(18,4)", "DATE types"], purpose: "ACID-compliant relational database with optimistic locking and zero floating-point math." },
      { category: "Cache & Async Tasks", technologies: ["Redis", "Bull / Celery", "Puppeteer"], purpose: "PDC maturity scanning, high-speed report caching, and server-side PDF voucher generation." },
      { category: "Audit Trail & Integrity", technologies: ["Append-Only Journal", "3-Way Match Rules"], purpose: "Reconciliation designed around IFRS/GAAP rules, with tamper-evident audit logging and concurrency control." }
    ],
    securityAndIntegrations: {
      security: [
        "Granular Role-Based Access Control (Admin, Finance Manager, Senior Accountant, Cashier, Auditor)",
        "Immutable append-only audit trail logging all mutations with user ID, timestamp, and JSON diffs",
        "Optimistic locking on all voucher records to reject concurrent colliding edits"
      ],
      integrations: [
        "Bank statement import via CSV, OFX, and electronic banking feeds",
        "PDF, Excel, and CSV export across all 14 standard financial reports",
        "REST API endpoints for third-party e-commerce and POS bridge synchronization"
      ],
      complianceNotes: "Designed around IFRS and US GAAP double-entry rules."
    },
    caseStudy: {
      type: "Illustrative Case Study",
      title: "Scenario: Multi-Company Financial Architecture & Automated GL Controls",
      organization: "A trading and distribution holding group (4 entities)",
      challenge: "The group managed 4 trading entities across disparate accounting software. Post-dated supplier cheques were frequently misallocated, and month-end closing took 24 days due to inventory-ledger discrepancies.",
      solution: "Implemented ScriptoERP with automatic voucher numbering, automated PDC clearing, and synchronized 3-way PO-GRN matching.",
      beforeMetrics: ["24 days required for month-end financial close", "Frequent un-reconciled variance between warehouse stock and GL", "Manual PDC tracking with missed bank clearance dates"],
      afterMetrics: ["Month-end close reduced to 3 business days", "No variance between physical inventory and ledger", "Zero missed PDC clearing dates with daily automation"],
      outcomes: [
        "Passed the statutory audit on first submission",
        "Eliminated over $60,000 in duplicate supplier payments via 3-way matching",
        "Provided executive leadership with real-time consolidated P&L statements"
      ],
      quantifiableImpact: "Month-end closing reduced from 24 days to 3 days / complete audit trail"
    },
    demoLinks: [
      { label: "Live Demo", url: DEMO_URLS.erp, type: "live-app", note: "Enterprise Financial Core & General Ledger" }
    ],
    faqs: [
      { question: "How does the system enforce the immutable posting rule?", answer: "Once a voucher reaches 'Posted' status, its lines cannot be edited. Any correction must be executed via an auto-generated Reversal Voucher (RV) that exactly mirrors the original, preserving the audit trail." },
      { question: "Can a user post an entry into a closed fiscal period?", answer: "No. The system strictly checks period status: Soft-Closed periods require elevated manager permission, while Hard-Closed periods irrevocably reject any posting." },
      { question: "How does 3-Way PO-GRN Matching protect against supplier overbilling?", answer: "Before an accounts payable invoice can be posted, the system mathematically verifies quantities and unit costs across the Purchase Order, Goods Receipt Note, and Supplier Invoice." },
      { question: "How does the system handle Post-Dated Cheques (PDC) before maturity?", answer: "Incoming and outgoing PDCs are held in dedicated transit clearing accounts ([PDC-IN-HOLD] / [PDC-OUT-HOLD]) and move to active bank ledgers only upon verified bank realization." },
      { question: "Does the chart of accounts support multi-currency transactions and automated FX revaluation?", answer: "Yes. Transactions can be booked in foreign currencies with daily exchange rates, and month-end automated revaluations generate unrealized gain/loss entries automatically." },
      { question: "Can the ERP generate consolidated balance sheets and P&L statements across multiple entities?", answer: "Yes. Multi-company consolidation allows parent holding companies to generate rolled-up P&L, balance sheets, and inter-company elimination entries in one click." }
    ],
    pricingPilot: {
      model: "Custom Enterprise Implementation & Module Licensing",
      starter: "Financial Core: COA, voucher engine, bank reconciliation ($650/mo)",
      growth: "Financials + Inventory: Inventory-GL Bridge, 3-way matching ($1,450/mo)",
      enterprise: "Full Custom Deployment: Multi-company consolidation, custom banking APIs, on-prem setup",
      pilotOffer: "Schedule an architecture discovery session with our engineering leadership."
    }
  }
];

export const productCategories = [
  "All Products",
  "Executive AI & Loss Prevention",
  "AI Voice Intelligence & Customer Experience",
  "Autonomous Voice Booking & Scheduling",
  "Restaurant Operations & Point of Sale",
  "Conversational Website AI & Lead Generation",
  "Enterprise Financial Accounting & Supply Chain"
];

export interface LiveDemoItem {
  id: string;
  /** Matches Product.id; used to pre-select the product on the contact form. */
  productId: string;
  title: string;
  category: string;
  product: string;
  description: string;
  href: string;
  image: string;
  loginRequired: boolean;
  credentials: string;
  featuresToTest: string[];
  buttonLabel: string;
  badge: string;
  isWidgetTrigger?: boolean;
}

export const liveDemoItems: LiveDemoItem[] = [
  {
    id: "retail-ai-demo",
    productId: "business-analytics-ai",
    title: "MarginGuard™ AI Loss Prevention",
    category: "Executive Radar & Loss Prevention",
    product: "MarginGuard",
    description: "Open the MarginGuard demo to see anomaly detection, margin forensics and EBITDA playbooks on sample data.",
    href: DEMO_URLS.analytics,
    image: "/images/products/analytics-dashboard.webp",
    loginRequired: false,
    credentials: "No login required",
    featuresToTest: ["Z-Score Outlier Radar", "Three-Way Margin Forensics", "Algorithmic Account Recovery", "Sub-50ms Redis Caching"],
    buttonLabel: "Open live demo",
    badge: "Interactive"
  },
  {
    id: "nexus-agent-demo",
    productId: "nexus-agent",
    title: "NexusAgent™ Contact OS",
    category: "Voice AI & Incident Intelligence",
    product: "NexusAgent",
    description: "Experience the voice-first customer agent and executive incident dashboard. Real-time Whisper transcription and SLA ticketing.",
    href: DEMO_URLS.nexusAgent,
    image: "/images/products/nexus-dashboard.webp",
    loginRequired: false,
    credentials: "No login required — click microphone to talk",
    featuresToTest: ["Duplex speech recognition", "Silent lead extraction", "Sentiment heatmap", "SLA escalation tickets"],
    buttonLabel: "Open live demo",
    badge: "Interactive"
  },
  {
    id: "ai-booking-demo",
    productId: "ai-voice-booking",
    title: "AetherVoice™ Smart Booking",
    category: "Voice Appointments & Scheduling",
    product: "AetherVoice",
    description: "Test drive sub-second voice appointment scheduling with atomic database slot locking and Google Calendar synchronization.",
    href: DEMO_URLS.voiceBooking,
    image: "/images/products/booking-dashboard.svg",
    loginRequired: false,
    credentials: "Click to start test booking conversation",
    featuresToTest: ["Sub-second voice latency", "Anti-double-booking lock", "Google Calendar sync", "Visual schedule update"],
    buttonLabel: "Open live demo",
    badge: "Interactive"
  },
  {
    id: "pos-ff-demo",
    productId: "pos-fast-food",
    title: "OmniPOS QuickServe™",
    category: "Counter Order & Quick Service",
    product: "OmniPOS",
    description: "Test drive the counter ordering register with tap-to-tender checkout, offline transaction persistence, and cash drawer audits.",
    href: DEMO_URLS.posFastFood,
    image: "/images/products/pos-ff-dashboard.webp",
    loginRequired: false,
    credentials: "Click to open register terminal as Cashier",
    featuresToTest: ["Offline transaction queue", "Fast staff PIN switching", "Rapid combo modifiers", "Cash & card tender flow"],
    buttonLabel: "Open live demo",
    badge: "Interactive"
  },
  {
    id: "pos-res-demo",
    productId: "pos-restaurant",
    title: "CulinaryPOS™ & Kitchen Intelligence",
    category: "Full-Service Table Management",
    product: "CulinaryPOS",
    description: "Explore the visual dining room floor plan, table status tracking, and the digital Kitchen Display System (KDS) with station routing.",
    href: DEMO_URLS.posRestaurant,
    image: "/images/products/pos-res-dashboard.webp",
    loginRequired: false,
    credentials: "Open restaurant floor plan & kitchen screens directly",
    featuresToTest: ["Visual table floor plan", "Kitchen Display KDS pass", "Course pacing hold/fire", "Split-bill checkout"],
    buttonLabel: "Open live demo",
    badge: "Interactive"
  },
  {
    id: "ai-agent-web-demo",
    productId: "ai-agent-web",
    title: "ConciergeWeb™ Cognitive Assistant",
    category: "Conversational Website Concierge",
    product: "ConciergeWeb",
    description: "Interact with the embedded voice and text web assistant. Grounded in business knowledge base with live lead extraction.",
    href: DEMO_URLS.webConcierge,
    image: "/images/products/webagent-dashboard.webp",
    loginRequired: false,
    credentials: "No login required",
    featuresToTest: ["Real-time voice input", "Knowledge base FAQ answers", "Live lead extraction", "Contextual sales alert"],
    buttonLabel: "Open live demo",
    badge: "Interactive"
  },
  {
    id: "erp-demo",
    productId: "erp-financials",
    title: "ScriptoERP™ Financial & Ledger Core",
    category: "Double-Entry Financial Core",
    product: "ScriptoERP",
    description: "Explore the accounting core designed around IFRS/GAAP rules: automatic voucher numbering, post-dated cheque tracking, and inventory-to-ledger sync.",
    href: DEMO_URLS.erp,
    image: "/images/products/erp-dashboard.webp",
    loginRequired: false,
    credentials: "No login required",
    featuresToTest: ["Double-entry validation (Debit=Credit)", "Automatic voucher numbering", "PDC clearing lifecycle", "3-way PO-GRN matching"],
    buttonLabel: "Open live demo",
    badge: "Interactive"
  }
];
