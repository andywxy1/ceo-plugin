---
name: scenario-product-growth
description: "Pre-built runbook for Growth Mode — when the user already has a product and needs help with business strategy, monetization, positioning, and distribution. Use when the CEO classifies a project as Growth Mode."
---

# Scenario: Product Growth

> **Pipeline**: Growth Mode | **Duration**: 4-8 weeks | **Agents**: 15-25 (varies by scope)

---

## When to Use This Runbook

The user already has a product (app, SaaS, tool, etc.) that is built and functioning. They need help with one or more of:
- How to make money from it (business model, pricing, monetization)
- How to reach users (distribution, marketing, content)
- How to position it in the market (branding, competitive differentiation)
- How to improve it for growth (feature gaps, onboarding, retention)
- How to create marketing assets (website, videos, blog posts, social content)

## Growth Mode Phases

```
Phase G0: Product & Situation Audit        (2-3 days, 3-5 agents)
Phase G1: Market Intelligence              (3-5 days, 4-6 agents)
Phase G2: Strategy & Business Model        (3-5 days, 4-6 agents)
Phase G3: Positioning & Brand              (2-4 days, 3-4 agents)
Phase G4: Distribution Arsenal             (3-7 days, 5-10 agents)
Phase G5: Execution & Content Production   (2-6 weeks, 8-15 agents)
Phase G6: Measure & Optimize               (ongoing, 5-8 agents)
```

---

## Phase G0: Product & Situation Audit

> **Duration**: 2-3 days | **Agents**: 3-5 | **Gate Keeper**: Product Manager

**Goal**: Understand what the user has, who it's for, and what's working or not. No strategy yet — just diagnosis.

<HARD-GATE>
Do NOT propose business models, pricing, or distribution strategies until the audit is complete.
You cannot strategize about a product you don't understand. Diagnose first.
</HARD-GATE>

### CEO Discovery Questions (Growth-Specific)

In addition to standard Tier 1 questions, ask:

1. **What is the product?** Demo it or share a link. What problem does it solve?
2. **Who is using it today?** How many users? What do they say? Any paying users?
3. **What's your current revenue model?** (None / Freemium / Subscription / One-time / Ads / Other)
4. **What have you tried for distribution so far?** What worked? What didn't?
5. **What assets exist already?** (Website? Landing page? Social accounts? Blog? Videos?)
6. **What's your budget and timeline?** Bootstrapped vs. funded changes everything.
7. **What does success look like in 3 months?** (Users? Revenue? Downloads?)

### Agent Consultation

| Agent | Consultation Task | Key Questions They Surface |
|-------|------------------|--------------------------|
| **Product Manager** | Product-market fit assessment | Is the value proposition clear? What's the activation rate? Where do users drop off? |
| **UX Researcher** | User experience audit | Is onboarding smooth? Can users reach the "aha moment" quickly? What's confusing? |
| **Feedback Synthesizer** | Gather existing user feedback | What do users love? What do they complain about? What features do they request? |
| **Analytics Reporter** | Data audit (if analytics exist) | What metrics are being tracked? What's the retention curve? Where's the biggest drop-off? |

**CEO synthesizes** audit findings into a **Product Audit Report**:
```markdown
# Product Audit Report: <product-name>

## Product Overview
- What it does, who it's for, current state

## Current Traction
- Users, revenue, growth rate, retention

## Strengths
- What's working well (from agent analysis)

## Critical Gaps
- Product gaps that will undermine growth
- Missing infrastructure (analytics, onboarding, etc.)

## Recommendation
- Fix product gaps first? Or proceed to strategy?
```

### Quality Gate

| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | Product understood (CEO can explain it in one sentence) | Audit report |
| 2 | User feedback gathered (real voices, not assumptions) | Feedback Synthesizer report |
| 3 | Critical product gaps identified | UX Researcher + PM assessment |
| 4 | Data landscape understood (what's tracked, what's not) | Analytics Reporter audit |

**Gate Decision:**
- **PROCEED**: Product is ready for growth strategy
- **FIX FIRST**: Product has gaps that will undermine growth (route to Build Mode for fixes, then return)
- **PIVOT**: Product-market fit is weak — recommend pivoting before investing in growth

