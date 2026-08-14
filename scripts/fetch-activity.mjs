#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '..', 'public', 'activity.json');

const USER = process.env.GITHUB_USER ?? 'ferreret';
const EXCLUDED_REPOS = new Set([`${USER}/portfolio`, `${USER}/${USER}`]);
const MAX_ITEMS = 6;

const headers = { Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function ghJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

function dayKey(iso) {
  return iso.slice(0, 10);
}

function buildGroups(events) {
  const groups = new Map();

  for (const ev of events) {
    if (ev.type !== 'PushEvent') continue;
    if (EXCLUDED_REPOS.has(ev.repo.name)) continue;
    const head = ev.payload?.head;
    if (!head) continue;

    const key = `${ev.repo.name}::${dayKey(ev.created_at)}`;

    if (!groups.has(key)) {
      groups.set(key, {
        repo: ev.repo.name,
        repoShort: ev.repo.name.split('/')[1],
        day: dayKey(ev.created_at),
        latestAt: ev.created_at,
        latestHead: head,
        heads: new Set([head]),
      });
      continue;
    }

    const group = groups.get(key);
    group.heads.add(head);
    if (ev.created_at > group.latestAt) {
      group.latestAt = ev.created_at;
      group.latestHead = head;
    }
  }

  return Array.from(groups.values())
    .sort((a, b) => b.latestAt.localeCompare(a.latestAt))
    .slice(0, MAX_ITEMS);
}

async function enrich(group) {
  const commit = await ghJson(`https://api.github.com/repos/${group.repo}/commits/${group.latestHead}`);
  const message = (commit.commit?.message ?? '').split('\n')[0];
  return {
    repo: group.repo,
    repoShort: group.repoShort,
    repoUrl: `https://github.com/${group.repo}`,
    latestMessage: message,
    latestCommitUrl: `https://github.com/${group.repo}/commit/${group.latestHead}`,
    pushCount: group.heads.size,
    latestAt: group.latestAt,
  };
}

// Top languages across non-fork repos, precomputed here so the visitor's
// browser never calls api.github.com (unauthenticated: 60 req/h per IP).
async function fetchLanguages() {
  const repos = await ghJson(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`);
  const langMap = {};
  for (const r of repos) {
    if (r.fork || !r.language) continue;
    langMap[r.language] = (langMap[r.language] || 0) + 1;
  }
  const total = Object.values(langMap).reduce((a, b) => a + b, 0);
  if (total === 0) return [];
  return Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count, pct: Math.round((count / total) * 100) }));
}

async function main() {
  const events = await ghJson(`https://api.github.com/users/${USER}/events/public?per_page=100`);
  const groups = buildGroups(events);
  const items = [];
  for (const group of groups) {
    try {
      items.push(await enrich(group));
    } catch (err) {
      console.warn(`Skipping ${group.repo}@${group.latestHead}: ${err.message}`);
    }
  }

  let languages = [];
  try {
    languages = await fetchLanguages();
  } catch (err) {
    console.warn(`Language stats failed (ticker still written): ${err.message}`);
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    user: USER,
    items,
    languages,
  };
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Wrote ${items.length} items to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
