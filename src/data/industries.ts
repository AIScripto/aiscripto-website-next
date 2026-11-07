/** Industry pages (/industries/:id). Single source for the page, sitemap and nav checks. */
import { Landmark, ShoppingBag, PhoneCall, HeartPulse, Zap, Building2, BarChart, ShieldCheck, Cpu, Globe } from 'lucide-react';

const industryEntries = {
  banking: {
    title: "Banking & Finance",
    description: "Modernizing financial institutions with secure, scalable, and data-driven technology solutions.",
    icon: Landmark,
    image: "/images/stock/1563013544-824ae1b704d3-960.webp",
    color: "text-primary",
    bg: "bg-primary/10",
    overview: "The financial sector is undergoing a massive digital transformation. We help banks and fintech companies navigate this landscape with core banking modernization, digital payment solutions, and advanced analytics.",
    challenges: [
      "Legacy system constraints and high maintenance costs.",
      "Increasing regulatory compliance and security requirements.",
      "Rising customer expectations for smooth digital experiences.",
      "Competition from agile fintech startups."
    ],
    solutions: [
      {
        title: "Core Banking Modernization",
        desc: "Migrate from legacy systems to agile, cloud-native architectures.",
        icon: Cpu
      },
      {
        title: "Digital Payment Solutions",
        desc: "Implement secure, real-time payment processing and digital wallets.",
        icon: ShieldCheck
      },
      {
        title: "AI for Risk Management",
        desc: "Use machine learning for fraud detection and credit scoring, as detailed in our [fintech fraud platform case study](/case-studies/fintech-fraud-risk-platform).",
        icon: BarChart
      }
    ]
  },
  retail: {
    title: "Retail & E-commerce",
    description: "Creating smooth omnichannel experiences and data-driven retail operations.",
    icon: ShoppingBag,
    image: "1441986300917-64674bd600d8",
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
    overview: "Retail is no longer just about selling products; it's about creating personalized customer journeys. We provide the technology to unify your physical and digital presence.",
    challenges: [
      "Fragmented customer data across multiple channels.",
      "Inefficient supply chain and inventory management.",
      "Difficulty in providing personalized shopping experiences.",
      "High customer acquisition and retention costs."
    ],
    solutions: [
      {
        title: "Omnichannel Commerce",
        desc: "Unify online and offline shopping experiences into a single platform with our [smart restaurant & retail POS systems](/products/pos-restaurant).",
        icon: Globe
      },
      {
        title: "Supply Chain Visibility",
        desc: "Real-time tracking and optimization of inventory and logistics, as demonstrated in our [e-commerce AI agent scaling case study](/case-studies/ai-agent-ecommerce-scaling).",
        icon: BarChart
      },
      {
        title: "Customer Analytics",
        desc: "Data-driven insights to personalize marketing and loyalty programs.",
        icon: Cpu
      }
    ]
  },
  telecom: {
    title: "Telecommunications",
    description: "Automating network operations and customer service for telecom operators.",
    icon: PhoneCall,
    image: "/images/stock/1551434678-e076c223a692-960.webp",
    color: "text-primary",
    bg: "bg-primary/10",
    overview: "Telecom operators are at the heart of the digital economy. We help you automate network management, modernize legacy systems, and deliver superior customer service.",
    challenges: [
      "Complex network management and high operational costs.",
      "Monetizing 5G investments and new service offerings.",
      "Improving customer experience in a highly competitive market.",
      "Modernizing legacy OSS/BSS systems."
    ],
    solutions: [
      {
        title: "Network Automation",
        desc: "AI-driven network management for improved efficiency and reliability.",
        icon: Cpu
      },
      {
        title: "OSS/BSS Modernization",
        desc: "Modernizing legacy OSS/BSS systems and connecting them to cloud services and APIs.",
        icon: Globe
      },
      {
        title: "Customer Experience Management",
        desc: "Personalized service delivery and proactive support solutions.",
        icon: ShieldCheck
      }
    ]
  },
  healthcare: {
    title: "Healthcare",
    h1: "Healthcare AI Solutions & HIPAA-Ready Patient Automation",
    seoTitle: "HIPAA-Ready Healthcare AI Solutions | AIScripto",
    seoDescription: "Deploy HIPAA-ready AI solutions, autonomous patient intake workflows, and FHIR interoperability pipelines for hospitals, clinics, and health systems.",
    description: "Transforming patient outcomes through secure and intelligent health technology.",
    icon: HeartPulse,
    image: "/images/stock/1576091160399-112ba8d25d1d-960.webp",
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
    overview: "Technology is saving lives. We provide secure health data management, telemedicine platforms, and patient intake and scheduling automation to improve patient care.",
    challenges: [
      "Data silos and lack of interoperability between systems.",
      "Stringent data privacy and security regulations (HIPAA).",
      "Increasing demand for remote patient monitoring and telemedicine.",
      "Need for data-driven clinical decision support."
    ],
    solutions: [
      {
        title: "Telemedicine Platforms",
        desc: "Secure, high-performance video consultation and remote monitoring tools, demonstrated in our [patient care platform case study](/case-studies/medical-health-patient-platform).",
        icon: Globe
      },
      {
        title: "Health Data Interoperability",
        desc: "Smooth data exchange between disparate healthcare systems.",
        icon: Cpu
      },
      {
        title: "Clinical Workflow Automation",
        desc: "Intake, scheduling, and follow-up automation that frees clinical staff for patient care.",
        icon: BarChart
      }
    ]
  },
  energy: {
    title: "Energy & Utilities",
    description: "Optimizing energy distribution and implementing sustainable smart grid solutions.",
    icon: Zap,
    image: "1473341304170-971dccb5ac1e",
    color: "text-primary",
    bg: "bg-primary/10",
    overview: "The energy sector is transitioning towards sustainability. We help utilities implement smart grids, optimize distribution, and use IoT for asset management.",
    challenges: [
      "Aging infrastructure and need for grid modernization.",
      "Integrating renewable energy sources into the grid.",
      "Improving operational efficiency and reducing downtime.",
      "Managing complex asset networks and predictive maintenance."
    ],
    solutions: [
      {
        title: "Smart Grid Solutions",
        desc: "Intelligent energy distribution and demand response management.",
        icon: Cpu
      },
      {
        title: "IoT for Asset Management",
        desc: "Real-time monitoring and predictive maintenance of critical infrastructure.",
        icon: ShieldCheck
      },
      {
        title: "Renewable Integration",
        desc: "Technology to manage and optimize the use of solar, wind, and other renewables.",
        icon: Globe
      }
    ]
  },
  "public-sector": {
    title: "Public Sector",
    description: "Modernizing government services for a more efficient and citizen-centric future.",
    icon: Building2,
    image: "1517048676732-d65bc937f952",
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
    overview: "Governments are striving to be more efficient and responsive. We help public sector organizations digitize services, improve citizen engagement, and secure data.",
    challenges: [
      "Legacy systems and slow digital transformation processes.",
      "Need for high-level security and data privacy for citizen information.",
      "Improving accessibility and usability of government services.",
      "Data-driven policy making and resource allocation."
    ],
    solutions: [
      {
        title: "Digital Government Services",
        desc: "Secure, user-friendly portals for citizen engagement, detailed in our [online registration automation case study](/case-studies/online-registration-automation).",
        icon: Globe
      },
      {
        title: "Secure Data Management",
        desc: "Production-Ready security and privacy for public sector data.",
        icon: ShieldCheck
      },
      {
        title: "Smart City Solutions",
        desc: "IoT and data analytics to improve urban living and infrastructure.",
        icon: Cpu
      }
    ]
  }
};

/** Some industries override their SEO title/description or H1; those fields are optional. */
export type IndustryEntry = (typeof industryEntries)[keyof typeof industryEntries] & {
  h1?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export const industryData: Record<keyof typeof industryEntries, IndustryEntry> = industryEntries;
