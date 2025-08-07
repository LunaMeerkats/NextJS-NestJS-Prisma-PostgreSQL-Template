# Frontend AGENTS Guide – Next.js + Prisma

## Table of Contents
- [Purpose & Layout](#purpose--layout)
- [Environment Configuration](#environment-configuration)
- [Prisma on the Frontend](#prisma-on-the-frontend)
- [Development & Production Workflow](#development--production-workflow)
- [Linting, Formatting & Testing](#linting-formatting--testing)
- [Performance Best Practices](#performance-best-practices)
- [Security](#security)
- [Monitoring & Logging](#monitoring--logging)
- [Agent Hints & Conventions](#agent-hints--conventions)
- [References & Docs](#references--docs)

## Purpose & Layout
- Describes the Next.js application (e.g. dashboards, portals, etc.).
- Directory structure:
  - `src/app/` or `pages/` – routes.
  - `components/`, `lib/`, `public/`, `styles/`, `prisma/`.
  - Config files: `next.config.js`, `tsconfig.json`, `.env*`.

## Environment Configuration
- Use `.env.local` for developer secrets (ignored by git) and `.env.development`, `.env.production`, `.env.test` for environment values.
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; keep secrets unprefixed.
- Loading order: `.env.$(NODE_ENV).local` → `.env.local` → `.env.$(NODE_ENV)` → `.env`.

## Prisma on the Frontend
- Prisma Client should only run on the server (API routes, server components, or `getServerSideProps`).
- Create `lib/prisma.ts` to instantiate and cache the client.
- Never import Prisma Client into client components.

## Development & Production Workflow
- **Local development**
  ```bash
  npm install
  npm run dev
  ```
- **Production build**
  ```bash
  npm run build
  npm run start
  ```
- **Docker**
  ```bash
  docker build -t frontend:latest .
  docker run -p 3000:3000 --env-file .env.production frontend:latest
  ```
- Recommended hosting: Vercel, Netlify, AWS Amplify or containerized on Fargate.

## Linting, Formatting & Testing
- ESLint + Prettier with `next lint` integration.
- Husky and lint-staged enforce formatting on commit.
- Jest + React Testing Library: `npm run test` and `npm run test:cov` (≥80% coverage).
- CI steps: install → lint → test → build.

## Performance Best Practices
- Automatic code splitting, prefetching and static optimization are built in.
- Use `next/image` for optimized images and `next/font` for self-hosted fonts.
- Employ dynamic imports and lazy loading for heavy components.
- Configure gzip/Brotli compression and caching headers.
- Use Incremental Static Regeneration (ISR) where applicable.

## Security
- Do not commit `.env` files.
- Enforce strict Content Security Policy via `next.config.js` headers and consider using `helmet`.
- Enable HTTPS, HSTS and configure CORS for API routes.

## Monitoring & Logging
- Provide `/api/health` endpoint for uptime checks.
- Use structured logging (JSON with correlation IDs).
- Integrate Sentry or LogRocket for error tracking.

## Agent Hints & Conventions
- Route files use `*.page.tsx`; API routes use `*.api.ts`.
- Hooks start with `use*`; context providers end with `*Provider`.
- Shared types reside in `src/types`.
- Regenerate Prisma client and update server components when schema changes.
- Use `<Link>` for navigation to leverage automatic prefetching.

## References & Docs
- [Next.js Environment Variables Guide](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Next.js Production Checklist](https://nextjs.org/docs/pages/guides/production-checklist)
- [Prisma Docs](https://www.prisma.io/docs)
