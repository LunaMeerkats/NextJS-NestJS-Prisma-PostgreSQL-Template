<!-- This AGENTS.md file lives at the root of the monorepo and serves as the authoritative reference for AI agents, developers, and CI systems when working with this project. It aggregates and summarizes the rules and procedures defined in the backend and frontend AGENTS files and adds global guidance applicable across the entire codebase. Keep this file up to date whenever the repository structure or workflows change. -->
Root AGENTS Guide
🧭 Purpose & Overview
Why this file exists: To instruct AI agents (such as Codex), new
developers, and CI tools on how to operate within this monorepo. It
consolidates high‑level rules and points to service‑specific files
(backend/AGENTS.md and frontend/AGENTS.md).

Repository composition: This monorepo contains at least two
top‑level packages:

backend/ – A NestJS API with Prisma for database access. See
backend/AGENTS.md for deep details.

frontend/ – A Next.js web application that consumes the API and
uses Prisma only on the server. See frontend/AGENTS.md for
specifics.

shared/ (optional) – Modules or libraries shared between
packages; keep shared code framework‑agnostic (e.g., utility
functions, TypeScript types). Do not import backend code
directly into the frontend.

🗃 Directory Layout
At the root, you’ll find configuration and tooling files such as
.editorconfig, .prettierrc, .eslintrc.js, package.json,
pnpm-workspace.yaml (or package.json#workspaces) and README.md.

Each package (backend/, frontend/, shared/) contains its own
src/, test/, prisma/ (if it uses Prisma), and an individual
AGENTS.md describing its internals. Read them before making
changes to that part of the codebase.

🛠 Setup & Dependencies
Workspace manager: This repository uses npm workspaces (or
pnpm/yarn workspaces depending on package.json). Run npm install at the root to install dependencies for all packages.

Per‑package installs: Avoid running npm install inside
packages unless adding a new dependency scoped to that package. For
dev‑dependencies that span packages (e.g. testing tools), add them
to the root package.json.

Bootstrap script: If available, run npm run bootstrap to link
local packages and generate Prisma clients where necessary.

🌿 Environment Configuration
Global variables: Secrets and runtime configuration should live
in environment files. Each package has its own .env.* files
(.env.development, .env.staging, .env.production). Do not
create a single .env at the root unless you need truly global
variables. Next.js loads envs in a specific order: first from
.env.$(NODE_ENV).local, then .env.local, .env.$(NODE_ENV) and
finally .env
nextjs.org
. NEXT_PUBLIC_ prefixed
variables are exposed to the browser
nextjs.org
; never
leak secrets with this prefix.

Back‑end secrets: Use AWS Secrets Manager or Vault for
production secrets. Do not commit secrets to git. The backend’s
ConfigModule loads the correct .env file based on NODE_ENV
and exposes a ConfigService

docs.nestjs.com
.

Prisma URLs: DATABASE_URL should be defined per environment
(development/staging/production). Do not hard‑code credentials.

🧪 Linting, Formatting & Testing
Code quality: The root sets up ESLint and Prettier config for
the entire repo. Pre‑commit hooks (via Husky and lint‑staged)
automatically run linters on staged files. CI pipelines will fail
if linting errors persist.

Testing: Each package contains its own test suite. Use npm test at the root to run all tests concurrently, or npm test --workspace <pkg> to run a specific package’s tests. Coverage
thresholds are enforced.

🚀 Running & Building
Development: Run npm run dev at the root to start the
frontend and backend concurrently (via concurrently or nx run).
This spins up the NestJS server (backend/start:dev) and Next.js
dev server (frontend/dev).

Production build: Use npm run build to compile both
packages. For the frontend, next build produces the .next
directory and next start runs a Node.js server
nextjs.org
.
For the backend, nest build compiles TypeScript; npm run start:prod runs the compiled server. Ensure you run npx prisma migrate deploy before starting in production to apply pending
migrations
prisma.io
.

Docker: Each package has its own Dockerfile. Build with
docker build -t repo-backend backend/ or repo-frontend frontend/.
Pass environment files via --env-file .env.production. For a
unified container, use docker-compose.yml in deploy/.

🛡 Security & Compliance
HTTP security: The backend registers helmet middleware to
set secure HTTP headers

docs.nestjs.com
. Do not remove this.

CORS & rate limiting: CORS is enabled with a whitelist; global
rate limiting is configured via @nestjs/throttler. Do not expose
endpoints without these protections.

Frontend CSP: Add a strict Content Security Policy in
next.config.js or via custom headers to mitigate XSS
nextjs.org
.

🔄 Database & Migrations
Prisma workflow: Models live in prisma/schema.prisma within
each package. After editing the schema, run npx prisma migrate dev --name <change> in the appropriate package to generate and
apply a migration
prisma.io
. Commit the generated
SQL files. Running prisma migrate dev also triggers prisma generate to update the client
prisma.io
.

Deploying migrations: In CI/CD, run npx prisma migrate deploy
before starting the server. Never apply migrations manually on
production databases.

📈 Monitoring & Logging
Logging: Use structured logging (pino or winston) across
packages. Include request IDs so that logs from frontend to backend
can be correlated.

Health checks: Expose /api/health in both apps. Uptime
monitors should hit these endpoints.

Error tracking: Integrate Sentry (backend and frontend). In
production, unhandled exceptions should report to Sentry or a
similar service.

🤖 Agent‐Specific Conventions
Follow package guidelines: When updating backend or frontend
code, always consult the respective AGENTS.md files for naming
conventions, module registration patterns, and test commands.

Type safety: Write all code in TypeScript. Never use the any
type; instead, define proper interfaces in the shared/ package.

Prisma usage: Do not import Prisma Client into React components.
All database queries must run server‑side. In the backend, use
dependency injection for PrismaService.

Environment variables: Always check whether a variable should be
server‑only or exposed to the browser. Prefix browser‑exposed vars
with NEXT_PUBLIC_
nextjs.org
 and avoid secrets in
those variables.

Secrets: Do not commit any secrets, tokens, or private keys.

Commit hygiene: Write descriptive commit messages. Keep PRs
small and focused; include relevant tests.

Third‑party libs: Evaluate dependencies carefully. Add
polyfills or shims only at the root; avoid duplicating dependencies
across packages.

📚 References
Next.js environment variables guide: explains loading order and
NEXT_PUBLIC_ semantics
nextjs.org
.

Next.js production checklist: details code splitting, image
optimization, font hosting and CSP
nextjs.org
.

NestJS configuration module: describes how to manage
environment variables via ConfigModule

docs.nestjs.com
.

Prisma migrations: outlines the workflow for generating and
applying migrations
prisma.io
.

Helmet security middleware: secures Express/NestJS apps via
HTTP headers

docs.nestjs.com
.

By adhering to the rules in this root AGENTS guide and the
package‑specific AGENTS files, AI assistants and developers can work
efficiently and securely across the entire stack. Consistency and
discipline here reduce friction and prevent subtle bugs when multiple
services interact.