import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { AppContent } from "./App";
import { ThemeProvider } from "./hooks/useTheme";
import { HeadContext, type HeadData } from "./components/HeadContext";

export type { HeadData };

/**
 * Renders one route to static HTML at build time (used by scripts/prerender.ts).
 * prerenderToNodeStream waits for every lazy route / Suspense boundary to resolve,
 * so the output contains the page's real content rather than a loading fallback.
 */
export async function render(url: string): Promise<{ html: string; head?: HeadData }> {
  const collector: { current?: HeadData } = {};

  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <ThemeProvider>
          <StaticRouter location={url}>
            <AppContent />
          </StaticRouter>
        </ThemeProvider>
      </HeadContext.Provider>
    </StrictMode>,
    {
      // React outlines any Suspense boundary larger than this (default ~12 KB) into a
      // hidden segment + inline swap script, meant for streaming. For static HTML we
      // want every page's content inline, readable by bots that don't run JS.
      progressiveChunkSize: Number.POSITIVE_INFINITY,
    },
  );

  let html = "";
  for await (const chunk of prelude) html += chunk;
  return { html, head: collector.current };
}
