# Session Handoff

## Current State

**Last Updated:** 2026-07-30
**Current Version:** 0.3.1
**All features complete:** feat-001 through feat-010

## Recent Changes

- feat-008: Integrated 金观涛《控制论与科学方法论》 as the second source book.
  - 4 new reference files (`possibility-space.md`, `black-box-epistemology.md`, `information-and-control.md`, `system-evolution.md`)
  - 3 existing references extended with Book 2 anchors (`stability.md`, `closed-loop-workflow.md`, `original-text.md`)
  - `SKILL.md` runtime prompt extended from 8 to 13 cognitive laws; principle map from 9 to 14 rows
  - `evals/checks.json` extended from 12 to 18 items
  - `templates/debugging-checklist.md` extended with possibility-space / black-box / falsifiability / ultra-stability checks
- feat-009: Rewrote `scripts/install.js` to mirror `npx impeccable skills install` UX.
  - Scan → list with `[√]`/`[ ]` markers → interactive menu (enter / a / s / n) → confirm → link
  - New `--path <dir>` flag for custom install directories
  - New `--yes` / `-y` flag (implied when not a TTY); non-TTY falls back to detected-agents-only
- feat-010: Rewrote both `README.md` and `README_CN.md` in a natural human voice; removed AI-sounding phrases; listed both books, 13 laws, 12 references, and the new install UX.
- 0.3.1 cleanup: Removed `assets/runtime-prompt.txt` — redundant with the runtime prompt block inlined in `SKILL.md` (the two copies could drift out of sync). Deleted the `assets/` directory, removed the `Source: assets/runtime-prompt.txt` line from `SKILL.md`, dropped the `assets/` entry from `package.json` `files`, and removed the corresponding check from `init.ps1`.
- Version bumped to 0.3.1 across `package.json`, `SKILL.md`, `README.md`, `README_CN.md`, `CHANGELOG.md`, `progress.md`, `session-handoff.md`.

## File Reference

- `SKILL.md` — core skill; 13 cognitive laws; 14-row principle map; both books cited; runtime prompt block inlined
- `evals/checks.json` — 18 MUST/SHOULD checks
- `references/` — 12 deep-dive references + `original-text.md` with excerpts from both books
- `scripts/install.js` — interactive installer with scan/list/confirm flow, `--path`, `--yes`
- `init.ps1` — verifies 23 files (no longer checks `assets/runtime-prompt.txt`)
- `README.md` / `README_CN.md` — human-facing docs, both books, 13 laws, 12 references

## Blockers

- None.

## Recommended Next Step

1. Publish v0.3.1 to npm: `npm publish`
2. End-to-end test of the interactive install UX on macOS/Linux (only tested on Windows so far)
3. Gather real-world feedback on the 5 new cognitive laws; iterate if LLMs still miss a principle
