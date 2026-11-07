/**
 * Site navigation: the single source for the Navbar mega-menus and the Footer
 * product/service columns. Tests check every product, service and industry page
 * is listed here, so a new page can't be forgotten in the menus.
 */
import { Code, Cloud, Cpu, BarChart, ShieldCheck, Globe, Building2, Landmark, ShoppingBag, PhoneCall, HeartPulse, Zap, Users2, Rocket, Newspaper, CalendarDays, Briefcase, Info, Home, MessageSquare, Sparkles, Headphones, Store, Lightbulb, Bot, Users } from 'lucide-react';

export const megaMenuData = {
  Products: [
    {
      title: "MarginGuard™ AI Loss Prevention",
      description: "Autonomous loss prevention, Z-score outlier detection, and EBITDA defense wrapper.",
      path: "/products/business-analytics-ai",
      icon: BarChart,
      color: "text-sky-700 dark:text-sky-500",
      bg: "bg-sky-500/10",
      image: ""
    },
    {
      title: "NexusAgent™ Contact OS",
      description: "Voice-first 24/7 customer receptionist, lead capture, and incident intelligence.",
      path: "/products/nexus-agent",
      icon: Headphones,
      color: "text-emerald-700 dark:text-emerald-500",
      bg: "bg-emerald-500/10",
      image: ""
    },
    {
      title: "AetherVoice™ Smart Booking",
      description: "Instant phone appointment scheduling (sub-second responses) with anti-double-booking protection.",
      path: "/products/ai-voice-booking",
      icon: PhoneCall,
      color: "text-blue-700 dark:text-blue-500",
      bg: "bg-blue-500/10",
      image: ""
    },
    {
      title: "HVAC AI Receptionist",
      description: "24/7 AI answering service & emergency dispatch for heating and cooling contractors.",
      path: "/solutions/ai-receptionist-for-hvac",
      icon: PhoneCall,
      color: "text-orange-700 dark:text-orange-500",
      bg: "bg-orange-500/10",
      image: ""
    },
    {
      title: "OmniPOS QuickServe™",
      description: "Counter quick-service register terminal with offline queue & tap-to-tender.",
      path: "/products/pos-fast-food",
      icon: Store,
      color: "text-amber-700 dark:text-amber-500",
      bg: "bg-amber-500/10",
      image: ""
    },
    {
      title: "CulinaryPOS™ & Kitchen Intelligence",
      description: "Visual table layout, course pacing hold/fire & digital Kitchen Display System.",
      path: "/products/pos-restaurant",
      icon: Store,
      color: "text-orange-700 dark:text-orange-500",
      bg: "bg-orange-500/10",
      image: ""
    },
    {
      title: "ConciergeWeb™ Cognitive Assistant",
      description: "Embedded website assistant that answers FAQs and qualifies customer leads 24/7.",
      path: "/products/ai-agent-web",
      icon: Cpu,
      color: "text-teal-700 dark:text-teal-500",
      bg: "bg-teal-500/10",
      image: ""
    },
    {
      title: "ScriptoERP™ Financial & Ledger Core",
      description: "IFRS/GAAP double-entry engine, universal voucher control & atomic GL bridge.",
      path: "/products/erp-financials",
      icon: BarChart,
      color: "text-primary",
      bg: "bg-indigo-500/10",
      image: ""
    }
  ],
  Services: [
    {
      title: "AI Agents & Automation",
      description: "Autonomous AI agents, agentic workflows, and intelligent process automation.",
      path: "/services/ai",
      icon: Cpu,
      color: "text-brand-primary-ink",
      bg: "bg-brand-accent/10",
      image: "1485827404703-89b55fcc595e"
    },
    {
      title: "AI Chatbot Development",
      description: "Enterprise custom AI chatbots, deterministic RAG pipelines, and agentic workflows.",
      path: "/services/ai-chatbot-development",
      icon: Bot,
      color: "text-teal-700 dark:text-teal-500",
      bg: "bg-teal-500/10",
      image: ""
    },
    {
      title: "Custom CRM Development",
      description: "AI-powered custom CRM software, sales pipeline automation, and ERP sync.",
      path: "/services/custom-crm-development",
      icon: Users,
      color: "text-primary",
      bg: "bg-indigo-500/10",
      image: ""
    },
    {
      title: "DevOps & SRE",
      description: "CI/CD pipelines, Infrastructure as Code, and cloud-native operations.",
      path: "/services/devops",
      icon: Zap,
      color: "text-primary",
      bg: "bg-primary/10",
      image: "/images/stock/1516321318423-f06f85e504b3-960.webp"
    },
    {
      title: "ERP & CRM Integration",
      description: "Odoo implementation, Salesforce integration, and custom ERP solutions.",
      path: "/services/erp",
      icon: BarChart,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: "1460925895917-afdab827c52f"
    },
    {
      title: "Software Development",
      description: "Custom enterprise solutions, SaaS platforms, and legacy modernization.",
      path: "/services/software",
      icon: Code,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: "1519389950473-47ba0277781c"
    },
    {
      title: "Cloud Solutions",
      description: "AWS, Azure, and Google Cloud migration, optimization, and management.",
      path: "/services/cloud",
      icon: Cloud,
      color: "text-primary",
      bg: "bg-primary/10",
      image: "1451187580459-43490279c0fa"
    },
    {
      title: "Cybersecurity",
      description: "Threat detection, compliance, and production-ready security audits.",
      path: "/services/security",
      icon: ShieldCheck,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: "1563986768609-322da13575f3"
    }
  ],
  Industries: [
    {
      title: "Banking & Finance",
      description: "Core banking transformation, digital payments, and fintech innovation.",
      path: "/industries/banking",
      icon: Landmark,
      color: "text-primary",
      bg: "bg-primary/10",
      image: ""
    },
    {
      title: "Retail & E-commerce",
      description: "Omnichannel retail, supply chain visibility, and customer analytics.",
      path: "/industries/retail",
      icon: ShoppingBag,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: ""
    },
    {
      title: "Telecommunications",
      description: "Network automation, OSS/BSS modernization, and customer experience management.",
      path: "/industries/telecom",
      icon: PhoneCall,
      color: "text-primary",
      bg: "bg-primary/10",
      image: ""
    },
    {
      title: "Healthcare",
      description: "Patient care systems, telemedicine, and secure health data management.",
      path: "/industries/healthcare",
      icon: HeartPulse,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: ""
    },
    {
      title: "Energy & Utilities",
      description: "Smart grid solutions, IoT for energy, and sustainable operations.",
      path: "/industries/energy",
      icon: Zap,
      color: "text-primary",
      bg: "bg-primary/10",
      image: ""
    },
    {
      title: "Public Sector",
      description: "Digital government services and secure citizen engagement platforms.",
      path: "/industries/public-sector",
      icon: Building2,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: ""
    }
  ],
  Insights: [
    {
      title: "Our Blog",
      description: "Thought leadership and expert perspectives on emerging tech.",
      path: "/blog",
      icon: Newspaper,
      color: "text-orange-700 dark:text-orange-500",
      bg: "bg-orange-500/10",
      image: ""
    },
    {
      title: "Case Studies",
      description: "In-depth look at how we solve complex business problems.",
      path: "/case-studies",
      icon: Rocket,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: ""
    },
    {
      title: "Events & Webinars",
      description: "Webinars and session recaps.",
      path: "/events",
      icon: CalendarDays,
      color: "text-primary",
      bg: "bg-primary/10",
      image: ""
    }
  ],
  Company: [
    {
      title: "About Us",
      description: "Our engineering philosophy, principles, and dual-shore delivery model.",
      path: "/about",
      icon: Info,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: ""
    },
    {
      title: "Practice Leadership",
      description: "Architect-led delivery governance across AI, cloud, ERP, and software.",
      path: "/leadership",
      icon: Users2,
      color: "text-primary",
      bg: "bg-primary/10",
      image: ""
    },
    {
      title: "Global Presence",
      description: "Offices across the USA, UK, Italy, and our Pakistan delivery center.",
      path: "/global",
      icon: Globe,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: ""
    },
    {
      title: "Careers",
      description: "High-impact engineering roles in full-stack, AI systems, and cloud.",
      path: "/careers",
      icon: Briefcase,
      color: "text-primary",
      bg: "bg-primary/10",
      image: ""
    },
    {
      title: "Innovation Lab",
      description: "Applied research in sub-second voice AI, offline POS, and loss prevention.",
      path: "/inventors",
      icon: Lightbulb,
      color: "text-brand-primary-ink",
      bg: "bg-brand-primary/10",
      image: ""
    }
  ]
};


export const navLinks = [
  { name: 'Home', path: '/', isMega: false, icon: Home },
  { name: 'Products', path: '/products', isMega: true, icon: Sparkles },
  { name: 'Services', path: '/services', isMega: true, icon: Code },
  { name: 'Industries', path: '/industries', isMega: true, icon: Building2 },
  { name: 'Insights', path: '/insights', isMega: true, icon: Newspaper },
  { name: 'Company', path: '/about', isMega: true, icon: Info },
  { name: 'Contact', path: '/contact', isMega: false, icon: MessageSquare },
];
