# Architecture

`nock-skills` is a documentation repository. It has no application runtime,
build system, package dependencies, or generated output.

## Layout

- `README.md` is the public catalogue and installation guide.
- Each skill has one directory with a `SKILL.md` contract. Skills are grouped
  by purpose in the README.
- `AGENTS.md` is the shared contributor and agent index. `CLAUDE.md` imports it
  and holds only Claude Code-specific notes.
- `docs/HANDOFF.md` carries current working context; dated prior handoffs belong
  under `docs/archive/`.
- `scripts/check-agents-paths.mjs` validates local paths named by `AGENTS.md`.
- `.github/workflows/agents-paths.yml` runs that validation for pull requests
  and pushes to `main`.
- `.github/workflows/skillspector.yml` runs static SkillSpector scans for each
  skill directory, uploads SARIF, and fails on HIGH or CRITICAL findings or risk
  scores above 50.

## Content flow

Contributors edit Markdown by hand, open a pull request, and let the path check
run in GitHub Actions. Merging to `main` publishes the updated files for users
to install or reference. No build or deployment service transforms the content.
