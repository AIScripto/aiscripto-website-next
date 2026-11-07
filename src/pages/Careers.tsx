import { MapPin, Rocket, Users2, Code2, Globe, ArrowRight, Mail, Terminal } from 'lucide-react';
import Seo from "../components/Seo";
import { buttonClasses } from '../components/ui/Button';

export default function Careers() {
  const openTracks = [
    {
      title: "Senior Full-Stack Engineer",
      team: "Product Engineering",
      location: "Pakistan Delivery Center / Remote Hybrid",
      stack: "React, TypeScript, Node.js, PostgreSQL, Tailwind",
      description: "Build robust, high-performance web applications and internal product dashboards with strict type safety, clean component architectures, and responsive interfaces."
    },
    {
      title: "AI Systems & RAG Engineer",
      team: "AI Practice",
      location: "Pakistan Delivery Center / Remote Hybrid",
      stack: "Python, FastAPI, LangChain, LangGraph, Vector DBs, Whisper",
      description: "Design and implement autonomous agentic workflows, duplex voice pipelines, and retrieval-augmented generation pipelines connected to enterprise knowledge repositories."
    },
    {
      title: "Cloud DevOps & Platform Engineer",
      team: "DevOps & SRE Practice",
      location: "Pakistan Delivery Center / Remote Hybrid",
      stack: "AWS, Azure, Kubernetes, Docker, Terraform, GitHub Actions",
      description: "Architect and automate resilient CI/CD pipelines, container orchestration, Infrastructure as Code, and observability stacks for client deployments and internal platforms."
    },
    {
      title: "Enterprise Solutions Architect (ERP/CRM)",
      team: "Enterprise Solutions",
      location: "Pakistan Delivery Center / Remote Hybrid",
      stack: "Odoo, Python, PostgreSQL, REST/GraphQL APIs, Salesforce",
      description: "Lead enterprise business application integrations, double-entry financial workflow bridges, and customized ERP modules for mid-market and enterprise clients."
    }
  ];

  const engineeringCulture = [
    {
      icon: Terminal,
      title: "Modern Technical Stack",
      desc: "We write clean, typed code using React 19, TypeScript, Python 3.12, FastAPI, and Terraform. We invest in developer tooling, fast builds, and automated tests."
    },
    {
      icon: Users2,
      title: "Collaborative Peer Reviews",
      desc: "Every pull request is reviewed by senior engineers. We focus on constructive architectural discussions, code hygiene, and continuous knowledge sharing."
    },
    {
      icon: Globe,
      title: "Global Enterprise Exposure",
      desc: "Work directly on systems serving clients in the United States, United Kingdom, and Europe, tackling real concurrency, performance, and security challenges."
    },
    {
      icon: Rocket,
      title: "Merit-Based Growth",
      desc: "Clear career advancement paths from Associate Engineer to Principal Architect based purely on technical impact, delivery discipline, and leadership."
    }
  ];

  return (
    <>
      <Seo
        title="Careers at AIScripto — Build Production AI & Cloud Systems"
        description="Explore high-impact engineering careers at AIScripto. We are hiring senior full-stack developers, AI systems engineers, and DevOps architects, hiring in Lahore and remote."
      />
      <div className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-brand-primary-ink text-xs font-bold uppercase tracking-wider mb-6 animate-fade-up">
              Careers at AIScripto
            </div>
            <h1 className="text-h1 font-bold mb-6 animate-fade-up [animation-delay:0.1s]">
              Build Enterprise Systems & <span className="text-gradient">Production AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl animate-fade-up [animation-delay:0.2s]">
              Join a high-caliber engineering collective building autonomous AI agents, resilient cloud infrastructure, and core enterprise applications for global clients.
            </p>
          </div>
        </section>

        {/* Culture & Engineering Values */}
        <section className="section-y bg-muted/30 border-y border-border section-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <div className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-3">Engineering Culture</div>
              <h2 className="text-h2 font-bold">Why Engineers Excel at AIScripto</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {engineeringCulture.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Engineering Tracks */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-3">Open Opportunities</div>
            <h2 className="text-h2 font-bold mb-3">Featured Engineering Roles</h2>
            <p className="text-muted-foreground text-sm">
              We are actively accepting applications for experienced engineers to join our technology delivery teams.
            </p>
          </div>

          <div className="space-y-6">
            {openTracks.map((role, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider bg-primary/10 text-brand-primary-ink px-3 py-1 rounded-full">
                      {role.team}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-primary" /> {role.location}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-foreground/80">
                      <Code2 className="w-4 h-4 text-primary" /> {role.stack}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <a
                    href={`mailto:careers@aiscripto.com?subject=Application:%20${encodeURIComponent(role.title)}`}
                    className={buttonClasses('primary', 'md')}
                  >
                    Apply for Role <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* General Application Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-muted/40 border border-border p-8 md:p-12 text-center max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <Mail className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Don't See Your Exact Role?</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              We are always interested in connecting with outstanding architects, AI researchers, and technical project leads. Send your resume and GitHub profile directly to our hiring team.
            </p>
            <a
              href="mailto:careers@aiscripto.com?subject=General%20Engineering%20Application%20—%20AIScripto"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              careers@aiscripto.com <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
