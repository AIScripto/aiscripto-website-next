# AIScripto Website — Complete Architecture Audit & Technical Review

**Document Version:** 1.0.0  
**Audit Date:** October 2026  
**Auditor:** Principal Software Architect & DevOps/Security Specialist  
**Repository:** `AIScriptWebSite` (`DevAnalysts/AIScriptWebSite`)  
**Target Domain:** `https://aiscripto.com`  

---

## 1. Executive Summary

A comprehensive, end-to-end architecture audit was conducted on the AIScriptWebSite codebase. The project is an enterprise marketing and product application for AIScripto, built with **React 19**, **Vite 6**, **Tailwind CSS v4**, and a lightweight **Express 4** development/production proxy. 

The application features 25 routed pages, 7 flagship product showcases, 6 core enterprise services, interactive live demos, customer case studies, and an embedded voice AI chatbot widget.

While the user interface design is modern and aesthetic, the audit uncovered **critical and high-priority technical issues** spanning security vulnerabilities, supply chain bloat, client-side secret exposure risk, broken internal routes, missing production security headers on Vercel, loose TypeScript checks, absent automated tests, and double-branding SEO bugs.

This document details all verified findings, categorized by severity with exact codebase evidence, root cause analysis, and remediation strategies.

---

## 2. Technology Stack & Architecture Inventory

| Layer | Current Technology | Version | Evaluation & Status |
| :--- | :--- | :--- | :--- |
| **Language & Runtime** | TypeScript / Node.js | TS ~5.8.2 / Node 18+ | Target `ES2022`, module `ESNext`. `"strict": true` was disabled due to untyped API layer. |
| **Frontend Framework** | React / React-DOM | 19.0.0 | Latest major React version. Uses React Router DOM v7 for SPA routing. |
| **Routing** | React Router DOM | 7.13.1 | SPA client-side routing. Vulnerable to known CVEs in 7.13.1 (turbo-stream/RSC). |
| **Build Tooling** | Vite | 6.2.0 | High performance build engine. Contains duplicate entry in dependencies & devDependencies. |
| **Styling** | Tailwind CSS (Vite plugin) | 4.1.14 | Modern Tailwind v4 with `@theme` CSS variables and custom utility tokens. |
| **Animation & UI** | Motion (Framer Motion) / Lucide | 12.23.24 / 0.546.0 | Excellent interactive micro-animations and SVG icon coverage. |
| **State & Data** | Local React State / In-Memory Modules | N/A | Static data arrays in `src/data/` for products, services, case studies, and blogs. |
| **HTTP Client** | Axios | 1.17.0 | Used in `src/utils/service.ts` for backend contact and quote submissions. |
| **Server / Proxy** | Express | 4.21.2 | Local dev Vite middleware proxy and static production file server in `server.ts`. |
| **Unused Dependencies** | `@google/genai`, `better-sqlite3` | 1.29.0 / 12.4.1 | **Bloat:** Never imported or used. `@google/genai` introduces vulnerable `protobufjs`. |
| **Deployment Platform**| Vercel | Static SPA | Configured via `vercel.json` with SPA rewrite rule `/(.*) -> /index.html`. |
| **Testing & CI/CD** | None | None | **Missing:** No test runner, no test suites, no GitHub Actions CI workflow. |

---

## 3. Prioritized Audit Findings

### Priority 0 — Critical

#### [FINDING-SEC-01] Critical & High Supply Chain Vulnerabilities in Dependencies
- **Affected Components:** `package.json`, `package-lock.json`
- **Observed Behavior:** `npm audit` flags 21 vulnerabilities (2 Critical, 13 High, 3 Moderate, 3 Low).
  - `protobufjs` <=7.6.4 (Critical: Arbitrary code execution / prototype pollution) pulled transitively by `@google/genai`.
  - `react-router` / `react-router-dom` 7.13.1 (High: Unauthenticated constructor injection/RCE, single-fetch XSS).
  - `proxy-addr` 1.1.0 - 2.0.7 (Critical: IP spoofing via IPv4-mapped IPv6 trust subnet) pulled by Express.
  - `esbuild` 0.27.3 - 0.28.0 (High: Arbitrary file read in dev server).
  - `postcss` <=8.5.22, `nanoid`, `ws`, `source-map-js`.
- **Evidence:** `npm audit` exit code 1 with 21 vulnerabilities. Neither `@google/genai` nor `better-sqlite3` is imported anywhere in the repository.
- **Impact:** Critical security exposure during development, build, and potential production attack vectors.
- **Recommendation:**
  1. Remove unused dependencies `@google/genai` and `better-sqlite3`.
  2. Upgrade `react-router-dom` and related packages to patched versions.
  3. Execute `npm audit fix` for remaining direct/transitive packages and verify zero regressions.

