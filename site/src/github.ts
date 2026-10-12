// Repository stats, fetched once per build. GitHub is a build-time dependency
// only: if it is unreachable the site still builds, just without numbers.
import { allProjects } from "./content";

export type RepoStats = { stars: number; forks: number; pushedAt: string };

const repoPath = (url: string) => new URL(url).pathname.slice(1);

async function fetchRepo(path: string): Promise<[string, RepoStats] | null> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "i.ahoo.me-build" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const response = await fetch(`https://api.github.com/repos/${path}`, { headers, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const repo = await response.json();
    return [path, { stars: repo.stargazers_count, forks: repo.forks_count, pushedAt: repo.pushed_at }];
  } catch (error) {
    console.warn(`[github] ${path}: ${(error as Error).message} — stats omitted`);
    return null;
  }
}

let cache: Promise<Map<string, RepoStats>> | undefined;

/** Stats keyed by repository URL; repos that failed to load are absent. */
export function loadStats(): Promise<Map<string, RepoStats>> {
  cache ??= Promise.all(allProjects.map((p) => fetchRepo(repoPath(p.repo)))).then(
    (entries) =>
      new Map(
        entries
          .filter((e): e is [string, RepoStats] => e !== null)
          .map(([path, stats]) => [`https://github.com/${path}`, stats]),
      ),
  );
  return cache;
}

/** Below this, a star count is not evidence of anything, so badges hide it. */
export const NOTABLE_STARS = 10;

/** 1134 → "1.1k" */
export const compact = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n));
