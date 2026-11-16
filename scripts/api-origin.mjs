// Finds a backend that answers /api with real data, for build steps that need
// the database (sitemap, pre-rendering). Tries, in order: BACKEND_URL, the
// backend on this machine (PORT from the environment or backend/.env), then the
// live site. Returns the origin (e.g. http://127.0.0.1:5000) or null.
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('..', import.meta.url);

const backendPort = () => {
  if (process.env.PORT) return process.env.PORT;
  const envFile = new URL('backend/.env', root);
  if (existsSync(envFile)) {
    const match = readFileSync(envFile, 'utf8').match(/^\s*PORT\s*=\s*["']?(\d+)/m);
    if (match) return match[1];
  }
  return '5000';
};

let cached;

export const findApiOrigin = async (siteUrl) => {
  if (cached !== undefined) return cached;
  const port = backendPort();
  const candidates = [process.env.BACKEND_URL, `http://127.0.0.1:${port}`, siteUrl].filter(Boolean);
  for (const origin of [...new Set(candidates.map((url) => url.replace(/\/+$/, '').replace(/\/api$/, '')))]) {
    try {
      const res = await fetch(`${origin}/api/projects`, { signal: AbortSignal.timeout(8000) });
      const data = res.ok ? await res.json() : null;
      if (Array.isArray(data)) {
        cached = origin;
        return origin;
      }
      console.warn(`api: ${origin}/api answered ${res.status}, trying the next one`);
    } catch (error) {
      console.warn(`api: ${origin}/api not reachable (${error.cause?.code || error.name}), trying the next one`);
    }
  }
  cached = null;
  return null;
};
