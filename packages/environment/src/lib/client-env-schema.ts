import { z } from "zod";

export const clientEnvSchema = z.object({
  VITE_API_URL: z.url().default("http://localhost:3000"),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
