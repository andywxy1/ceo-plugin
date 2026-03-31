---
name: setup
description: "Interactive onboarding for the CEO plugin. Walks through settings (model tier, verify-fix, team mode, checkpoint frequency, etc.) and writes settings.json. Run once after installing the plugin, or anytime to reconfigure."
---

# CEO Setup

You are running the CEO plugin setup wizard. Walk the user through configuring their preferences and write the result to `${CLAUDE_PLUGIN_ROOT}/settings.json`.

## Step 1: Welcome

Say:
> **Welcome to CEO Plugin Setup**
>
> I'll walk you through a few preferences that control how the CEO orchestrates your agents. This takes about 1 minute. You can re-run `/ceo:setup` anytime to change these.

Check if `${CLAUDE_PLUGIN_ROOT}/settings.json` already exists. If it does, read it and say:
> "You already have a settings file. I'll show your current choices — just confirm or change them."

## Step 2: Model Tier

Use AskUserQuestion:

```json
{
  "questions": [
    {
      "question": "How should the CEO assign models to agents? This is the biggest cost/quality tradeoff.",
      "header": "Model Tier",
      "options": [
        {
          "label": "Balanced (Recommended)",
          "description": "Opus for architects, reviewers, strategists. Sonnet for developers, writers, operators. Best tradeoff of quality and speed."
        },
        {
          "label": "Max Quality",
          "description": "ALL agents run on Opus. Best reasoning across the board, but slower and more expensive."
        },
        {
          "label": "Max Speed",
          "description": "ALL agents run on Sonnet. Fastest and cheapest. May miss nuance on complex architecture or review tasks."
        }
      ],
      "multiSelect": false
    }
  ]
}
```

Map the answer:
- "Balanced" → `"balanced"`
- "Max Quality" → `"max_quality"`
- "Max Speed" → `"max_speed"`

## Step 3: Verification & Teams

Use AskUserQuestion with two questions:

```json
{
  "questions": [
    {
      "question": "Should every implementation task be reviewed by a read-only agent before marking complete? (Catches bugs but adds time per task)",
      "header": "Verify Loop",
      "options": [
        {
          "label": "Yes, always verify (Recommended)",
          "description": "A reviewer checks every deliverable. Max 3 retry cycles before escalating to you."
        },
        {
          "label": "Yes, but max 1 retry",
          "description": "Verify once. If it fails, escalate to you immediately instead of looping."
        },
        {
          "label": "No, skip verification",
          "description": "Trust agent output without review. Faster but riskier. Not recommended for production work."
        }
      ],
      "multiSelect": false
    },
    {
      "question": "How should the CEO coordinate agents that need to work together (e.g., frontend + backend on the same API)?",
      "header": "Team Mode",
      "options": [
        {
          "label": "Auto (Recommended)",
          "description": "Use team messaging for coupled workstreams, standalone dispatch for independent tasks."
        },
        {
          "label": "Always use teams",
          "description": "Force all multi-agent workstreams into team mode with SendMessage coordination."
        },
        {
          "label": "Never use teams",
          "description": "Always use standalone Agent() calls with handoff documents. Simpler but agents can't talk to each other."
        }
      ],
      "multiSelect": false
    }
  ]
}
```

Map answers:
- Verify: "Yes, always" → `{ enabled: true, max_retries: 3, reviewer_model: "opus" }`. "Yes, max 1" → `{ enabled: true, max_retries: 1, reviewer_model: "opus" }`. "No" → `{ enabled: false, max_retries: 3, reviewer_model: "opus" }`.
- Team: "Auto" → `"auto"`, "Always" → `"always"`, "Never" → `"never"`.

If model_tier is `"max_quality"`, set `reviewer_model: "opus"`. If `"max_speed"`, set `reviewer_model: "sonnet"`. If `"balanced"`, set `reviewer_model: "opus"` (reviewers should reason deeply).

## Step 4: Autonomy Level

Use AskUserQuestion:

```json
{
  "questions": [
    {
      "question": "How often should the CEO pause to check in with you?",
      "header": "Checkpoints",
      "options": [
        {
          "label": "After each workstream (Recommended)",
          "description": "CEO reports progress and asks approval before starting the next workstream. Good balance of control and flow."
        },
        {
          "label": "After each task",
          "description": "CEO pauses after every single task. Maximum oversight but slower."
        },
        {
          "label": "Only at phase boundaries",
          "description": "CEO runs autonomously within phases, only pausing between Discovery/Planning/Pre-flight/Execution. Fastest, least control."
        }
      ],
      "multiSelect": false
    },
    {
      "question": "How many agents should review requirements during pre-flight? (More = catches more ambiguity, less = faster)",
      "header": "Pre-flight",
      "options": [
        {
          "label": "3 agents (Recommended)",
          "description": "Good coverage without slowing things down."
        },
        {
          "label": "1 agent (Lightweight)",
          "description": "Fastest pre-flight. Only the most critical agent reviews."
        },
        {
          "label": "5 agents (Thorough)",
          "description": "Maximum ambiguity detection. Best for high-stakes or large projects."
        }
      ],
      "multiSelect": false
    }
  ]
}
```

Map:
- Checkpoint: "After each workstream" → `"workstream"`, "After each task" → `"task"`, "Only at phase boundaries" → `"phase"`.
- Pre-flight: "3" → `3`, "1" → `1`, "5" → `5`.

## Step 5: Write settings.json

Assemble the settings object and write to `${CLAUDE_PLUGIN_ROOT}/settings.json`:

```json
{
  "model_tier": "<selected>",
  "verify_fix": {
    "enabled": true,
    "max_retries": 3,
    "reviewer_model": "opus"
  },
  "team_mode": "<selected>",
  "checkpoint": "<selected>",
  "preflight_agents": 3,
  "project_dir": "./ceo-projects",
  "shared_context": true
}
```

## Step 6: Confirm

Show the user their final settings in a readable summary table:

```
Setting              | Value
---------------------|------------------
Model tier           | Balanced (Opus + Sonnet)
Verify-fix loop      | Enabled, max 3 retries
Reviewer model       | Opus
Team mode            | Auto
Checkpoints          | After each workstream
Pre-flight agents    | 3
Project directory    | ./ceo-projects
Shared context       | Enabled
```

Then say:
> **Setup complete.** Your preferences are saved to `settings.json`. Run `/ceo` to start a project, or `/ceo:setup` anytime to reconfigure.

## Notes

- `shared_context` and `project_dir` use sensible defaults and are not asked during setup to keep it fast. Users can edit `settings.json` manually to change them.
- The schema file at `${CLAUDE_PLUGIN_ROOT}/settings.schema.json` documents every field with descriptions and valid values.
