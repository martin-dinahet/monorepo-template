import { env } from "@packages/environment";

const trustedOrigins =
  env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

export function resolveCorsOrigin(origin: string): string | undefined {
  if (!origin) return undefined;
  return trustedOrigins.includes(origin) ? origin : undefined;
}
