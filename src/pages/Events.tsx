import { CalendarDays, MapPin, Clock, ArrowRight, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from "../components/Seo";
import { stockImage } from '../utils/images';
import { formatEventDate, splitEvents, type EventItem } from '../data/events';
import { buttonClasses } from '../components/ui/Button';

function EventCard({ event, isPast }: { event: EventItem; isPast: boolean }) {
  return (
    <article className="group bg-background border border-border rounded-3xl overflow-hidden flex flex-col lg:flex-row hover:border-primary/50 transition-all reveal">
      <div className="lg:w-1/3 aspect-video lg:aspect-auto overflow-hidden">
        <img
          src={stockImage(event.image, 960)}
          alt=""
          width={800}
          height={450}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isPast ?'grayscale-[40%]' : ''}`}
         
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-8 lg:p-10 flex-grow flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full uppercase tracking-wider">{event.type}</span>
          {isPast && (
            <span className="px-3 py-1 border border-border text-muted-foreground text-xs font-bold rounded-full uppercase tracking-wider">Past session</span>
          )}
          <time dateTime={event.isoDate} className="text-sm font-bold text-primary">{formatEventDate(event.isoDate)}</time>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-5 group-hover:text-primary transition-colors">{event.title}</h3>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-7">
          <span className="flex items-center gap-2"><Clock className="w-4 h-4" aria-hidden="true" /> {event.time}</span>
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4" aria-hidden="true" /> {event.location}</span>
        </div>
        <Link
          to={`/contact?topic=${encodeURIComponent(event.title)}`}
          className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
        >
          {isPast ? 'Request the session recap' : 'Save my spot'} <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function Events() {
  const { upcoming, past } = splitEvents();

  return (
    <>
      <Seo
        title="AI Webinars & Technical Briefings"
        description="Technical webinars, architecture workshops and executive briefings from AIScripto engineering leaders on enterprise AI, cloud and ERP modernization."
      />
      <div className="pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-4">Knowledge & Exchange</div>
            <h1 className="text-h1 font-bold mb-6">Executive Briefings & <span className="text-gradient">Technical Webinars</span></h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Candid sessions with our practice leads and systems architects on deploying enterprise AI, modernizing legacy systems, and building resilient cloud infrastructure.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap" aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className="text-h2 font-bold mb-8">Upcoming Sessions</h2>
          {upcoming.length > 0 ? (
            <div className="grid gap-8">
              {upcoming.map((event) => <EventCard key={event.id} event={event} isPast={false} />)}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-muted/30 p-10 md:p-14 flex flex-col md:flex-row md:items-center gap-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <BellRing className="w-7 h-7" aria-hidden="true" />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2">Our next sessions are being scheduled</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tell us which topic matters to your team and we'll invite you when dates are confirmed — or book a private briefing with an architect now.
                </p>
              </div>
              <Link
                to="/contact?topic=Event%20invitation"
                className={buttonClasses('primary', 'lg', 'shrink-0')}
              >
                Notify me <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="past-heading">
            <h2 id="past-heading" className="text-h2 font-bold mb-8">Past Sessions</h2>
            <div className="grid gap-8">
              {past.map((event) => <EventCard key={event.id} event={event} isPast />)}
            </div>
          </section>
        )}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="bg-muted/30 rounded-3xl p-12 md:p-16 text-center border border-border">
            <h2 className="text-h2 font-bold mb-5">Keep learning between sessions</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Our engineering blog covers the same topics in depth — architecture patterns, delivery playbooks and lessons from production.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              Read the engineering blog <CalendarDays className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
