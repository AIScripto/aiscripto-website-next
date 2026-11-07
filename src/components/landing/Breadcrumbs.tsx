import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  /** Omit for the current page (rendered as plain text with aria-current). */
  to?: string;
}

/** Visible breadcrumb trail. (BreadcrumbList structured data is emitted by <Seo>.) */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.to ? (
              <Link to={item.to} className="hover:text-primary transition-colors">{item.label}</Link>
            ) : (
              <span className="text-foreground" aria-current="page">{item.label}</span>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
