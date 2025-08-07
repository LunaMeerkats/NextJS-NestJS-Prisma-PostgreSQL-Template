# Backend – NestJS API

This service exposes a REST API backed by PostgreSQL using Prisma.

See [AGENTS.md](./AGENTS.md) for conventions and architectural guidelines.

## Environment variables
Values are loaded from one of the `.env.*` files depending on `NODE_ENV`:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Connection string for PostgreSQL |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `REDIS_HOST` | Redis host for caching and queues |
| `SENTRY_DSN` | Optional DSN for Sentry error tracking |
| `MAILER_API_KEY` | API key for outbound email provider |
| `PORT` | HTTP port for the server |

## Development
```bash
npm install
npm run start:dev
```

## Testing
```bash
npm test
```

## Production build
```bash
npm run build
npm run start:prod
```
