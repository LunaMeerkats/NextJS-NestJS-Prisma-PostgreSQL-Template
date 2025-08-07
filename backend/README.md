# Backend – NestJS API

This service exposes a REST API backed by PostgreSQL using Prisma.

See [AGENTS.md](./AGENTS.md) for conventions and architectural guidelines.

## Environment variables
Values are loaded from one of the `.env.*` files depending on `NODE_ENV`:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Connection string for PostgreSQL |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `ENCRYPTION_KEY` | Secret key used for AES encryption |
| `REDIS_HOST` | Redis host for caching and queues |
| `SENTRY_DSN` | Optional DSN for Sentry error tracking |
| `MAILER_API_KEY` | API key for outbound email provider |
| `PORT` | HTTP port for the server |
| `CORS_ORIGIN` | Comma-separated list of allowed CORS origins |

## Development
```bash
npm install
npm run start:dev
```

The API includes built-in authentication with JWT, role-based authorization, CSRF protection, rate limiting and security headers via Helmet and CORS configuration.

## Testing
```bash
npm test
```

## Production build
```bash
npm run build
npm run start:prod
```
