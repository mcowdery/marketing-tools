// Appends one row to log.csv: date, topic, where it was posted, response so far. Plain argv, no prompts.
//
//   node log.mjs "topic" "where" "response" [date]     date defaults to today (YYYY-MM-DD)
import { existsSync, appendFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = resolve(fileURLToPath(new URL('.', import.meta.url)));
const CSV = resolve(HERE, 'log.csv');

const [topic, where, response, dateArg] = process.argv.slice(2);
if (!topic) {
  console.error('usage: node log.mjs "topic" "where" "response" [date]');
  process.exit(1);
}
const date = dateArg || new Date().toISOString().slice(0, 10);

const esc = (s = '') => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);

if (!existsSync(CSV)) writeFileSync(CSV, 'date,topic,where,response\n');
appendFileSync(CSV, [date, topic, where ?? '', response ?? ''].map(esc).join(',') + '\n');
console.log(`logged: ${date} | ${topic} | ${where ?? ''} | ${response ?? ''}`);
