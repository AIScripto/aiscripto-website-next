import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

/** Small pill label shown above section and page headings. */
export default function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-brand-primary-ink text-xs font-bold uppercase tracking-wider',
        className,
      )}
    >
      {children}
    </div>
  );
}
