# monorepo-template

A pnpm + Turborepo starter for a TypeScript full-stack app.

It includes a Hono API, a React/Vite frontend, Prisma with Postgres, shared TypeScript
configuration, environment validation, and Better Auth wired to the database.

## Stack

- Node.js 22+
- pnpm 11
- Turborepo
- TypeScript 6
- Hono
- React 19 + Vite
- Prisma 7 + Postgres
- Better Auth
- Biome

## Repository Layout

```text
.
├── packages/
│   ├── auth/               # Auth package backed by Better Auth
│   ├── db/                 # Prisma schema, migrations, generated client wrapper
│   ├── environment/        # dotenv loading and Zod environment validation
│   └── config/             # Shared TypeScript and Biome configuration packages
├── services/
│   ├── backend/            # Hono API server
│   └── frontend/           # React + Vite app
├── compose.yaml            # Local Postgres container
├── pnpm-workspace.yaml     # Workspace packages and pnpm settings
├── turbo.json              # Task pipeline
└── biome.json              # Formatting and linting
```

## Package Graph

```text
@services/backend
  -> @packages/auth
    -> @packages/db
      -> @packages/environment

@services/frontend
  -> standalone React/Vite app
```

## Prerequisites

- Node.js 22 or newer
- pnpm 11
- Docker, for the local Postgres database

This repository includes `.node-version` and `.nvmrc` files for Node version managers.

## Getting Started

Install dependencies:

```sh
pnpm install
```

Create a local environment file:

```sh
cp .env.example .env
```

Update `BETTER_AUTH_SECRET` in `.env` before doing anything beyond local development. A good
secret can be generated with:

```sh
openssl rand -base64 32
```

Start Postgres:

```sh
pnpm db:up
```

Apply migrations and generate the Prisma client:

```sh
pnpm db:migrate
pnpm db:generate
```

Start the workspace in development mode:

```sh
pnpm dev
```

After creating `.env`, you can also run the local setup path as one command:

```sh
pnpm dev:setup
```

By default:

- Backend API: `http://localhost:3000`
- API health check: `http://localhost:3000/api/health`
- Auth routes: `http://localhost:3000/api/auth/*`
- Frontend: `http://localhost:5173`

## Environment Variables

The root `.env` file is intentionally ignored by git. Use `.env.example` as the template.

```env
DATABASE_URL="postgres://user:password@localhost:5432/db"
BETTER_AUTH_SECRET="replace-with-at-least-32-characters"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_TRUSTED_ORIGINS="http://localhost:5173"
VITE_API_URL="http://localhost:3000"
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Postgres connection string used by Prisma. |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth for signing/encryption. Use a strong value. |
| `BETTER_AUTH_URL` | Public base URL for the auth server. |
| `BETTER_AUTH_TRUSTED_ORIGINS` | Comma-separated list of frontend origins allowed by Better Auth and backend CORS. |
| `VITE_API_URL` | Browser-safe API base URL for the frontend. |

## Scripts

Run these from the repository root.

| Command | Description |
| --- | --- |
| `pnpm clean` | Remove generated build output and local caches. |
| `pnpm dev` | Start all workspace development tasks. |
| `pnpm dev:setup` | Install dependencies, start Postgres, run migrations, and generate Prisma. |
| `pnpm build` | Build packages and services through Turborepo. |
| `pnpm typecheck` | Type-check the workspace. |
| `pnpm start` | Start built services. |
| `pnpm biome:lint` | Run Biome linting. |
| `pnpm biome:format` | Format files with Biome. |
| `pnpm biome:check` | Run Biome checks and write safe fixes. |
| `pnpm db:up` | Start local Postgres with Docker Compose. |
| `pnpm db:stop` | Stop the local Postgres container. |
| `pnpm db:clean` | Stop Postgres and remove its volumes. |
| `pnpm db:generate` | Generate the Prisma client for `@packages/db`. |
| `pnpm db:migrate` | Run Prisma migrations in development mode. |

## Database

The Prisma schema lives at `packages/db/prisma/schema.prisma`.

Generated Prisma client files are emitted into `packages/db/src/generated/prisma/` and are ignored by git.
Run `pnpm db:generate` after changing the schema or after a fresh install if the generated client is
missing.

Migrations live in `packages/db/prisma/migrations/`.

## Auth

Auth is configured in `packages/auth/src/index.ts` using Better Auth.

The backend mounts auth handlers under:

```text
/api/auth/*
```

The auth package reads its required settings from `@packages/environment`, so missing or invalid
environment variables fail early during startup.

## API Docs

The current backend route map is documented in `docs/api.md`.

## Quality Checks

Before opening a PR or sharing changes, run:

```sh
pnpm typecheck
pnpm build
pnpm biome:lint
pnpm audit --audit-level moderate
```

## Notes For Template Users

- Keep `.env` out of git. Commit `.env.example` instead.
- Keep generated files out of git, including `dist/`, `*.tsbuildinfo`, and Prisma generated output.
- If you change database relations, add a Prisma migration as well as updating `schema.prisma`.
- The pnpm override in `pnpm-workspace.yaml` pins a patched transitive `@hono/node-server` version.
