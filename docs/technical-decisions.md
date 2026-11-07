# AIScripto Website — Architecture Decision Records (ADRs)

**Document Version:** 1.0.0  
**Status:** Active  

---

## ADR-001: Removal of Unused `@google/genai` and `better-sqlite3` Dependencies

### Context
`package.json` included `@google/genai` (^1.29.0) and `better-sqlite3` (^12.4.1). An exhaustive grep of the repository revealed zero imports or references to these packages anywhere in application or server code. Furthermore, `@google/genai` pulled `protobufjs` <=7.6.4 into the dependency tree, triggering a Critical CVE for arbitrary code execution / prototype pollution. `better-sqlite3` is a C++ native compilation package that complicates serverless edge deployments.

### Decision
Remove both packages from `dependencies` in `package.json` and regenerate the lockfile.

### Alternatives Considered
1. *Keep packages for future features:* Rejected. Unused dependencies create immediate security vulnerabilities and bloat `node_modules` without any runtime benefit. New packages can be installed if/when actual server endpoints require them.
2. *Upgrade packages:* Rejected. Since the code does not use them, upgrading still leaves unneeded attack surface.

### Consequences
- Eliminates Critical security vulnerability `GHSA-xq3m-2v4x-88gg` (`protobufjs`).
- Reduces installation footprint and prevents native build failures on edge deployment runners.

---

## ADR-002: Removal of Plain-Text Client Define for `GEMINI_API_KEY`

### Context
`vite.config.ts` contained:
```ts
define: {
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
}
```
Vite replaces all occurrences of `process.env.GEMINI_API_KEY` at build time with the literal string value of the environment variable.

### Decision
Remove the define rule from `vite.config.ts`.

### Alternatives Considered
1. *Keep define but ensure variable is empty in `.env`:* Rejected. Fragile. If an engineer sets `GEMINI_API_KEY` in their local `.env` or in deployment CI/CD secrets, the key will be silently baked into public JavaScript bundles.
2. *Prefix with `VITE_`:* Rejected. Sensitive API keys with billing capabilities must never be exposed to browser clients.

### Consequences
- Prevents secret exfiltration. Any future Gemini operations must be routed through an authenticated backend proxy.

---

## ADR-003: Edge-Level Security Headers in `vercel.json`

### Context
The application uses an Express server (`server.ts`) for local development, which sets HTTP security headers. However, production hosting on Vercel is a static SPA deployment. Vercel serves assets directly from its CDN without executing `server.ts`. As a result, the production site was running without HSTS, clickjacking prevention (`X-Frame-Options`), or MIME-sniffing protection.

### Decision
Configure standard HTTP security headers directly in `vercel.json` for all routes (`"source": "/(.*)"`):
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Replace placeholder `https://your-website-domain.com` in frame-ancestors with `https://aiscripto.com https://www.aiscripto.com`.

### Consequences
- Production deployments on Vercel will automatically deliver enterprise-grade security headers to all client requests.

---

## ADR-004: Standardizing on Singular Plural Routing with 301 Edge Redirects

### Context
Google Search Console data revealed that Google is ranking a broken URL: `https://www.aiscripto.com/service/custom-software-development` at position 7.00. The application route structure uses plural `/services/:id`. Visitors and search bots hitting `/service/*` received a 404 error.

### Decision
Implement 301 redirects at two levels:
1. Edge-level in `vercel.json`:
   - `/service/custom-software-development` -> `/services/software`
   - `/service/(.*)` -> `/services/$1`
2. Application-level in `App.tsx`:
   - Route redirection from `/service/:id` and legacy product aliases (`/products/ai-pos` -> `/products/pos-restaurant`, `/products/calibr` -> `/products`).

### Consequences
- Immediately captures incoming traffic from Google's indexed singular `/service/` URLs and passes link equity to `/services/software`.
- Eliminates 404 bounce rates for users clicking legacy links.

---

## ADR-005: Strict TypeScript Enforcement with Strongly Typed API Service

### Context
`tsconfig.json` had `"strict": true` omitted. Loose typechecking masked untyped parameters and return types in `src/utils/service.ts`.

### Decision
1. Define explicit TypeScript interfaces for all service functions in `src/utils/service.ts`:
   - `QuoteRequestPayload`
   - `EmailPayload`
   - `BlogPostInput`
   - `ApiResponse<T>`
2. Enable `"strict": true` in `tsconfig.json`.

### Consequences
- Catches potential bugs at compile time.
- Ensures developer tooling (autocomplete, type guards, refactoring) works reliably across the entire project.

---

## ADR-006: Lightweight Automated Testing with Vitest

### Context
The repository had zero automated tests and no test runner installed.

### Decision
Adopt Vitest with `@testing-library/react` and `jsdom`. Vitest shares configuration with `vite.config.ts`, requiring minimal overhead and zero build configuration drift.

### Consequences
- Fast, ESM-native unit and integration tests.
- Guardrails against regression for routing, metadata, and form submission flows.

---

## ADR-007: Vendor Bundle Chunking and Asset Deferral

### Context
The production bundle generated a single monolith JavaScript entry chunk of 620 kB (`index-[hash].js`), slowing initial parse and execution times and invalidating cache for third-party libraries on every application code edit.

### Decision
1. Configure Vite `rollupOptions.output.manualChunks` to split vendor dependencies into distinct, cacheable chunks:
   - `vendor-react`: Core React, React DOM, and React Router DOM (~278 kB)
   - `vendor-motion`: Framer Motion animation engine (~124 kB)
   - `vendor-icons`: Lucide React iconography
2. Enforce `loading="lazy"` and `decoding="async"` across all non-hero and below-the-fold media elements.

### Consequences
- Reduces entry point JS size by 63.4% (from 620 kB to 227 kB).
- Maximizes HTTP cache hit rates for infrequently changing vendor packages.
- Minimizes browser main-thread blocking time during initial route hydration.

---

## ADR-008: Continuous Integration via GitHub Actions

### Context
Without automated CI verification, pull requests and branch merges risked introducing TypeScript compilation errors, broken routes, or failing production builds into `main`.

### Decision
Introduce `.github/workflows/ci.yml` running on pushes and pull requests across protected branches. The workflow installs exact dependencies (`npm ci --legacy-peer-deps`), verifies strict TypeScript compilation (`npm run lint`), executes unit/integration tests (`npm test`), and asserts zero-error production builds (`npm run build`).

### Consequences
- Immediate feedback on regression across PRs.
- Guaranteed deployability before Vercel edge deployment triggers.

