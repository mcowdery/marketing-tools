// Turns recent commits in a repo into a single markdown briefing you can feed to Claude to draft a
// post from — it never writes or posts anything itself, just assembles the raw material.
//
//   node gather.mjs <repoPath> [--since=14d|YYYY-MM-DD] [--author=<email>] [--devlog]
//
// Default --since is 14 days ago; default --author is mcowdery@gmail.com. Output goes to
// briefings/<since>_<repoName>.md. Noisy files (lockfiles, snapshots, binary assets) are listed but
// not diffed, and the whole diff is capped so the briefing stays small enough to actually read.
// --devlog swaps the closing instruction for a build-in-public / game-dev framing instead of the
// default case-study-for-engineering-leads one — same gathering, different audience.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = resolve(fileURLToPath(new URL('.', import.meta.url)));
const MAX_DIFF_LINES = 4000;
const SKIP = [
  /package-lock\.json$/,
  /\.snap$/,
  /\.(png|jpg|jpeg|glb|gltf|bin|webp|mp3|wav|ogg)$/i,
  /^dist(-\w+)?\//,
  /^node_modules\//,
];

const args = process.argv.slice(2);
const repoArg = args.find((a) => !a.startsWith('--'));
const flag = (name, def) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : def;
};
const devlog = args.includes('--devlog');

if (!repoArg) {
  console.error('usage: node gather.mjs <repoPath> [--since=14d|YYYY-MM-DD] [--author=<email>] [--devlog]');
  process.exit(1);
}

const repo = resolve(repoArg);
const author = flag('author', 'mcowdery@gmail.com');
const sinceArg = flag('since', '14d');
const since = /^\d+d$/.test(sinceArg) ? `${sinceArg.slice(0, -1)} days ago` : sinceArg;

const git = (gitArgs) => execFileSync('git', gitArgs, { cwd: repo, encoding: 'utf8' }).trim();

let log;
try {
  log = git(['log', `--since=${since}`, `--author=${author}`, '--format=%H|%ad|%s', '--date=short']);
} catch (err) {
  console.error(`git log failed in ${repo}: ${err.message}`);
  process.exit(1);
}

if (!log) {
  console.log(`No commits by ${author} since ${since} in ${repo}.`);
  process.exit(0);
}

const commits = log.split('\n').map((line) => {
  const [hash, date, ...rest] = line.split('|');
  return { hash, date, subject: rest.join('|') };
});

let diffLines = 0;
let truncated = false;
const sections = [];

for (const c of commits) {
  const files = git(['show', '--name-only', '--format=', c.hash]).split('\n').filter(Boolean);
  const kept = files.filter((f) => !SKIP.some((re) => re.test(f)));
  const skipped = files.filter((f) => SKIP.some((re) => re.test(f)));

  let body = `## ${c.date} \`${c.hash.slice(0, 7)}\` ${c.subject}\n\n`;
  if (skipped.length) body += `(also touched, not diffed: ${skipped.join(', ')})\n\n`;

  for (const f of kept) {
    if (truncated) break;
    const diff = git(['show', c.hash, '--', f]);
    const lines = diff.split('\n');
    diffLines += lines.length;
    body += `### ${f}\n\n\`\`\`diff\n${diff}\n\`\`\`\n\n`;
    if (diffLines > MAX_DIFF_LINES) {
      truncated = true;
      body += `_(diff budget reached — remaining commits listed without diffs)_\n\n`;
    }
  }
  sections.push(body);
}

const instruction = devlog
  ? `> Using this material, draft a short devlog post — build-in-public, aimed at an indie/game-dev\n` +
    `> audience (itch.io, r/gamedev, a devlog thread), about what got built and what was actually\n` +
    `> hard about it. Show, don't pitch: no "excited to announce," no claimed outcomes that didn't\n` +
    `> happen, and flag anything you're inferring rather than reading directly from the diff.\n`
  : `> Using this material, draft a short case-study or LinkedIn-style post aimed at engineering leads,\n` +
    `> about the real problem solved and why it matters. Don't claim outcomes that didn't happen, and\n` +
    `> flag anything you're inferring rather than reading directly from the diff.\n`;

const header = `# Briefing: ${basename(repo)}, since ${since}\n\n` +
  `${commits.length} commit(s) by ${author}. Feed this to Claude with something like:\n\n` +
  instruction + `\n---\n\n`;

const outDir = resolve(HERE, 'briefings');
mkdirSync(outDir, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const outPath = resolve(outDir, `${stamp}-${basename(repo)}.md`);
writeFileSync(outPath, header + sections.join('\n'));

console.log(`${commits.length} commit(s) -> ${outPath}`);
if (truncated) console.log('Diff budget reached; briefing was truncated — narrow --since if you want everything.');
