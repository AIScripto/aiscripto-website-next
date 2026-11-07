import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import SectionHeading from './SectionHeading';

export interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Optional small label shown next to the icon. */
  badge?: string;
}

/** Section heading plus a responsive grid of icon cards. */
export default function FeatureGrid({
  kicker,
  title,
  description,
  items,
}: {
  kicker: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  items: Feature[];
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
      <SectionHeading kicker={kicker} title={title} description={description} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              {item.badge && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                  {item.badge}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
