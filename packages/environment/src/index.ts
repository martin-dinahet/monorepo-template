import { config } from "dotenv";
import { envSchema } from "./lib/env-schema.js";
import { findEnvFile } from "./lib/find-env-file.js";

const envPath = findEnvFile();
if (envPath) config({ path: envPath });

export const env = envSchema.parse(process.env);
