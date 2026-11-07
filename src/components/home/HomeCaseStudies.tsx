import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Eyebrow from '../Eyebrow';
import { caseStudies } from '../../data/caseStudies';

/** Three case studies across different industries (ids from data/caseStudies.ts). */
const FEATURED_IDS = [
  'ai-voice-booking-dental-clinics',
  'ai-erp-financial-reconciliation-logistics',
  'ai-pos-full-service-hospitality',
];

/**
 * Home "Selected work": proof section with three case-study cards linking to the
 * full write-ups. Labelled honestly: client names withheld, some are illustrative.
 */
export default function HomeCaseStudies() {
  const items = FEATURED_IDS.map((id) => caseStudies.find((c) => c.id === id)).filter(
    (c): c is (typeof caseStudies)[number] => Boolean(c),
  );
  if (items.length === 0) return null;

  return (
    <section className="section-y border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <Eyebrow className="mb-6">Selected work</Eyebrow>
            <h2 className="text-h2 font-bold text-foreground mb-4">
              AI and software projects <span className="text-gradient">delivered for real teams</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              How healthcare, finance and hospitality teams use AI agents, ERP automation and smart POS
              to cut manual work. Client names are withheld; some studies are illustrative composites.
            </p>
          </div>
          <Link
            to="/case-studies"
            className="group inline-flex shrink-0 items-center gap-2 self-start lg:self-end rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
          >
            View all case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={`/case-studies/${item.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt=""
                    width={960}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md">
                    {item.industry}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{item.results}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary-ink">
                    Read case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
