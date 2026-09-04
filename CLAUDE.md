# nock-skills — repo map

Public. Claude Code skills extracted from running the Nock fleet: one folder per
skill, each with a `SKILL.md` that Claude Code loads as a slash command or via
the Skill tool. Pointers only; the README carries the catalogue.

## Where things are
| Group | Skills |
|---|---|
| Guards (run on an agent's work before trusting it) | `scope-guard`, `dependency-guard`, `audit-guard` |
| Engineering | `engineering-pipeline`, `branch-isolation`, `agent-dispatch` |
| Continuity | `session-handoffs`, `compaction-survival`, `identity-persistence`, `nockbrain` |
| Operations | `fleet-heartbeat`, `overnight-operations` |
| Research | `competitive-research` |

Each folder holds exactly one `SKILL.md`. There is no build, no tests, no
runtime; the skill text is the product.

## Rules that bite
- A skill is a contract other agents load verbatim: keep each `SKILL.md` self-contained, under ~200 lines, and free of fleet-internal paths or secrets. This repo is public.
- Changes go through a branch and PR; the fleet installs from `main`.