---

## Phase G1: Market Intelligence

> **Duration**: 3-5 days | **Agents**: 4-6 | **Gate Keeper**: Trend Researcher

**Goal**: Understand the competitive landscape, target audience, and market opportunity. The CEO consults agents to gather intelligence the user probably doesn't have.

<HARD-GATE>
Do NOT define business model or pricing until market intelligence is complete.
Pricing without competitive context is guessing. Research first.
</HARD-GATE>

### Agent Consultation (Parallel)

| Agent | Task | Deliverable |
|-------|------|-------------|
| **Trend Researcher** | Competitive landscape + market sizing | Competitor list with pricing, features, positioning. TAM/SAM/SOM estimates. Market trends. |
| **SEO Specialist** | Search landscape analysis | What keywords does the product category rank for? What's the search volume? Who dominates organic? What content gaps exist? |
| **Growth Hacker** | Distribution channel assessment | Where does the target audience hang out? Which channels have the best CAC potential? What viral mechanics could work? |
| **Feedback Synthesizer** | Competitor review analysis | What do users say about competitors? What pain points are unaddressed? What's the switching cost? |

**Agents use agent-reach** to gather real data:
- Trend Researcher: web search for competitor pricing pages, funding data, market reports
- SEO Specialist: analyze competitor content and keyword strategies
- Growth Hacker: browse Reddit, Twitter, Xiaohongshu for community discussions
- Feedback Synthesizer: read competitor reviews on app stores, Reddit, Twitter

### Quality Gate

| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | ≥3 direct competitors identified with pricing/positioning data | Trend Researcher report |
| 2 | Target audience channels identified (where they are, what they read) | Growth Hacker assessment |
| 3 | Search landscape mapped (keywords, volume, competition) | SEO Specialist report |
| 4 | Competitor weaknesses identified (unaddressed user pain points) | Feedback Synthesizer report |

---

## Phase G2: Strategy & Business Model

> **Duration**: 3-5 days | **Agents**: 4-6 | **Gate Keeper**: Studio Producer

**Goal**: Define how the product will make money and what the unit economics look like. The CEO presents options — the user decides.

<HARD-GATE>
Do NOT start creating marketing content or distribution assets until the business model is defined and approved by the user.
Distribution without strategy is burning resources.
</HARD-GATE>

### Agent Consultation

| Agent | Task | Deliverable |
|-------|------|-------------|
| **Product Manager** | Business model options | 2-3 monetization models with pros/cons based on market data from G1. Includes: revenue model, pricing tiers, conversion funnel design. |
| **Finance Tracker** | Unit economics modeling | CAC estimates per channel, LTV projections, break-even analysis, runway impact. |
| **Sprint Prioritizer** | Feature prioritization for growth | Which features drive acquisition vs retention? What's the minimum feature set for monetization? RICE-scored backlog. |
| **Studio Producer** | Strategic alignment | Does the business model align with the user's goals, resources, and timeline? Risk/reward assessment. |

### CEO Presents to User

The CEO collates agent recommendations and presents:

```markdown
# Business Strategy Options: <product-name>

## Option A: [Model Name] (e.g., Freemium)
- How it works: [description]
- Pricing: [tiers]
- Estimated CAC: $X (from Finance Tracker)
- Estimated LTV: $Y
- LTV:CAC ratio: Z
- Pros: [from PM]
- Cons: [from PM]
- Recommended by: [which agents]

## Option B: [Model Name] (e.g., Subscription)
...

## Option C: [Model Name] (e.g., Usage-based)
...

## Feature Gaps for Monetization
- [Feature needed for Option A] — effort: [from Sprint Prioritizer]
- [Feature needed for Option B] — effort: [from Sprint Prioritizer]

## Recommended Option: [X]
Why: [synthesis of agent inputs]
```

User approves a business model before proceeding.

### Quality Gate

| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | ≥2 business model options presented with unit economics | PM + Finance Tracker reports |
| 2 | Feature gaps for monetization identified and estimated | Sprint Prioritizer backlog |
| 3 | User has explicitly approved a business model | User confirmation |

