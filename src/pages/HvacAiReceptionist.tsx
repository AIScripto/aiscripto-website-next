import React from 'react';
import { CheckCircle2, Flame, PlayCircle } from 'lucide-react';
import Seo from '../components/Seo';
import EnterpriseCta from '../components/EnterpriseCta';
import RelatedPages from '../components/RelatedPages';
import { buildLandingServiceSchema } from '../utils/schema';
import Breadcrumbs from '../components/landing/Breadcrumbs';
import LandingHero from '../components/landing/LandingHero';
import FeatureGrid from '../components/landing/FeatureGrid';
import { serviceMeta, features } from '../data/landing/hvacReceptionist';
import RoiCalculator from '../components/RoiCalculator';

export default function HvacAiReceptionist() {




  const painPoints = [
    {
      stat: "Most",
      label: "Callers Won't Leave a Voicemail",
      desc: "Homeowners with heating or AC emergencies will not leave voicemails—they immediately call the next contractor on Google."
    },
    {
      stat: "After hours",
      label: "When Emergencies Happen",
      desc: "No-heat and AC failures often happen at night and on weekends. Missing even 2 or 3 emergency calls a week adds up quickly; use the calculator below to estimate your own numbers."
    },
    {
      stat: "<1s",
      label: "Conversational Response Time",
      desc: "Our voice model responds without awkward pauses, speaking like an experienced, courteous local HVAC dispatcher."
    }
  ];


  return (
    <>
      <Seo
        title="AI Receptionist for HVAC Companies | 24/7 Answering"
        description="24/7 AI receptionist for HVAC contractors. Answer emergency calls on the first ring with sub-second voice scheduling, calendar sync and on-call alerts."
        schema={buildLandingServiceSchema(serviceMeta)}
      />

      <div className="pt-32">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Solutions", to: "/products" }, { label: "AI Receptionist for HVAC" }]} />


        <LandingHero
          eyebrow={<><Flame className="w-4 h-4" /> 24/7 AI Voice Receptionist for Heating &amp; Cooling</>} eyebrowClassName="bg-orange-500/10 border border-orange-500/20 text-orange-700 dark:text-orange-400 mb-6"
          title={<>24/7 <span className="text-gradient">AI Receptionist for HVAC</span> Companies</>}
          intro={<>Stop losing emergency jobs to voicemail. Our HVAC AI voice agent answers inbound calls on the first ring, triages emergency furnace breakdowns, locks calendar appointments, and dispatches urgent on-call alerts directly to your technicians.</>}
          primary={{ label: "Book a consultation", to: "/contact" }}
          secondary={{ label: "See how it works", to: "/products/ai-voice-booking", icon: <PlayCircle className="w-4 h-4 text-primary" aria-hidden="true" /> }}
        />

        {/* The Missed Call Math (Pain Point Bar) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-card border border-border shadow-md flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-black text-primary mb-2">{item.stat}</div>
                  <h2 className="text-base font-bold text-foreground mb-3">{item.label}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Simulated Conversation Showcase */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-brand-primary-ink">Sub-Second Conversational Latency</div>
              <h2 className="text-h2 font-bold">
                How Our AI Phone Receptionist Handles HVAC Emergency Calls
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Unlike robotic IVR phone trees ("Press 1 for service"), our AI agent for HVAC listens naturally, lets callers interrupt, and handles emergency calls in a calm, empathetic tone. Working as a 24/7 answering service, it understands equipment symptoms even over a noisy furnace fan or a stressed homeowner.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-500 shrink-0" />
                  <span>Captures caller name, phone number, and service address</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-500 shrink-0" />
                  <span>Collects AC/furnace make, age, and diagnostic error symptoms</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-500 shrink-0" />
                  <span>Syncs bookings to Google Calendar or CalDAV, and can integrate with your field-service software via API</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-500 shrink-0" />
                  <span>Captures urgent calls while filtering spam</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-500 shrink-0" />
                  <span>Sends emergency alerts directly to your on-call technician</span>
                </div>
              </div>
            </div>

            {/* Transcript Card */}
            <div className="p-8 rounded-3xl bg-card border border-border shadow-xl">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-foreground">Example call — Sunday 10:42 PM</span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/10 text-orange-700 dark:text-orange-600 border border-orange-500/20">Emergency Furnace Call</span>
              </div>
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-muted/60">
                  <span className="font-bold text-muted-foreground block mb-1">CALLER (HOMEOWNER):</span>
                  "Hi, my heat completely shut off and my house is down to 54 degrees. I have a 3-year-old and need someone tonight!"
                </div>
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-foreground">
                  <span className="font-bold text-primary block mb-1">AI HVAC RECEPTIONIST:</span>
                  "I understand how urgent that is, especially with freezing temperatures. I can dispatch an emergency heating technician to your home tonight. Can I confirm your street address and whether your furnace is gas or electric?"
                </div>
                <div className="p-3 rounded-xl bg-muted/60">
                  <span className="font-bold text-muted-foreground block mb-1">CALLER:</span>
                  "It's 4812 Maple Ridge Road. It's a Carrier gas furnace, it keeps clicking but won't ignite."
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  <span className="font-bold block mb-1">AUTOMATED DISPATCH TRIGGERED:</span>
                  Dispatched priority SMS to On-Call Tech Mike (ETA window locked). Calendar slot reserved.
                </div>
              </div>
            </div>
          </div>
        </section>

        <RoiCalculator
          context="HVAC AI receptionist"
          defaults={{ missedCallsPerWeek: 12, bookingRatePct: 40, averageJobValue: 450 }}
        />

        <FeatureGrid
          kicker="Engineered for Contractors"
          title="Complete HVAC Answering Service & Automation Platform"
          description="Purpose-built for residential and commercial heating and cooling businesses looking to make the most of their field technicians' time."
          items={features}
        />


        {/* CTA */}
        <RelatedPages />
        <EnterpriseCta
          badge="HVAC Field Dispatch Automation"
          heading="Ready to Stop Losing High-Margin Emergency HVAC Jobs?"
          description="Schedule a 15-minute voice demo. We'll set up a live phone test so you can call our AI receptionist directly and hear the conversational quality yourself."
          primaryButtonText="Book a consultation"
          primaryButtonLink="/contact"
          secondaryButtonText="See AetherVoice Smart Booking"
          secondaryButtonLink="/products/ai-voice-booking"
          trustPoints={[
            "Live Phone Test on a 15-Minute Call",
            "Zero Hardware Overhaul Required",
            "No Long-Term Contracts or Cancellation Fees"
          ]}
        />
      </div>
    </>
  );
}
