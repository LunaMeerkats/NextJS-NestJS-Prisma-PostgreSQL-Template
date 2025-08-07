# Migrating from Staging to Production

Promote changes from staging to production with care for schema and data.

## Applying new Prisma migrations

Run pending migrations against the production database during deployments:

```bash
npx prisma migrate deploy
```

This applies existing migration files without generating new ones.

## Transferring table data

Use PostgreSQL tools to copy data between environments:

```bash
pg_dump "$STAGING_DATABASE_URL" | pg_restore --dbname="$PRODUCTION_DATABASE_URL"
```

For simpler cases, Prisma can synchronize schemas and data:

```bash
npx prisma db pull --url "$STAGING_DATABASE_URL"
npx prisma db push --url "$PRODUCTION_DATABASE_URL"
```

Choose the method that fits your needs for data fidelity and downtime.

## Environment configuration

Keep environment-specific settings such as database URLs in separate `.env` files (e.g., `.env.staging` and `.env.production`). Ensure deployment scripts reference the appropriate configuration when running migrations or transferring data.