---

### Priority 1 — High

#### [FINDING-SEC-02] Insecure Injection of `GEMINI_API_KEY` into Client Bundle Define
- **Affected Component:** `vite.config.ts` (Line 11)
- **Observed Behavior:** `vite.config.ts` defines `'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)`.
- **Evidence:** Line 11 of `vite.config.ts`. The Gemini API key is never used in client code, yet any client file or dependency referencing `process.env.GEMINI_API_KEY` will have the secret embedded in plain text in the public production build assets.
- **Impact:** Secret leakage risk if an API key is configured in `.env` during builds.
- **Recommendation:** Remove `'process.env.GEMINI_API_KEY'` define from `vite.config.ts`. If AI API calls are ever needed, route them through an authenticated backend server endpoint.

#### [FINDING-SEC-03] Production Security Headers Absent on Vercel Static Hosting
- **Affected Component:** `vercel.json` vs `server.ts`
- **Observed Behavior:** `server.ts` configures HTTP security headers (`Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`), but `server.ts` is only executed in local Node development. In production on Vercel, static files and SPA routes are served directly by Vercel edge nodes using `vercel.json`, which does NOT define these headers.
- **Evidence:** `vercel.json` only sets `Content-Security-Policy` for `/voice` routes, leaving all other routes without basic HTTP security headers.
- **Impact:** Production website on Vercel lacks HSTS, clickjacking defense, MIME-type sniffing protection, and strict referrer policy.
- **Recommendation:** Add global `headers` configuration for `"source": "/(.*)"` in `vercel.json`.

#### [FINDING-ROUT-01] 404 URL Ranking in Google Search Console (`/service/custom-software-development`)
- **Affected Components:** `App.tsx`, `vercel.json`
- **Observed Behavior:** Google Search Console data confirms `https://www.aiscripto.com/service/custom-software-development` is being crawled and ranked at position 7.00. However, the application uses plural `/services/:id`. Requests to singular `/service/*` trigger the 404 NotFound page.
- **Evidence:** `docs/seo-audit/technical-seo-issues.md` (TECH-01) and GSC Top Pages audit.
- **Impact:** High loss of organic traffic, high bounce rate, and wasted SEO ranking equity on a high-value commercial keyword.
- **Recommendation:** Add 301 redirects in `vercel.json` and client-side routing fallback from `/service/custom-software-development` to `/services/software`, and `/service/(.*)` to `/services/$1`.

#### [FINDING-ROUT-02] Broken Internal Links to Inexistent Product `/products/ai-pos`
- **Affected Components:** `src/components/Navbar.tsx` (Line 457), `src/components/Footer.tsx` (Line 71)
- **Observed Behavior:** Both the Navbar trending ticker and Footer product links point to `/products/ai-pos`. The actual product slug is `pos-restaurant` (with sister product `pos-fast-food`). Clicking this link displays "Product Not Found".
- **Evidence:** `src/data/products.ts` defines `id: "pos-restaurant"` and `id: "pos-fast-food"`. No product has `id: "ai-pos"`.
- **Impact:** Broken navigation on primary UI elements leading to degraded user trust and 404 user experiences.
- **Recommendation:** Update link targets to `/products/pos-restaurant` in `Navbar.tsx` and `Footer.tsx`, and add a permanent client redirect from `/products/ai-pos` to `/products/pos-restaurant`.

#### [FINDING-ROUT-03] Broken Footer Link to Inactive Product `/products/calibr`
- **Affected Component:** `src/components/Footer.tsx` (Line 73)
- **Observed Behavior:** Footer links to `/products/calibr`. The product was commented out in `src/data/products.ts` (`// id: "resource-competency-management"`). Navigating to `/products/calibr` renders "Product Not Found".
- **Evidence:** `Footer.tsx` line 73 and `products.ts` line 1040.
- **Impact:** 404 page displayed when prospective customers click on featured product in footer.
- **Recommendation:** Replace `/products/calibr` link in `Footer.tsx` with active product `Business Analytics AI` (`/products/business-analytics-ai`), and add a route redirect from `/products/calibr` to `/products`.

