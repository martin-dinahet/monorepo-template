import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("app", () => {
  it("responds to the health check", async () => {
    const response = await app.request("/api/health");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "OK" });
  });

  it("allows requests from trusted frontend origins", async () => {
    const response = await app.request("/api/health", {
      headers: {
        Origin: "http://localhost:5173",
      },
    });

    expect(response.headers.get("access-control-allow-origin")).toBe("http://localhost:5173");
    expect(response.headers.get("access-control-allow-credentials")).toBe("true");
  });
});
