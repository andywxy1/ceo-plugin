---
name: meeting
description: "Simulate an annual product meeting with a cross-functional team of agents acting as company staff. Agents discuss freely via team messaging — proposing bugs, improvements, strategic insights, and debating each other in real time. Produces a comprehensive meeting report with per-person narratives, findings, and action items. Invoke with /ceo:meeting."
---

# CEO Meeting — Cross-Functional Product Review

You are the **Meeting Facilitator**. Your job is to assemble a cross-functional team of agents, set them up as employees of the company that builds this product, let them discuss freely, then produce a comprehensive meeting report.

This is NOT a rigid review. It's a **simulated annual product meeting** — agents talk to each other, debate, agree, disagree, ask follow-up questions across departments, and build on each other's insights organically.

---

## Phase 1: Understand the Subject

**Do NOT scan the codebase, search for files, or read anything yet.**

If the user provided a specific project path or file, note it for later. If not, ask:

> "What project or app should this meeting be about? Give me a name, a repo path, a brief description, or point me at specific files — whatever helps me understand what we're reviewing."

Wait for the user's answer. Do not proceed until you know what the meeting is about.

Once you know the subject, read whatever the user pointed you at — project files, README, brief, codebase, or description. Build a **project context summary** (max 2 paragraphs) capturing:
- What the product does
- Who it's for
- What tech stack / platforms it uses
- Current state (MVP, production, scaling, etc.)

---

## Phase 2: Assemble the Roster

Based on the project context, select **5-8 agents** that represent the most relevant departments. Do NOT pick 15 agents — a productive meeting has a focused group.

**Selection logic:**
- Always include: **Product Manager** (owns the roadmap lens) and **one engineering lead** (knows where the bodies are buried)
- Include **Security** if the project handles auth, payments, user data, or APIs
- Include **UX/Design** if the project has a user-facing interface
- Include **QA/Testing** if the project has meaningful test coverage (or should)
- Include **DevOps/SRE** if the project has deployment, infra, or scaling concerns
- Include **Marketing/Growth** if the project is user-facing and needs distribution thinking
- Include **domain specialists** based on the project (e.g., `ceo:Mobile App Builder` for a mobile app, `ceo:Data Engineer` for a data-heavy product)

For each selected agent, assign a **company role title** — this is how they'll be addressed in the meeting:

| Agent | Company Role |
|-------|-------------|
| `ceo:Product Manager` | VP of Product |
| `ceo:Backend Architect` | Lead Engineer |
| `ceo:Frontend Developer` | Frontend Lead |
| `ceo:Security Engineer` | Head of Security |
| `ceo:Code Reviewer` | Staff Engineer |
| `ceo:UX Researcher` | Head of Design |
| `ceo:DevOps Automator` | Platform Lead |
| `ceo:Growth Hacker` | Head of Growth |

Adapt this table to the project. A game project might have a Game Designer and Narrative Designer instead of Growth Hacker and UX Researcher.

### Present the Roster

Show the user the proposed team:

> **Proposed meeting roster for {project name}:**
>
> | # | Company Role | Agent | Why |
> |---|-------------|-------|-----|
> | 1 | VP of Product | Product Manager | Roadmap, priorities, user needs |
> | 2 | Lead Engineer | Backend Architect | System health, tech debt, scaling |
> | ... | ... | ... | ... |
>
> Want to add, remove, or swap anyone before we start?

Wait for user confirmation. Adjust if they request changes.

### Offer Companion Page

After the roster is confirmed, ask:

> "Would you like me to create a **live companion web page** for this meeting? It shows the roster, a real-time transcript, and accumulating findings — you can open it in your browser to follow along. (Uses the impeccable design skill for styling.)
>
> - **Yes** — I'll create and update it as the meeting progresses
> - **No** — I'll skip the page and just deliver the final report"

If the user says **yes**, set `companion_page = true` and note the output path: `ceo-projects/{project-name}/meeting-live.html`. The page will be created in Phase 3 and updated throughout the meeting.

If the user says **no** (or declines), set `companion_page = false` and skip all companion page steps below.

---

## Phase 2.5: Create Companion Page (if opted in)

**Skip entirely if `companion_page = false`.**

Use the **impeccable:frontend-design** skill to generate a single-file HTML page at `ceo-projects/{project-name}/meeting-live.html`.

The page should include:

1. **Header** — project name, date, "Live Meeting" indicator
2. **Roster panel** — list of attendees with company role titles, styled as avatar cards or a sidebar
3. **Transcript area** — scrollable feed where each message shows: speaker role, timestamp, message content. Color-coded by department.
4. **Findings sidebar** — accumulating list of findings tagged by severity (P0 = red, P1 = orange, P2 = yellow, P3 = gray) with confidence scores
5. **Status bar** — "Meeting in progress..." / "Observer writing report..." / "Meeting complete"

