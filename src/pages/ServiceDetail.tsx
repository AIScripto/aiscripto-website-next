import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';
import Seo from "../components/Seo";
import NotFound from './NotFound';
import EnterpriseCta from '../components/EnterpriseCta';
import RelatedPages from '../components/RelatedPages';
import Disclosure from '../components/Disclosure';
import { formatGradientText } from '../utils/textGradient';
import { buildServiceSchema } from '../utils/schema';
import { renderRichText } from '../utils/richText';
import { serviceData } from '../data/services';
import { stockImage } from '../utils/images';
import SpotlightHero, { SpotlightPhoto } from '../components/SpotlightHero';
import { serviceSpotlights, type ServiceSpotlight } from '../data/serviceSpotlight';
import { stockSrcSet } from '../utils/images';

const isStockId = (s: string) => /^\d{10,}-[0-9a-f]{6,}$/.test(s);
const stockIdFromPath = (p: string) => /\/images\/stock\/(\d{10,}-[0-9a-f]{6,})-\d+\.webp$/.exec(p)?.[1] ?? null;

function fallbackSpotlight(title: string, description: string): ServiceSpotlight {
  return {
    eyebrow: title,
    titleLead: title,
    titleAccent: 'built for your business',
    lead: description,
    accent: '#2dd4bf',
    accentInk: '#042f2e',
    cards: [
      { title: 'Discovery first', description: 'We map your workflow before writing code.' },
      { title: 'Built to last', description: 'Tested, observable and documented.' },
      { title: 'You own it', description: 'Full source code and IP transfer.' },
    ],
  };
}


