# Handoff — nock-skills

Updated 2026-10-17. Current repository context only; fold later changes into
this file and move dated historical notes to `docs/archive/`.

## What changed

- Added a repository guide that points to the public catalogue, project docs,
  and current handoff.
- Made `CLAUDE.md` import `AGENTS.md` and added the current handoff, project
  reference files, and a tracked-file path check.
- The repository is a public Markdown-only catalogue of standalone skills.
  There is no build, runtime, package manifest, or existing test suite.

## What bit us

- Keep this repository public-safe: skill text must not rely on internal paths,
  credentials, or private fleet state.
- The path check uses Git's tracked-file list. Stage new local files named in
  `AGENTS.md` before running the checker.

## Still open

- The pull request for these changes is open and awaiting review.
