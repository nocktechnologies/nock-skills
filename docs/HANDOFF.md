# Handoff — nock-skills

Updated 2026-10-18. Current repository context only; fold later changes into
this file and move dated historical notes to `docs/archive/`.

## What changed

- Added a public-content rule to `AGENTS.md`, keeping this guide and the current
  handoff focused on product information.
- Reviewed the guide and current handoff for internal identifiers and
  operational details.
- Added a static SkillSpector scan for every skill directory on pull requests
  and pushes to `main`; CI uploads per-skill SARIF reports and fails on HIGH or
  CRITICAL findings or risk scores above 50.
- The repository is a public Markdown-only catalogue of standalone skills.
  It has no build, runtime, package manifest, or separate test suite.

## What bit us

- Keep examples usable without private paths, credentials, or
  environment-specific dependencies.
- The path check uses Git's tracked-file list. Stage newly referenced files
  before running the checker.

## Still open

- Keep the skill catalogue, guide, and project references aligned when content
  changes.
