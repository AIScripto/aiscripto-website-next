/**
 * Home page content (rendered by src/pages/Home.tsx and components/home/*).
 */

/** Specialized solutions shown as cards under the services grid. */
export const featuredSolutions = [
  {
    badge: "AI chatbots",
    title: "Custom AI Chatbot Development",
    desc: "Chatbots grounded in your own content and connected to your databases and APIs, with hand-off to your team when needed.",
    link: "Explore chatbot development",
    path: "/services/ai-chatbot-development",
    icon: "chatbot",
    accent: "#2dd4bf",
  },
  {
    badge: "Voice AI",
    title: "24/7 AI Receptionist for HVAC",
    desc: "Answers every call, triages no-heat and no-cooling emergencies after hours and books jobs into your schedule.",
    link: "Explore the HVAC receptionist",
    path: "/solutions/ai-receptionist-for-hvac",
    icon: "voice",
    accent: "#38bdf8",
  },
  {
    badge: "Custom CRM",
    title: "Custom CRM Development",
    desc: "A CRM shaped around your sales process, with automated workflows, no per-seat license fees and two-way ERP sync.",
    link: "Explore custom CRM",
    path: "/services/custom-crm-development",
    icon: "crm",
    accent: "#fbbf24",
  },
] as const;

/** Home "Why AIScripto" trust points (plain language; technical detail lives on /services/security). */
export const homeSecurityPillars = [
  {
    key: "cloud",
    title: "Your cloud, your control",
    description: "Deploy inside your own AWS, Azure or Google Cloud account, or on-premises, with data isolated per client.",
  },
  {
    key: "training",
    title: "Your data never trains models",
    description: "Conversations, documents and financial records are never used to train AI models.",
  },
  {
    key: "ownership",
    title: "You own the code and IP",
    description: "Full source code, infrastructure and intellectual property are handed over on every project.",
  },
  {
    key: "architect",
    title: "A dedicated solutions architect",
    description: "One senior point of contact from first workshop to go-live, with clear SLA options after launch.",
  },
] as const;