#### [FINDING-OPS-01] Complete Absence of Automated Testing Pipeline
- **Affected Components:** Entire repository, `package.json`
- **Observed Behavior:** No test runner is installed (no Vitest/Jest/Playwright). There are zero test files in the codebase, and no automated CI/CD pipeline to validate pull requests or deployments.
- **Evidence:** `find . -name "*.test.*"` returns no project test files; `package.json` lacks a `test` script.
- **Impact:** High regression risk on every commit; inability to verify routing, metadata, or form submission behavior automatically.
- **Recommendation:** Install Vitest and React Testing Library, create unit/regression test suites for routing, metadata, and core user flows, and configure an `npm test` script.

---

### Priority 2 — Medium

#### [FINDING-ARCH-01] Disabled Strict Type Checking & Untyped API Client
- **Affected Components:** `tsconfig.json`, `src/utils/service.ts`
- **Observed Behavior:** `tsconfig.json` omits `"strict": true`. Running `tsc --strict` flags 13 implicit `any` parameter errors exclusively in `src/utils/service.ts`.
- **Evidence:** `npx tsc --noEmit --strict` fails with 13 errors in `service.ts` (`mailData`, `quoteData`, `blogs`, `blogId`, etc.).
- **Impact:** Weak type safety across the application, allowing uncaught runtime type bugs to pass compilation.
- **Recommendation:** Add explicit TypeScript interfaces (`QuoteRequestPayload`, `EmailPayload`, `BlogPayload`) in `service.ts` and enable `"strict": true` in `tsconfig.json`.

#### [FINDING-ARCH-02] Silent Failure & False Success Toast in Demo Booking Modal
- **Affected Component:** `src/components/DemoBookingModal.tsx` (Lines 54-58)
- **Observed Behavior:** When `sendQuote` fails in `DemoBookingModal.tsx`, the `catch` block logs a warning but shows a green success toast: `"Thank you! Your demo request has been logged. We will reach out shortly."`
- **Evidence:** Lines 54-58 of `DemoBookingModal.tsx`.
- **Impact:** If backend services or network fail, high-value enterprise sales leads are silently dropped while users believe their request succeeded.
- **Recommendation:** Show an explicit error toast when submission fails and display fallback contact information (direct email `support@aiscripto.com` and WhatsApp link).

#### [FINDING-SEC-04] PostMessage Origin Deserialization Bug in ChatWidget
- **Affected Component:** `src/components/ChatWidget.jsx` (Lines 6, 32)
- **Observed Behavior:** `AGENT_ORIGIN` default has a trailing slash (`"https://voiceagent-aiscripto.vercel.app/"`), while browser `event.origin` never has a trailing slash. The strict equality `event.origin !== AGENT_ORIGIN` rejects legitimate postMessages, triggering the 12-second error fallback.
- **Evidence:** `ChatWidget.jsx` lines 6 & 32.
- **Impact:** Voice agent widget intermittently or consistently fails to report 'ready' status.
- **Recommendation:** Normalize origins using `new URL(origin).origin` and convert `ChatWidget.jsx` to TypeScript (`.tsx`).

#### [FINDING-SEO-01] Double Branding in Service Detail Titles
- **Affected Component:** `src/pages/ServiceDetail.tsx` (Line 410)
- **Observed Behavior:** `ServiceDetail.tsx` passes `title={`${data.title} | AIScripto`}` to `<Seo />`. Since `Seo.tsx` applies `titleTemplate: "%s | AIScripto"`, the resulting document title is `AI Agents & Automation | AIScripto | AIScripto`.
- **Evidence:** `ServiceDetail.tsx` line 410 and `Seo.tsx` line 58. Verified in GSC audit TECH-03.
- **Impact:** Unprofessional SERP snippets, diluted keyword relevance, and lower CTR.
- **Recommendation:** Pass `title={data.title}` directly without manually appending the brand suffix.

#### [FINDING-SEO-02] Generic Titles on High-Impression Hub Pages
- **Affected Components:** `Services.tsx`, `Company.tsx`, `Insights.tsx`, `CaseStudies.tsx`
- **Observed Behavior:** Hub pages use minimal, unoptimized title tags like `"Our Services"`, `"Company"`, `"Insights"`, and `"Case Studies"`.
- **Evidence:** GSC report shows top-3 rankings with 0% CTR due to non-descriptive SERP snippets.
- **Impact:** Lost organic clicks from buyers looking for enterprise AI, cloud, and ERP engineering services.
- **Recommendation:** Update metadata on all hub pages with high-intent commercial modifiers as recommended in the SEO audit roadmap.

