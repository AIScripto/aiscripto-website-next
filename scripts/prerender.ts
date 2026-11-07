/**
 * Build-time prerendering.
 *
 * Renders every URL in the sitemap (plus the 404 page) to a static HTML file so
 * crawlers, social scrapers and AI bots receive each page's real title, meta tags,
 * canonical, JSON-LD and body content without running JavaScript.
 *
 * Output layout (served by Vercel with "cleanUrls": true):
 *   /                      -> dist/index.html
 *   /products              -> dist/products.html
 *   /products/nexus-agent  -> dist/products/nexus-agent.html
 *   unknown URLs           -> dist/404.html (real HTTP 404)
 *
 * Run after `vite build` (client) and `vite build --ssr` (server entry).
 */
import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const serverEntry = path.join(root, "dist-server", "entry-server.js");
const SITE_URL = "https://www.aiscripto.com";
const NOT_FOUND_ROUTE = "/__prerender-404__";

type HeadData = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: "website" | "article";
  noIndex: boolean;
  publishedTime?: string;
  schema?: unknown;
};

const escapeAttr = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// JSON inside <script> must not be able to close the tag.
const safeJson = (v: unknown) => JSON.stringify(v).replace(/</g, "\\u003c");

function buildHead(head: HeadData) {
  // A noindex page (404) has no canonical URL of its own.
  const urlTags = head.noIndex
    ? []
    : [
        `<link rel="canonical" href="${escapeAttr(head.canonical)}" />`,
        `<meta property="og:url" content="${escapeAttr(head.canonical)}" />`,
      ];
  const tags = [
    ...urlTags,
    `<meta name="robots" content="${head.noIndex ? "noindex,nofollow" : "index,follow"}" />`,
    `<meta property="og:title" content="${escapeAttr(head.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(head.description)}" />`,
    `<meta property="og:type" content="${head.type}" />`,
    `<meta property="og:image" content="${escapeAttr(head.image)}" />`,
    `<meta property="og:site_name" content="AIScripto" />`,
    `<meta property="og:locale" content="en_US" />`,
    ...(head.type === "article" && head.publishedTime
      ? [`<meta property="article:published_time" content="${escapeAttr(head.publishedTime)}" />`]
      : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(head.image)}" />`,
    ...(head.schema
      ? [`<script type="application/ld+json" id="route-structured-data">${safeJson(head.schema)}</script>`]
      : []),
  ];
  return tags.join("\n    ");
}

function applyToTemplate(template: string, html: string, head: HeadData) {
  let out = template;

  const titleRe = /<title>[\s\S]*?<\/title>/;
  const descRe = /<meta\s+name="description"[\s\S]*?\/>/;
  if (!titleRe.test(out) || !descRe.test(out)) throw new Error("index.html is missing <title> or meta description");

  out = out.replace(titleRe, `<title>${escapeText(head.title)}</title>`);
  out = out.replace(descRe, `<meta name="description" content="${escapeAttr(head.description)}" />`);
  out = out.replace("</head>", `    ${buildHead(head)}\n  </head>`);

  const rootTag = '<div id="root"></div>';
  if (!out.includes(rootTag)) throw new Error(`index.html must contain ${rootTag}`);
  return out.replace(rootTag, `<div id="root">${html}</div>`);
}

function outputFile(url: string) {
  if (url === "/") return path.join(distDir, "index.html");
  if (url === NOT_FOUND_ROUTE) return path.join(distDir, "404.html");
  return path.join(distDir, `${url.replace(/^\//, "")}.html`);
}

async function main() {
  const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");
  const sitemap = await fs.readFile(path.join(root, "public", "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE_URL, "") || "/");
  if (urls.length === 0) throw new Error("No URLs found in public/sitemap.xml");

  const { render } = (await import(pathToFileURL(serverEntry).href)) as {
    render: (url: string) => Promise<{ html: string; head?: HeadData }>;
  };

  const titles = new Map<string, string>();
  const failures: string[] = [];

  for (const url of [...urls, NOT_FOUND_ROUTE]) {
    try {
      const { html, head } = await render(url);
      if (!html || html.length < 500) throw new Error("rendered HTML is empty");
      // <!--$?--> = pending Suspense boundary, <!--$!--> = boundary that errored and
      // falls back to client rendering. Either means bots don't get inline content.
      if (html.includes("<!--$?-->") || html.includes("<!--$!-->")) {
        throw new Error("a Suspense boundary did not finish rendering on the server");
      }
      if (!head) throw new Error("page rendered no <Seo> head data");
      if (url !== NOT_FOUND_ROUTE && head.noIndex) throw new Error("sitemap URL rendered as noindex (likely a 404)");
      if (url !== NOT_FOUND_ROUTE && !/<h1[\s>]/.test(html)) throw new Error("page has no <h1>");

      const file = outputFile(url);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, applyToTemplate(template, html, head), "utf8");

      if (url !== NOT_FOUND_ROUTE) {
        const dupe = titles.get(head.title);
        if (dupe) console.warn(`⚠ duplicate <title> on ${url} and ${dupe}: "${head.title}"`);
        titles.set(head.title, url);
      }
    } catch (error) {
      failures.push(`${url}: ${(error as Error).message}`);
    }
  }

  if (failures.length > 0) {
    console.error(`Prerender failed for ${failures.length} route(s):\n  ${failures.join("\n  ")}`);
    process.exit(1);
  }
  console.log(`Prerendered ${urls.length} pages + 404.html`);
}

main().catch((error) => {
  console.error("Prerender crashed:", error);
  process.exit(1);
});
