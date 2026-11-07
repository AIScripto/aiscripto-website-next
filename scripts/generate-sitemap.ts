import fs from "fs/promises";
import path from "path";
import { blogPosts } from "../src/data/blogPosts";
import { caseStudies } from "../src/data/caseStudies";
import { productsData } from "../src/data/products";
import { serviceData } from "../src/data/services";
import { industryData } from "../src/data/industries";

const siteUrl = "https://www.aiscripto.com";
const pages = [
  "",
  "products",
  "live-demos",
  "about",
  "services",
  "case-studies",
  "blog",
  "insights",
  "industries",
  "leadership",
  "careers",
  "events",
  "contact",
  "privacy-policy",
  "terms-of-service",
  "cookie-policy",
  "global",
  "inventors",
];

const servicePageIds = Object.keys(serviceData);
const industryPageIds = Object.keys(industryData);
const productPageIds = productsData.map((p) => p.id);
const strategicLandingPages = [
  "services/ai-chatbot-development",
  "solutions/ai-receptionist-for-hvac",
  "services/custom-crm-development"
];

/**
 * lastmod must reflect a real content change, otherwise Google learns to ignore it.
 * Only entries with a known date (blog posts) carry lastmod; everything else omits it.
 * changefreq/priority are ignored by Google and are left out.
 */
function toDate(value?: string) {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

function urlEntry(pathname: string, lastmod?: string) {
  const loc = `${siteUrl}/${pathname}`;
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
}

const urlEntries = [
  ...pages.map((page) => urlEntry(page)),
  ...strategicLandingPages.map((page) => urlEntry(page)),
  ...productPageIds.map((id) => urlEntry(`products/${id}`)),
  ...servicePageIds.map((id) => urlEntry(`services/${id}`)),
  ...industryPageIds.map((id) => urlEntry(`industries/${id}`)),
  ...caseStudies.map((entry) => urlEntry(`case-studies/${entry.id}`)),
  ...blogPosts.map((entry) =>
    urlEntry(`blog/${entry.id}`, toDate((entry as { updated?: string }).updated) ?? toDate(entry.date)),
  ),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join("\n")}\n</urlset>\n`;

async function writeSitemap() {
  const outputPath = path.resolve(process.cwd(), "public", "sitemap.xml");
  await fs.writeFile(outputPath, sitemapXml, "utf8");
  console.log(`Generated sitemap at ${outputPath}`);
}

writeSitemap().catch((error) => {
  console.error("Failed to generate sitemap:", error);
  process.exit(1);
});
