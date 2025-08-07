🎨 Frontend AGENTS.md – Next.js + Prisma
Purpose & layout

Summarize the app’s purpose (e.g., job board UI, dashboards, candidate portal).

Describe folder structure: src/app/ or pages/ (routes), components/, prisma/ (for client hooks or queries), public/, styles/, lib/, config/.

Note config files: next.config.js, tsconfig.json, .env.*.

Environment configuration

Use separate env files: .env.local for developer‑specific secrets (ignored by git), .env.development, .env.production, .env.test.

Document every variable and which are exposed via NEXT_PUBLIC_*.

Next.js loads env variables in order: process.env → .env.$(NODE_ENV).local → .env.local → .env.$(NODE_ENV) → .env
nextjs.org
.

Only variables prefixed with NEXT_PUBLIC_ are bundled into client JS
nextjs.org
; others remain server‑only.

For runtime envs, expose via APIs or server‑side functions.

Prisma on the frontend

Use Prisma Client only on the server (API routes, getServerSideProps or server components). Never import Prisma Client into client‑side code.

For data fetching, create /lib/prisma.ts to instantiate and reuse the client; handle connection caching in dev.

Development & production workflow

Local dev: npm install → npm run dev (hot reload).

Production build: npm run build → npm run start – this builds and starts a Node.js server
nextjs.org
; run locally to catch errors before deployment
nextjs.org
.

Docker: show Dockerfile example; run with docker build and docker run -p 3000:3000 --env-file .env.production.

Advise using Vercel or AWS Amplify for hosting; containerize only if necessary.

Linting, formatting & testing

Set up eslint + prettier with next lint integration
nextjs.org
.

Use Husky + lint‑staged for pre‑commit checks.

Unit tests with Jest & React Testing Library; enforce ≥80 % coverage.

In CI: install → lint → test → build.

Performance best practices

Rely on Next.js automatic optimizations:

Code splitting: Next.js automatically splits code by pages so only what’s needed is loaded on navigation
nextjs.org
.

Prefetching: Routes are prefetched when links enter the viewport
nextjs.org
.

Automatic static optimization: pages without blocking data are pre-rendered and cached
nextjs.org
.

Use next/image to automatically optimize images and serve modern formats
nextjs.org
; Image extends <img> for automatic optimization
nextjs.org
.

Use next/font to self‑host fonts and remove external requests
nextjs.org
.

Employ dynamic imports for heavy libraries and enable lazy loading.

Enable compression (gzip/Brotli) and caching headers via CDN or custom server.

Use Incremental Static Regeneration (ISR) and proper cache settings to update content without full rebuild.

Security

Never commit .env files to the repo
nextjs.org
.

Add strict Content Security Policy and use helmet (or Next.js’ securityHeaders in next.config.js).

Enforce HTTPS and HSTS; configure CORS for API routes.

Monitoring & logging

Expose an /api/health endpoint for uptime checks.

Use structured logs (JSON) and include correlation IDs; pipe to log service.

Integrate Sentry or LogRocket for error and session tracking.

Agent hints & conventions

Route files: *.page.tsx or nested segments in app/; API routes: *.api.ts.

Hooks must start with use*; context providers end with *Provider.

Shared types live in src/types.

When working with the Prisma schema, regenerate the client and update server components accordingly.

Avoid importing Prisma Client in client components—keep DB access server‑side.

Use the Link component for client navigation and automatic prefetching
nextjs.org
.

References & docs

Link to Next.js environment variables guide
nextjs.org
.

Link to Next.js production checklist for performance/security tips
nextjs.org
.

Link to Prisma docs for migration workflows
prisma.io
.