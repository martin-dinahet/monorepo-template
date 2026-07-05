import { auth } from "@packages/better-auth";
import { Hono } from "hono";
import { logger } from "hono/logger";

export const app = new Hono()
  .basePath("/api")
  .use(logger())
  .get("/health", (c) => c.json({ status: "OK" }))
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));