#### [FINDING-SEO-03] Oscillating Homepage H1 in Carousel Loop
- **Affected Component:** `src/pages/Home.tsx` (Lines 155-160)
- **Observed Behavior:** The primary `<h1>` on the homepage is nested inside the auto-playing hero slider (`productsData[heroSlide].name`), causing the H1 to change every 4.5 seconds between individual product names.
- **Evidence:** `Home.tsx` line 155.
- **Impact:** Search crawlers inspecting the page receive inconsistent or fragmented topical signals rather than a stable, authoritative H1 representing AIScripto's core B2B value proposition.
- **Recommendation:** Render a stable, visible primary H1 above or integrated into the hero (`Enterprise AI Solutions, Intelligent Automation & Custom Software Engineering`).

#### [FINDING-SEO-04] Canonical Domain Inconsistency (Apex vs WWW)
- **Affected Components:** `public/llms.txt`, `public/ai-catalog.json`, `src/config/seoConfig.ts`, `scripts/generate-sitemap.ts`
- **Observed Behavior:** `llms.txt` and `ai-catalog.json` specify `https://www.aiscripto.com`, while `seoConfig.ts`, `generate-sitemap.ts`, and `robots.txt` specify `https://aiscripto.com`.
- **Evidence:** Inconsistent domain references across repository metadata assets.
- **Impact:** Split domain authority, canonical confusion for AI scrapers and search bots.
- **Recommendation:** Standardize on apex domain `https://aiscripto.com` across all assets and enforce 301 redirect from `www` to non-`www` in `vercel.json`.

---

### Priority 3 — Low / Maintainability

#### [FINDING-MAINT-01] Package Name Left as Template Default
- **Affected Component:** `package.json` (Line 2)
- **Observed Behavior:** `"name": "react-example"`.
- **Recommendation:** Update to `"name": "aiscripto-website"`.

#### [FINDING-MAINT-02] Unwired Search Inputs in UI
- **Affected Components:** `Navbar.tsx` (Line 534), `Blog.tsx` (Line 28)
- **Observed Behavior:** Search inputs lack event handlers and state management.
- **Recommendation:** Wire up search filtering on the Blog page and connect Navbar search to filter products or blog articles.

#### [FINDING-MAINT-03] Incorrect Link in Navbar Utility Bar
- **Affected Component:** `Navbar.tsx` (Line 320)
- **Observed Behavior:** Link labeled "Global" points to `/about` instead of `/global`.
- **Recommendation:** Change href to `/global`.

#### [FINDING-MAINT-04] Mixed Language Formats (`.jsx` in TypeScript Project)
- **Affected Component:** `src/components/ChatWidget.jsx`
- **Observed Behavior:** Standalone JSX file without TypeScript annotations.
- **Recommendation:** Migrate to `ChatWidget.tsx` with typed props and events.

---

## 4. Verification & Testing Matrix

| Finding ID | Planned Fix | Verification Method | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **SEC-01** | Prune unused packages & run `npm audit fix` | Run `npm audit` and `npm run build` | Zero critical/high vulnerabilities; build passes cleanly. |
| **SEC-02** | Remove GEMINI define in `vite.config.ts` | Inspect `vite.config.ts` and build output | No API key define in Vite config. |
| **SEC-03** | Add global security headers to `vercel.json` | Validate `vercel.json` JSON structure | HSTS, X-Content-Type-Options, X-Frame-Options configured. |
| **ROUT-01**| Add 301 redirects in `vercel.json` & React Router | Test route `/service/custom-software-development` | Redirects to `/services/software` without 404. |
| **ROUT-02**| Fix navbar/footer links & add alias redirect | Test route `/products/ai-pos` and link clicks | Resolves to `/products/pos-restaurant`. |
| **ROUT-03**| Fix footer link & add alias redirect | Test route `/products/calibr` and footer link | Resolves to valid product without 404. |
| **ARCH-01**| Type `service.ts` & enable `strict: true` | Run `npm run lint` (`tsc --noEmit`) | Passes with 0 errors under `strict: true`. |
| **ARCH-02**| Fix error handling in `DemoBookingModal.tsx` | Code review and unit test mock failure | Displays error message instead of false success. |
| **SEO-01** | Fix double branding in `ServiceDetail.tsx` | Inspect rendered `<title>` for `/services/ai` | Contains single `| AIScripto` brand suffix. |
| **SEO-02** | Update hub page titles & descriptions | Check `<title>` on `/services`, `/company`, etc. | Reflects commercial keyword titles. |
| **SEO-03** | Standardize visible H1 on `Home.tsx` | Inspect DOM heading structure on `/` | Visible, persistent H1 tag present. |
| **OPS-01** | Add Vitest test suite & `npm test` script | Run `npm test` | All unit & routing tests pass successfully. |
