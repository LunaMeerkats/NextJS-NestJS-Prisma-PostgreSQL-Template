# Monorepo AGENTS Guide

> Authoritative instructions for AI agents, developers, and CI/CD systems working in this repository.

## Table of Contents
- [Purpose & Overview](#purpose--overview)
- [Repository Structure](#repository-structure)
- [Setup & Dependencies](#setup--dependencies)
- [Environment Configuration](#environment-configuration)
- [Linting, Formatting & Testing](#linting-formatting--testing)
- [Running & Building](#running--building)
- [Security & Compliance](#security--compliance)
- [Database & Migrations](#database--migrations)
- [Monitoring & Logging](#monitoring--logging)
- [Agent Conventions](#agent-conventions)
- [References](#references)

## Purpose & Overview
- Central guide for the entire monorepo.
- Points to service specific instructions in `backend/AGENTS.md` and `frontend/AGENTS.md`.

## Repository Structure
- **backend/** – NestJS API using Prisma. See `backend/AGENTS.md`.
- **frontend/** – Next.js web app. See `frontend/AGENTS.md`.
- **shared/** *(optional)* – Framework‑agnostic utilities and types.
- Root configs: `.editorconfig`, `.prettierrc`, `.eslintrc.js`, `package.json`, `README.md`.

## Setup & Dependencies
- Uses npm workspaces; run `npm install` at the root to install all packages.
- Add cross‑package devDependencies to the root `package.json`.
- `npm run bootstrap` (if present) links local packages and generates Prisma clients.

## Environment Configuration
- Each package maintains its own `.env.development`, `.env.staging`, `.env.production` files.
- Avoid root `.env` unless variables are truly global.
- **NEXT_PUBLIC_** prefix exposes variables to the browser; never store secrets with this prefix.
- Production secrets live in services such as AWS Secrets Manager or Vault.

## Linting, Formatting & Testing
- ESLint and Prettier are configured at the root.
- Pre‑commit hooks via Husky and lint‑staged run formatting and linting on staged files.
- Run tests with `npm test` (all workspaces) or `npm test --workspace <pkg>`.

## Running & Building
- `npm run dev` starts backend and frontend together for local development.
- `npm run build` compiles both packages.
- `npm run start` (or `npm run start --workspace <pkg>`) runs the production build.
- Each service has a `Dockerfile`; build with `docker build -t repo-backend backend/` or `repo-frontend frontend/`.

## Security & Compliance
- Backend uses Helmet, CORS whitelist, and rate limiting.
- Frontend should configure a strict Content Security Policy via `next.config.js` headers.
- Never commit secrets to git; manage them via environment variables or secret managers.

## Database & Migrations
- Prisma schemas live in `prisma/schema.prisma` within each package.
- Apply migrations locally with `npx prisma migrate dev --name <change>`.
- During deployment run `npx prisma migrate deploy` before starting services.
- See `docs/migration-staging-to-production.md` for migrating data between environments.

## Monitoring & Logging
- Use structured logging (Pino/Winston) with request IDs.
- Expose `/health` endpoints in both services for uptime checks.
- Integrate Sentry or similar tools for error tracking.

## Agent Conventions
- Follow naming and workflow rules in service AGENTS files before modifying code.
- Write TypeScript everywhere; avoid the `any` type and keep shared types in `shared/`.
- Database queries run server‑side only; never import Prisma Client into React components.
- Prefix client‑side environment variables with `NEXT_PUBLIC_`.

## References
- [Next.js Environment Variables Guide](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Next.js Production Checklist](https://nextjs.org/docs/pages/guides/production-checklist)
- [NestJS ConfigModule Docs](https://docs.nestjs.com/techniques/configuration)
- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Helmet Middleware](https://docs.nestjs.com/security/helmet)
