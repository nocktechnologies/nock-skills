# Agent guide — nock-skills

## What this repository is

This public repository contains reusable agent skills from Nock Technologies.
Each skill is a self-contained file such as `scope-guard/SKILL.md` in its own
directory. Claude Code can load a skill as a slash command or through the Skill
tool; other compatible tools can load the same file directly. The skill text is
the product.

## Start here

- `README.md` is the public skill catalogue, installation guide, and usage
  overview.
- `ARCHITECTURE.md` explains the repository layout and how skills are packaged.
- `CHANGELOG.md` records released and pending repository changes.
- `ROADMAP.md` records the project direction and milestone status.
- `docs/HANDOFF.md` is the current working handoff. Read it at the start of a
  run and update it with changed state, pitfalls, and open work before ending.
- `docs/archive/` holds dated handoffs after their current notes are folded into
  `docs/HANDOFF.md`.

## Build, verify, and publish

There is no build step, runtime, package manifest, or separate test suite. The
skill files are plain Markdown. Check the repository's agent-file paths locally
with:

```sh
node scripts/check-agents-paths.mjs
```

GitHub Actions runs the same check on pull requests and pushes to `main`. The
workflow uses a GitHub-hosted runner and needs no secrets. Keep the check green
before opening or updating a pull request.

GitHub Actions also scans every skill directory with SkillSpector in static-only
mode on pull requests and pushes to `main`, uploads SARIF, and fails on HIGH or
CRITICAL findings or risk scores above 50.

Changes are published through a pull request into `main`. After merge, users
install or update from the public repository as described in `README.md`; there
is no deployment service or release artifact.

## Rules that bite

- A skill file such as `scope-guard/SKILL.md` is a contract another agent may
  load verbatim. Keep each one self-contained and under about 200 lines.
- This is a public repository. Do not add fleet-internal filesystem paths,
  private operational details, credentials, or other secrets to skills or docs.
- This is a public repository. `AGENTS.md` and `docs/HANDOFF.md` stay
  product-only: no agent or person names, no internal task IDs, no internal
  service or repository codenames, no internal hosts, and no review or merge-gate
  procedure.
- Keep `README.md`'s catalogue aligned with the skill directories. Every skill
  directory contains one skill file; do not put unrelated files there.
- Write the agent guide and project docs by hand from verified repository
  behavior. Do not generate them from a tool or copy in unverified assumptions.
- Keep `CLAUDE.md` limited to an `AGENTS.md` import on its first line and
  Claude-only notes. Shared rules belong here.
- Keep architecture, roadmap, and changelog details in their own files; this
  guide should point to them rather than duplicate their contents.
- The path checker validates local Markdown link targets and path-like
  backtick spans in this file. A named path must stay inside this repository and
  resolve to a Git-tracked file or a directory containing tracked files.
- The checker ignores URLs, placeholders, and globs. Stage newly referenced
  files before running it so Git can see them as tracked.
- Do not add self-hosted runners. This public repository's path check runs on a
  GitHub-hosted runner with read-only contents permission.

## Where things are

| To change… | Go to |
|---|---|
| Public catalogue, installation, or examples | `README.md` |
| A skill's behavior | Its directory's skill file, such as `scope-guard/SKILL.md` |
| Shared agent instructions | `AGENTS.md` |
| Claude Code-specific notes | `CLAUDE.md` |
| Current pod context and open work | `docs/HANDOFF.md` |
| Older dated handoffs | `docs/archive/` |
| Repository structure | `ARCHITECTURE.md` |
| Project direction | `ROADMAP.md` |
| Change history | `CHANGELOG.md` |
| Agent-path validation | `scripts/check-agents-paths.mjs` |
| Pull request and main-branch checks | `.github/workflows/agents-paths.yml`, `.github/workflows/skillspector.yml` |

## Skill catalogue

`README.md` is the canonical skill inventory, grouped by area. Use it to find a
skill or decide where a new one belongs. Keep its names and summaries aligned
with the directories that contain each skill contract.
Do not duplicate its full skill descriptions in this index.

## Review checklist

Before submitting a change:

- Read each changed skill as a standalone contract, without relying on this
  repository guide to fill in missing instructions.
- Update the README catalogue when a skill is added, removed, renamed, or given
  a materially different purpose.
- Run the path check after staging files named by the guide, then inspect the
  diff and run `git diff --check`.
- Confirm examples are public-safe and usable without access to Nock's internal
  systems.

When adding or renaming a skill, verify that its directory contains one skill
file and that the README name and directory name agree.
