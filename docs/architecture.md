# Architecture

This template separates runnable applications from reusable workspace packages.

## Directory Model

```text
services/
  backend/   Runnable Hono API service.
  frontend/  Runnable React/Vite web service.

packages/
  auth/         Auth boundary backed by Better Auth.
  db/           Prisma schema, migrations, generated client, and database wrapper.
  environment/ Environment schemas and runtime env parsing.
  config/      Shared tool configuration packages.
```

Use `services/` for things that are deployed or run as processes. Use `packages/` for code that is
consumed by services or other packages.

## Dependency Direction

Packages should not import from `services/`. Services compose packages.

```text
@services/backend
  -> @packages/auth
    -> @packages/db
      -> @packages/environment/server

@services/frontend
  -> @packages/environment/client, when browser env validation is needed
```

This keeps shared packages reusable when a new service is added.

## Config Packages

Shared tool configuration lives under `packages/config/`:

- `@repo/config-typescript` exports base, Node, and React TypeScript configs.
- `@repo/config-biome` exports the shared Biome linting and formatting config.

The root `biome.json` keeps repository-local settings such as VCS integration and extends the shared
Biome package. Individual TypeScript projects extend the relevant TypeScript config package file.

## Auth Boundary

`@packages/auth` is the app-level auth package. It currently uses Better Auth internally, but service
code should import the local package instead of importing Better Auth configuration directly. That
keeps the auth implementation replaceable without forcing every service to change.

## Environment Boundary

`@packages/environment` has explicit client and server entrypoints:

- `@packages/environment/server` loads `.env`, parses `process.env`, and exports server-only values.
- `@packages/environment/client` exports the browser-safe client schema.

Server code should use the server entrypoint. Browser code should use the client entrypoint and only
depend on `VITE_*` variables.

## Database Boundary

Prisma belongs to `@packages/db`. The generated Prisma client is emitted into
`packages/db/src/generated/prisma/` and ignored by git.

Services should import the database wrapper from `@packages/db` instead of constructing Prisma
clients directly.

## Adding a New Project

1. Add a runnable app under `services/` or reusable code under `packages/`.
2. Pick the closest TypeScript config from `@repo/config-typescript`.
3. Add only the workspace dependencies the project directly imports.
4. Keep runtime environment reads behind `@packages/environment/server` or
   `@packages/environment/client`.
5. If the project introduces shared tooling rules, prefer a config package under `packages/config/`.
