import { useId, useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { ButtonLink } from './ui/Button';
import { fieldControlClass } from './ui/Field';

export interface RoiDefaults {
  missedCallsPerWeek: number;
  bookingRatePct: number;
  averageJobValue: number;
}

const WEEKS_PER_MONTH = 52 / 12;
const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const clamp = (n: number, min: number, max: number) => (Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min);

/** Revenue lost to unanswered calls, from the visitor's own numbers. Exported for tests. */
export function estimateLostRevenue({ missedCallsPerWeek, bookingRatePct, averageJobValue }: RoiDefaults) {
  const perWeek = missedCallsPerWeek * (bookingRatePct / 100) * averageJobValue;
  return { perMonth: Math.round(perWeek * WEEKS_PER_MONTH), perYear: Math.round(perWeek * 52) };
}

/**
 * "What are missed calls costing you?" calculator for voice-receptionist pages.
 * Purely client-side; the result is carried into the contact form as context.
 */
export default function RoiCalculator({
  defaults,
  context,
  title = 'What Are Missed Calls Costing You?',
}: {
  defaults: RoiDefaults;
  /** Short product/page label sent with the contact request, e.g. "HVAC AI receptionist". */
  context: string;
  title?: string;
}) {
  const uid = useId();
  const [values, setValues] = useState(defaults);
  const { perMonth, perYear } = estimateLostRevenue(values);
  const set = (key: keyof RoiDefaults, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: clamp(Number(e.target.value), min, max) }));

  const fields: { key: keyof RoiDefaults; label: string; min: number; max: number; step: number; suffix?: string; prefix?: string }[] = [
    { key: 'missedCallsPerWeek', label: 'Missed or after-hours calls per week', min: 0, max: 1000, step: 1 },
    { key: 'bookingRatePct', label: 'Share of those callers who would book', min: 0, max: 100, step: 1, suffix: '%' },
    { key: 'averageJobValue', label: 'Average job / appointment value', min: 0, max: 100000, step: 10, prefix: '$' },
  ];

  const contactTopic = `ROI estimate for ${context}: about ${usd(perYear)}/year in missed-call revenue (${values.missedCallsPerWeek} calls/week, ${values.bookingRatePct}% booking rate, ${usd(values.averageJobValue)} average job)`;

  return (
    <section aria-labelledby={`${uid}-title`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 id={`${uid}-title`} className="text-h3 font-bold">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Enter your own numbers. This is an estimate of revenue lost to calls nobody answers, not a guaranteed result.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 grid grid-cols-1 gap-5">
            {fields.map((f) => (
              <div key={f.key} className="space-y-2">
                <label htmlFor={`${uid}-${f.key}`} className="text-sm font-semibold ml-1">{f.label}</label>
                <div className="relative">
                  {f.prefix && <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{f.prefix}</span>}
                  <input
                    id={`${uid}-${f.key}`}
                    type="number"
                    inputMode="numeric"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={values[f.key]}
                    onChange={set(f.key, f.min, f.max)}
                    className={`${fieldControlClass} ${f.prefix ?'pl-8' : ''} ${f.suffix ? 'pr-10' : ''}`}
                  />
                  {f.suffix && <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">{f.suffix}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-primary/5 border border-primary/20 p-6 text-center" aria-live="polite">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Estimated revenue at risk</p>
            <p className="text-h2 font-black text-primary" data-testid="roi-per-month">{usd(perMonth)}<span className="text-base font-bold text-muted-foreground"> / month</span></p>
            <p className="text-sm text-muted-foreground mt-1 mb-6" data-testid="roi-per-year">{usd(perYear)} per year</p>
            <ButtonLink to={`/contact?topic=${encodeURIComponent(contactTopic)}`} className="w-full">
              Book a demo <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
