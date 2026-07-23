# Engineering Cybernetics Thinking / 工程控制论思维

**A control-theoretic thinking scaffold for LLM-assisted software engineering.**
**为 LLM 辅助软件工程打造的控制论思维脚手架。**

Derived from Qian Xuesen (钱学森) & Song Jian (宋健), *Engineering Cybernetics* (工程控制论).
源自钱学森、宋健《工程控制论》。

Version: v0.1.0 | License: MIT

---

## About / 简介

`engineering-cybernetics-thinking` is a thinking-mode skill that installs a control-theoretic cognitive operating system in the LLM. Instead of producing better patch diffs, it changes **how the model thinks** about systems—state, observability, stability, bounds, coupling—before writing or changing code.

`engineering-cybernetics-thinking` 是一个思维模式 skill，它在 LLM 中安装一套控制论认知操作系统。它不直接产出更好的补丁，而是改变模型在写代码或改代码之前的**思维方式**：先识别状态、观测性、稳定性、边界、耦合，再动手。

This is not a vocabulary test for humans, and not a bug-hunting playbook. It is a scaffold that reframes every non-trivial change from *"write the smallest patch and hope"* to *identify the state, measure the trajectory, stabilize the plant, then steer*.

这不是人类的词汇测试，也不是排错手册。它是一个脚手架，把每一次非平凡的改动从“写最小补丁然后祈祷”重构为“先识别状态、测量轨迹、稳定被控对象、再施加控制”。

**Prime directive:** a program is a dynamical system `x(t)` with partial observability; the developer is the controller `u(t)`. Every change injects a control signal. Bugs are unstable or poorly-damped trajectories. Debugging is state estimation. Tests are sensors feeding a feedback loop. **Closed loop beats open loop.**

**核心原则：** 程序是一个部分可观测的动态系统 `x(t)`；开发者是控制器 `u(t)`。每一次改动都在注入控制信号。bug 是不稳定或欠阻尼的轨迹。调试就是状态估计。测试是反馈回路的传感器。**闭环优于开环。**

---

## Features / 特性

- **Language- and framework-agnostic** — works with any stack, any language, any architecture. 语言和框架无关。
- **Self-contained** — no other skill required; installs as a single thinking-mode scaffold. 自包含，无需其他 skill。
- **Cognitive-laws based** — distills 8 engineering insights into concrete LLM behavior constraints. 基于 8 条认知法则。
- **Templates included** — copyable debugging checklist and change-proposal scaffolds. 内含可复制模板。
- **Self-auditable** — `evals/checks.json` provides MUST/SHOULD checks an LLM or reviewer applies to confirm discipline was followed. 可自审计。
- **Deep-dive references** — 8 reference files anchored to the original text, each with LLM behavior patterns. 8 篇深度参考文献，每篇附 LLM 行为模式。

---

## Installation / 安装

This skill is designed for AI coding agents that support custom skills (e.g., Kilo, Claude Code, Aider, Cursor). Install by copying the skill directory into the agent's skills folder.

本 skill 专为支持自定义 skill 的 AI 编程助手设计（如 Kilo、Claude Code、Aider、Cursor）。将 skill 目录复制到助手的 skills 文件夹即可安装。

### Option A: Direct copy / 直接复制

```
cp -r engineering-cybernetics-thinking <agent-skills-dir>/
```

### Option B: Symlink (development) / 符号链接（开发）

```
ln -s /absolute/path/to/engineering-cybernetics-thinking <agent-skills-dir>/
```

### Agent-specific notes / 各助手说明

| Agent | Path / 路径 |
|---|---|
| Kilo | `~/.config/kilo/skills/` or project `.kilo/agent/` |
| Claude Code | `~/.claude/plugins/custom-skills/` or project `.claude/` |
| Aider | `--skills-dir` flag |
| Cursor | Project `.cursor/rules/` or global settings |

### Verify installation / 验证安装

```bash
# Run the harness verification script
pwsh init.ps1
```

Expected output: `Verification Complete — OK`

---

## Usage / 使用

### 1. Load the skill / 加载 skill

Trigger the skill when the task involves architecture, debugging non-deterministic systems, refactoring coupled modules, or any change where correctness AND robustness matter.

