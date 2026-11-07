import { Mail, Phone, MapPin, Send, Clock, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import { toast } from "react-hot-toast";
import { sendQuote } from "../utils/service";
import { cn } from "../utils/cn";
import { buildLocalBusinessSchema, verifiedOfficesData } from "../utils/schema";
import { COMPANY, OFFICES } from "../data/company";
import Eyebrow from '../components/Eyebrow';
import Field, { fieldControlClass } from '../components/ui/Field';
import { buttonClasses } from '../components/ui/Button';

const inputClass = fieldControlClass;

/** "What do you need?" options, grouped for the select. Values are sent to the email API. */
const contactNeedGroups: { label: string; options: string[] }[] = [
  {
    label: "Products",
    options: [
      "MarginGuard™ AI Loss Prevention",
      "NexusAgent™ Contact OS",
      "AetherVoice™ Smart Booking",
      "OmniPOS QuickServe™",
      "CulinaryPOS™ & Kitchen Intelligence",
      "ConciergeWeb™ Cognitive Assistant",
      "ScriptoERP™ Financial & Ledger Core",
    ],
  },
  {
    label: "Services",
    options: [
      "AI Agents & Automation",
      "Custom AI Chatbot Development",
      "Custom CRM Development",
      "ERP Integration",
      "Custom Software Development",
      "DevOps & Cloud Solutions",
      "Cybersecurity & Compliance",
    ],
  },
  { label: "Other", options: ["Not sure yet / something else"] },
];
const contactServicesList = contactNeedGroups.flatMap((g) => g.options);

export default function Contact() {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get("product");
  const demoParam = searchParams.get("demo");
  const topicParam = searchParams.get("topic");

  const form = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Honeypot: invisible to people, bots tend to fill it in.
  const [website, setWebsite] = useState("");

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    companyURL: "",
    message: "",
    region: "",
    services: [] as string[],
  });

  useEffect(() => {
    if (productParam) {
      const productMap: Record<string, string> = {
        "business-analytics-ai": "MarginGuard™ AI Loss Prevention",
        "nexus-agent": "NexusAgent™ Contact OS",
        "ai-voice-booking": "AetherVoice™ Smart Booking",
        "pos-fast-food": "OmniPOS QuickServe™",
        "pos-restaurant": "CulinaryPOS™ & Kitchen Intelligence",
        "ai-pos": "CulinaryPOS™ & Kitchen Intelligence",
        "ai-agent-web": "ConciergeWeb™ Cognitive Assistant",
        "erp-financials": "ScriptoERP™ Financial & Ledger Core",
      };
      const found = productMap[productParam] || productParam;
      setFormState(prev => ({
        ...prev,
        services: contactServicesList.includes(found) ? [found] : prev.services,
        message: prev.message || `I am interested in scheduling a live demo walkthrough and pilot discussion for ${found}.`
      }));
    } else if (demoParam) {
      setFormState(prev => ({
        ...prev,
        message: prev.message || "I would like to schedule a product demo walkthrough."
      }));
    } else if (topicParam) {
      setFormState(prev => ({
        ...prev,
        message: prev.message || `I'm interested in: ${topicParam.slice(0, 300)}`
      }));
    }
  }, [productParam, demoParam, topicParam]);

  const resetForm = () => {
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      companyURL: "",
      message: "",
      region: "",
      services: [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (website) {
      // Silently accept bot submissions without sending them.
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        phone: formState.phone,
        companyName: formState.companyName,
        companyURL: formState.companyURL,
        region: formState.region,
        services: formState.services,
        checkboxStates: contactServicesList.map((service) => ({
          name: service,
          checked: formState.services.includes(service),
        })),
        message: formState.message,
      };

      const response = await sendQuote(payload);

      if (
        response?.status === 200 ||
        response?.status === 201 ||
        response?.data?.success
      ) {
        toast.success(
          "Thank you for your message! Our team will get back to you shortly."
        );

        resetForm();
        form.current?.reset();
        setSubmitted(true);
      } else {
        toast.error(response?.data?.message || "Failed to send message.");
      }
    } catch (error: unknown) {
      console.error("Error sending quote request:", error);

      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage =
        err?.response?.data?.message ||
        `Something went wrong. Please try again or email ${COMPANY.email}.`;

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <Seo
        title="Contact AIScripto | Schedule an Enterprise AI Consultation"
        description="Schedule an enterprise AI and software engineering consultation with AIScripto. Connect with our solutions architects for project scoping, architecture review, and quotes."
        schema={buildLocalBusinessSchema(verifiedOfficesData)}
      />
      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="animate-fade-from-left [animation-duration:0.8s]">
              <Eyebrow className="mb-6">
                Enterprise AI & Software Consultation
              </Eyebrow>
              <h1 className="text-h1 font-bold mb-6">
                Schedule an Enterprise <br /><span className="text-gradient">AI & Software Consultation</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
                Connect directly with our solutions architects to evaluate your AI automation, cloud migration, ERP integration, or custom software roadmap.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold mb-1">Email Us</h2>
                    <a href={`mailto:${COMPANY.email}`} className="text-muted-foreground hover:text-primary transition-colors">{COMPANY.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold mb-1">Call Us</h2>
                    <a href={COMPANY.phoneHref} className="block text-muted-foreground hover:text-primary transition-colors">{COMPANY.phone}</a>
                    <p className="text-muted-foreground">{COMPANY.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold mb-1">Head Office</h2>
                    <p className="text-muted-foreground">{COMPANY.headOfficeAddress}</p>
                    <Link to="/global" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline mt-1">
                      All {OFFICES.length} offices (US, UK, Italy, Pakistan) <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 rounded-3xl bg-card border border-border">
                <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Enterprise Engagement Standards</h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Fast reply:</strong> Inquiries are reviewed and answered by senior technology directors within one business day.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Mutual NDA Protected:</strong> We are pleased to execute our standard or client-provided mutual non-disclosure agreement before technical discovery.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Send className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Direct Solution Architect Call:</strong> No high-pressure sales scripts — your initial meeting is a technical scoping session.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated rounded-3xl p-8 md:p-12 shadow-2xl relative animate-fade-from-right [animation-duration:0.8s]">

              {submitted ? (
                <div role="status" aria-live="polite" className="text-center py-12">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-6" aria-hidden="true" />
                  <h2 className="text-h3 font-bold mb-3">Thanks, your message is on its way.</h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    A senior solutions architect will reply within one business day with next steps and a link to book your discovery call.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field — hidden from people and assistive tech. */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field id="contact-first-name" label="First Name *">
                    <input
                      id="contact-first-name"
                      required
                      type="text"
                      autoComplete="given-name"
                      placeholder="John"
                      className={inputClass}
                      value={formState.firstName}
                      onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                    />
                  </Field>
                  <Field id="contact-last-name" label="Last Name *">
                    <input
                      id="contact-last-name"
                      required
                      type="text"
                      autoComplete="family-name"
                      placeholder="Doe"
                      className={inputClass}
                      value={formState.lastName}
                      onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field id="contact-email" label="Email Address *">
                    <input
                      id="contact-email"
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="john@company.com"
                      className={inputClass}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </Field>
                  <Field id="contact-phone" label="Phone Number *">
                    <input
                      id="contact-phone"
                      required
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      className={inputClass}
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field id="contact-company" label="Company Name *">
                    <input
                      id="contact-company"
                      required
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Inc."
                      className={inputClass}
                      value={formState.companyName}
                      onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
                    />
                  </Field>
                  <Field id="contact-company-url" label="Company URL">
                    <input
                      id="contact-company-url"
                      type="text"
                      autoComplete="url"
                      placeholder="www.yourcompany.com"
                      className={inputClass}
                      value={formState.companyURL}
                      onChange={(e) => setFormState({ ...formState, companyURL: e.target.value })}
                    />
                  </Field>
                </div>

                <Field id="contact-need" label="What do you need? *">
                  <select
                    id="contact-need"
                    required
                    className={inputClass}
                    value={formState.services[0] ?? ""}
                    onChange={(e) => setFormState({ ...formState, services: e.target.value ? [e.target.value] : [] })}
                  >
                    <option value="">Choose a product or service</option>
                    {contactNeedGroups.map((group) => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </Field>

                <Field id="contact-region" label="Region (optional)">
                  <select
                    id="contact-region"
                    className={inputClass}
                    value={formState.region}
                    onChange={(e) => setFormState({ ...formState, region: e.target.value })}
                  >
                    <option value="">Select Region</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="middle-east">Middle East</option>
                    <option value="africa">Africa</option>
                    <option value="latin-america">Latin America</option>
                    <option value="oceania">Oceania</option>
                  </select>
                </Field>

                <Field id="contact-message" label="Message *">
                  <textarea
                    id="contact-message"
                    required
                    placeholder="Tell us about your project or what you need help with."
                    className={cn(inputClass, "min-h-[140px] resize-none")}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={buttonClasses('primary', 'lg', 'w-full')}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
              )}

              <div className="mt-10 pt-8 border-t border-border grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Reply within one business day</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Global Availability</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
