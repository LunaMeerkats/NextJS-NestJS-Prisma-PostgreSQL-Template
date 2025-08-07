🔧 Backend AGENTS.md – NestJS + Prisma (Production‐Ready)
Overview & architecture

Explain what the backend does (e.g., REST/GraphQL API, microservices or monolith).

List core modules: auth/, users/, jobs/, notifications/, analytics/ etc.

Clarify whether it’s a monolith or microservices and how they communicate (HTTP, gRPC, message queue).

Project structure

Root folders: src/ (app code), prisma/ (schema & migrations), test/, scripts/, config/, docker/, infra/, docs/.

Within src/, group by domain: each module contains its *.module.ts, *.service.ts, *.controller.ts, DTOs and interfaces.

Environment config

Use separate env files: .env.development, .env.staging, .env.production. Each holds only variables for that environment.

Document required variables (e.g., DATABASE_URL, JWT_SECRET, REDIS_HOST, SENTRY_DSN, MAILER_API_KEY, PORT, NODE_ENV).

Use @nestjs/config’s ConfigModule.forRoot() to load the correct .env based on NODE_ENV; this centralizes configuration and keeps secrets out of code

docs.nestjs.com
.

Prisma setup

Define your database schema in prisma/schema.prisma.

Run migrations locally with npx prisma migrate dev --name <migration-name>; this generates SQL files and applies them
prisma.io
.

For production, run npx prisma migrate deploy during deployment; it applies pending migrations without prompting.

Generate the Prisma client via npx prisma generate (this is auto‑run by prisma migrate dev
prisma.io
).

Build & run commands

Development:

npm install

npm run start:dev – uses ts-node and hot reload.

Production:

npm run build – compiles TypeScript to dist/.

npm run start:prod – runs compiled JS with NODE_ENV=production.

Use docker build and docker run --env-file .env.production for containerized runs.

Linting & formatting

Configure eslint and prettier.

Use husky + lint-staged to auto‑format and lint on commit.

Include npm run lint in CI.

Testing

Unit tests with Jest: npm run test.

Coverage enforcement: npm run test:cov (set thresholds in jest.config.js).

Mirror src/ structure under test/ for clarity.

Dependencies

Keep dev‑dependencies (typescript, @types/*, jest, eslint, prettier) separate from runtime deps.

Never run ts-node in production; compile with npm run build first.

Security

Load secrets from AWS Secrets Manager or Vault; avoid hard‑coding.

Globally apply helmet() to set security headers

docs.nestjs.com
.

Enable CORS with a whitelist, and rate‑limit requests with @nestjs/throttler.

Database & migrations

Document how to create, run and revert Prisma migrations.

Outline retry/back‑off logic when connecting to the DB (e.g., exponential backoff with max retries).

Monitoring & logging

Use winston or pino with JSON formatting; pipe logs to CloudWatch/ELK.

Expose /health and /metrics (Prometheus) endpoints.

Integrate error tracking (e.g., Sentry, Datadog).

Messaging & background jobs

Describe any message queues (e.g., RabbitMQ/SQS) and background workers (e.g., src/agents/email.agent.ts).

Provide commands to start workers (e.g., npm run start:worker).

Note CRON schedules or job definitions.

CI/CD

Pipeline steps: install → lint → test → build → run Prisma migrations → deploy.

Use environment‑specific secrets in CI; never commit .env* files to git
nextjs.org
.

Deployment & orchestration

Provide sample ecosystem.config.js for PM2 or Helm charts for Kubernetes.

Specify resource limits, autoscaling settings, and rollback strategies.

Debugging & docs

Support npm run start:debug for debugging with inspector.

List Swagger/OpenAPI URL (e.g., /api).

Use local mocks (docker-compose.yml) for external services (Redis, Postgres).

Agent hints

Remind agents to update AppModule when adding modules.

Enforce DTO validation; never bypass pipes.

Follow naming conventions (*.service.ts, *.controller.ts).

Always run prisma generate after changing schema.