在涉及架构设计、调试非确定性系统、重构耦合模块，或任何“正确且稳健”必须同时满足的任务时，触发本 skill。

### 2. Read the runtime prompt block / 读取运行时提示块

Read `SKILL.md` first; the runtime prompt block installs the cognitive laws. The workflow below is a downstream consequence.

先读 `SKILL.md`；运行时提示块会安装认知法则。下面的工作流是自然结果。

### 3. Name the variables / 命名变量

Before proposing any change, the LLM must name:

- `x` — the controlled variable (what must stay correct) — 被控变量（什么必须保持正确）
- `u` — the control variable (the lever you will actually move) — 控制变量（你实际会动的杠杆）
- Observability — how will you measure `x`? — 可观测性：如何测量 `x`？
- Bounds — every actuator saturates; no unbounded loop is acceptable. — 边界：每个执行器都会饱和；不接受无界循环。

### 4. Run the 7-step loop / 运行 7 步循环

| Step | Principle / 原则 | Reference |
|---|---|---|
| 1 | Identify — name `x`, `u`, observability, bounds. 识别。 | `references/state-and-control.md` |
| 2 | Analyze — reproduce, measure, locate fault, state the model. 分析。 | `references/modeling.md` |
| 3 | Stabilize — kill divergence / oscillation / leaks before features. 稳定。 | `references/stability.md` |
| 4 | Synthesize — minimal `u`; decouple what hurts, coordinate what helps. 综合。 | `references/multivariable.md` |
| 5 | Close the loop — observe actual result; correct until bounded. 闭环。 | `references/closed-loop-workflow.md` |
| 6 | Compensate — feedforward measurable disturbances; clamp the actuator. 补偿。 | `references/disturbance.md` |
| 7 | Optimize — only then tune secondary indicators. 优化。 | `references/bounded-control.md` |

For sampled/test-cadence concerns, also consult `references/discrete-systems.md`.

### 5. Use templates / 使用模板

- Debugging: copy `templates/debugging-checklist.md` into the session. 调试：将 `templates/debugging-checklist.md` 复制到会话中。
- Planning: use `templates/change-proposal.md` to plan a change. 规划：用 `templates/change-proposal.md` 规划改动。

### 6. Self-audit / 自审计

Before declaring done, pass all MUST checks in `evals/checks.json`.

在宣布完成之前，必须通过 `evals/checks.json` 中的所有 MUST 检查项。

---

## Principle Map / 原则地图

| # | Principle | Book Anchor | Reference |
|---|---|---|---|
| 0 | Closed loop over open loop | §3.7 | `references/closed-loop-workflow.md` |
| 1 | State, control, observability, bounds | §1.5 | `references/state-and-control.md` |
| 2 | Stability before everything | §1.1, §4.1 | `references/stability.md` |
| 3 | Model deliberately; know where it breaks | §1.4, §1.6 | `references/modeling.md` |
| 4 | Analysis before synthesis | §1.5, §4 | `references/closed-loop-workflow.md` |
| 5 | Decouple what hurts, coordinate what helps | §6 | `references/multivariable.md` |
| 6 | Disturbance compensation + time-delay | §6.7, §11 | `references/disturbance.md` |
| 7 | Time-optimal, bounded control | §8, §9.6 | `references/bounded-control.md` |
| 8 | Discrete / sampled systems & test cadence | §10 | `references/discrete-systems.md` |

---

## Quality Bar / 质量门槛

`evals/checks.json` lists concrete pass/fail checks (MUST/SHOULD) an LLM or reviewer applies to confirm the discipline was followed. All MUST items must pass before a task is called done.

`evals/checks.json` 列出了具体的通过/失败检查项（MUST/SHOULD），供 LLM 或评审者确认思维 discipline 已被遵循。在所有 MUST 项通过之前，不得宣布任务完成。

### Cognitive laws enforced / 强制的认知法则

