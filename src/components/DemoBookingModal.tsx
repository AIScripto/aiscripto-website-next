import React, { useEffect, useId, useRef, useState } from 'react';
import { X, CheckCircle2, Send, Sparkles, Building, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { sendQuote } from '../utils/service';
import { productsData } from '../data/products';
import { COMPANY } from '../data/company';
import { buttonClasses } from './ui/Button';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

// Options come straight from the product catalog so they can never go stale.
const PRODUCT_OPTIONS = productsData.map((p) => ({ value: p.id, label: `${p.name} — ${p.category}` }));

const TEAM_SIZE_OPTIONS = [
  { value: '1 location / 1-5 staff', label: '1 location (1-5 staff)' },
  { value: '2-5 locations', label: '2-5 locations' },
  { value: '6-20 locations', label: '6-20 locations' },
  { value: '20+ locations / Enterprise', label: '20+ locations / Enterprise' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const inputClass =
  'w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';
const selectClass =
  'w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';
const labelClass = 'block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5';

const resolveProduct = (id?: string) =>
  PRODUCT_OPTIONS.some((o) => o.value === id) ? (id as string) : PRODUCT_OPTIONS[0]?.value ?? '';

const emptyForm = (product?: string) => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  product: resolveProduct(product),
  teamSize: TEAM_SIZE_OPTIONS[0].value,
  challenge: '',
});

export default function DemoBookingModal({ isOpen, onClose, defaultProduct = 'nexus-agent' }: DemoBookingModalProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [formState, setFormState] = useState(() => emptyForm(defaultProduct));
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Re-sync the selected product whenever the modal is opened for a different one.
  useEffect(() => {
    if (isOpen) {
      setFormState((prev) => ({ ...prev, product: resolveProduct(defaultProduct) }));
      setSubmitted(false);
    }
  }, [isOpen, defaultProduct]);

  // Dialog behaviour: scroll lock, initial focus, Esc to close, focus trap, focus restore.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('input, select, textarea, button')?.focus();
    }, 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  const productLabel = PRODUCT_OPTIONS.find((o) => o.value === formState.product)?.label ?? formState.product;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) {
      setSubmitted(true);
      return;
    }
    if (!formState.name || !formState.email) {
      toast.error('Please enter your name and business email.');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendQuote({
        firstName: formState.name,
        lastName: '',
        email: formState.email,
        phone: formState.phone,
        companyName: formState.company,
        region: 'US / Global',
        services: [`Demo Request: ${productLabel}`],
        checkboxStates: [{ name: `Demo: ${productLabel}`, checked: true }],
        message: `[Product Demo Booking] Product: ${productLabel} | Branch/Team Size: ${formState.teamSize} | Business Challenge: ${formState.challenge || '—'}`,
      });
      setFormState(emptyForm(defaultProduct));
      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Error submitting demo booking:', err);
      const apiMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(apiMessage || `Unable to submit request. Please email ${COMPANY.email} or reach out via WhatsApp.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div onClick={onClose} className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in" aria-hidden="true" />

          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={id('title')} aria-describedby={id('desc')} className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl z-10 my-8 animate-fade-scale [animation-duration:0.25s]">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {submitted ? (
              <div role="status" aria-live="polite" className="text-center py-10">
                <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-6" aria-hidden="true" />
                <h2 id={id('title')} className="text-h3 font-bold mb-3 text-card-foreground">Request received, thank you!</h2>
                <p id={id('desc')} className="text-muted-foreground mb-8 leading-relaxed">
                  A solution specialist will email you shortly to confirm a time for your live walkthrough.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className={buttonClasses('primary', 'lg')}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-brand-primary-ink text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> Book a Live 1-on-1 Walkthrough
                  </div>
                  <h2 id={id('title')} className="text-h3 font-bold text-card-foreground">
                    See How AIScripto Powers Your Operations
                  </h2>
                  <p id={id('desc')} className="text-sm text-muted-foreground mt-2">
                    A live walkthrough tailored to your workflow. Zero obligation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor={id('website')}>Website</label>
                    <input id={id('website')} type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={id('name')} className={labelClass}>Your Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <input id={id('name')} type="text" required autoComplete="name" value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="Jane Doe" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor={id('email')} className={labelClass}>Work Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <input id={id('email')} type="email" required autoComplete="email" value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="jane@company.com" className={inputClass} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={id('phone')} className={labelClass}>Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <input id={id('phone')} type="tel" autoComplete="tel" value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })} placeholder="+1 (555) 000-0000" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor={id('company')} className={labelClass}>Company Name</label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <input id={id('company')} type="text" autoComplete="organization" value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })} placeholder="Acme Health or Bistro LLC" className={inputClass} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={id('product')} className={labelClass}>Product of Interest</label>
                      <select id={id('product')} value={formState.product}
                        onChange={(e) => setFormState({ ...formState, product: e.target.value })} className={selectClass}>
                        {PRODUCT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={id('team')} className={labelClass}>Number of Locations / Team Size</label>
                      <select id={id('team')} value={formState.teamSize}
                        onChange={(e) => setFormState({ ...formState, teamSize: e.target.value })} className={selectClass}>
                        {TEAM_SIZE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={id('challenge')} className={labelClass}>Main Business Challenge You Want to Solve</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                      <textarea id={id('challenge')} rows={2} value={formState.challenge}
                        onChange={(e) => setFormState({ ...formState, challenge: e.target.value })}
                        placeholder="e.g. Missed after-hours phone bookings, front-desk staff overload, or branch order sync issues..."
                        className={`${inputClass} py-2 resize-none`} />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button type="button" onClick={onClose}
                      className="rounded-full px-5 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting}
                      className={buttonClasses('primary', 'lg')}>
                      {isSubmitting ? 'Sending...' : (<>Confirm Demo Request <Send className="w-4 h-4" aria-hidden="true" /></>)}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
