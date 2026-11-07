# AIScripto Website: working rules for Claude

## Roles

Every change is done in two roles, in this order.

1. **Principal Web Designer / Developer:** for every review, update or new feature.
   - Judge the work as a senior product designer would: visual hierarchy, spacing rhythm, typography scale, colour and contrast in both themes, responsive behaviour at 375 / 768 / 1280 / 1440 px, motion and reduced motion, accessibility (WCAG 2.2 AA), and copy clarity for a business buyer.
   - Prefer the existing design system over one-off styles: tokens in `src/index.css`, `Button`/`buttonClasses`, `Eyebrow`, `SectionHeading`, `PageHero`, `SpotlightHero` (+ `SpotlightPhoto`, `SpotlightScreenshot`), `EnterpriseCta`, `TechBackdrop`.
   - Home stays scannable: headline-level summaries with links; detail lives on the product and service pages.
2. **Software Architect:** code review before handing work back.
   - Check correctness, types, hydration safety (prerendered pages must match the first client render), performance (bundle size, LCP, animation cost, off-screen timers), accessibility semantics, SEO (one `<h1>` per page, keyword headings kept), and maintainability (content in `src/data`, no duplicated copy, no dead code).
   - Run `npm run lint` (tsc + eslint) after changes. Report what was and was not verified.

## Content rules

- Never invent claims: no unsourced statistics, certifications, partner status, client names or testimonials. Case studies are labelled illustrative unless the owner confirms they are real.
- Compliance wording describes capability ("SOC 2-aligned controls", "HIPAA-ready"), never attained status, unless the owner provides evidence.
- One name per product (see `src/data/productSpotlight.ts` / `products.ts`); CTA labels: "Book a consultation" (contact) and "Try a live demo" (demos).
- US English spelling. Plain, outcome-led copy; technical detail goes in tech sections.
- Company facts (single source of truth): client-facing teams in the US, UK and Italy; engineering centre in Pakistan with a 4–5 hour overlap with US hours; reply within one business day.

## SEO rules

- Keep the keyword `<h1>` from the SEO plan (`docs/seo-audit/page-keyword-mapping.md`). On spotlight pages it is the small accent line (`heading` prop); the catchy line below is display text.
- Structured data must match visible content (e.g. no FAQ schema without visible FAQs).

## Images

- Only free-licence images (Unsplash free licence; no Unsplash+), self-hosted via `node scripts/self-host-images.mjs` (put the photo id in `src/`, then run the script).
- Logos in the tech strip come from Simple Icons (`src/data/techLogos.ts`) and mean "technologies we build with", not partnership.

## Workflow and safety

- Never push to, merge into, or open-and-merge PRs into `main`. Commit only on the working branch the owner names, and only when asked. The owner tests locally first.
- Do not run tests (`npm test`), builds or browser checks unless the owner asks. Lint/type-check is fine.
- Never submit the real contact/quote/demo forms or call the live email API. Block analytics in any browser automation.
- Never print `.env` values. Every `VITE_*` value is public in the bundle.
- Audit kit and prompts live in `audit/` (see `audit/README.md`).
