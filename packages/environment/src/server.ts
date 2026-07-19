import { config } from "dotenv";
import { findEnvFile } from "./lib/find-env-file.js";
import { serverEnvSchema } from "./lib/server-env-schema.js";

const envPath = findEnvFile();
if (envPath) config({ path: envPath });

export { serverEnvSchema } from "./lib/server-env-schema.js";
export type { ServerEnv } from "./lib/server-env-schema.js";

export const serverEnv = serverEnvSchema.parse(process.env);
export const env = serverEnv;