---

## Phase G3: Positioning & Brand

> **Duration**: 2-4 days | **Agents**: 3-4 | **Gate Keeper**: Brand Guardian

**Goal**: Define why THIS product over competitors. Create the messaging and brand identity that all marketing content will build on.

### Agent Consultation

| Agent | Task | Deliverable |
|-------|------|-------------|
| **Brand Guardian** | Brand identity and positioning | Value proposition, positioning statement, brand voice, visual identity guidelines. "Why us?" answered clearly. |
| **Content Creator** | Messaging framework | Key messages per audience segment, elevator pitches (5s, 30s, 60s), tagline options, objection-handling messaging. |
| **UX Architect** | Landing page architecture | Information architecture for the marketing website. What sections, what order, what CTAs. Conversion-optimized structure. |

### Deliverable: Brand & Positioning Package

```markdown
# Brand & Positioning: <product-name>

## Positioning Statement
For [target audience] who [need], [product] is a [category] that [key benefit].
Unlike [competitor], we [differentiator].

## Value Propositions (by audience segment)
- Segment A: [message]
- Segment B: [message]

## Elevator Pitches
- 5 seconds: [one-liner]
- 30 seconds: [expanded]
- 60 seconds: [full pitch with proof points]

## Brand Voice
- Tone: [attributes]
- Do: [examples]
- Don't: [examples]

## Competitive Differentiation
| Feature | Us | Competitor A | Competitor B |
|---------|-----|-------------|-------------|
| ... | ... | ... | ... |

## Website Architecture
- Hero: [headline + CTA]
- Social proof: [what kind]
- Features: [top 3]
- Pricing: [from G2]
- FAQ: [top objections]
```

### Quality Gate

| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | Positioning statement approved by user | User confirmation |
| 2 | Competitive differentiation documented | Comparison matrix |
| 3 | Website architecture defined | UX Architect wireframe/spec |

---

## Phase G4: Distribution Arsenal

> **Duration**: 3-7 days | **Agents**: 5-10 | **Gate Keeper**: Growth Hacker

**Goal**: Plan the full set of distribution assets and channels. The CEO maps out everything needed and identifies what to create, in what order.

<HARD-GATE>
Do NOT start producing content until the distribution plan is approved.
Random content creation without a channel strategy wastes resources.
</HARD-GATE>

### CEO Maps the Distribution Landscape

Based on G1 intelligence and G2 strategy, the CEO identifies which assets and channels to activate:

#### Asset Inventory (What to create)

| Asset | Agent(s) | Priority | Status |
|-------|----------|----------|--------|
| **Landing page / Website** | Frontend Developer + UX Architect | P0 — required | ☐ |
| **App Store listing** (if mobile) | App Store Optimizer | P0 — required | ☐ |
| **Product demo video** | Short-Video Editing Coach (Remotion) | P0 — high impact | ☐ |
| **Comparison content** (vs competitors) | Content Creator | P1 — drives consideration | ☐ |
| **Blog posts** (SEO) | Content Creator + SEO Specialist | P1 — long-term organic | ☐ |
| **Social media profiles** | Platform-specific agents | P1 — channel presence | ☐ |
| **Introduction/explainer video** | Visual Storyteller (Remotion) | P1 — reusable across channels | ☐ |
| **Email sequences** | Content Creator | P2 — nurture pipeline | ☐ |
| **Community presence** (Reddit, forums) | Reddit Community Builder + others | P2 — trust building | ☐ |
| **Paid ad creative** | Ad Creative Strategist | P2 — if budget allows | ☐ |

#### Channel Strategy (Where to distribute)

The Growth Hacker recommends channels based on G1 data, prioritized by:
- Where the target audience actually is (from research)
- CAC estimate per channel (from Finance Tracker)
- Effort vs. impact

