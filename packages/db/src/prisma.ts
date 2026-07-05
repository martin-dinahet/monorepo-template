import { env } from "@packages/environment";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./prisma/client.js";

export const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
});
