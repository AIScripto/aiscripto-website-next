import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import Seo from '../components/Seo';
import EnterpriseCta from '../components/EnterpriseCta';
import SectionHeading from '../components/landing/SectionHeading';
import { blogPosts } from '../data/blogPosts';
import { caseStudies } from '../data/caseStudies';
import { formatEventDate, splitEvents } from '../data/events';
import { stockImage } from '../utils/images';

const byNewest = (a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime();
const latestPosts = [...blogPosts].sort(byNewest).slice(0, 3);
const featuredStudies = caseStudies.slice(0, 3);

function SeeAll({ to, label }: { to: string; label: string }) {
  return (
    <div className="mt-10">
      <Link to={to} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
        {label} <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

/** Insights hub: a live feed of the latest articles, client results and webinars. */
export default function Insights() {
  const { upcoming, past } = splitEvents();
  const event = upcoming[0] ?? past[0];
  const eventIsUpcoming = Boolean(upcoming[0]);

  return (
    <>
      <Seo
        title="Insights Hub: Blog, Case Studies & Webinars"
        description="The latest AIScripto engineering articles, client case studies, and technical webinars on enterprise AI, cloud, and ERP, in one place."
      />
      <div className="pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="max-w-3xl">
            <div className="inline-block text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-4">Insights & Analysis</div>
            <h1 className="text-h1 font-bold mb-6">
              Ideas, Results, and <span className="text-gradient">Technical Learning</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              The newest engineering articles, client outcomes, and technical briefings from the AIScripto team.
            </p>
          </div>
        </section>

        {/* Latest articles */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap" aria-labelledby="latest-articles">
          <SectionHeading kicker="From the blog" title={<span id="latest-articles">Latest Articles</span>} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt="" width={960} height={540} loading="lazy" decoding="async"
                    className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground mb-3">
                    <span className="text-primary">{post.category}</span>
                    <span aria-hidden="true">•</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" aria-hidden="true" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <SeeAll to="/blog" label="Read all articles" />
        </section>

        {/* Client results */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap" aria-labelledby="client-results">
          <SectionHeading kicker="Case studies" title={<span id="client-results">Client Results</span>} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStudies.map((study) => (
              <Link
                key={study.id}
                to={`/case-studies/${study.id}`}
                className="group flex flex-col rounded-3xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-xl transition-all"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink mb-2">{study.industry}</span>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{study.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{study.results}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary mt-5">
                  Read the case study <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <SeeAll to="/case-studies" label="See all case studies" />
        </section>

        {/* Webinars */}
        {event && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap" aria-labelledby="webinars">
            <SectionHeading kicker="Events & webinars" title={<span id="webinars">{eventIsUpcoming ? 'Next Session' : 'Latest Session'}</span>} />
            <Link
              to="/events"
              className="group grid grid-cols-1 md:grid-cols-3 rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all"
            >
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img src={stockImage(event.image, 960)} alt="" width={960} height={540} loading="lazy" decoding="async"
                  className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  <span>{event.type}</span>
                  <span aria-hidden="true">•</span>
                  <span className="inline-flex items-center gap-1 text-primary">
                    <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                    <time dateTime={event.isoDate}>{formatEventDate(event.isoDate)}</time>
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{event.title}</h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  {eventIsUpcoming ? 'See details and register' : 'See all sessions'} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </section>
        )}

        <EnterpriseCta
          badge="Enterprise Architecture"
          heading="Ready to Discuss Your Organization's Roadmap?"
          description="Connect with a senior solutions architect to explore how our enterprise engineering practices can deliver measurable ROI for your business."
          primaryButtonText="Book a consultation"
          primaryButtonLink="/contact"
          secondaryButtonText="Explore Ready AI Products"
          secondaryButtonLink="/products"
          trustPoints={[
            "Direct Solutions Architect Consultation",
            "Mutual NDA Execution on Request",
            "Transparent Engineering Governance"
          ]}
        />
      </div>
    </>
  );
}
