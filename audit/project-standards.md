# Project Module: AIScripto Website

**Status:** Written for the current React + Vite site (branch `pro-enterprise-redesign`, November 2026).
**Loads with dimensions:** security, architecture, performance, reliability, testing, accessibility, ux-design, code-health, documentation, compliance.
**How it is used:** Load it at Stage 3 with the stack modules (`react`, `node-express`, and the CI part of `docker-cicd`). It adds this site's own rules. Breaking a rule below is an audit finding.

**Authoritative sources, in order of precedence:**
1. [`audit/config.md`](/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite/audit/config.md) (scope, safety rules, accepted items, decisions)
2. [`docs/technical-decisions.md`](/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite/docs/technical-decisions.md) (ADRs)
3. [`docs/architecture.md`](/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite/docs/architecture.md) (system architecture)
4. [`vercel.json`](/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite/vercel.json) (headers, CSP, redirects, URL rules)
5. [`docs/seo-audit/`](/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite/docs/seo-audit/) (keyword mapping and metadata decisions)

If a doc and the code disagree, the code is the truth and the doc drift is a documentation finding (for example, `README.md` still names `ChatWidget.jsx`).

---

## 1. SEO, Prerender & Routing Invariants

- [ ] **Every indexable route is prerendered.** Each URL in `public/sitemap.xml` has a matching HTML file from `scripts/prerender.ts` with its own `<title>`, meta description, canonical, Open Graph tags and body content (not an empty root div).
- [ ] **Sitemap matches routes.** `scripts/generate-sitemap.ts` covers every public route and detail slug in `src/data/`, and lists no redirected, removed or 404 URLs.
- [ ] **One canonical URL per page.** Canonicals use `https://www.aiscripto.com`, no trailing slash, and match the `cleanUrls` / `trailingSlash: false` rules.
- [ ] **Unique metadata.** No two pages share a title or description. Values come from `src/config/seoConfig.ts` or page data, not hard-coded copies.
- [ ] **Valid structured data.** JSON-LD from `src/utils/schema.ts` is valid for its type (Organization, Product, Service, Article, FAQPage, BreadcrumbList), and it matches visible content.
- [ ] **Redirects agree in all three places.** `vercel.json` redirects, the `<Navigate>` routes in `src/App.tsx` and the `server.ts` mirror send each old URL to the same target with a permanent status. `src/__tests__/deploy-routes.test.ts` covers them.
- [ ] **Real 404s.** Unknown URLs and unknown detail slugs (`/products/:id`, `/services/:id`, `/blog/:id`, ...) return HTTP 404 with `dist/404.html`. They never return a soft 200.
- [ ] **Hydration is clean.** The prerendered HTML matches the first client render, so there are no hydration warnings. Watch for theme, date, random or `window`-dependent output during render. `src/__tests__/hydration.test.tsx` passes.
- [ ] **AI crawler files stay current.** `public/robots.txt`, `public/llms.txt` and `public/ai-catalog.json` list the current products and services, with no removed ones.

---

## 2. Security & Privacy Standards