| Channel | Agent | Organic/Paid | Priority |
|---------|-------|-------------|----------|
| **SEO / Blog** | SEO Specialist + Content Creator | Organic | Long-term |
| **Reddit** | Reddit Community Builder | Organic | Trust-building |
| **Twitter/X** | Twitter Engager | Organic | Awareness |
| **Xiaohongshu** | Xiaohongshu Specialist | Organic | China market |
| **Product Hunt / HN** | Growth Hacker | Organic | Launch spike |
| **YouTube** | Visual Storyteller | Organic | Evergreen |
| **TikTok** | TikTok Strategist | Organic | Viral potential |
| **Google Ads** | PPC Campaign Strategist | Paid | Demand capture |
| **Social Ads** | Paid Social Strategist | Paid | Demand generation |

Not all channels are activated. The CEO recommends 3-5 based on the user's budget, audience, and product type.

#### Data Collection Plan

The CEO also surfaces: "What data do we need to collect to know if this is working?"

| Metric | Tool / Method | Why It Matters |
|--------|--------------|----------------|
| Website conversion rate | Analytics (GA4, Plausible) | Are visitors becoming users? |
| CAC per channel | UTM tracking + analytics | Which channels are cost-effective? |
| Activation rate | Product analytics | Are sign-ups reaching the "aha moment"? |
| Retention (D1/D7/D30) | Product analytics | Are users coming back? |
| Content engagement | Platform analytics | Which content resonates? |
| Revenue per user | Payment provider | Is the business model working? |

### Quality Gate

| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | Distribution plan approved by user | User confirmation |
| 2 | Top 3-5 channels selected with rationale | Growth Hacker recommendation |
| 3 | Asset priority list defined | CEO inventory |
| 4 | Data collection plan defined | Analytics setup plan |
| 5 | Analytics infrastructure planned (what to track, what tools) | Analytics Reporter recommendation |

---

## Phase G5: Execution & Content Production

> **Duration**: 2-6 weeks | **Agents**: 8-15 | **Gate Keeper**: CEO (coordinates directly)

**Goal**: Actually create the assets and start distribution. This is the equivalent of NEXUS Phase 3 (Build) but for marketing.

### Execution Order

Assets are created in dependency order:

```
Wave 1 (Week 1-2): Foundation
├─ Landing page / Website          → Frontend Developer + UX Architect
├─ Analytics setup                 → Analytics Reporter
├─ App Store listing optimization  → App Store Optimizer (if mobile)
└─ Brand assets (logo, colors)     → Brand Guardian

Wave 2 (Week 2-3): Core Content
├─ Product demo video              → Short-Video Editing Coach (Remotion)
├─ Introduction/explainer video    → Visual Storyteller (Remotion)
├─ Comparison content              → Content Creator (agent-reach for research)
└─ Blog posts (first 3-5)         → Content Creator + SEO Specialist

Wave 3 (Week 3-4): Distribution
├─ Social media profiles setup     → Platform-specific agents
├─ First posts per channel         → Platform-specific agents
├─ Community engagement begins     → Reddit/Twitter/Xiaohongshu agents
└─ Email sequences armed           → Content Creator

Wave 4 (Week 4-6): Amplification
├─ Paid campaigns (if budget)      → PPC/Paid Social agents
├─ Product Hunt / HN launch        → Growth Hacker
├─ Influencer / partnership outreach → Social Media Strategist
└─ Content cadence established     → Content Creator + platform agents
```

### Dev↔QA Equivalent for Content

Each piece of content follows a create → review → publish cycle:

```
FOR EACH content asset:
  1. Agent CREATES content (blog post, video, social post, etc.)
  2. Brand Guardian REVIEWS for brand consistency
  3. If applicable: Legal Compliance Checker REVIEWS for compliance
  4. CEO presents to user for APPROVAL
  5. IF APPROVED: Publish via API or provide to user
     ELIF NEEDS CHANGES: Agent revises, return to step 2
  6. Track in distribution plan (mark asset complete)
```

### Quality Gate

| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | Website live and converting | Analytics showing visits + sign-ups |
| 2 | Core content created (video, comparisons, blog posts) | Content files/links |
| 3 | ≥3 distribution channels active with first posts | Platform evidence |
| 4 | Analytics tracking verified (events firing correctly) | Analytics Reporter verification |
| 5 | Brand consistency across all assets | Brand Guardian audit |

