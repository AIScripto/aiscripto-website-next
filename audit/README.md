# AIScripto Website — Audit Guide

This folder holds the **Audit Kit**, the project config, the project standards, the prompts and the audit results for the **AIScripto website** (React + Vite, prerendered, hosted on Vercel).

---

## 1. What is in this folder

| Artifact | Location | Purpose |
| :--- | :--- | :--- |
| **Audit Kit** | [`audit/kit/AUDIT.md`](kit/AUDIT.md) | Reusable, stack-independent audit engine (stages, checkpoints, dimensions, stack modules, report builder). |
| **Prompts** | [`audit/PROMPTS.md`](PROMPTS.md) | Ready-to-paste prompts with this repo's paths filled in: quick, full, deep, security, SEO, forms, pre-release, re-audit and fix waves. |
| **Project config** | [`audit/config.md`](config.md) | Scope (include/exclude), dimensions, safety rules, accepted items and decisions already made. |
| **Project standards** | [`audit/project-standards.md`](project-standards.md) | This site's own checklist: SEO and prerender, security and privacy, UI/UX and themes, performance, quality. |
| **Results** | `audit/results/<date>_<name>/` | Created by each run (`report.html`, `findings.json`, `progress.md`). Gitignored. |
| **Archive** | [`audit/_archive/`](_archive/) | Files copied in from other projects (an ERP audit and ERP dashboard plans). Not about this site. Kept only for reference; safe to delete. |

Related docs elsewhere in the repo: [`docs/architecture.md`](../docs/architecture.md), [`docs/technical-decisions.md`](../docs/technical-decisions.md), [`docs/architecture-audit.md`](../docs/architecture-audit.md), [`docs/verification-report.md`](../docs/verification-report.md), [`docs/seo-audit/`](../docs/seo-audit/).

---

## 2. Technology stack

| Area | Technology | Notes |
| :--- | :--- | :--- |
| Framework | React 19, TypeScript, Vite 6 | Lazy-loaded routes, vendor chunks in `vite.config.ts` |
| Routing | React Router v7 | Routes in `src/App.tsx`; redirects mirrored in `vercel.json` and `server.ts` |
| Rendering | Build-time prerender + hydration | `scripts/prerender.ts`, `src/entry-server.tsx`, `scripts/generate-sitemap.ts` |
| Styling | Tailwind CSS v4, Lucide icons | Dark and Light modes, 8 accent colours, tokens in `src/index.css` |
| Integrations | Axios email API, voice AI chat iframe, WhatsApp, Google Analytics / GTM | `src/utils/service.ts`, `src/components/ChatWidget.tsx`, `WhatsAppButton.tsx` |
| Local server | Express 4 (`server.ts`) | Dev with Vite middleware on port 3000; production mode mirrors Vercel |
| Hosting | Vercel | Headers, CSP, redirects, `cleanUrls`, `trailingSlash: false` in `vercel.json` |
| Tests | Vitest + Testing Library; headless Chrome smoke test | `src/__tests__/`, `scripts/browser-check.mjs` |
| CI | GitHub Actions (Node 20) | `.github/workflows/ci.yml`: lint, test, build, hydration test |

---

## 3. How to run an audit

1. Open Claude Code in `/Users/tk-lpt-1088/data/piplines/AI/AIScriptWebSite`.
2. Pick a prompt from [`PROMPTS.md`](PROMPTS.md). Good first choices: **13** (check the October audit docs), then **2** (full audit).
3. The agent runs discovery, stops at Checkpoint A with a System Map, reviews the code against the kit's dimensions and [`project-standards.md`](project-standards.md), and stops at Checkpoint B with the summary.
4. The report is written to `audit/results/<date>_<name>/report.html`.

Audit modes never change code, never send real form submissions and never push. Fix prompts (10, 11) work on a branch and stop for your approval.