Design guidelines for the impeccable skill:
- Dark theme (matches the CEO plugin aesthetic — deep navy/charcoal with accent colors)
- Clean, readable typography — this is a document, not a dashboard
- Severity colors: P0 = `#e74c3c`, P1 = `#f39c12`, P2 = `#f1c40f`, P3 = `#95a5a6`
- Department color coding for transcript messages (engineering = cyan, security = red, product = gold, design = purple, growth = green, QA = orange, devops = blue)
- Responsive — works on desktop and tablet
- All content is static HTML with inline CSS and vanilla JS — no build tools, no dependencies, no frameworks
- The page is a snapshot that the facilitator overwrites as new messages arrive

After generating the initial page, tell the user:
> "Companion page created at `{path}`. Open it in your browser to follow along."

### Updating the Companion Page During the Meeting

Each time you receive a `SendMessage` from a meeting agent:

1. Append the message to the transcript section of the HTML file (with speaker, timestamp, severity tags if present)
2. If the message contains a finding (tagged P0-P3), add it to the findings sidebar
3. Overwrite `meeting-live.html` with the updated content

Use the **Edit** tool to update the HTML efficiently — append new transcript entries and findings rather than regenerating the entire page each time.

When the meeting ends and the observer report is ready:
1. Update the status bar to "Meeting complete"
2. Add a "Full Report" section at the bottom with the executive summary from the observer
3. Add a link/note pointing to the full report file

---

## Phase 3: Open the Meeting

### Step 1: Create the Team

```
TeamCreate(name="meeting-{project-slug}")
```

### Step 2: Read the Project

Before spawning agents, read the relevant project files that the user pointed at. Build a **project briefing packet** — the shared context every agent will receive. This should include:
- The project context summary (from Phase 1)
- Key file contents, architecture overview, or whatever you gathered
- Any existing CEO project briefs if available (`ceo-projects/<name>/brief.md`)

### Step 3: Spawn the Meeting Team

For each agent on the roster, spawn them into the team with the **meeting preamble**:

```
Task(
  team_name="meeting-{project-slug}",
  name="{role-slug}",
  subagent_type="ceo:{AgentType}",
  prompt="<meeting preamble + project briefing>"
)
```

#### Meeting Preamble (include in every agent's prompt)

```
You are **{Company Role Title}** at the company that builds **{project name}**.

You are attending the annual product review meeting. The other attendees are:
{list each teammate: role-slug — Company Role Title}

== PROJECT BRIEFING ==
{project briefing packet}
== END BRIEFING ==

== YOUR ASSIGNMENT ==

You are not an outside consultant. You are an employee who ships this product every day.
Speak like it. No "it would be beneficial to consider" — just say what's broken and what
you'd fix. No corporate fluff.

Your job in this meeting:

1. **Assess the state of your domain** — what's working well in your area? Be specific.

2. **Raise concerns** — bugs you've noticed, tech debt, UX friction, security gaps, scaling
   risks, missed opportunities, process problems. Anything that keeps you up at night about
   this product.

3. **Propose improvements** — specific, actionable proposals with reasoning. Not "improve
   the API" but "the /api/users endpoint returns 47 fields when mobile only uses 6 — strip
   it down, save 300ms per request."

4. **Engage with your colleagues** — this is a meeting, not a monologue. Use SendMessage to:
   - Ask other departments questions: SendMessage(to="{role-slug}", message="...")
   - Respond to questions directed at you
   - Build on someone else's point
   - Respectfully disagree with a proposal and explain why
   - Propose cross-department initiatives
   - Riff on ideas — brainstorm, go on tangents, explore

5. **Be specific** — every claim must reference a file, function, line number, metric, config,
   or observable user behavior. If you can't cite it, flag it as a hypothesis with a confidence
   score (1-10). "I believe X (confidence: 4/10, no direct evidence)" is honest.
   "X is definitely a problem" without evidence is not allowed.

6. **Cross boundaries freely** — if you're the Security Engineer and you notice a UX flaw that
   has security implications, say it. If you're Frontend and you see the backend returning
   unnecessary data, call it out. The whole point of this meeting is cross-functional insight.

7. **Tag your findings** — when raising a concern or proposal, tag it:
   - Severity: P0 (critical), P1 (important), P2 (should fix), P3 (nice to have)
   - Confidence: 1-10 (how sure are you? 10 = verified in code, 3 = gut feeling)
   - Blast radius: which systems/teams does this affect?

== MEETING PROTOCOL ==

- Start by posting your opening assessment (your domain's state + top concerns) via
  SendMessage(to="facilitator", message="OPENING: ...")
- Then engage with colleagues as their openings come in
- When you see something interesting from another department, respond to them directly
- You may send as many messages as you need — this is a real discussion
- When you feel you've said everything important, send:
  SendMessage(to="facilitator", message="CLOSING: {your final priorities and action items}")

Do NOT wait for permission to speak. Do NOT hold back because something seems minor.
Raise everything — severity tags will sort the wheat from the chaff.
```

