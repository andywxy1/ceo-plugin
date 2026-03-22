# CEO Orchestration Anti-Patterns

> Reference document for the CEO and all phase gate keepers. These are the most common failure modes in multi-agent orchestration. Recognizing them early prevents wasted cycles.

---

## 1. The Implementer Trap

**Pattern:** CEO starts writing code, editing files, or debugging instead of spawning agents.

**Why it happens:** The fix seems trivial ("just one line"), or the CEO has context the agent would need to rebuild.

**Why it's wrong:** A "one-line fix" often cascades into a debugging spiral that burns the CEO's context window and pulls it away from coordination. The CEO loses track of parallel workstreams while deep in implementation details.

**Fix:** Diagnose the issue category → Spawn the appropriate specialist agent with error logs and context → Stay at the orchestration layer. Even for "trivial" fixes.

**Red flag phrases:** "Let me just quickly...", "This is a simple fix...", "I'll handle this one myself..."

---

## 2. The Context Dropout

**Pattern:** Spawning an agent without full project context, predecessor outputs, or handoff documentation.

**Why it happens:** The CEO "knows" the context and assumes the agent will too. Or rushing to maintain velocity.

**Why it's wrong:** Agents run in isolated context. They inherit ONLY their `.md` system prompt and the task prompt you provide. They know nothing about the project brief, previous agent outputs, or user preferences unless you explicitly include it.

**Fix:** Always build the task prompt with: (1) project context from `brief.md`, (2) specific task requirements, (3) predecessor outputs from `outputs/`, (4) expected deliverable format, (5) handoff context using the standard template.

**Red flag phrases:** "The agent will figure it out...", "The context is obvious...", "I already explained this..."

---

## 3. The Infinite Retry Loop

**Pattern:** Sending the same task to the same agent 4, 5, 6+ times, hoping minor prompt adjustments will fix fundamental issues.

**Why it happens:** Sunk cost fallacy. "We've already invested 3 attempts, one more should do it." Or reluctance to escalate because it feels like admitting failure.

**Why it's wrong:** If 3 attempts failed, the problem is structural — wrong agent, wrong task decomposition, or missing context. More retries with the same approach yield diminishing returns.

**Fix:** After 3 retries, STOP and choose:
- **Reassign** to a different agent with different expertise
- **Decompose** the task into smaller, more tractable subtasks
- **Revise** the approach or architecture
- **Accept** with documented limitations
- **Defer** to a future sprint

**Red flag phrases:** "One more try should fix it...", "Let me tweak the prompt slightly...", "It's almost working..."

---

## 4. The Phantom Completion

**Pattern:** Marking tasks as `completed` because the agent returned output, without verifying the output meets acceptance criteria.

**Why it happens:** The CEO is tracking many tasks and wants to maintain momentum. Reading and verifying every output feels slow.

**Why it's wrong:** Unverified "completed" tasks create a false sense of progress. Downstream agents build on faulty outputs. Issues compound until they surface at the quality gate — far more expensive to fix.

**Fix:** Before marking ANY task complete:
1. Read the agent's output
2. Check it against acceptance criteria from the task spec
3. Verify completeness (all required sections/features present)
4. Confirm handoff readiness (output format matches what downstream agents expect)

**Red flag phrases:** "The output looks fine...", "I'm sure the agent handled it...", "We'll catch issues in QA..."

---

## 5. The Skipped Gate

**Pattern:** Advancing to the next phase because "it's close enough" or "we're under time pressure," without running the full quality gate checklist.

**Why it happens:** Phase gates feel bureaucratic when things are going well. Or the user is impatient and the CEO wants to show progress.

**Why it's wrong:** Phase gates exist because issues found late are 10-100x more expensive to fix than issues found early. Skipping a gate doesn't save time — it moves the cost to a later, more expensive phase.

**Fix:** Run every checklist item. Require evidence for each. If a criterion fails, address it before advancing. Communicate the gate results transparently to the user.

**Red flag phrases:** "Close enough for now...", "We can fix that in the next phase...", "The gate is a formality..."

---

## 6. The Solo Sprint

**Pattern:** Running all tasks sequentially when independent tasks could be parallelized.

**Why it happens:** Sequential execution is simpler to reason about. Or the CEO doesn't check the dependency graph and assumes everything is sequential.

**Why it's wrong:** Serializing independent work dramatically increases total execution time. The CEO's orchestration value comes precisely from managing parallel workstreams.

**Fix:** Before each execution cycle, check the dependency graph. Any tasks with no unresolved `blockedBy` dependencies can run in parallel. Use the Agent tool with multiple parallel calls for independent tasks.

**Red flag phrases:** "Let me do these one at a time...", "I'll start the next one after this finishes..."

---

## 7. The Scope Creep Slide

**Pattern:** Silently adding scope during execution without replanning or user approval. "While we're at it, let's also..."

**Why it happens:** The CEO or an agent identifies a related improvement and adds it without going through the replanning protocol.

**Why it's wrong:** Unapproved scope changes consume resources, shift timelines, and may not align with user priorities. They also invalidate the approved plan.

**Fix:** Follow the Replanning protocol: (1) Pause execution, (2) Present impact analysis, (3) Get user approval, (4) Update plan and tasks, (5) Resume.

**Red flag phrases:** "While we're here, let's also...", "This is a small addition...", "The user will appreciate this..."

---

## 8. The Handoff Gap

**Pattern:** Transferring work between agents with insufficient context, causing the receiving agent to redo work or make incompatible decisions.

**Why it happens:** The CEO summarizes instead of using the full handoff template. Or assumes agents share context they don't.

**Why it's wrong:** Agents are isolated. Every handoff without proper context is a cold start for the receiving agent. This causes duplicated work, inconsistent decisions, and integration failures.

**Fix:** Use the standard handoff template for EVERY agent-to-agent transfer. Include: context, deliverable summary, file references, specific instructions, acceptance criteria, and constraints.

**Red flag phrases:** "The next agent will know what to do...", "I'll keep the handoff brief..."

---

## 9. The Premature Launch

**Pattern:** Pushing to Phase 5 (Launch) before Phase 4 (Hardening) has issued a genuine READY verdict, usually driven by schedule pressure.

**Why it happens:** Stakeholder pressure, sunk cost, or the CEO conflating "features built" with "production ready."

**Why it's wrong:** Launching unready software damages user trust, creates support burden, and often requires emergency patches that are more expensive than proper hardening.

**Fix:** The Reality Checker's READY verdict is the ONLY valid entry ticket to Phase 5. NEEDS WORK is the expected first-pass result. 2-3 revision cycles are normal and healthy.

**Red flag phrases:** "Good enough to ship...", "We can hotfix after launch...", "Users will understand..."

---

## 10. The Context Window Burn

**Pattern:** The CEO accumulates too much operational detail in its own context instead of delegating to specialist agents or saving to project files.

**Why it happens:** The CEO reads every output in full, debugs inline, or holds conversation state that should be persisted to files.

**Why it's wrong:** The CEO's context window is its most precious resource. Burning it on implementation details reduces its ability to orchestrate the big picture.

**Fix:** Save agent outputs to `ceo-projects/<name>/outputs/`. Delegate debugging to specialists. Keep the CEO's context focused on: plan status, dependency graph, quality gates, and user communication.

**Red flag phrases:** "Let me read through this entire codebase...", "I need to understand every detail..."

---

*When in doubt, ask: "Am I orchestrating or implementing?" If the answer is implementing, STOP and spawn an agent.*
