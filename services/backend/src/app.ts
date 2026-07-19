import { auth } from "@packages/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { resolveCorsOrigin } from "./cors.js";

export const app = new Hono()
  .basePath("/api")
  .use(logger())
  .use(
    cors({
      credentials: true,
      origin: resolveCorsOrigin,
    }),
  )
  .get("/health", (c) => c.json({ status: "OK" }))
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));