---

## Phase G6: Measure & Optimize

> **Duration**: Ongoing | **Agents**: 5-8 | **Governance**: Growth Hacker + Analytics Reporter

**Goal**: What's working? What's not? Double down or pivot. This is the Growth Mode equivalent of NEXUS Phase 6.

### Operational Cadence

**Weekly:**
| Agent | Activity | Output |
|-------|----------|--------|
| **Analytics Reporter** | Channel performance analysis | Which channels drive sign-ups? At what cost? |
| **Growth Hacker** | Growth experiment review | What experiments ran? Results? Next experiments? |
| **Content Creator** | Content calendar execution | New blog posts, social content per schedule |
| **Platform agents** | Community engagement | Ongoing posts, comments, community presence |

**Bi-Weekly:**
| Agent | Activity | Output |
|-------|----------|--------|
| **Feedback Synthesizer** | User feedback analysis | What are new users saying? Where do they struggle? |
| **SEO Specialist** | Ranking and traffic review | Keyword movement, content performance, technical SEO |

**Monthly:**
| Agent | Activity | Output |
|-------|----------|--------|
| **Finance Tracker** | Revenue and unit economics review | CAC trend, LTV trend, channel ROI |
| **Trend Researcher** | Competitive intelligence update | New competitors? Market shifts? Pricing changes? |
| **Brand Guardian** | Brand consistency audit | Is messaging staying consistent across channels? |

### Optimization Loop

```
MEASURE (Analytics Reporter: what happened?)
    ↓
ANALYZE (Growth Hacker + Feedback Synthesizer: why?)
    ↓
PLAN (CEO + user: what to change?)
    ↓
EXECUTE (Platform agents: implement changes)
    ↓
MEASURE (back to start)
```

### Transition Back to Build Mode

If optimization reveals product issues:
- "Users love the concept but churn because [feature] is missing"
- "Conversion drops at onboarding because [UX issue]"
- "Competitors launched [feature] that we need to match"

The CEO surfaces these and suggests: "This is a product issue, not a marketing issue. Want me to switch to Build Mode to address [specific gap], then return to Growth Mode?"

---

## Agent Roster Summary

### Core Team (Always Active)
| Agent | Role in Growth Mode |
|-------|--------------------|
| Product Manager | Product-market fit, feature prioritization |
| Growth Hacker | Channel strategy, experiments, viral mechanics |
| Content Creator | Blog posts, scripts, social content |
| Brand Guardian | Positioning, brand consistency |
| Analytics Reporter | Metrics, dashboards, channel attribution |
| SEO Specialist | Organic search strategy |
| Finance Tracker | Unit economics, pricing, revenue tracking |

### Content Production Team (Wave 2-3)
| Agent | Role in Growth Mode |
|-------|--------------------|
| Frontend Developer | Website / landing page build |
| UX Architect | Website architecture, conversion optimization |
| Short-Video Editing Coach | Product demo videos (Remotion) |
| Visual Storyteller | Explainer / intro videos (Remotion) |
| App Store Optimizer | Mobile store listing (if applicable) |

### Distribution Team (Wave 3-4, select based on channels)
| Agent | Role in Growth Mode |
|-------|--------------------|
| Reddit Community Builder | Reddit presence |
| Twitter Engager | Twitter/X presence |
| LinkedIn Content Creator | LinkedIn presence |
| Xiaohongshu Specialist | Xiaohongshu presence |
| TikTok Strategist | TikTok content |
| Other platform agents | As needed per channel strategy |

### Paid Amplification (Optional, if budget allows)
| Agent | Role in Growth Mode |
|-------|--------------------|
| PPC Campaign Strategist | Search ads |
| Paid Social Strategist | Social ads |
| Ad Creative Strategist | Ad copy and creative |
| Tracking Specialist | Conversion tracking setup |

---

*Growth Mode is complete when the product has sustainable distribution channels producing predictable growth metrics. The CEO monitors Phase G6 cadences and suggests adjustments based on data.*
