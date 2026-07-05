# monorepo-template

A pnpm Turborepo monorepo with a Hono backend, React frontend, Prisma + Postgres, and better-auth.

## Prerequisites

- Node.js >= 22
- pnpm 11
- Docker (for Postgres)

## Getting started

```sh
# Install dependencies
pnpm install

# Start the database
pnpm db:up

# Apply migrations
pnpm db:migrate

# Generate Prisma client
pnpm db:generate

# Start all services in dev mode
pnpm dev
```

### Environment

Copy `.env` to the project root (if not present):

```
DATABASE_URL="postgres://user:password@localhost:5432/db"
```

## Project structure

```
├── packages/
│   ├── environment/       # Env loading & validation (dotenv + zod)
│   ├── db/                # Prisma database layer (Postgres)
│   ├── better-auth/       # better-auth configuration
│   └── typescript-config/ # Shared tsconfig presets (base/node/react)
├── services/
│   ├── backend/           # Hono API server (port 3000)
│   └── frontend/          # React + Vite SPA (port 5173)
├── compose.yaml           # Postgres 18 container
├── turbo.json             # Turborepo task configuration
└── biome.json             # Linting & formatting
```

### Dependency graph

```
@services/backend → @packages/better-auth → @packages/db → @packages/environment
@services/frontend (standalone)
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start all services in dev mode (watch mode) |
| `pnpm build` | Build all packages and services |
| `pnpm typecheck` | Type-check all packages and services |
| `pnpm start` | Start built services |
| `pnpm biome:check` | Lint and format with Biome |
| `pnpm db:up` | Start Postgres via Docker Compose |
| `pnpm db:stop` | Stop Postgres container |
| `pnpm db:clean` | Stop and remove Postgres container + volumes |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Apply pending Prisma migrations |

## Stack

- **Runtime:** Node.js + TypeScript 6
- **Backend:** Hono + @hono/node-server
- **Frontend:** React 19 + Vite 8
- **Database:** Postgres 18 + Prisma 7
- **Auth:** better-auth
- **Monorepo:** pnpm workspaces + Turborepo
- **Linting:** Biome