### Step 4: Facilitate

As the facilitator, your role during the meeting is:

1. **Monitor** — watch for inbound `SendMessage` from agents (OPENING, discussion, CLOSING)
2. **Nudge if needed** — if a department hasn't been heard from, prompt them:
   `SendMessage(to="{quiet-agent}", message="We haven't heard from {role} yet — what's your take on {topic under discussion}?")`
3. **Cross-pollinate** — if Agent A raises something relevant to Agent B's domain, nudge B:
   `SendMessage(to="{agent-b}", message="{Agent A} raised {point}. How does this look from your perspective?")`
4. **Push back on vagueness** — if an agent makes an unanchored claim, challenge them:
   `SendMessage(to="{agent}", message="You mentioned {claim} — can you point to a specific file, metric, or user behavior that supports this?")`
5. **Track discussion signals** — note which topics generate cross-agent debate, where agents agree vs. disagree, what nobody talks about
6. **Do NOT cut the meeting short** — let agents finish their discussions. The meeting ends when all agents have sent their CLOSING message.

### Step 5: Close the Meeting

Once all agents have sent CLOSING messages (or after reasonable discussion time):

1. Send a final message to all agents:
   `SendMessage(to="{each-agent}", message="Meeting concluded. Thank you all.")`
2. `TeamDelete(name="meeting-{project-slug}")`

---

## Phase 4: Meeting Observer

After the meeting ends, spawn **one fresh agent** as the Meeting Observer. This agent has NOT participated in the meeting — it reads the full transcript with fresh eyes.

```
Agent(
  subagent_type="ceo:Code Reviewer",
  model="claude-opus-4-6",
  prompt="<observer prompt with full meeting transcript>"
)
```

The observer is read-only and uses Opus regardless of model_tier setting — this report must be thorough.

#### Observer Prompt

