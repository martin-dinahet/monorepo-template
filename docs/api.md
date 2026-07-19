# API

The backend service is a Hono app mounted under `/api`.

Default local base URL:

```text
http://localhost:3000
```

## Routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check for the backend service. |
| `GET` / `POST` | `/api/auth/*` | Better Auth routes. The exact subroutes are provided by Better Auth. |

## Health Check

Request:

```sh
curl http://localhost:3000/api/health
```

Response:

```json
{
  "status": "OK"
}
```

## CORS

The backend allows browser requests from origins listed in `BETTER_AUTH_TRUSTED_ORIGINS`.

For local development, `.env.example` allows:

```text
http://localhost:5173
```

## Auth

Auth is configured in `packages/auth/src/index.ts` using Better Auth and the Prisma adapter from
`@packages/db`.

Auth routes are mounted by the backend at:

```text
/api/auth/*
```