- [ ] **No secrets in the bundle.** No private key, admin token or billing key in any `VITE_*` variable, in `src/`, or in `dist/` (ADR-002). `.env` stays untracked; `.env.example` holds placeholders only.
- [ ] **CSP and headers stay tight.** `vercel.json` keeps HSTS, `nosniff`, `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `object-src 'none'` and `base-uri 'self'`. Each `connect-src` / `frame-src` origin is one the site really uses. Any new third party is added on purpose, not with a wildcard.
- [ ] **Chat iframe is safe.** `ChatWidget.tsx` checks `event.origin` against the configured agent origin before acting on any message, sends `postMessage` only to that origin, and gives the iframe only the permissions it needs (microphone for voice).
- [ ] **Forms are not an open relay.** The email API calls in `src/utils/service.ts` cannot be abused to send arbitrary email from the browser. Inputs are validated on the client with clear errors. The audit notes that server-side validation, rate limiting and spam protection belong to the email API repo and records them as "cannot verify here".
- [ ] **No leftover admin calls.** `loginUser`, `getUsers`, `InsertBlog` and `addComments` in `service.ts` are either unused and removed, or used behind real server-side auth. A marketing site must not ship admin endpoints it does not need.
- [ ] **No unsafe HTML.** No `dangerouslySetInnerHTML` with content that is not fully static. Rich text goes through `src/utils/richText.tsx`.
- [ ] **External links are safe.** `target="_blank"` links use `rel="noopener noreferrer"`. WhatsApp and `mailto:` links are built from config, not user input.
- [ ] **Consent before tracking.** Google Analytics / Tag Manager does not set non-essential cookies before consent, if the site serves EU/UK visitors. The cookie policy page (`CookiePolicy.tsx`) matches what the site really does.
- [ ] **Lead data is minimal.** Forms collect only the fields they need, link to the privacy policy, and do not send personal data to analytics.

---

## 3. UI / UX & Brand Standards

- [ ] **Both themes work.** Every page is readable in Dark and Light mode and in all 8 accent colours. Text meets WCAG AA contrast (4.5:1 body, 3:1 large text and UI parts). Colours come from tokens in `src/index.css`, not raw hex in components.
- [ ] **No theme flash.** A visitor who chose Light (or whose system is light) does not see a dark flash on first paint of a prerendered page.
- [ ] **Clear calls to action.** Each page has one main CTA (book a demo, contact, see the product) that is easy to find, with CTAs suited to the page rather than copied everywhere.
- [ ] **Plain English copy.** Headings and body copy are clear to a business buyer. No filler, no invented metrics, no claims (client logos, certifications, stats) the company cannot back up.
- [ ] **Shared components.** Buttons, fields, eyebrows, headings, FAQ accordions, CTAs and cards use the shared components in `src/components/ui/`, `src/components/landing/` and `src/components/`, not one-off copies.
- [ ] **Responsive.** No horizontal page scroll at 360 px. Layout works at 375, 768, 1280 and 1440 px. The mega menu and mobile nav work by touch and keyboard.
- [ ] **Reduced motion.** Hero animations, carousels, rotating capabilities and the agent simulator respect `prefers-reduced-motion` (`src/hooks/usePrefersReducedMotion.ts`) and can be paused when they auto-advance.
- [ ] **Forms give feedback.** Contact, quote and demo forms show labelled fields, inline errors, a loading state, success and failure messages (`react-hot-toast`), and they never lose what the visitor typed on failure.
- [ ] **Accessible dialogs.** `DemoBookingModal` and the chat widget move focus in, trap it, close on Escape and return focus to the trigger.

---

## 4. Performance Standards

- [ ] **Core Web Vitals budget.** On a mid-range phone profile, the home page and top landing pages aim for LCP under 2.5 s, CLS under 0.1 and INP under 200 ms.
- [ ] **Heavy visuals do not block.** The hero neural core, constellation and carousel do not delay LCP, do not run animation loops while off-screen, and stop on reduced motion.
- [ ] **Images.** Images are self-hosted (`scripts/self-host-images.mjs`), in modern formats, sized, with `width`/`height` set, and lazy below the fold. The LCP image is not lazy.
- [ ] **Code splitting.** Pages stay lazy-loaded. Vendor chunks (`vite.config.ts` `manualChunks`) stay under the 600 kB warning. Lucide icons are imported one by one.
- [ ] **Fonts.** Self-hosted variable fonts (`@fontsource-variable/inter`, `space-grotesk`) load without blocking text. No unused weights or subsets.
- [ ] **Third parties load late.** The chat widget, WhatsApp button and analytics load after the main content, not in the critical path.

---

## 5. Architecture & Quality Standards

- [ ] **Content stays in data files.** Page copy, products, services, industries, case studies and FAQs live in `src/data/`, typed, with no duplicated copies across pages.
- [ ] **Hooks rules.** No React hooks called conditionally or after an early return. `eslint-plugin-react-hooks` is on and passes.
- [ ] **Build gate.** `npm run lint` (tsc + eslint, including `jsx-a11y`) passes with 0 errors, and `npm test` and `npm run build` pass. CI runs all of them on pull requests to `main`.
- [ ] **CI matches local.** CI's Node version (20) is supported by every dependency and matches the version the README says. `--legacy-peer-deps` is still needed, or it is removed.
- [ ] **Local server matches Vercel.** `server.ts` applies the same headers, redirects, clean URLs, trailing-slash rule and 404 behaviour as `vercel.json`.
- [ ] **Docs are current.** `README.md` and `docs/architecture.md` describe the current file names, env variables, routes and build steps.
