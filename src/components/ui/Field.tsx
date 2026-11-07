import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

/** Standard text input / select / textarea styling. */
export const fieldControlClass =
  'w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all';

/** Label + form control pair. Pass the control as children with a matching `id`. */
export default function Field({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}
