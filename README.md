# engineering-cybernetics-coding

Thinking-mode skill derived from Qian Xuesen & Song Jian's *Engineering Cybernetics*
(工程控制论). Installs a control-theoretic cognitive operating system in the LLM so that it
*reasons* about systems—state, observability, stability, bounds, coupling—before writing or
changing code.

This is not a vocabulary test for humans, and not a bug-hunting playbook. It is a scaffold
that changes **how the model thinks**: identify the state first, model the plant, demand
observability, verify stability, respect bounds, decouple harm, coordinate benefits, and close
the loop before declaring success.

Layout

engineering-cybernetics-coding/
├── SKILL.md                         # entry: trigger, scope, runtime prompt block
├── references/
│   ├── closed-loop-workflow.md      # §3.7, §4: analysis→synthesis, act→observe→correct
│   ├── state-and-control.md         # §1.5: x vs u, observability, bounds
│   ├── stability.md                 # §1.1, §4.1: Lyapunov stability, perturbation tests
│   ├── modeling.md                  # §1.4, §1.6: deliberate simplification, model validity
│   ├── multivariable.md             # §6: decouple what hurts, coordinate what helps
│   ├── disturbance.md               # §6.7, §11: feedforward, time-delay
│   ├── bounded-control.md           # §8, §9.6: bang-bang, clamp the actuator
│   └── discrete-systems.md          # §10: sampled loops, test cadence
├── templates/
│   ├── debugging-checklist.md       # copyable closed-loop debug checklist
│   └── change-proposal.md           # copyable control-systems change plan
└── evals/
    └── checks.json                  # machine-checkable MUST/SHOULD self-audit

## How to use

1. Load the skill when the task involves architecture, debugging non-deterministic systems,
   refactoring coupled modules, or any change where correctness AND robustness matter.
2. Read the **runtime prompt block** in `SKILL.md` first; it installs the cognitive laws.
3. Before proposing any change, the LLM must name the controlled variable `x` and the
   control variable `u`, state observability and bounds, and state its model of the plant.
4. Run through the 7-step loop (`references/closed-loop-workflow.md`) internally: identify,
   analyze, stabilize, synthesize, close the loop, compensate, optimize.
5. Copy `templates/debugging-checklist.md` into the session when debugging; use
   `templates/change-proposal.md` to plan a change.
6. Before declaring done, pass all MUST checks in `evals/checks.json`.

## Source

Qian Xuesen (钱学森) & Song Jian (宋健), *Engineering Cybernetics* (工程控制论). The skill
distills the core engineering insights—system identification, observability, stability,
robustness, multivariable coordination—into a thinking scaffold for LLM-assisted software
engineering. The original book and its mathematical foundations are the authoritative source;
this skill is a faithful interpretation, not a replacement.
