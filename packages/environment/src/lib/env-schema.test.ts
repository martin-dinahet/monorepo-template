import { describe, expect, it } from "vitest";
import { clientEnvSchema, envSchema, serverEnvSchema } from "./env-schema.js";

describe("serverEnvSchema", () => {
  it("validates required server environment variables", () => {
    const env = serverEnvSchema.parse({
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
    const env = serverEnvSchema.parse({
      DATABASE_URL: "postgres://user:password@localhost:5432/db",
      BETTER_AUTH_SECRET: "local-development-secret-change-before-production",
    });

    expect(env.BETTER_AUTH_URL).toBe("http://localhost:3000");
  });

  it("keeps the legacy envSchema export pointed at server env", () => {
    expect(envSchema).toBe(serverEnvSchema);
  });
});

describe("clientEnvSchema", () => {
  it("only accepts public Vite environment variables", () => {
    const env = clientEnvSchema.parse({
      VITE_API_URL: "http://localhost:3000",
      BETTER_AUTH_SECRET: "must-not-be-read-by-client-schema",
    });

    expect(env).toEqual({ VITE_API_URL: "http://localhost:3000" });
  });

  it("defaults the API URL for local development", () => {
    expect(clientEnvSchema.parse({}).VITE_API_URL).toBe("http://localhost:3000");
  });
});
