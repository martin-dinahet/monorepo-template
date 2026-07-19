import { config } from "dotenv";
import { findEnvFile } from "./lib/find-env-file.js";
import { serverEnvSchema } from "./lib/server-env-schema.js";

const envPath = findEnvFile();
if (envPath) config({ path: envPath });

export { clientEnvSchema } from "./lib/client-env-schema.js";
export { envSchema, serverEnvSchema } from "./lib/env-schema.js";

export const env = serverEnvSchema.parse(process.env);
