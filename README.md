# systems-thinking

<!-- Language toggle / 语言切换 -->

> **中文** | [English](#english)

---

## 简介

`systems-thinking` 是一个思维模式 skill。它把控制论的思想装进 LLM 的思考过程里，让模型在写代码、改代码、做架构之前，先想清楚：状态是什么、怎么观测、稳不稳定、边界在哪、耦合怎么处理。

> **一句话：用系统视角写代码——先识别状态，再动手，最后闭环验证。**

这不是给人类做的知识测试，也不是一本排错手册。它是一个脚手架，改变的是模型**怎么想**，而不是怎么拼 diff。

源自钱学森、宋健《工程控制论》。语言和框架无关，拿来就能用。

## 它解决什么问题

写代码时常见的做法是：先动手，再祈祷测试能过。这个 skill 要改变的是这个顺序。

它特别适合这些场景：

- 改一段你不完全理解的遗留代码
- 调试一个时好时坏、复现不了的问题
- 重构几个互相牵制的模块
- 做任何"既要正确又要稳"的改动

在这些场景里，"写个最小补丁"往往不够。你需要先搞清楚系统的状态，再动手。

## 核心思想

一句话：**程序是一个动态系统，你是控制器。**

每次改动都在往系统里注入一个控制信号。你只能部分观测系统的真实状态。bug 是不稳定或欠阻尼的轨迹。调试就是状态估计。测试是反馈回路的传感器。**闭环永远比开环好。**

## 安装

本 skill 面向支持自定义 skill 的 AI 编程助手（Kilo、Claude Code、Aider、Cursor 等）。

### npm install（推荐）

```bash
npm install skill-systems-thinking
```

安装后，将 skill 链接到你的 agent skill 目录：

```bash
# 查找 npm 全局安装路径
npm root -g
# 或本地项目安装：
node -e "console.log(require.resolve('skill-systems-thinking'))"
```

然后将 skill 符号链接或复制到你的 agent skill 目录（详见下方各 agent 的具体说明）。

### GitHub 下载

```bash
git clone https://github.com/ShrimpLeon/systems-thinking.git
cp -r systems-thinking <agent-skills-dir>/
```

### 符号链接（开发用）

```bash
ln -s /absolute/path/to/systems-thinking <agent-skills-dir>/
```

### 各 agent 配置

npm 包将 skill 文件安装到 `node_modules/skill-systems-thinking/`。你需要让各 agent 找到它们。各 agent 的 skill 目录如下。

| Agent | Skill 目录 | npm 链接命令 |
|---|---|---|
| Kilo | `~/.config/kilo/skills/` 或项目 `.kilo/agent/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.config/kilo/skills/systems-thinking` |
| Claude Code | `~/.claude/plugins/custom-skills/` 或项目 `.claude/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.claude/plugins/custom-skills/systems-thinking` |
| Aider | `--skills-dir` 路径 | `ln -s $(npm root -g)/skill-systems-thinking <aider-skills-dir>/` |
| Cursor | 项目 `.cursor/rules/` 或全局设置 | `ln -s $(npm root -g)/skill-systems-thinking .cursor/rules/systems-thinking` |
| OpenAI Codex | `~/.codex/skills/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.codex/skills/systems-thinking` |
| GitHub Copilot | `~/.copilot/skills/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.copilot/skills/systems-thinking` |
| Windsurf | `~/.windsurf/skills/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.windsurf/skills/systems-thinking` |
| Zed | `~/.zed/skills/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.zed/skills/systems-thinking` |

> **注意：** 如果你的 agent 未出现在上方，请查阅其文档获取自定义 skill/plugin 路径。npm 包安装到标准的 `node_modules` 位置，因此任何能从任意目录加载 skill 的 agent 都可以使用。

### 验证安装

```bash
pwsh init.ps1
```

看到 `Verification Complete — OK` 就说明装好了。

## 兼容性

npm 包 `skill-systems-thinking` 兼容以下 agent 智能体：

| Agent | npm 安装兼容 | 说明 |
|---|---|---|
| Kilo | ✅ | 通过 `~/.config/kilo/skills/` 或 `.kilo/agent/` 链接 |
| Claude Code | ✅ | 通过 `~/.claude/plugins/custom-skills/` 或 `.claude/` 链接 |
| Aider | ✅ | 通过 `--skills-dir` 参数指定链接目录 |
| Cursor | ✅ | 通过 `.cursor/rules/` 或全局设置链接 |
| OpenAI Codex | ✅ | 通过 `~/.codex/skills/` 链接 |
| GitHub Copilot | ✅ | 通过 `~/.copilot/skills/` 链接 |
| Windsurf | ✅ | 通过 `~/.windsurf/skills/` 链接 |
| Zed | ✅ | 通过 `~/.zed/skills/` 链接 |

npm 安装将 skill 文件部署到 `node_modules/skill-systems-thinking/`，然后通过符号链接暴露给各 agent。由于 npm 包不包含 agent 特有的配置文件（如 `.kilo/`、`.claude/` 等），你需要手动创建符号链接将 skill 指向各 agent 的 skill 目录。这一步在所有支持的 agent 上都是相同的操作。

## 使用方式

### 1. 触发时机

在涉及以下任务时加载本 skill：

- 架构设计
- 调试非确定性行为
- 跨模块重构
- 任何"正确且稳健必须同时满足"的改动

### 2. 读 SKILL.md

先读 `SKILL.md`，里面的运行时提示块会安装认知法则。下面的工作流是自然延伸。

### 3. 动手之前，先命名

改代码之前，必须说清楚四个东西：

- `x` — 被控变量，什么必须保持正确
- `u` — 控制变量，你实际会动的那个杠杆
- 可观测性 — 你怎么知道 `x` 的当前值
- 边界 — 每个执行器都会饱和，不接受无界循环

### 4. 七步循环

| 步骤 | 原则 | 参考文件 |
|---|---|---|
| 1 | 识别：命名 `x`、`u`、可观测性、边界 | `references/state-and-control.md` |
| 2 | 分析：复现、测量、定位故障、建立模型 | `references/modeling.md` |
| 3 | 稳定：在加新功能之前先消灭发散/振荡/泄露 | `references/stability.md` |
| 4 | 综合：最小 `u`；解耦有害，协调有益 | `references/multivariable.md` |
| 5 | 闭环：观察实际结果，修正直到偏差有界 | `references/closed-loop-workflow.md` |
| 6 | 补偿：可测扰动用前馈；有延迟就加阻尼 | `references/disturbance.md` |
| 7 | 优化：稳定之后才谈性能调优 | `references/bounded-control.md` |

涉及采样和测试节奏的问题，额外参考 `references/discrete-systems.md`。

### 5. 模板

以下文件位于 skill 安装目录下的 `templates/` 子目录中：

- **调试时**：把 `templates/debugging-checklist.md` 复制进会话
- **规划改动时**：用 `templates/change-proposal.md` 写控制计划

### 6. 自审计

宣布完成之前，必须通过 `evals/checks.json` 中所有的 MUST 检查项。

## 认知法则

这个 skill 强制执行 8 条认知法则：

1. 先命名 `x` 再命名 `u`。没名字的目标就没法调节。
2. 先观测再猜测。综合方案之前先测量当前行为。
3. 稳定优先于优化。扰动下发散就是失败。
4. 闭环。观察实际结果，不断修正直到偏差有界。
5. 可测扰动用前馈，其余用反馈。绝不在延迟回路上提高增益。
6. 解耦有害耦合，协调有益耦合。调节关系，不只是绝对值。
7. 最小控制。移动 `x` 到目标所需的最小 `u`，不搞投机性额外操作。
8. 收敛。修正幅度必须越来越小。如果越来越大，说明不稳定——停下来重新识别。

## 工作示例

**问题**：一个 API 接口在负载下间歇性返回 500。

| 步骤 | 控制论行动 |
|---|---|
| 识别 | `x` = 错误率；`u` = 重试/超时/缓存逻辑；边界 = 请求预算。 |
| 分析 | 在负载下复现；测量错误率随并发上升（不稳定）。 |
| 稳定 | 加熔断器 + 带退避的有界重试 → 错误率有界。 |
| 综合 | 最小改动，不要重写服务。 |
| 闭环 | 再次压测；错误率收敛到接近 0。 |
| 补偿 | 对可测依赖故障快速失败（前馈）+ 其余用反馈。 |
| 优化 | 此时才 trim p99 延迟。 |

**没有这套视角的常见失败**：无限制加重试 → 重试风暴（不稳定延迟环）→ 比原来更糟。

## 参考文件

8 篇深度参考，每篇对应一个控制论原则，附带 LLM 行为模式说明：

| 主题 | 文件 |
|---|---|
| 闭环工作流 | `references/closed-loop-workflow.md` |
| 状态、控制、可观测性、边界 | `references/state-and-control.md` |
| 稳定性 | `references/stability.md` |
| 建模与模型有效性 | `references/modeling.md` |
| 多变量：解耦与协调 | `references/multivariable.md` |
| 扰动补偿与时延 | `references/disturbance.md` |
| 有界控制 | `references/bounded-control.md` |
| 离散系统与测试节奏 | `references/discrete-systems.md` |

## 自审计

`evals/checks.json` 列出了一组 MUST/SHOULD 检查项，供 LLM 或评审者确认思维 discipline 被遵循。在所有 MUST 项通过之前，不得宣布任务完成。

## 贡献

- `SKILL.md` 中的每条主张都必须追溯到某个参考文件
- 每个引用链接必须能解析到存在的文件
- 保持 skill 精简，与原著保持一致
- 提交前运行 `./init.ps1`

完整工作规则见 `AGENTS.md`。

## 版本

本 skill 遵循 [Semantic Versioning](https://semver.org/)（`X.Y.Z`）。

| 版本 | 日期 | 说明 |
|---|---|---|
| 0.1.0 | 2026-07-24 | 首次公开发布 |

完整变更记录见 [CHANGELOG.md](CHANGELOG.md)。

## 协议

MIT License。详见 [LICENSE](LICENSE)。

---

## Source

Qian Xuesen (Tsien Hsue-shen‌; 钱学森) & Song Jian (宋健), *Engineering Cybernetics* (工程控制论). The original book and its mathematical foundations are the authoritative source; this skill is a faithful interpretation, not a replacement.

---

<br/><br/>

---

<a name="english"></a>

<!-- Language toggle / 语言切换 -->

> [中文](#简介) | **English**

---

## About

`systems-thinking` is a thinking-mode skill. It installs a control-theoretic cognitive operating system in the LLM—shaping how the model *thinks* about systems (state, observability, stability, bounds, coupling) before writing or changing code.

> **One-line pitch: Control-theoretic thinking for code—know your state before you touch it.**

This is not a vocabulary test for humans, and not a bug-hunting playbook. It is a scaffold that reframes every non-trivial change from *"write the smallest patch and hope"* to *identify the state, measure the trajectory, stabilize the plant, then steer*.

Derived from Qian Xuesen (Tsien Hsue-shen‌) & Song Jian, *Engineering Cybernetics* (工程控制论). Language- and framework-agnostic. Self-contained.

## What it solves

The default approach to coding is: start typing, then pray the tests pass. This skill changes that order.

It fits best when:

- You're changing legacy code you don't fully understand
- You're debugging something that breaks intermittently and can't be reproduced reliably
- You're refactoring modules that are tangled together
- A change needs to be both correct and robust

In these situations, "write the smallest patch" is often not enough. You need to understand the system's state first.

## Core idea

One sentence: **a program is a dynamical system, and you are the controller.**

Every change injects a control signal. You only partially observe the true state. Bugs are unstable or poorly-damped trajectories. Debugging is state estimation. Tests are sensors feeding a feedback loop. **Closed loop beats open loop.**

## Installation

This skill is designed for AI coding agents that support custom skills (Kilo, Claude Code, Aider, Cursor, etc.).

### npm install (recommended)

```bash
npm install skill-systems-thinking
```

After installing, link the skill into your agent's skill directory:

```bash
# Find where npm installed the package
npm root -g
# or for local project install:
node -e "console.log(require.resolve('skill-systems-thinking'))"
```

Then symlink or copy the skill into your agent's skill directory (see agent-specific instructions below).

### GitHub download

```bash
git clone https://github.com/ShrimpLeon/systems-thinking.git
cp -r systems-thinking <agent-skills-dir>/
```

### Symlink (development)

```bash
ln -s /absolute/path/to/systems-thinking <agent-skills-dir>/
```

### Agent-specific setup

The npm package installs the skill files into `node_modules/skill-systems-thinking/`. You then need to make your agent aware of them. Below are the paths for each supported agent.

| Agent | Skill directory | npm link command |
|---|---|---|
| Kilo | `~/.config/kilo/skills/` or project `.kilo/agent/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.config/kilo/skills/systems-thinking` |
| Claude Code | `~/.claude/plugins/custom-skills/` or project `.claude/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.claude/plugins/custom-skills/systems-thinking` |
| Aider | `--skills-dir` path | `ln -s $(npm root -g)/skill-systems-thinking <aider-skills-dir>/` |
| Cursor | Project `.cursor/rules/` or global settings | `ln -s $(npm root -g)/skill-systems-thinking .cursor/rules/systems-thinking` |
| OpenAI Codex | `~/.codex/skills/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.codex/skills/systems-thinking` |
| GitHub Copilot | `~/.copilot/skills/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.copilot/skills/systems-thinking` |
| Windsurf | `~/.windsurf/skills/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.windsurf/skills/systems-thinking` |
| Zed | `~/.zed/skills/` | `ln -s $(npm root -g)/skill-systems-thinking ~/.zed/skills/systems-thinking` |

> **Note:** If your agent does not appear above, check its documentation for custom skill/plugin paths. The npm package installs to a standard `node_modules` location, so any agent that can load skills from an arbitrary directory will work.

### Verify installation

```bash
pwsh init.ps1
```

Look for `Verification Complete — OK`.

## Compatibility

The npm package `skill-systems-thinking` is compatible with the following AI agents:

| Agent | npm install compatible | Notes |
|---|---|---|
| Kilo | ✅ | Link via `~/.config/kilo/skills/` or `.kilo/agent/` |
| Claude Code | ✅ | Link via `~/.claude/plugins/custom-skills/` or `.claude/` |
| Aider | ✅ | Link via `--skills-dir` flag |
| Cursor | ✅ | Link via `.cursor/rules/` or global settings |
| OpenAI Codex | ✅ | Link via `~/.codex/skills/` |
| GitHub Copilot | ✅ | Link via `~/.copilot/skills/` |
| Windsurf | ✅ | Link via `~/.windsurf/skills/` |
| Zed | ✅ | Link via `~/.zed/skills/` |

The npm install deploys skill files to `node_modules/skill-systems-thinking/`, then you symlink them into each agent's skill directory. Since the npm package does not include agent-specific config files (like `.kilo/`, `.claude/`, etc.), you need to manually create symlinks pointing from each agent's skill directory to the npm-installed location. This is the same operation across all supported agents.

## Usage

### 1. When to load

Load this skill when the task involves:

- Architecture design
- Debugging non-deterministic behavior
- Cross-module refactoring
- Any change where correctness AND robustness both matter

### 2. Read SKILL.md

Read `SKILL.md` first. The runtime prompt block installs the cognitive laws. The workflow below follows naturally.

### 3. Name things before touching code

Before proposing any change, the LLM must name four things:

- `x` — the controlled variable (what must stay correct)
- `u` — the control variable (the lever you will actually move)
- Observability — how will you know the current value of `x`?
- Bounds — every actuator saturates; no unbounded loop is acceptable

### 4. Seven-step loop

| Step | Principle | Reference |
|---|---|---|
| 1 | Identify — name `x`, `u`, observability, bounds. | `references/state-and-control.md` |
| 2 | Analyze — reproduce, measure, locate fault, state the model. | `references/modeling.md` |
| 3 | Stabilize — kill divergence / oscillation / leaks before features. | `references/stability.md` |
| 4 | Synthesize — minimal `u`; decouple what hurts, coordinate what helps. | `references/multivariable.md` |
| 5 | Close the loop — observe actual result; correct until bounded. | `references/closed-loop-workflow.md` |
| 6 | Compensate — feedforward measurable disturbances; clamp the actuator. | `references/disturbance.md` |
| 7 | Optimize — only then tune secondary indicators. | `references/bounded-control.md` |

For sampled-system and test-cadence concerns, also see `references/discrete-systems.md`.

### 5. Templates

These files are located in the skill's `templates/` directory (relative to the skill
installation root).

- **Debugging**: copy `templates/debugging-checklist.md` into the session.
- **Planning**: use `templates/change-proposal.md` to write a control plan.

### 6. Self-audit

Before declaring done, pass all MUST checks in `evals/checks.json`.

## Cognitive laws

The skill enforces 8 cognitive laws:

1. Name `x` before `u`. Unnamed targets are unregulated.
2. Observe before you guess. Measure current behavior before synthesizing the fix.
3. Stabilize before you optimize. Divergence under perturbation is failure.
4. Close the loop. Observe the actual result; correct until deviation is bounded.
5. Feedforward measurable disturbances; feedback the rest. Never crank gain on delay.
6. Decouple harmful coupling. Coordinate beneficial coupling. Regulate relations, not just absolutes.
7. Minimal control. The smallest `u` that moves `x` to target. No speculative extras.
8. Convergence: corrections must shrink. If they grow, you are unstable — stop and re-identify.

## Worked example

**Symptom:** an API endpoint intermittently returns 500 under load.

| Step | Control-theoretic action |
|---|---|
| Identify | `x` = error rate; `u` = retry/timeout/cache logic; bound = request budget. |
| Analyze | Reproduce under load; measure that error rate climbs with concurrency (unstable). |
| Stabilize | Add circuit breaker + bounded retries with backoff → error rate bounded. |
| Synthesize | Minimal change; don't rewrite the service. |
| Close the loop | Load-test again; error rate now converges to ~0. |
| Compensate | Feedforward on measurable dependency outage (fail fast) + feedback on the rest. |
| Optimize | Only now trim p99 latency. |

**Without this lens:** add retries with no bound → retry storm (an unstable delay loop) → worse than before.

## References

8 deep-dive references, each anchored to the original text with LLM behavior patterns:

| Topic | File |
|---|---|
| Closed-loop workflow | `references/closed-loop-workflow.md` |
| State, control, observability, bounds | `references/state-and-control.md` |
| Stability | `references/stability.md` |
| Modeling and model validity | `references/modeling.md` |
| Multivariable: decouple and coordinate | `references/multivariable.md` |
| Disturbance compensation and time-delay | `references/disturbance.md` |
| Bounded control | `references/bounded-control.md` |
| Discrete systems and test cadence | `references/discrete-systems.md` |

## Self-audit

`evals/checks.json` lists concrete MUST/SHOULD checks an LLM or reviewer applies to confirm the discipline was followed. All MUST items must pass before a task is called done.

## Contributing

- Every claim in `SKILL.md` must trace to a reference file.
- Every reference link must resolve to an existing file.
- Keep the skill small and aligned to the book.
- Run `./init.ps1` before submitting.

See `AGENTS.md` for the full working rules and definition of done.

## Version

This skill follows [Semantic Versioning](https://semver.org/) (`X.Y.Z`).

| Version | Date | Notes |
|---|---|---|
| 0.1.0 | 2026-07-24 | Initial public release |

Full history: [CHANGELOG.md](CHANGELOG.md).

## License

MIT License. See [LICENSE](LICENSE) for details.

## Source

Derived from Qian Xuesen (钱学森) & Song Jian (宋健), *Engineering Cybernetics* (工程控制论). The original book and its mathematical foundations are the authoritative source; this skill is a faithful interpretation, not a replacement.
