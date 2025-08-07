# NextJS-NestJS-Prisma-PostgreSQL Template

This repository provides a starting point for deploying a Next.js frontend and NestJS backend with PostgreSQL.

## Local development

Run PostgreSQL locally using Docker Compose:

```bash
docker compose up -d
```

The database service exposes the following environment variables and defaults:

- `POSTGRES_USER` (default: `postgres`)
- `POSTGRES_PASSWORD` (default: `postgres`)
- `POSTGRES_DB` (default: `postgres`)

Modify these values in `docker-compose.yml` or an `.env` file as needed.

## Building Docker images

Build the backend and frontend images:

```bash
docker build -t template-backend ./backend
docker build -t template-frontend ./frontend
```

Run the images with required environment variables:

```bash
docker run -e DATABASE_URL=postgres://postgres:postgres@db:5432/postgres template-backend
docker run -e NEXT_PUBLIC_API_URL=http://localhost:3000 template-frontend
```

## Push to Amazon ECR for Fargate

1. Create ECR repositories:

```bash
aws ecr create-repository --repository-name template-backend
aws ecr create-repository --repository-name template-frontend
```

2. Authenticate Docker to your registry:

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
```

3. Tag and push the images:

```bash
docker tag template-backend:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/template-backend:latest
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/template-backend:latest

docker tag template-frontend:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/template-frontend:latest
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/template-frontend:latest
```

4. Use the pushed image URIs in your ECS task definitions and deploy on AWS Fargate.
