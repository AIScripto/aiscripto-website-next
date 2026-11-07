import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { productsData } from '../data/products';
import { blogPosts } from '../data/blogPosts';
import { caseStudies } from '../data/caseStudies';
import { serviceData } from '../data/services';
import { industryData } from '../data/industries';

/**
 * Production serves prerendered files only (vercel.json has no rewrites), so
 * unknown URLs get a real 404. The prerenderer renders exactly the sitemap URLs,
 * therefore a page missing from the sitemap would 404 in production.
 * These tests make that impossible to ship by accident.
 */

const root = process.cwd();
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')) as {
  rewrites?: unknown[];
  redirects: { source: string }[];
  cleanUrls?: boolean;
};
const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
const sitemapPaths = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/www\.aiscripto\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/'),
);

// Vercel path pattern ("/service/:slug*") -> RegExp
const toRegex = (source: string) =>
  new RegExp(
    `^${source
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\/:[A-Za-z]+\*/g, '(?:/.*)?')
      .replace(/:[A-Za-z]+/g, '[^/]+')}$`,
    'i',
  );
const redirected = vercel.redirects.map((r) => toRegex(r.source));
const isRedirect = (p: string) => redirected.some((re) => re.test(p));

describe('production routing', () => {
  it('serves prerendered files directly (no SPA catch-all, clean URLs on)', () => {
    expect(vercel.rewrites ?? []).toEqual([]);
    expect(vercel.cleanUrls).toBe(true);
  });

  it('every static <Route> in App.tsx is in the sitemap or is a server redirect', () => {
    const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
    const routes = [...app.matchAll(/<Route path="([^"]+)" element=\{<(\w+)/g)]
      .filter(([, p]) => p !== '*' && !p.includes(':'))
      .map(([, p, el]) => ({ path: p, isRedirect: el === 'Navigate' }));

    expect(routes.length).toBeGreaterThan(20);
    const missing = routes
      .filter((r) => (r.isRedirect ? !isRedirect(r.path) : !sitemapPaths.has(r.path) && !isRedirect(r.path)))
      .map((r) => r.path);
    expect(missing).toEqual([]);
  });

  it.each([
    ['products', productsData.map((p) => p.id)],
    ['blog', blogPosts.map((p) => p.id)],
    ['case-studies', caseStudies.map((c) => c.id)],
    ['services', Object.keys(serviceData)],
    ['industries', Object.keys(industryData)],
  ])('every /%s/:id detail page is in the sitemap', (section, ids) => {
    expect(ids.length).toBeGreaterThan(0);
    const missing = (ids as string[]).filter((id) => !sitemapPaths.has(`/${section}/${id}`));
    expect(missing).toEqual([]);
  });

  it('every "Related" cross-link points at a real page', async () => {
    const { getRelatedLinks } = await import('../components/RelatedPages');
    const all = ['/services/ai', '/products/ai-voice-booking', '/services/erp']
      .flatMap((p) => [p, ...(getRelatedLinks(p)?.links.map((l) => l.path) ?? [])]);
    expect(all.length).toBeGreaterThan(10);
    expect(all.filter((p) => !sitemapPaths.has(p))).toEqual([]);
  });

  it('every hard-coded internal link in src/ points at a real page', () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) { if (entry.name !== '__tests__') walk(full); }
        else if (/\.(tsx?|ts)$/.test(entry.name)) files.push(full);
      }
    };
    walk(path.join(root, 'src'));

    const linkRe = /(?:\bto=|\bpath:\s*|\bhref:\s*|\bprimaryButtonLink=|\bsecondaryButtonLink=)["'`](\/[a-z0-9\-/]*)[?#"'`]/gi;
    const broken: string[] = [];
    for (const file of files) {
      const src = fs.readFileSync(file, 'utf8').replace(/^\s*\/\/.*$/gm, ''); // ignore commented-out code
      for (const m of src.matchAll(linkRe)) {
        const target = m[1].replace(/\/+$/, '') || '/';
        if (!sitemapPaths.has(target) && !isRedirect(target)) {
          broken.push(`${path.relative(root, file)} -> ${target}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it('sitemap has no URLs that redirect', () => {
    const redirecting = [...sitemapPaths].filter(isRedirect);
    expect(redirecting).toEqual([]);
  });
});

describe('navigation completeness', () => {
  it('menus list every product, service and industry page', async () => {
    const { megaMenuData } = await import('../data/navigation');
    const paths = (key: keyof typeof megaMenuData) => new Set(megaMenuData[key].map((i) => i.path));
    const products = paths('Products');
    const services = paths('Services');
    const industries = paths('Industries');

    expect(productsData.filter((p) => !products.has(`/products/${p.id}`)).map((p) => p.id)).toEqual([]);
    expect(Object.keys(serviceData).filter((id) => !services.has(`/services/${id}`))).toEqual([]);
    expect(Object.keys(industryData).filter((id) => !industries.has(`/industries/${id}`))).toEqual([]);
  });
});

describe('self-hosted images', () => {
  it('every stock photo id used in src/ exists locally in every width (run scripts/self-host-images.mjs)', async () => {
    const { STOCK_WIDTHS } = await import('../utils/images');
    const ids = new Set<string>();
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) { if (entry.name !== '__tests__') walk(full); continue; }
        if (!/\.tsx?$/.test(entry.name)) continue;
        const src = fs.readFileSync(full, 'utf8');
        for (const m of src.matchAll(/["'`/](\d{10,}-[0-9a-f]{6,})(?=["'`-])/g)) ids.add(m[1]);
      }
    };
    walk(path.join(root, 'src'));
    expect(ids.size).toBeGreaterThan(30);

    const missing = [...ids].flatMap((id) =>
      STOCK_WIDTHS.map((w) => `public/images/stock/${id}-${w}.webp`).filter((f) => !fs.existsSync(path.join(root, f))),
    );
    expect(missing).toEqual([]);
  });

  it('no hotlinked Unsplash images remain in src/', () => {
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) { if (entry.name !== '__tests__') walk(full); continue; }
        if (/\.tsx?$/.test(entry.name) && fs.readFileSync(full, 'utf8').includes('images.unsplash.com')) offenders.push(full);
      }
    };
    walk(path.join(root, 'src'));
    expect(offenders).toEqual([]);
  });
});
