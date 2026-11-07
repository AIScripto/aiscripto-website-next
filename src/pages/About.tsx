import { Users, Target, Rocket, Award, Shield, Code, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from "../components/Seo";
import EnterpriseCta from '../components/EnterpriseCta';
import CompanyHubGrid from '../components/CompanyHubGrid';
import PageHero from '../components/PageHero';

export default function About() {
  return (
    <>
      <Seo
        title="About AIScripto — Enterprise Technology & AI Engineering Partner"
        description="Learn how AIScripto partners with enterprises through custom software engineering, autonomous AI agents, and resilient multi-cloud architectures for the US market."
      />
      <div className="pt-32">
        {/* Hero Section */}
        <PageHero
          eyebrow="About AIScripto"
          title={<>Practical software and <span className="text-gradient">AI that does real work</span></>}
          description="AIScripto is a technology and AI product engineering partner. We help growing businesses and product teams turn messy, manual operations into dependable software, from voice agents and analytics to POS, ERP and integrations."
          facts={[
            { label: 'Teams in', value: 'US · UK · Italy · Pakistan', icon: Globe },
            { label: 'Ways to work', value: 'Fixed scope or dedicated squad', icon: Users },
            { label: 'First reply', value: 'Within one business day', icon: Rocket },
            { label: 'Ownership', value: 'You own the code & IP', icon: Shield },
          ]}
        />

        {/* Mission, Vision & Strategic Delivery */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3">Enterprise Delivery Architecture</div>
            <h2 className="text-h2 font-bold">Direct Accountability with High-Velocity Execution</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Combining strategic technical direction with dedicated agile engineering teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="p-8 bg-background border border-border rounded-3xl shadow-sm">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To eliminate repetitive manual work and operational blind spots by engineering reliable software, autonomous AI workflows, and resilient cloud systems that deliver measurable business impact from day one.
                </p>
              </div>
              <div className="p-8 bg-background border border-border rounded-3xl shadow-sm">
                <div className="w-14 h-14 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-brand-secondary-ink mb-6">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Dual-Shore Delivery Advantage</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We operate a dual-shore delivery model: client-facing architects in the US, UK and Italy; engineering and QA centre in Pakistan, with a 4–5 hour daily overlap with US business hours.
                </p>
                <Link to="/global" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
                  Explore our global delivery network across the USA, UK, Italy, and Pakistan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
                <img 
                  src="/images/stock/1522071820081-009f0129c71c-960.webp" 
                  alt="AIScripto Engineering Team Collaboration" 
                  width={576}
                  height={684}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-band section-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <div className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-4">Our Principles</div>
              <h2 className="text-h2 font-bold mb-4">How We Build & Deliver</h2>
              <p className="text-muted-foreground max-w-2xl">
                Our engineering culture is built around technical rigor, open communication, and an uncompromising focus on long-term client value.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
              {[
                { title: "Production-Grade Rigor", desc: "We build systems designed for real-world traffic, strict security compliance, and fault tolerance — never fragile prototypes.", icon: Code },
                { title: "Transparent Governance", desc: "Direct access to senior architects, daily sprint visibility, shared repositories, and honest status updates at every stage.", icon: Shield },
                { title: "Business Outcome Focus", desc: "Every feature, pipeline, and AI agent we build is evaluated by the concrete efficiency or revenue value it creates.", icon: Target },
                { title: "Intellectual Property Protection", desc: "All custom code, trained models, and architectures belong 100% to our clients under clear mutual non-disclosure and licensing terms.", icon: Award },
                { title: "Iterative Velocity", desc: "Short feedback cycles, automated testing, and progressive delivery so you see working software every two weeks.", icon: Rocket },
                { title: "Long-Term Partnership", desc: "From discovery and MVP launch to post-release monitoring, scaling, and team enablement, we stay invested in your success.", icon: Users }
              ].map((value, i) => (
                <div key={i} className="border-t border-border pt-6">
                  <h3 className="flex items-center gap-3 text-lg font-bold mb-3">
                    <value.icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation CTA */}
        <CompanyHubGrid />
        <EnterpriseCta
          badge="Global Engineering Partnership"
          heading="Ready to Partner with a Dual-Shore Engineering Firm?"
          description="Explore how our US, UK and Italy client-facing architects and our Pakistan engineering centre can accelerate your delivery timelines without compromising quality."
          primaryButtonText="Book a consultation"
          primaryButtonLink="/contact"
          secondaryButtonText="Explore Services"
          secondaryButtonLink="/services"
          trustPoints={[
            "Transparent Engineering Governance",
            "Mutual NDA Execution on Request",
            "Sprint-by-Sprint Value Delivery"
          ]}
        />
      </div>
    </>
  );
}
