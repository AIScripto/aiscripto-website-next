import { Globe, MapPin, Building2, Phone, Mail, Shield, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from "../components/Seo";
import EnterpriseCta from '../components/EnterpriseCta';
import { COMPANY, OFFICES } from '../data/company';
import Eyebrow from '../components/Eyebrow';

export default function Global() {
  const verifiedOffices = OFFICES;

  const deliveryAdvantages = [
    {
      icon: Clock,
      title: 'Dual-Shore Timezone Coverage',
      desc: 'Client-facing architects in the US, UK and Italy; engineering and QA centre in Pakistan, with a 4–5 hour daily overlap with US business hours.'
    },
    {
      icon: Shield,
      title: 'Enterprise IP & Compliance',
      desc: 'All engagements are governed by California, USA law, with strict NDAs, complete source code ownership, and SOC 2-aligned security practices.'
    },
    {
      icon: Building2,
      title: 'Dedicated Engineering Hub',
      desc: 'Our Pakistan delivery center provides dedicated, vetted full-stack engineers, AI developers, and DevOps specialists without the overhead of freelance platforms.'
    },
    {
      icon: Globe,
      title: 'Direct Architectural Oversight',
      desc: 'Every project is led by senior solutions architects who participate directly in sprint planning, code reviews, and weekly stakeholder briefings.'
    }
  ];

  return (
    <>
      <Seo
        title="Global Engineering Hubs & Software Delivery Network"
        description="AIScripto's global software delivery model: client-facing architects in the US, UK and Italy and an engineering centre in Pakistan for enterprise AI and cloud systems."
      />
      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl animate-fade-up [animation-duration:0.5s]">
            <Eyebrow className="mb-6">
              Global Presence & Delivery Network
            </Eyebrow>
            <h1 className="text-h1 font-bold mb-6">
              Dual-Shore Delivery, <span className="text-gradient">Worldwide Impact</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              AIScripto pairs local client management and solution architecture in the United States and Europe (United Kingdom & Italy) with high-velocity engineering teams in our dedicated technology delivery center in Pakistan.
            </p>
          </div>

          {/* Dual-Shore Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {deliveryAdvantages.map((adv, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <adv.icon className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold mb-2 text-foreground">{adv.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>

          {/* Office locations grid */}
          <div className="mb-10">
            <div className="max-w-2xl mb-12">
              <h2 className="text-h2 font-bold mb-3">Our Office Locations</h2>
              <p className="text-muted-foreground text-sm">
                Connect directly with our regional representatives or technology teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {verifiedOffices.map((office, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{office.flag}</span>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary-ink">{office.country}</span>
                          <h3 className="text-xl font-bold text-foreground">{office.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-muted-foreground mb-6 bg-muted/40 p-3.5 rounded-xl border border-border/50">
                      {office.role}
                    </p>

                    <div className="space-y-3.5 text-sm text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm font-medium text-foreground">{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <a href={`mailto:${COMPANY.email}`} className="text-sm hover:text-primary transition-colors">{COMPANY.email}</a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/60">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                    >
                      Connect with this Office <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Global Delivery CTA */}
          <EnterpriseCta
            badge="Global Delivery Model"
            heading="Ready to Build With a Global Engineering Team?"
            description="Whether you need a dedicated product engineering squad or custom AI automation, our US, UK and Italy client leaders and Pakistan engineering squads are ready to assist."
            primaryButtonText="Book a consultation"
            primaryButtonLink="/contact"
            secondaryButtonText="Try a live demo"
            secondaryButtonLink="/live-demos"
            trustPoints={[
              "Time Zone Aligned Collaboration",
              "Mutual NDA Execution on Request",
              "Sprint-by-Sprint Value Delivery"
            ]}
          />
        </div>
      </div>
    </>
  );
}
