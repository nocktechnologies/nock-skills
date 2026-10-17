# Handoff — nock-skills

Updated 2026-10-17. Current repository context only; fold later changes into
this file and move dated historical notes to `docs/archive/`.

## What changed

- This checkout began with `CLAUDE.md` as the repo map and no repository
  `docs/HANDOFF.md`; the agent guide and current handoff are being established
  by Nock #11956.
- The repository is a public Markdown-only catalogue of standalone skills.
  There is no build, runtime, package manifest, or existing test suite.

## What bit us

- Keep this repository public-safe: skill text must not rely on internal paths,
  credentials, or private fleet state.
- The path check uses Git's tracked-file list. Stage new local files named in
  `AGENTS.md` before running the checker.

## Still open

- The Nock #11956 pull request is pending review and human merge.
- Rowan owns the final review and merge gate; after opening the PR, send Rowan
  its URL and head SHA, then make no further pushes unless asked.