1. Name `x` before `u`. Unnamed targets are unregulated. 先命名 `x` 再命名 `u`。未命名的目标无法调节。
2. Observe before you guess. Measure current behavior before synthesizing the fix. 先观测再猜测。综合方案之前先测量当前行为。
3. Stabilize before you optimize. Divergence under perturbation is failure. 稳定优先于优化。扰动下发散就是失败。
4. Close the loop. Observe the actual result; correct until deviation is bounded. 闭环。观察实际结果；不断修正直到偏差有界。
5. Feedforward measurable disturbances; feedback the rest. Never crank gain on delay. 前馈可测扰动；其余用反馈。绝不在延迟回路上提高增益。
6. Decouple harmful coupling. Coordinate beneficial coupling. Regulate relations, not just absolutes. 解耦有害耦合，协调有益耦合。调节关系，不仅是绝对值。
7. Minimal control. The smallest `u` that moves `x` to target. No speculative extras. 最小控制。移动 `x` 到目标所需的最小 `u`。无投机性额外操作。
8. Convergence: corrections must shrink. If they grow, you are unstable — stop and re-identify. 收敛：修正必须缩小。如果增大，说明不稳定——停下来重新识别。

---

## Worked Example / 工作示例

**Symptom:** an API endpoint intermittently returns 500 under load.

**症状：** 一个 API 端点在高负载下间歇性返回 500。

| Step | Control-theoretic action | 控制论行动 |
|---|---|---|
| Identify | `x` = error rate; `u` = retry/timeout/cache logic; bound = request budget. | `x` = 错误率；`u` = 重试/超时/缓存逻辑；边界 = 请求预算。 |
| Analyze | Reproduce under load; measure that error rate climbs with concurrency (unstable). | 在负载下复现；测量错误率随并发上升（不稳定）。 |
| Stabilize | Add circuit breaker + bounded retries with backoff → error rate bounded. | 增加熔断器 + 带退避的有界重试 → 错误率有界。 |
| Synthesize | Minimal change; don't rewrite the service. | 最小改动；不要重写服务。 |
| Close the loop | Load-test again; error rate now converges to ~0. | 再次负载测试；错误率收敛到 ~0。 |
| Compensate | Feedforward on measurable dependency outage (fail fast) + feedback on the rest. | 对可测依赖故障前馈（快速失败）+ 其余反馈。 |
| Optimize | Only now trim p99 latency. | 此时才优化 p99 延迟。 |

**Without this lens the common failure is:** add retries with no bound → retry storm (an unstable delay loop) → worse than before.

**没有这个视角的常见失败：** 无界地增加重试 → 重试风暴（不稳定的延迟环）→ 比原来更糟。

---

## Contributing / 贡献

This skill is a faithful interpretation of the original text, not a replacement. Contributions should:

本 skill 是对原著的忠实阐释，不是替代。贡献应遵循：

- Trace every claim in `SKILL.md` to a reference file. `SKILL.md` 中的每条主张都追溯到参考文献。
- Ensure every reference link resolves to an existing file. 确保每个引用链接都解析到存在的文件。
- Keep the skill small and aligned to the book. 保持 skill 精简且与原著一致。
- Run `./init.ps1` before submitting. 提交前运行 `./init.ps1`。

See `AGENTS.md` for the full working rules and definition of done.

完整工作规则和完成标准见 `AGENTS.md`。

---

## Version / 版本

| Version | Date | Notes |
|---|---|---|
| v0.1.0 | 2026-07-24 | Initial public release: thinking-mode scaffold, 8 references, templates, evals. 首次公开发布。 |

---

## License / 协议

MIT License. See [LICENSE](LICENSE) for details.

MIT 协议。详见 [LICENSE](LICENSE) 文件。

---

## Source / 来源

Qian Xuesen (钱学森) & Song Jian (宋健), *Engineering Cybernetics* (工程控制论). The original book and its mathematical foundations are the authoritative source; this skill is a faithful interpretation, not a replacement.

钱学森、宋健，《工程控制论》。原著及其数学基础是权威来源；本 skill 是忠实阐释，不是替代。

---

## See Also / 另见

- `SKILL.md` — entry point, trigger conditions, runtime prompt block
- `references/` — deep dives into each control-theoretic principle
- `templates/` — copyable debugging checklist and change proposal
- `evals/checks.json` — self-audit checklist
- `AGENTS.md` — harness working rules for agents working on this repo