const getImageSrc = (image: string) => {
  if (image.startsWith('/') || image.startsWith('http')) return image;
  return stockImage(image, 960);
};

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const data = id ? serviceData[id as keyof typeof serviceData] : null;


  if (!data) {
    return <NotFound />;
  }

  const DataIcon = data.icon;
  const spot = serviceSpotlights[id as string] ?? fallbackSpotlight(data.shortTitle, data.description);
  // Stage photo: spotlight override, else the service's own image (stock id or /images/stock/<id>-960.webp path).
  const photo = spot.photo ?? stockIdFromPath(data.image) ?? data.image;

  const serviceSchema = buildServiceSchema(id as string, data);
  const schemas = serviceSchema;

  return (
    <>
      <Seo
        title={data.seoTitle ?? data.title}
        description={data.seoDescription ?? data.description}
        schema={schemas}
      />
    <SpotlightHero
      heading={data.h1 ?? data.title}
      eyebrow={spot.eyebrow}
      titleLead={spot.titleLead}
      titleAccent={spot.titleAccent}
      lead={spot.lead}
      accent={spot.accent}
      accentInk={spot.accentInk}
      cards={spot.cards}
      primary={{ label: 'Book a consultation', to: `/contact?topic=${id}` }}
      secondary={{ label: 'See how we work', href: '#service-details' }}
      breadcrumb={
        <Link to="/services" className="inline-flex items-center gap-2 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>All services</span>
          <span className="text-white/40">/</span>
          <span className="text-white">{data.shortTitle}</span>
        </Link>
      }
      media={<SpotlightPhoto src={getImageSrc(photo)} srcSet={isStockId(photo) ? stockSrcSet(photo) : undefined} alt={spot.photoAlt ?? data.title} />}
    />
    <div id="service-details" className="scroll-mt-24">
      {/* Service intro (the spotlight above carries the keyword H1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 section-gap">
        <div className="flex items-start gap-5 max-w-4xl">
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", data.bg, data.color)}>
            <DataIcon className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-h2 font-bold mb-4">{formatGradientText(data.title)}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{data.description}</p>
          </div>
        </div>
      </section>

      {/* Overview + Why Us */}
      <section className="section-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-h3 font-bold mb-6">What This Service Covers</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-12">{renderRichText(data.overview)}</p>
              
              <h2 className="text-h3 font-bold mb-6">How We Work</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{renderRichText(data.approach)}</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-xl self-start relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-brand-primary-ink text-xs font-bold uppercase tracking-wider mb-6">
                Delivery Assurance
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-card-foreground">Why AIScripto for {data.shortTitle}?</h3>
              <ul className="space-y-4">
                {data.whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                    <span className="text-sm text-foreground/90 leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  SLA-Backed Delivery
                </span>
                <span className="font-semibold text-primary">Senior Solutions Architects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Our Process</h2>
            <h3 className="text-3xl md:text-4xl font-bold">How We Deliver</h3>
            <p className="text-base md:text-lg text-muted-foreground mt-4">A straightforward approach focused on results, not process overhead.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.process.map((step, index) => (
              <div key={step.title} className="p-6 md:p-8 rounded-3xl bg-background border border-border hover:border-primary/50 hover:shadow-xl transition-all group reveal">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-primary">Step {index + 1}</span>
                </div>
                <h4 className="text-lg font-bold mb-3">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      {data.caseStudies && (
      <section className="section-band section-gap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-10">
              <span className="block text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-3">Example engagement</span>
              <h2 className="text-h2 font-bold">Typical results</h2>
              <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-2xl">{data.caseStudyDesc}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.caseStudies.map((cs) => {
                const CSIcon = cs.icon;
                return (
                  <div key={cs.metric} className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-xl transition-all text-center group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                      <CSIcon className="w-6 h-6" />
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{cs.metric}</p>
                    <p className="text-sm text-muted-foreground">{cs.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Secondary detail: collapsed by default to keep the page focused */}
      <div className="section-gap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="text-h2 font-bold">More about {data.shortTitle}</h2>
          <p className="text-muted-foreground mt-2">What is included, capabilities, benefits, architecture, technology and common questions.</p>
        </div>
      {/* Features */}
      <Disclosure label="What's included" hint="Deliverables in every engagement">
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">What's Included</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Capabilities</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 p-5 bg-background border border-border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Disclosure>

      {/* Key Capabilities */}
      <Disclosure label="Capabilities" hint="What the team can build and run">
      <section className="pb-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Key Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-bold">What You Get</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.outcomes.map((outcome) => (
              <div key={outcome.title} className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <outcome.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-3">{outcome.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{outcome.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Disclosure>

      {/* Benefits */}
      {data.benefits && (
        <Disclosure label="Benefits" hint="The business outcomes to expect">
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Benefits</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Why Invest in This</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4 p-6 bg-background border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1.5">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </Disclosure>
      )}

      {/* Architecture Highlights & Specialized Engineering Tracks */}
      {data.architectureTracks && (
        <Disclosure label="Architecture tracks" hint="Specialised engineering approaches">
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3 block">
                Engineering Specializations
              </span>
              <h2 className="text-h2 font-bold">
                Technical Tracks & Architecture Disciplines
              </h2>
              <p className="text-base text-muted-foreground mt-4 max-w-2xl">
                Deep architectural expertise applied to solve complex scalability, enterprise integration, and operational reliability challenges.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.architectureTracks.map((track, idx) => (
                <div
                  key={track.title}
                  className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-mono font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">{track.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{track.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </Disclosure>
      )}

      {/* Technologies with descriptions */}
      <Disclosure label="Technologies" hint="Platforms and tools we use">
      <section className="pb-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Technologies</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Tools & Platforms We Use</h3>
            <p className="text-base md:text-lg text-muted-foreground mt-4">We use proven tools and platforms to deliver robust, scalable solutions for our clients.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.technologies.map((tech) => (
              <div key={tech.name} className="p-6 bg-background border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all">
                <h4 className="font-bold text-base mb-2">{tech.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Disclosure>

      {/* Connected Products & Cross-Practice Ecosystem */}
      {data.relatedLinks && (
        <Disclosure label="Connected products & practices" hint="Related products and services">
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-3 block">
                  Cross-Practice Ecosystem
                </span>
                <h2 className="text-h2 font-bold">
                  Connected Products & Related Solutions
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mt-2">
                  Explore how this engineering practice integrates with our proprietary software catalog, adjacent services, and client case studies.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.relatedLinks.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-primary/10 text-brand-primary-ink text-xs font-bold uppercase tracking-wider mb-3">
                      {item.type}
                    </span>
                    <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{item.title}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border/50 text-xs font-bold text-primary">
                    View {item.type} &rarr;
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        </Disclosure>
      )}


      </div>

      {/* Enterprise Service CTA */}
      <RelatedPages />
      <EnterpriseCta
        badge="Enterprise Practice Engagement"
        heading={`Ready to Deploy ${data.title}?`}
        description="Schedule a technical consultation with our practice architects to review feasibility, system integration paths, and dedicated delivery squads."
        primaryButtonText="Book a consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore All Services"
        secondaryButtonLink="/services"
        trustPoints={[
          "Direct Solutions Architect Consultation",
          "Mutual NDA Execution on Request",
          "Detailed Scope & Architecture Estimate"
        ]}
      />
    </div>
    </>
  );
}