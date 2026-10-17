#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(repoRoot, 'AGENTS.md');
const markdown = readFileSync(input, 'utf8');
const tracked = new Set(execFileSync('git', ['ls-files', '-z'], {
  cwd: repoRoot,
  encoding: 'utf8',
}).split('\0').filter(Boolean));
const candidates = [];

function addCandidate(raw, source, forcePath = false) {
  let value = raw.trim().replace(/^<|>$/g, '');
  value = value.replace(/[.,:;!?]+$/, '');
  if (!value || value.startsWith('#') || value.includes('<') || /[*?{}]/.test(value)) return;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('//')) return;

  const withoutAnchor = value.split(/[?#]/, 1)[0];
  const hasPathSeparator = withoutAnchor.includes('/');
  const hasExtension = /\.[A-Za-z0-9_-]+$/.test(withoutAnchor);
  if (!forcePath && !hasPathSeparator && !hasExtension) return;
  // Product names can resemble file names; Node.js in prose is not a path.
  if (source === 'backtick span' && withoutAnchor.toLowerCase() === 'node.js') return;
  candidates.push({ value: withoutAnchor, source });
}

for (const match of markdown.matchAll(/\[[^\]]*\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+[^)]*)?\s*\)/g)) {
  addCandidate(match[1], 'Markdown link', true);
}

for (const match of markdown.matchAll(/(`+)([\s\S]*?)\1/g)) {
  for (const token of match[2].split(/\s+/)) {
    addCandidate(token.replace(/^['"([{]+|['")\]}]+$/g, ''), 'backtick span');
  }
}

const errors = [];
for (const { value, source } of candidates) {
  const normalized = value.replaceAll('\\', '/');
  if (isAbsolute(normalized) || normalized.split('/').includes('..')) {
    errors.push(`${source}: path escapes the repository: ${value}`);
    continue;
  }

  const rel = relative(repoRoot, resolve(repoRoot, normalized)).split(sep).join('/');
  const trackedFile = tracked.has(rel);
  const trackedDirectory = rel === '' || [...tracked].some((path) => path.startsWith(`${rel}/`));
  if (!trackedFile && !trackedDirectory) {
    errors.push(`${source}: path is not Git-tracked: ${value}`);
  }
}

if (errors.length) {
  console.error(`Agent path check failed for ${relative(repoRoot, input) || input}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Agent path check passed for ${relative(repoRoot, input) || input}.`);
}
