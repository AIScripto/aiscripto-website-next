import React from 'react';
import { Landmark, ShoppingBag, PhoneCall, HeartPulse, Zap, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import Seo from "../components/Seo";
import EnterpriseCta from '../components/EnterpriseCta';
import { stockImage } from '../utils/images';

const industries = [
  {
    id: "banking",
    title: "Banking & Finance",
    description: "We deploy autonomous AI Agents for real-time fraud detection, automated compliance, and intelligent wealth management, revolutionizing financial services with AI-driven automation.",
    icon: Landmark,
    features: ["Autonomous Fraud Agents", "Automated Compliance", "AI Wealth Management", "Intelligent Risk Assessment"],
    color: "text-primary",
    bg: "bg-primary/10",
    image: "/images/stock/1563013544-824ae1b704d3-960.webp"
  },
  {
    id: "retail",
    title: "Retail & E-commerce",
    description: "Help your retail business with AI Agents that manage inventory, personalize shopping experiences, and automate customer support across all digital channels.",
    icon: ShoppingBag,
    features: ["Personalized Shopping Agents", "Autonomous Inventory Management", "AI Customer Support", "Automated Supply Chain"],
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
    image: "1441986300917-64674bd600d8"
  },
  {
    id: "telecom",
    title: "Telecommunications",
    description: "Accelerate network efficiency with autonomous AI Agents that monitor performance, automate maintenance, and enhance customer self-service through intelligent automation.",
    icon: PhoneCall,
    features: ["Autonomous Network Monitoring", "Automated Service Provisioning", "AI Customer Self-Service", "Intelligent Fault Detection"],
    color: "text-primary",
    bg: "bg-primary/10",
    image: "/images/stock/1551434678-e076c223a692-960.webp"
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Transform patient outcomes with AI Agents that assist in diagnostics, automate administrative workflows, and provide personalized health monitoring through intelligent systems.",
    icon: HeartPulse,
    features: ["Digital Patient Intake", "Automated Patient Scheduling", "Autonomous Health Monitoring", "Intelligent Clinical Workflows"],
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
    image: "/images/stock/1576091160399-112ba8d25d1d-960.webp"
  },
  {
    id: "energy",
    title: "Energy & Utilities",
    description: "Optimize energy distribution with autonomous agents that manage smart grids, automate predictive maintenance, and drive efficiency through intelligent automation.",
    icon: Zap,
    features: ["Autonomous Grid Management", "Automated Predictive Maintenance", "AI Energy Optimization", "Intelligent Utility Billing"],
    color: "text-primary",
    bg: "bg-primary/10",
    image: "1473341304170-971dccb5ac1e"
  },
  {
    id: "public-sector",
    title: "Public Sector",
    description: "Modernize government services with AI Agents that automate citizen inquiries, simplify administrative processes, and enhance public safety through intelligent automation.",
    icon: Building2,
    features: ["Autonomous Citizen Support", "Automated Public Records", "AI Safety Monitoring", "Online Registration Workflows"],
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10",
    image: "1486406146926-c627a92ad1ab"
  }
];

const getImageSrc = (image: string) => {
  if (image.startsWith('/') || image.startsWith('http')) return image;
  return stockImage(image, 960);
};

export default function Industries() {
  return (
    <>
      <Seo
        title="Industry AI Solutions & Digital Transformation"
        description="Discover how AIScripto delivers tailored AI agents, enterprise automation, and custom software for banking, retail, healthcare, telecom, energy, and public sector."
      />
    <div className="pt-32">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <div className="max-w-3xl">
          <div className="inline-block text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-4">Industries We Serve</div>
          <h1 className="text-h1 font-bold mb-6">Specialized Expertise for <span className="text-gradient">Diverse Sectors</span></h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We combine deep industry knowledge with technical excellence to solve the unique challenges of each sector we serve.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-h2 font-bold">Tailored AI & Software Capabilities by Industry</h2>
          <p className="text-sm text-muted-foreground mt-2">Explore our domain-specific architectures, compliance frameworks, and workflow automation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <div key={industry.id} className="group relative bg-background border border-border rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl transition-all reveal">
              <div className="aspect-[4/3] overflow-hidden">
                <img width={960} height={600} 
                  src={getImageSrc(industry.image)} 
                  alt={industry.title} 
                  className="w-full h-full object-cover"
                 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-8">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", industry.bg, industry.color)}>
                  <industry.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{industry.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {industry.description}
                </p>
                <Link 
                  to={`/industries/${industry.id}`} 
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                >
                  Explore Industry <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Custom Industry CTA */}
      <EnterpriseCta
        badge="Custom Industry Solutions"
        heading="Have Industry-Specific Engineering Requirements?"
        description="Our AI systems and software architectures are tailored to meet unique compliance, data isolation, and operational requirements across diverse sectors."
        primaryButtonText="Book a consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore Case Studies"
        secondaryButtonLink="/case-studies"
        trustPoints={[
          "Industry Compliance & Data Isolation",
          "Mutual NDA Execution on Request",
          "Dedicated Domain Solutions Architect"
        ]}
      />
    </div>
    </>
);
}
