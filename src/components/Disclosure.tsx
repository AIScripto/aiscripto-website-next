import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Full-width expandable row for secondary page content. Uses native <details>, so it
 * works without JavaScript, is keyboard accessible, and the content stays in the
 * prerendered HTML for search engines.
 */
export default function Disclosure({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <details className="group border-t border-border last:border-b">
      <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-6 hover:text-primary transition-colors">
          <span>
            <span className="block text-xl font-bold font-[family-name:var(--font-display)]">{label}</span>
            {hint && <span className="block text-sm text-muted-foreground mt-1">{hint}</span>}
          </span>
          <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
        </div>
      </summary>
      <div className="pt-2">{children}</div>
    </details>
  );
}
