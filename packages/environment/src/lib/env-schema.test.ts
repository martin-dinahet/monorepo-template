import { describe, expect, it } from "vitest";
import { envSchema } from "./env-schema.js";

describe("envSchema", () => {
  it("validates required server environment variables", () => {
    const env = envSchema.parse({
      DATABASE_URL: "postgres://user:password@localhost:5432/db",
      BETTER_AUTH_SECRET: "local-development-secret-change-before-production",
      BETTER_AUTH_URL: "http://localhost:3000",
      BETTER_AUTH_TRUSTED_ORIGINS: "http://localhost:5173",
    });

    expect(env.DATABASE_URL).toBe("postgres://user:password@localhost:5432/db");
    expect(env.BETTER_AUTH_SECRET.length).toBeGreaterThanOrEqual(32);
    expect(env.BETTER_AUTH_URL).toBe("http://localhost:3000");
    expect(env.BETTER_AUTH_TRUSTED_ORIGINS).toBe("http://localhost:5173");
  });

  it("defaults the auth URL for local development", () => {
    const env = envSchema.parse({
      DATABASE_URL: "postgres://user:password@localhost:5432/db",
      BETTER_AUTH_SECRET: "local-development-secret-change-before-production",
    });

    expect(env.BETTER_AUTH_URL).toBe("http://localhost:3000");
  });
});