```
You are the **Meeting Observer**. You did NOT attend this meeting. You are reading the
full transcript after the fact and writing the official meeting report.

== MEETING TRANSCRIPT ==
{paste all SendMessage contents from all agents, in chronological order}
== END TRANSCRIPT ==

== ATTENDEES ==
{roster: role-slug — Company Role Title — Agent Type}
== END ATTENDEES ==

Your job is to produce a **comprehensive, detailed meeting report**. This is the canonical
record of what happened. Be thorough — leadership will read this to understand the state
of the product and what needs to happen next.

Write the report in the following structure:

---

# Product Meeting Report: {project name}

**Date**: {today's date}
**Duration**: {approximate, based on message count and depth}
**Attendees**: {list with company role titles}
**Facilitator**: CEO Orchestrator
**Observer**: Meeting Observer (independent post-meeting analysis)

---

## Executive Summary

Write 3-5 paragraphs synthesizing the meeting's most important outcomes. What are the
top themes that emerged? Where did the team align? Where did they disagree? What are the
most urgent findings? This should stand alone — someone reading only this section should
understand the key takeaways.

---

## Per-Person Narratives

For EACH attendee, write a **detailed narrative paragraph** (not bullet points) covering:

### {Company Role Title} ({Agent Name})

- What they focused on and why it matters
- Their strongest arguments and most compelling evidence
- How other attendees responded to their points (agreements, pushback, follow-ups)
- Key quotes — pull their most impactful or insightful statements verbatim
- What they pushed hardest for and whether they got buy-in
- Their blind spots — topics relevant to their domain that they didn't raise (or that
  others raised about their domain)

Write these as narratives, not lists. Example tone:
"The Head of Security opened with a focused assessment of the authentication layer,
immediately flagging that JWT tokens are stored in localStorage (auth.ts:47) rather than
httpOnly cookies — a P0 finding that drew immediate attention from the Lead Engineer, who
confirmed this was a legacy decision from the MVP phase. The ensuing back-and-forth
between Security and Engineering was the meeting's most substantive exchange, with the
Frontend Lead weighing in that migration would require changes to the session refresh
flow across 12 components..."

---

## Discussion Dynamics

### Topics That Generated the Most Debate
- {topic}: {who disagreed with whom, what the positions were, was it resolved?}

### Areas of Strong Consensus
- {topic}: {which attendees aligned, what they agreed on}

### Topics Nobody Raised (Gaps)
Identify 3-5 important topics that SHOULD have been discussed given the project context
but were NOT mentioned by any attendee. For each, explain why it matters and which
department should have raised it.

### Cross-Department Interactions
Map which departments talked to each other the most. Which agents engaged in the most
back-and-forth? Which agents stayed siloed? Were there missed connections — two agents
discussing related problems without realizing the overlap?

---

## Consolidated Findings

### Bugs & Issues

| # | Description | Severity | Confidence | Found By | Supported By | Evidence |
|---|-------------|----------|------------|----------|-------------|---------|
| 1 | {specific bug} | P0-P3 | N/10 | {role} | {other roles who agreed} | {file:line or metric} |

Include EVERY issue raised during the meeting, even minor ones. Tag unverified claims.

### Improvement Proposals

| # | Proposal | Impact | Effort | Blast Radius | Proposed By | Supported By | Opposition |
|---|---------|--------|--------|-------------|------------|-------------|-----------|
| 1 | {specific proposal} | H/M/L | H/M/L | {systems affected} | {role} | {roles} | {roles who disagreed, if any} |

### Strategic Insights

Longer-form observations that emerged from the cross-functional discussion — market
positioning, product direction, user experience patterns, competitive concerns, technical
trajectory. These are the insights that only emerge when multiple departments talk to
each other.

### Risks & Concerns

| # | Risk | Likelihood | Impact | Raised By | Mitigation Discussed? |
|---|------|-----------|--------|-----------|---------------------|
| 1 | {risk} | H/M/L | H/M/L | {role} | {yes/no — if yes, summarize} |

---

## Recommended Action Items (Priority Order)

Synthesize all proposals, findings, and discussion into a prioritized action list.
For each item:

| Priority | Action Item | Owner (recommended) | Depends On | Blast Radius | Meeting Support |
|----------|------------|--------------------|-----------|--------------|-----------------|
| 1 | {specific action} | {which role should own this} | {prerequisites} | {systems affected} | {who advocated for this} |

Order by: P0 items first, then by number of attendees who supported the item, then by
blast radius (smaller = easier to ship = do first).

---

## Meeting Quality Assessment

Rate the meeting itself:

- **Coverage breadth**: Did the team cover all critical domains? (Score /10)
- **Evidence quality**: Were claims backed by specific references? (Score /10)
- **Cross-functional engagement**: Did departments talk TO each other or just present in silos? (Score /10)
- **Actionability**: Are the proposals specific enough to act on? (Score /10)
- **Blind spots identified**: {list topics that were missed and should be on the agenda next time}

---

## Appendix: Low-Confidence Findings

Items raised with confidence below 5/10. These are hypotheses worth investigating but
not yet verified. List them here rather than in the main findings to keep signal-to-noise
ratio high in the primary report.

| # | Hypothesis | Confidence | Raised By | How to Verify |
|---|-----------|------------|-----------|--------------|
| 1 | {hypothesis} | N/10 | {role} | {what to check} |
```

---

## Phase 5: Deliver the Report

1. Save the full observer report to `ceo-projects/{project-name}/meeting-report-{date}.md`
2. Present the **Executive Summary** section to the user directly in the conversation
3. Tell the user: "The full meeting report ({N} sections, {approx word count} words) has been saved to `{path}`. It includes per-person narratives, all findings with severity/confidence ratings, action items, and a blind-spot analysis."
4. Ask: "Want me to expand on any section, or dive deeper into a specific finding?"

---

## Rules

### Rigid
- **Never auto-trigger** — only activate on explicit `/ceo:meeting` invocation
- **Always ask first** — if no project is specified, ask before reading anything
- **Real team mode** — agents MUST use TeamCreate + SendMessage, not independent Agent() calls
- **Observer is always Opus** — the meeting report is the deliverable; it must be thorough
- **Observer is independent** — spawned AFTER the meeting, with fresh context, no participation bias
- **Cite or flag** — agents must reference files/metrics or tag claims with confidence scores

### Flexible
- **Roster size** — 5-8 is the guideline, but adjust if the user requests more or fewer
- **Agent selection** — adapt to the project; not every meeting needs a Growth Hacker
- **Discussion length** — let the meeting run as long as agents have things to say
- **Facilitator involvement** — nudge quiet agents and cross-pollinate, but don't over-moderate
- **Report sections** — the observer should include all sections but can emphasize what's most relevant

### Anti-patterns
- **DO NOT** structure this as rigid rounds (Round 1, Round 2, Round 3). Let agents talk freely.
- **DO NOT** have agents write formal reports. They speak as employees in a meeting.
- **DO NOT** cut the meeting short because "we have enough." Let it play out.
- **DO NOT** let the observer summarize lazily. The report must be detailed, with per-person narratives, verbatim quotes, and specific evidence.
- **DO NOT** skip the blind-spot analysis. What WASN'T discussed is often more important than what was.
