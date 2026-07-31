# Session Handoff

## Current State

**Last Updated:** 2026-07-30
**Current Version:** 0.4.0
**All features complete:** feat-001 through feat-012

## Recent Changes

- feat-008: Integrated 金观涛《控制论与科学方法论》 as the second source book (4 new references, 5 new cognitive laws, evals extended to 18 items).
- feat-009: Rewrote `scripts/install.js` to mirror `npx impeccable skills install` UX (scan list, interactive menu, `--path`, `--yes`).
- feat-010: Rewrote both READMEs in a natural human voice; removed AI-sounding phrases.
- feat-011 (0.3.1): Removed redundant `assets/runtime-prompt.txt` (already inlined in `SKILL.md`); cleaned up `assets/` directory.
- feat-012 (0.4.0): **Renamed** the skill from `systems-thinking` to `cybernetic-thinking` across the entire project.
  - Reason: `systems-thinking` collided with many existing published skills; `cybernetic-thinking` is distinctive and accurately names the discipline (both source books are cybernetics classics).
  - `package.json` name: `skill-systems-thinking` → `skill-cybernetic-thinking`; bin, repository.url, homepage, keywords updated
  - `SKILL.md` frontmatter name/slug updated
  - `evals/checks.json` skill field updated
  - `AGENTS.md` two references updated
  - Both READMEs: all commands updated via global replace; rename notice added for existing users; 0.4.0 version table entry
  - `CHANGELOG.md`: new 0.4.0 entry with migration notes; historical entries left as-is
  - Version unified to 0.4.0 across all 7 files

## File Reference

- `SKILL.md` — core skill; name `cybernetic-thinking`; 13 cognitive laws; 14-row principle map; both books cited; runtime prompt block inlined
- `evals/checks.json` — 18 MUST/SHOULD checks; skill field `cybernetic-thinking`
- `references/` — 12 deep-dive references + `original-text.md` with excerpts from both books
- `scripts/install.js` — interactive installer; `skillName` auto-derives from `package.json` name (`skill-cybernetic-thinking`)
- `init.ps1` — verifies 23 files
- `package.json` — name `skill-cybernetic-thinking`; bin `skill-cybernetic-thinking`; repo URLs point to `cybernetic-thinking`
- `README.md` / `README_CN.md` — human-facing docs; all install commands use the new name; rename notice for old users

## Blockers

- None.

## Recommended Next Step

1. **Publish 0.4.0 to npm**: `npm publish` (publishes as `skill-cybernetic-thinking`)
2. **Deprecate old npm package**: `npm deprecate skill-systems-thinking "Renamed to skill-cybernetic-thinking. Please install the new package: npx skill-cybernetic-thinking install"`
3. **Rename repos**: GitHub `ShrimpLeon/systems-thinking` → `ShrimpLeon/cybernetic-thinking`; Gitee `leon0903/systems-thinking` → `leon0903/cybernetic-thinking` (old URLs auto-redirect)
4. **Update local remote**: `git remote set-url origin https://github.com/ShrimpLeon/cybernetic-thinking.git`
5. End-to-end test of the interactive install UX on macOS/Linux
6. Gather real-world feedback on the 5 new cognitive laws
