# Changelog

All notable changes to `systems-thinking` will be documented in this file.
Versioning follows [Semantic Versioning](https://semver.org/) in `X.Y.Z` format.

---

## [0.1.1] — 2026-07-24

### Changed
- Fixed `repository.url` and `homepage` in `package.json` (replaced `YOUR_USERNAME` placeholder with `ShrimpLeon`)
- Expanded `keywords` from 5 to 14 for better npm search discoverability across AI agents
- Added `homepage` field to `package.json`
- Added `init.ps1` to `files` array in `package.json` so it's included in the npm package
- Added `postinstall` and `verify` scripts to `package.json`
- README.md Installation section restructured: npm install as primary method, GitHub download as alternative
- Added agent-specific symlink commands for 8 agents in README.md
- Added Compatibility section in both 中文 and English

## [0.1.0] — 2026-07-24

### Added
- Initial public release of the skill
- SKILL.md with runtime prompt block, 7-step workflow, principle map, and 8 cognitive laws
- README.md with bilingual (中文/English) documentation
- 8 reference files: `state-and-control.md`, `stability.md`, `modeling.md`, `multivariable.md`,
  `disturbance.md`, `bounded-control.md`, `discrete-systems.md`, `closed-loop-workflow.md`
- 2 prompt templates: `debugging-checklist.md`, `change-proposal.md`
- Self-audit checklist: `evals/checks.json` with 11 MUST/SHOULD cognitive-law probes
- Harness files: `AGENTS.md`, `init.ps1`, `feature_list.json`, `progress.md`, `session-handoff.md`
- LICENSE (MIT)

### Notes
- First implementation of the thinking-mode scaffold derived from Qian Xuesen & Song Jian's
  *Engineering Cybernetics* (工程控制论).
- Language- and framework-agnostic; targets any non-trivial code change where correctness
  AND robustness must both be verified.
