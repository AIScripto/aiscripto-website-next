import { createContext } from "react";

/** Everything a page's <Seo> contributes to <head>. */
export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: "website" | "article";
  noIndex: boolean;
  publishedTime?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Only provided during prerendering (see src/entry-server.tsx). <Seo> writes the
 * page's head data here at render time, because effects never run on the server.
 * In the browser there is no provider and <Seo> updates document.head as before.
 */
export const HeadContext = createContext<{ current?: HeadData } | null>(null);
