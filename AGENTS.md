# AGENTS.md

Harness for maintaining the `engineering-cybernetics-coding` skill. Agents working on this
repository must keep the skill small, aligned to the book, and self-consistent: every claim in
SKILL.md must trace to a reference file; every reference link must resolve.

## Startup Workflow

Before editing any file:

1. Confirm working directory.
2. Read `SKILL.md` completely.
3. Read `README.md`.
4. Read `progress.md` and `feature_list.json`.
5. Review `references/`, `templates/`, and `evals/` to confirm current state.
6. Run `./init.ps1` to verify environment is healthy.

If baseline verification is failing, repair that first before adding new scope.

## Working Rules

- **One feature at a time**: pick exactly one unfinished feature from `feature_list.json`.
- **Verification required**: do not claim done without running verification commands.
- **Update artifacts**: before ending a session, update `progress.md` and `feature_list.json`.
- **Stay in scope**: do not create or remove files unrelated to the current feature without
  explicit approval.
- **Evidence first**: every SKILL.md claim must be backed by a reference file path; every
  reference link must resolve to an existing file.

## Required Artifacts

- `feature_list.json` — Feature state tracker (source of truth)
- `progress.md` — Session continuity log
- `session-handoff.md` — Optional, for multi-session work
- `evals/checks.json` — Self-audit checklist; MUST items must pass before a feature is done

## Definition of Done

A feature is done only when ALL of the following are true:

- [ ] SKILL.md changes are consistent with `README.md` layout table
- [ ] All `references/` links referenced by the change exist and resolve
- [ ] All template files referenced by SKILL.md exist at the stated path
- [ ] `evals/checks.json` passes all MUST items relevant to the change
- [ ] No broken markdown link headings or missing template targets
- [ ] Evidence recorded in `feature_list.json` or `progress.md`

## End of Session

Before ending a session:

1. Update `progress.md` with the current state and completion evidence.
2. Update `feature_list.json` with new feature status.
3. Update `session-handoff.md` with blocker, files changed, and recommended next step.
4. Run `./init.ps1` to confirm the checkout is clean.
5. Commit with a descriptive message once work is in safe state.

## Verification Commands

```bash
# Full verification (recommended)
./init.ps1
```

Required checks:

- `python -m json.tool evals/checks.json` — valid JSON
- All reference links in `SKILL.md` resolve to existing files under `engineering-cybernetics-coding/`

## Escalation

If you encounter:

- **Content accuracy vs. the book**: add or update a `references/` file; do not change a claim
  in `SKILL.md` without a corresponding reference note.
- **Principle link drift**: update `README.md` layout table to match `SKILL.md` principle map.
- **Scope ambiguity**: re-read `feature_list.json` for the definition of done.
