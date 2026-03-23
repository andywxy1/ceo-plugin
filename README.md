**English** | [简体中文](README_CN.md)

# CEO - Chief Executive Orchestrator

A Claude Code plugin that coordinates 150+ specialized AI agents across engineering, design, marketing, sales, and more. The CEO conducts structured discovery, builds execution plans with dependencies, and orchestrates agent teams with hard gates, quality gates, and status reporting.

## What's Inside

- **1 skill** (`/ceo:ceo`) - the meta-orchestrator that runs the show
- **152 specialized agents** spanning 13 domains (engineering, design, marketing, sales, product, project management, testing, support, paid media, game development, spatial/XR, specialized, strategy)
- **19 reference docs** - NEXUS framework, phase playbooks, scenario runbooks, handoff templates, anti-patterns guide
- **Session-start hook** - automatically suggests `/ceo` when multi-domain tasks are detected

## Installation

### Prerequisites

- [Claude Code](https://claude.ai/download) v1.0.33 or later
- Run `claude --version` to check

### Step 1: Add the marketplace

In Claude Code, run:

```
/plugin marketplace add andywxy1/ceo-plugin
```

### Step 2: Install the plugin

```
/plugin install ceo@ceo-plugin
```

### Step 3: Reload and verify

```
/reload-plugins
```

Run `/agents` to see the 152 agents loaded, or `/help` to see `ceo:ceo` listed under available skills.

## Updating

To update to the latest version:

```
/plugin install ceo@ceo-plugin
```

Then reload:

```
/reload-plugins
```

## Usage

Invoke the CEO skill:

```
/ceo:ceo
```

The CEO follows a strict **four-phase protocol** with hard gates at every transition:

1. **Discovery** - asks questions to understand your project scope, domains, and constraints
   - *Hard Gate: user must confirm project brief before advancing*
2. **Planning** - matches agents to needs, builds an execution plan with workstreams and dependencies
   - *Hard Gate: user must explicitly approve the plan before any agents spawn*
3. **Pre-flight** - spawns key agents in review-only mode to surface ambiguities before committing to work (mandatory for ALL project scales)
   - *Hard Gate: all ambiguities must be resolved before execution begins*
4. **Execution** - orchestrates agents in parallel, manages handoffs, tracks progress with checkpoints
   - *Hard Gate: every task output verified against acceptance criteria before marking complete*

## Protocol Enforcement

The CEO uses multiple enforcement layers to prevent common orchestration failures:

| Layer | Mechanism |
|-------|-----------|
| **Hard Gates** | `<HARD-GATE>` blocks at every phase transition -- non-negotiable barriers |
| **Verification Protocol** | Every task output verified against acceptance criteria before marking complete |
| **Checklist-to-Task** | Quality gate criteria become tracked Tasks with evidence requirements |
| **Rationalization Prevention** | 12-entry table of common CEO shortcuts with rebuttals |
| **Red Flag Callouts** | 10 internal thoughts that trigger immediate re-evaluation |
| **Anti-Pattern Guide** | 10 documented orchestration failure modes with fixes |
| **Rigid/Flexible Classification** | Clear distinction between non-negotiable protocols and adaptable guidelines |

### Rigid Protocols (never bend)

Phase sequence, hard gates, Tier 1 discovery questions, quality gate checklists, 3-retry escalation limit, CEO-never-implements rule, handoff template format, verification protocol, plan approval gate, mandatory pre-flight.

### Flexible Protocols (adapt to context)

Number of agents per phase, sprint duration, parallel tracks, scale classification, scenario runbook selection, Tier 2/3 question selection, checkpoint frequency.

## NEXUS Pipeline (Sprint/Full Scale)

For larger projects, execution maps to the 7-phase NEXUS pipeline:

```
Phase 0: Intelligence & Discovery (3-7d)     -> Gate: Executive Summary Generator
Phase 1: Strategy & Architecture (5-10d)      -> Gate: Studio Producer + Reality Checker
Phase 2: Foundation & Scaffolding (3-5d)       -> Gate: DevOps + Evidence Collector
Phase 3: Build & Iterate (2-12wk)             -> Gate: Agents Orchestrator
Phase 4: Quality & Hardening (3-7d)           -> Gate: Reality Checker (sole authority)
Phase 5: Launch & Growth (2-4wk)              -> Gate: Studio Producer + Analytics Reporter
Phase 6: Operate & Evolve (ongoing)           -> Governance: Studio Producer
```

Every NEXUS phase has a hard gate, mandatory checklist-to-task conversion, and evidence requirements.

## Scenario Runbooks

Pre-built activation templates for common project types:

- **Startup MVP** (4-6 weeks, 18-22 agents) - compressed discovery through launch
- **Enterprise Feature** (8-12 weeks) - full compliance and multi-team coordination
- **Marketing Campaign** (2-4 weeks) - multi-channel content production
- **Incident Response** (1-5 days) - P0/P1 emergency response

## Agent Domains

| Domain | Agents | Examples |
|--------|--------|----------|
| Engineering | 23 | Backend Architect, Frontend Developer, DevOps, Security Engineer, SRE |
| Marketing | 26 | SEO, TikTok, Xiaohongshu, Content Creator, Growth Hacker |
| Game Dev | 19 | Unity, Unreal, Godot, Roblox, Narrative Designer, Level Designer |
| Sales | 9 | Deal Strategist, Pipeline Analyst, Sales Coach, Proposal Strategist |
| Design | 8 | UX Architect, UI Designer, Brand Guardian, Visual Storyteller |
| Testing | 8 | API Tester, Performance Benchmarker, Accessibility Auditor |
| Paid Media | 7 | PPC, Programmatic, Paid Social, Tracking Specialist |
| Support | 6 | Analytics Reporter, Finance Tracker, Infrastructure Maintainer |
| Project Mgmt | 6 | Project Shepherd, Studio Producer, Jira Workflow Steward |
| Product | 5 | Product Manager, Sprint Prioritizer, Trend Researcher |
| Spatial/XR | 5 | visionOS, WebXR, Metal Engineer, XR Interface Architect |
| Specialized | 29 | MCP Builder, Workflow Architect, Document Generator, ZK Steward |
| Strategy | 1 | Agents Orchestrator |

## Local Development

To test changes locally without installing:

```bash
claude --plugin-dir /path/to/ceo-plugin
```

Run `/reload-plugins` after making changes to pick them up without restarting.

## License

MIT
