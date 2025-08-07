# NextJS + NestJS + Prisma + PostgreSQL Template

This repository is a monorepo that provides a ready‑to‑use template for a full‑stack application. It contains:

- **backend/** – a NestJS API that uses Prisma to access a PostgreSQL database.
- **frontend/** – a Next.js application that consumes the backend API.
- **docs/** – additional documentation and guides.

For repository conventions and best practices, see [AGENTS.md](./AGENTS.md).

## Environment files
Each package has its own environment files so that configuration can vary by deployment target. The following files are included:

### backend
- `.env.development` – local development values (e.g. database URL and JWT secret).
- `.env.staging` – staging environment values.
- `.env.production` – production secrets and settings.

Important variables include `DATABASE_URL`, `JWT_SECRET`, `REDIS_HOST`, `SENTRY_DSN`, `MAILER_API_KEY`, `PORT`, and `CORS_ORIGIN`.

### frontend
- `.env.development` – local development API endpoint.
- `.env.staging` – staging API endpoint.
- `.env.production` – production API endpoint.

Frontend variables that begin with `NEXT_PUBLIC_` are exposed to the browser. Do not store secrets with this prefix.

## Getting started
1. Install dependencies for each package:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Copy the appropriate `.env.*` file to `.env` or export the variables in your shell.
3. Start both services:
   ```bash
   cd backend && npm run start:dev
   # in another terminal
   cd frontend && npm run dev
   ```

## Testing
Run tests in each package:
```bash
cd backend && npm test
cd ../frontend && npm test
```

## Docker
A `docker-compose.yml` is provided for running the services with PostgreSQL in containers.

