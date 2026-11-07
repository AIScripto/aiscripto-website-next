import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users2, Globe, Lightbulb, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

/** "Explore the company" hub cards (formerly the /company page; now part of /about). */
const companyPages = [
  {
    title: "Practice Leadership",
    description: "Explore our architect-led practice leadership across AI systems, cloud DevOps, ERP integrations, and software delivery.",
    path: "/leadership",
    icon: Users2,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Global Presence",
    description: "Discover our international offices in the United States, United Kingdom, Italy, and our Pakistan technology delivery center.",
    path: "/global",
    icon: Globe,
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10"
  },
  {
    title: "Careers",
    description: "Explore high-impact engineering opportunities in full-stack development, AI systems, and cloud architecture.",
    path: "/careers",
    icon: Briefcase,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Innovation Lab",
    description: "Review our applied engineering research in sub-second voice AI, offline-first systems, and algorithmic loss prevention.",
    path: "/inventors",
    icon: Lightbulb,
    color: "text-brand-primary-ink",
    bg: "bg-brand-primary/10"
  },
  {
    title: "Client Case Studies",
    description: "Explore verified enterprise client transformations, operational benchmarks, and production architecture blueprints.",
    path: "/case-studies",
    icon: CheckCircle2,
    color: "text-emerald-700 dark:text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];

export default function CompanyHubGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
      <div className="max-w-2xl mb-10">
        <h2 className="text-h2 font-bold">Corporate Hubs & Engineering Organization</h2>
        <p className="text-sm text-muted-foreground mt-2">Explore our practice leadership, international delivery centers, research lab, and client outcomes.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companyPages.map((item) => (
          <div key={item.title} className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all flex flex-col justify-between reveal">
            <div>
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6", item.bg, item.color)}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{item.description}</p>
            </div>
            <div>
              <Link to={item.path} className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
