# Changelog

## Unreleased

- Added the shared agent guide, current handoff, repository documentation map,
  and CI validation for paths named in `AGENTS.md`.
- Added static SkillSpector scans for every skill directory in pull request and
  `main` CI, with SARIF uploads and failure on HIGH or CRITICAL findings or risk
  scores above 50.
