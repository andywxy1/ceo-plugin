# CEO - Chief Executive Orchestrator

A Claude Code plugin that coordinates 170+ specialized AI agents across engineering, design, marketing, sales, and more. The CEO conducts structured discovery, builds execution plans with dependencies, and orchestrates agent teams with quality gates and status reporting.

## What's Inside

- **1 skill** (`/ceo:ceo`) - the meta-orchestrator that runs the show
- **152 specialized agents** spanning 13 domains (engineering, design, marketing, sales, product, project management, testing, support, paid media, game development, spatial/XR, specialized, strategy)
- **18 reference docs** - NEXUS framework, phase playbooks, scenario runbooks, handoff templates

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

## Usage

Invoke the CEO skill:

```
/ceo:ceo
```

The CEO follows a four-phase protocol:

1. **Discovery** - asks questions to understand your project scope, domains, and constraints
2. **Planning** - matches agents to needs, builds an execution plan with workstreams and dependencies
3. **Pre-flight** - spawns key agents in review-only mode to surface ambiguities before committing to work
4. **Execution** - orchestrates agents in parallel, manages handoffs, tracks progress with checkpoints

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
