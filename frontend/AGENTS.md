# Frontend AGENTS

Welcome, developer! This file provides essential guidance for working on the Next.js frontend. Use the index below to jump to any section.

- [1. Project Overview & Layout](#1-project-overview--layout)
- [2. Environment Configuration](#2-environment-configuration)
- [3. Local & Production Workflows](#3-local--production-workflows)
- [4. Linting, Formatting & Testing](#4-linting-formatting--testing)
- [5. Performance Tips](#5-performance-tips)
- [6. Security Notes](#6-security-notes)
- [7. Monitoring & Logging](#7-monitoring--logging)
- [8. Agent Hints & Naming Conventions](#8-agent-hints--naming-conventions)
- [9. References](#9-references)

## 1. Project Overview & Layout

This frontend uses [Next.js](https://nextjs.org/) with TypeScript. The key directories are:

- `src/app` or `pages` – application routes and page components.
- `components` – shared UI pieces.
- `public` – static assets served as-is.
- `styles` – global and module CSS files.
- Configuration files such as `next.config.js` reside in the project root.
- Deployment-related folders live under `deploy/`.

## 2. Environment Configuration

Use environment files to manage configuration:

- `.env.local` – developer-specific secrets, ignored by git.
- `.env.development` – defaults for local development.
- `.env.production` – production values.
- `.env.test` – values for test runs.

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Non-public variables can be injected at build time through `next.config.js` via the `env` key.

## 3. Local & Production Workflows

Install dependencies and run the app locally:

```bash
npm install
npm run dev
```

Build and run in production mode:

```bash
npm run build
npm run start
```

Docker build and run example:

```bash
docker build -t frontend .
docker run -p 3000:3000 frontend
```

Recommended hosting providers include Vercel, AWS (Elastic Beanstalk/Amplify), and DigitalOcean.

## 4. Linting, Formatting & Testing

- **ESLint** – run `npm run lint` to ensure code quality.
- **Prettier** – automatically format staged files via Husky and lint-staged pre-commit hooks.
- **Jest** with **React Testing Library** – run `npm test` with coverage thresholds enforced in `jest.config.js`.
- **CI pipeline** – install → lint → test → build → deploy.

## 5. Performance Tips

- Leverage automatic code splitting and dynamic imports.
- Use `next/image` for optimized images and built-in CDN caching.
- Optimize fonts with `next/font` or self-hosted strategies.
- Employ Incremental Static Regeneration (ISR) and proper caching headers.
- Serve assets with compression (gzip or Brotli).

## 6. Security Notes

- Protect endpoints with Helmet and configure CORS appropriately.
- Implement a strict Content Security Policy (CSP).
- Store secrets outside the repo and inject via environment variables.
- Enforce HTTPS and HSTS in production.

## 7. Monitoring & Logging

- Expose `/api/health` for uptime monitoring.
- Use structured logs (JSON) to ease log aggregation.
- Integrate tools like Sentry or LogRocket for error and session tracking.

## 8. Agent Hints & Naming Conventions

- Pages end with `*.page.tsx` and API routes with `*.api.ts`.
- Hooks follow the `use*` naming pattern.
- Share reusable types from `src/types`.

## 9. References

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Sentry](https://sentry.io/)
- [LogRocket](https://logrocket.com/)
