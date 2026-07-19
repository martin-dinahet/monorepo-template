import { db } from "@packages/db";
import { serve } from "@hono/node-server";
import { app } from "./app.js";

const server = serve({
  fetch: app.fetch,
  port: 3000,
});

async function shutdown(signal: NodeJS.Signals) {
  console.info(`Received ${signal}, shutting down...`);

  const forceExit = setTimeout(() => {
    console.error("Shutdown timed out, exiting.");
    process.exit(1);
  }, 10_000);
  forceExit.unref();

  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  await db.$disconnect();
  clearTimeout(forceExit);
  process.exit(0);
}

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    void shutdown(signal);
  });
}
