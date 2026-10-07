// The recurring-cadence version of gather.mjs: runs it against every repo listed in repos.txt in
// one go, so "write up what happened" becomes a single command instead of one per repo.
//
//   node digest.mjs [--since=14d]
//
// Edit repos.txt (one path per line, '#' comments allowed) to add or drop repos. Run this every
// 1-2 weeks, not per-commit — a digest needs enough material to find a real thread in.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = resolve(fileURLToPath(new URL('.', import.meta.url)));
const since = (process.argv.find((a) => a.startsWith('--since=')) ?? '--since=14d').slice('--since='.length);

const repos = readFileSync(resolve(HERE, 'repos.txt'), 'utf8')
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'));

if (!repos.length) {
  console.error('repos.txt has no repo paths in it — add one per line.');
  process.exit(1);
}

console.log(`Gathering the last ${since} from ${repos.length} repo(s)...\n`);
for (const repo of repos) {
  try {
    execFileSync(process.execPath, [resolve(HERE, 'gather.mjs'), repo, `--since=${since}`], { stdio: 'inherit' });
  } catch (err) {
    console.error(`skipped ${repo}: ${err.message}`);
  }
}
console.log('\nOpen the new files in briefings/ and hand whichever has the best thread to Claude for a draft.');
