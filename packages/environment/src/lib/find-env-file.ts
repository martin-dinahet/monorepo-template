import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

export function findEnvFile(startDir: string = process.cwd()): string | undefined {
  let dir = startDir;
  while (true) {
    const candidate = resolve(dir, ".env");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
}
