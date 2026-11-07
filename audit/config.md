# Audit Config: AIScripto Website

Pre-filled for the Audit Kit at `/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite/audit/kit`.
Fields follow `kit/config.template.md` and match the current React + Vite site.

| Field | Value |
|---|---|
| `PRODUCT` | AIScripto Website: marketing, product and lead-capture site for aiscripto.com |
| `REPOS` | `/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite` (one repo, GitHub `DevAnalysts/AIScriptWebSite`) |
| `Workspace root` | `/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite` |
| `BRANCH` | The current working branch (for example `pro-enterprise-redesign` or `refactor-site`). `main` is production. |
| `MODE` | `AUDIT-ONLY` unless a prompt says otherwise |
| `DEPTH` | `standard` unless a prompt says otherwise |
| `INCLUDE` | `src/`, `scripts/`, `public/`, `server.ts`, `index.html`, `vite.config.ts`, `vercel.json`, `tsconfig.json`, `eslint.config.js`, `package.json`, `package-lock.json`, `.github/workflows/`, `.env.example`, `README.md`, `docs/` |
| `EXCLUDE` | `node_modules`, `dist`, `dist-server`, `coverage`, `audit/`, `.ai`, `.claude`, `.idea`, `public/images/**` (binary assets), `*.xlsx`, `*.log`, `.DS_Store` |
| `DIMENSIONS` | security, architecture, performance, reliability, observability, testing, dependencies, cicd-supply-chain, accessibility, ux-design, code-health, documentation, compliance |
| `COMPLIANCE` | Privacy for lead-form personal data (name, email, phone, company) and analytics cookies (GDPR / ePrivacy style consent). No payments, no user accounts. |
| `OUTPUT_DIR` | `/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite/audit/results` |
| `PREVIOUS_RUN` | None in `audit/results/`. Earlier hand-written reviews exist in `docs/architecture-audit.md`, `docs/verification-report.md` and `docs/seo-audit/` (verify them with prompt 13). |
| `GENERATE_STACK_DRAFT` | `false` |
| `TEAM_SIZE` | 1 (you) |
| `RELEASE_CADENCE` | Feature branches, tested locally, merged to `main`, deployed by Vercel |
| `CONFIDENTIALITY` | Internal. The site is public, but audit results describe weaknesses. |
| `Stack modules` | `kit/stacks/react.md`, `kit/stacks/node-express.md` (for `server.ts`), `kit/stacks/docker-cicd.md` (CI part only; there is no Docker) |
| `Project module` | `/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite/audit/project-standards.md`. Load it with the stack modules at Stage 3. |

## Hard Safety Rules For This Project

1. **Never send real leads.** The contact form, quote form and demo modal post to the live email API (`VITE_API_BASE_URL`, `aiscripto-email-server.vercel.app`). Do not submit them against production. Use code review, or `scripts/browser-check.mjs`, which intercepts the email API.
2. **Secrets.** Never print values from `.env` or Vercel settings. `.env.example` is safe to read. Remember that every `VITE_*` value is public in the browser bundle.
3. **No pushes to `main`.** Audit modes write only inside the run folder. Fix modes work on a branch and never commit to, push to or merge into `main`. The owner tests locally and merges.
4. **Do not run tests or browser checks unless the prompt or the owner says so.** Reading test files is fine.
5. **Do not pollute analytics.** If a real browser is used, block Google Analytics / Tag Manager requests (as `scripts/browser-check.mjs` does).
6. **Commands** run from the repo root. Useful ones: `npm run lint` (tsc + eslint), `npm test` (vitest), `npm run build` (sitemap + client build + SSR build + prerender), `npm run test:browser` (needs a build first).

## Known And Accepted (Do Not Flag)

| Item | Reason |
|---|---|
| Public `VITE_CHATBOT_*`, `VITE_WHATSAPP_*`, `VITE_API_BASE_URL` values | They are meant to be public embed settings. Flag only if one of them grants write or admin access somewhere. |
| `'unsafe-inline'` in `script-src` / `style-src` of the CSP | Needed for the inline theme bootstrap and GTM snippet. Flag only new inline scripts that are not needed. |
| Express `server.ts` | Used for local dev (Vite middleware) and a local copy of production. Vercel serves the real site. |
| Redirects listed three times (`vercel.json`, `App.tsx` `<Navigate>`, `server.ts` mirror) | Intended. `server.ts` reads them from `vercel.json`. Flag only when the three disagree. |
| Static content in `src/data/*.ts` | Content lives in typed data files on purpose. There is no CMS. |
| Cinematic hero visuals (holographic neural core, constellation, gradients) | Brand decision. Judge them for performance, reduced motion and contrast, not taste. |

## Decisions Already Made (Do Not Reopen)

- **Stack:** React 19, Vite 6, TypeScript, Tailwind CSS v4, React Router v7, Lucide icons, Axios, react-hot-toast.
- **Rendering:** Client SPA plus build-time prerender of every sitemap URL (`scripts/prerender.ts`, `src/entry-server.tsx`) with hydration on the client.
- **Hosting:** Vercel static hosting with `cleanUrls: true` and `trailingSlash: false`. Security headers live in `vercel.json`.
- **Themes:** Dark and Light modes, plus 8 accent colours (`data-accent`) from `src/hooks/useTheme.tsx` and tokens in `src/index.css`.
- **Lead capture:** Forms call the external email API through `src/utils/service.ts`. No backend in this repo.
- **Chat:** Voice AI agent embedded as an iframe from `voiceagent-aiscripto.vercel.app`, with `postMessage` origin checks (`src/components/ChatWidget.tsx`).
- **Architecture decisions** recorded in `docs/technical-decisions.md` (ADRs).

## Context The Agent Should Know

- **Pages:** 27 page components in `src/pages/`, about 37 routes in `src/App.tsx`, lazy-loaded. Detail pages read from `src/data/` (`products.ts`, `services.ts`, `industries.ts`, `caseStudies.ts`, `blogPosts.ts`, `landing/*`).
- **SEO layer:** `src/components/Seo.tsx`, `src/components/HeadContext.ts`, `src/config/seoConfig.ts`, `src/utils/schema.ts` (JSON-LD), `scripts/generate-sitemap.ts`, `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, `public/ai-catalog.json`.
- **Home page:** `src/pages/Home.tsx` with sections in `src/components/home/` (hero, neural core, trust bar, practices, security strip, product carousel, agent simulator).
- **Tests:** `src/__tests__/` (routing, metadata, prerender, hydration, deploy-routes, components, service). Real-browser smoke test: `scripts/browser-check.mjs`.
- **CI:** `.github/workflows/ci.yml` on Node 20: `npm ci --legacy-peer-deps`, lint, test, build, hydration test.
- **Local ports:** dev server `3000` (`PORT`), browser check `4173`.
- **Domain:** `https://www.aiscripto.com`.
