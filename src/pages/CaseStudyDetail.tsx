import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import Seo from "../components/Seo";
import NotFound from './NotFound';
import EnterpriseCta from '../components/EnterpriseCta';
import { formatGradientText } from '../utils/textGradient';
import { renderRichText } from '../utils/richText';
import { buildCaseStudySchema } from '../utils/schema';
import { buttonClasses } from '../components/ui/Button';

export default function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const item = caseStudies.find((study) => study.id === id);
  const relatedStudies = caseStudies.filter((study) => study.id !== id).slice(0, 3);

  if (!item) {
    return <NotFound />;
  }

  return (
    <>
      <Seo
        title={item.seoTitle ?? item.title}
        description={item.seoDescription ?? item.solution}
        schema={buildCaseStudySchema(item)}
      />
    <div className="pt-32">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-from-left [animation-duration:0.6s]">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-brand-primary-ink text-xs font-bold rounded-full uppercase tracking-wider">{item.industry}</span>
              <span className="text-sm text-muted-foreground font-medium">{item.client}</span>
            </div>
            <h1 className="text-h1 font-bold mb-6">{formatGradientText(item.title)}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">{item.solution}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className={buttonClasses('primary', 'lg')}
              >
                Discuss Similar Architecture <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className={buttonClasses('outline', 'lg')}
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-scale [animation-duration:0.6s]">
            <div className="relative glass rounded-3xl overflow-hidden border border-border aspect-video shadow-2xl">
              <img width={960} height={600} fetchPriority="high" src={item.image} alt={item.title} className="w-full h-full object-cover" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="p-8 rounded-3xl bg-background border border-border">
              <h2 className="text-2xl font-bold mb-5">Challenge</h2>
              <p className="text-muted-foreground leading-relaxed">{renderRichText(item.challenge)}</p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-border">
              <h2 className="text-2xl font-bold mb-5">AIScripto Approach</h2>
              <p className="text-muted-foreground leading-relaxed">{renderRichText(item.approach)}</p>
            </div>
            <div className="p-8 rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20">
              <h2 className="text-2xl font-bold mb-5">Results</h2>
              <p className="leading-relaxed text-primary-foreground/90">{renderRichText(item.results)}</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Client names are withheld; some studies are illustrative composites of typical engagements.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-4">Project Impact</div>
              <h2 className="text-h2 font-bold mb-10">What Changed for {item.client}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {item.impact.map((point) => (
                  <div key={point} className="flex items-start gap-4 p-6 bg-background border border-border rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <p className="font-medium text-sm text-foreground/90">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="self-start p-8 rounded-3xl bg-muted/30 border border-border">
              <h3 className="text-2xl font-bold mb-6">Technology Used</h3>
              <div className="flex flex-wrap gap-2.5">
                {item.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-mono font-medium">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Work */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-3">More Case Studies</div>
            <h2 className="text-h2 font-bold">Related Engineering Transformations</h2>
          </div>
          <Link to="/case-studies" className="hidden sm:inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedStudies.map((study) => (
            <Link key={study.id} to={`/case-studies/${study.id}`} className="group bg-background border border-border rounded-3xl overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img width={960} height={600} src={study.image} alt={study.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-3">{study.industry}</p>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-4">{study.title}</h3>
                <span className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                  Read case study <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Enterprise CTA */}
      <EnterpriseCta
        badge="Enterprise Engineering Partnership"
        heading={`Looking for Similar Results in ${item.industry}?`}
        description="Schedule a technical consultation to explore how our enterprise AI agents, cloud architectures, or custom software engineering can solve your operational challenges."
        primaryButtonText="Book a consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore All Services"
        secondaryButtonLink="/services"
        trustPoints={[
          "Direct Solutions Architect Consultation",
          "Mutual NDA Execution on Request",
          "Sprint-by-Sprint Delivery"
        ]}
      />
    </div>
    </>
  );
}
