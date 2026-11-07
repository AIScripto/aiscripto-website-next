import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Parses inline markdown-style links [Anchor Text](/destination) and returns
 * accessible React Router Links for internal routes or <a> tags for external links.
 */
export function renderRichText(text: string): React.ReactNode {
  if (!text || typeof text !== 'string' || !text.includes('[')) {
    return text;
  }

  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, label, href] = match;
          if (href.startsWith('/')) {
            return (
              <Link
                key={index}
                to={href}
                className="text-primary font-semibold hover:underline decoration-primary/50 underline-offset-4"
              >
                {label}
              </Link>
            );
          }
          return (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline decoration-primary/50 underline-offset-4"
            >
              {label}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}
