* Overview of the backend’s purpose and high‑level architecture (monolith vs. microservices) and major modules/services.
* Directory layout (`src/`, `test/`, `scripts/`, `config/`, `docker/`, `infra/`, `docs/`) and where controllers, services, modules, DTOs, and interfaces reside under `src/`.
* Environment configuration: description of `.env.development`, `.env.staging`, `.env.production` and required variables (`DATABASE_URL`, `JWT_SECRET`, `REDIS_HOST`, `SENTRY_DSN`, `MAILER_API_KEY`); how `ConfigModule` loads files by `NODE_ENV`.
* Build and startup commands for development (`npm install`, `npm run start:dev`), production (`npm run build`, `npm run start:prod`), and Docker usage (`docker build`, `docker run --env-file .env.production`).
* Linting & formatting setup (ESLint, Prettier, husky, lint-staged) and CI lint checks (`npm run lint`).
* Testing instructions (`npm run test`, `npm run test:cov` with coverage thresholds).
* Dependency management guidelines (dev dependencies only for build/test tools; compile before running).
* Security practices (AWS Secrets Manager or Vault, `helmet`, CORS, rate limiting).
* Database and migration commands (`npm run migration:generate -- -n <Name>`, `npm run migration:run`), plus retry/backoff strategy.
* Monitoring & logging (Winston/Pino, `/health`, `/metrics`, Sentry/DataDog).
* Message queues/background agents and how to start them (`npm run start:worker`, scheduling info).
* CI/CD workflow steps (install → lint → test → build → deploy; secrets handling).
* Deployment & orchestration notes (PM2 or Kubernetes/Helm examples, resource limits).
* Debugging tools (`npm run start:debug`, Swagger at `/api`, local mocks via `docker-compose.yml`).
* Documentation references (`.eslintrc.js`, `.prettierrc`, README), naming conventions, validation pipe usage, module registration hints.
