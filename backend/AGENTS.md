# Backend AGENTS Guide – NestJS + Prisma

## Table of Contents
- [Overview & Architecture](#overview--architecture)
- [Directory Structure](#directory-structure)
- [Environment Configuration](#environment-configuration)
- [Prisma Setup](#prisma-setup)
- [Build & Run Commands](#build--run-commands)
- [Linting & Formatting](#linting--formatting)
- [Testing](#testing)
- [Dependencies](#dependencies)
- [Security](#security)
- [Database & Migrations](#database--migrations)
- [Monitoring & Logging](#monitoring--logging)
- [Messaging & Background Jobs](#messaging--background-jobs)
- [CI/CD Workflow](#cicd-workflow)
- [Deployment & Orchestration](#deployment--orchestration)
- [Debugging & Docs](#debugging--docs)
- [Agent Hints](#agent-hints)

## Overview & Architecture
- NestJS API serving as the backend for the template.
- Organised as a monolith with domain modules (e.g. `auth`, `users`, `billing`).

## Directory Structure
- Root folders: `src/`, `prisma/`, `test/`, `scripts/`, `config/`, `docker/`, `infra/`, `docs/`.
- Within `src/`, each domain has its own module containing `*.module.ts`, `*.service.ts`, `*.controller.ts`, DTOs and interfaces.

## Environment Configuration
- `.env.development`, `.env.staging`, `.env.production` define per-environment variables.
- `ConfigModule.forRoot()` loads the appropriate file based on `NODE_ENV`.
- Required variables: `DATABASE_URL`, `JWT_SECRET`, `REDIS_HOST`, `SENTRY_DSN`, `MAILER_API_KEY`, `PORT`.

## Prisma Setup
- Database schema lives in `prisma/schema.prisma`.
- Local migration: `npx prisma migrate dev --name <migration>`.
- Production migration: `npx prisma migrate deploy`.
- Generate client: `npx prisma generate` (automatically run during `migrate dev`).

## Build & Run Commands
- **Development**
  ```bash
  npm install
  npm run start:dev
  ```
- **Production**
  ```bash
  npm run build
  npm run start:prod
  ```
- **Docker**
  ```bash
  docker build -t backend:latest .
  docker run --env-file .env.production -p 3000:3000 backend:latest
  ```

## Linting & Formatting
- Uses ESLint and Prettier.
- Husky and lint-staged run on commit.
- CI executes `npm run lint`.

## Testing
- Unit tests: `npm run test`.
- Coverage: `npm run test:cov` (≥80%).
- `test/` mirrors the `src/` structure.

## Dependencies
- Dev dependencies limited to build/test tooling (TypeScript, Jest, ESLint, Prettier).
- Compile TypeScript before production; do not use `ts-node` in prod.

## Security
- Secrets stored in AWS Secrets Manager or Vault.
- Global `helmet()` middleware, CORS whitelist and rate limiting via `@nestjs/throttler`.

## Database & Migrations
- Document retry/backoff strategy for DB connections.
- Migration commands:
  ```bash
  npm run migration:generate -- -n MyMigration
  npm run migration:run
  ```

## Monitoring & Logging
- Use Winston or Pino with JSON output and log rotation.
- Expose `/health` and `/metrics` endpoints.
- Integrate Sentry or DataDog for error and performance tracking.

## Messaging & Background Jobs
- Background agents live under `src/agents/` (e.g. `email.agent.ts`, `queue.agent.ts`).
- Start workers with `npm run start:worker`.
- Document cron schedules or job triggers.

## CI/CD Workflow
- Pipeline: install → lint → test → build → migrate → deploy.
- Environment secrets injected via repository/CI secrets; never commit `.env` files.

## Deployment & Orchestration
- Use `ecosystem.config.js` for PM2 or Kubernetes manifests in `infra/`.
- Provide Helm chart values for image tags, replicas, and resource limits.

## Debugging & Docs
- `npm run start:debug` enables the Node inspector.
- Swagger/OpenAPI available at `/api` if `@nestjs/swagger` is configured.
- `docker-compose.yml` can spin up local dependencies (Postgres, Redis).

## Agent Hints
- Update `AppModule` and `main.ts` when adding new modules.
- Always use existing DTOs and validation pipes; follow naming pattern `*.controller.ts`, `*.service.ts`.
- Run `npx prisma generate` after editing the Prisma schema.
