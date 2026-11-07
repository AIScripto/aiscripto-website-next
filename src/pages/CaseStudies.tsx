import { useState, useMemo } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import Seo from "../components/Seo";
import EnterpriseCta from '../components/EnterpriseCta';

const categories = [
  "All",
  "AI Agents",
  "NexusAgent",
  "Voice & Receptionist",
  "AI Business Analysis",
  "AI ERP",
  "AI POS",
  "Healthcare",
  "Fintech"
];

export default function CaseStudies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStudies = useMemo(() => {
    return caseStudies.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const cat = selectedCategory.toLowerCase();

      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        if (cat === 'ai agents') {
          matchesCategory = item.title.toLowerCase().includes('agent') || item.solution.toLowerCase().includes('agent') || item.tech.some(t => t.toLowerCase().includes('agent') || t.toLowerCase().includes('langchain'));
        } else if (cat === 'nexusagent') {
          matchesCategory = item.title.toLowerCase().includes('nexus') || item.solution.toLowerCase().includes('nexus') || item.tech.some(t => t.toLowerCase().includes('nexus'));
        } else if (cat === 'voice & receptionist') {
          matchesCategory = item.title.toLowerCase().includes('voice') || item.title.toLowerCase().includes('receptionist') || item.title.toLowerCase().includes('booking') || item.solution.toLowerCase().includes('voice');
        } else if (cat === 'ai business analysis') {
          matchesCategory = item.title.toLowerCase().includes('analytics') || item.solution.toLowerCase().includes('analytics') || item.industry.toLowerCase().includes('wholesale');
        } else if (cat === 'ai erp') {
          matchesCategory = item.title.toLowerCase().includes('erp') || item.solution.toLowerCase().includes('erp') || item.tech.some(t => t.toLowerCase().includes('odoo') || t.toLowerCase().includes('erp'));
        } else if (cat === 'ai pos') {
          matchesCategory = item.title.toLowerCase().includes('pos') || item.solution.toLowerCase().includes('pos') || item.industry.toLowerCase().includes('restaurant') || item.industry.toLowerCase().includes('food service');
        } else {
          matchesCategory = item.industry.toLowerCase().includes(cat) || item.solution.toLowerCase().includes(cat);
        }
      }

      if (!q) return matchesCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.industry.toLowerCase().includes(q) ||
        item.solution.toLowerCase().includes(q) ||
        item.results.toLowerCase().includes(q) ||
        item.challenge.toLowerCase().includes(q) ||
        item.tech.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Seo
        title="Enterprise AI & Software Case Studies: Client ROI"
        description="Explore AIScripto case studies: how we automate ERP financial workflows, cut repetitive support work, and deploy autonomous voice AI."
      />
    <div className="pt-32">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            <div className="inline-block text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-4">Enterprise Case Studies</div>
            <h1 className="text-h1 font-bold mb-6">Engineering & <span className="text-gradient">Measurable Impact</span></h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Explore how AIScripto partners with enterprise leaders to deploy production AI agents, autonomous ERP bridges, duplex voice systems, and modern digital architectures.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Client names are withheld; some studies are illustrative composites of typical engagements.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search case studies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted border border-border rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <div className="grid gap-12">
          {filteredStudies.map((item) => (
            <div key={item.id} className="group grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-card rounded-3xl p-8 md:p-12 border border-border hover:border-primary/40 hover:shadow-xl transition-all reveal">
              <div className="relative overflow-hidden rounded-3xl aspect-video">
                <img width={960} height={600} 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <Link to={`/case-studies/${item.id}`} className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 text-sm shadow-xl">
                    Read case study <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 bg-primary/10 text-brand-primary-ink text-xs font-bold rounded-full uppercase tracking-wider">{item.industry}</span>
                  <span className="text-sm text-muted-foreground font-medium">{item.client}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                  <Link to={`/case-studies/${item.id}`}>{item.title}</Link>
                </h2>
                <p className="text-sm font-semibold text-foreground/90">{item.solution}</p>
                <div className="">
                  <p className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-1">Key outcome</p>
                  <p className="text-sm text-foreground/90 font-medium leading-relaxed">{item.results}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium text-muted-foreground bg-muted">{t}</span>
                  ))}
                </div>

                <div className="pt-2">
                  <Link to={`/case-studies/${item.id}`} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm">
                    Read case study <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudies.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No case studies found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-sm font-bold text-primary hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Enterprise Consultation CTA */}
      <EnterpriseCta
        badge="Enterprise Pilot Engagements"
        heading="Ready to see what this could look like for you?"
        description="Schedule a technical discovery session with our engineering practice leaders to map out high-ROI AI automation opportunities with clear delivery milestones."
        primaryButtonText="Book a consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore Ready AI Products"
        secondaryButtonLink="/products"
        trustPoints={[
          "Direct Solutions Architect Consultation",
          "Mutual NDA Execution on Request",
          "Clear Delivery Milestones"
        ]}
      />
    </div>
    </>
  );
}
