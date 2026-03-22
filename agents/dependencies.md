# CEO Plugin — External Dependencies & Onboarding

> This document lists external skills and tools that CEO agents depend on. The CEO reads this during Planning to detect missing dependencies and guide the user through setup.

---

## Dependency Tiers

### Tier 1: REQUIRED (agents are broken without these)

#### impeccable — Design Quality System
**Used by:** 18 agents (UI Designer, UX Architect, Brand Guardian, Frontend Developer, Senior Developer, Code Reviewer, and more)
**What it does:** Provides design critique, visual polish, and UI quality assessment via 20+ specialized commands
**Install:**
```bash
# Visit https://impeccable.style for ready-to-use bundles, or:
git clone https://github.com/pbakaus/impeccable.git /tmp/impeccable
cp -r /tmp/impeccable/dist/claude-code/.claude/skills/* ~/.claude/skills/
rm -rf /tmp/impeccable
```
**Verify:** Run `/impeccable:audit` in Claude Code — if it responds with design guidance, it's working.
**Key commands agents use:** `/impeccable:critique`, `/impeccable:audit`, `/impeccable:polish`, `/impeccable:normalize`, `/impeccable:animate`, `/impeccable:colorize`, `/impeccable:typeset`, `/impeccable:arrange`

---

### Tier 2: HIGHLY RECOMMENDED (unlocks Growth Mode capabilities)

#### agent-reach — Web Browsing & Social Media Research
**Used by:** ~28 agents (all social media, marketing, research, compliance agents)
**What it does:** Gives agents eyes to browse 16+ platforms — Twitter, Reddit, YouTube, Xiaohongshu, Bilibili, Douyin, LinkedIn, and any web page
**Install:**
```bash
# Via Claude Code skill marketplace or manually:
# See https://github.com/Panniantong/Agent-Reach for instructions
```
**Verify:** Run `agent-reach doctor` in a terminal to check channel status.
**Zero-config channels:** Twitter/X, Reddit, YouTube, GitHub, Bilibili, V2EX, RSS, any web page (via Jina Reader)
**Requires setup:** Xiaohongshu (cookies), WeChat articles (Camoufox), Xiaoyuzhou podcasts (Groq API key)

#### Remotion — Programmatic Video Creation
**Used by:** ~8 agents (Short-Video Editing Coach, Visual Storyteller, Content Creator, Brand Guardian, Carousel Growth Engine, Whimsy Injector, Corporate Training Designer)
**What it does:** Creates videos from React code — product demos, intro videos, social media content, animated explainers, comparison videos
**Install:**
```bash
# Initialize a Remotion project in your workspace:
npx create-video@latest
# Select Blank template, enable TailwindCSS
npm install
```
**Verify:** Run `npm run dev` in the Remotion project — if the preview opens, it's working.
**Optional MCP servers for enhanced autonomy:**
- [Chuk-Motion](https://github.com/chrishayuk/chuk-mcp-remotion) — optimized for YouTube, TikTok, LinkedIn, Instagram formats
- [Remotion Media MCP](https://github.com/stephengpope/remotion-media-mcp) — generates images, videos, music, speech, subtitles
- [Auto-Director](https://glama.ai/mcp/servers/@naki0227/auto-cm-director) — autonomous promotional video creation

---

### Tier 3: USER-CONFIGURED (per project needs)

#### Social Media Publishing APIs
**Used by:** ~15 agents (all social platform agents, Content Creator, App Store Optimizer)
**What it does:** Allows agents to post content directly to platforms instead of just creating drafts

Each platform requires separate setup:

| Platform | API / Method | Setup |
|----------|-------------|-------|
| **Xiaohongshu** | agent-reach (mcporter) | Import cookies via Cookie-Editor extension |
| **TikTok** | Upload-Post API | Used by Carousel Growth Engine — see its docs |
| **Instagram** | Upload-Post API / Facebook Graph API | Used by Carousel Growth Engine — see its docs |
| **Twitter/X** | Twitter API v2 | Apply at developer.twitter.com, set bearer token |
| **Reddit** | Reddit API | Create app at reddit.com/prefs/apps |
| **LinkedIn** | LinkedIn Marketing API | Apply at linkedin.com/developers |
| **YouTube** | YouTube Data API v3 | Google Cloud Console → enable API → OAuth |
| **Bilibili** | Bilibili Upload API | Cookie-based auth |
| **Weibo** | Weibo Open Platform | Apply at open.weibo.com |
| **Douyin** | Douyin Open Platform | Apply at open.douyin.com |
| **WeChat OA** | WeChat Official Account API | Apply at mp.weixin.qq.com |
| **App Store** | App Store Connect API | Generate API key in App Store Connect |
| **Google Play** | Google Play Developer API | Service account in Google Cloud Console |

**Note:** When an agent needs to publish but the API isn't configured, it will produce the content as local files (markdown, images, video) and instruct the user to publish manually. It will also suggest setting up the API for future automation.

---

## How the CEO Uses This Document

During **Phase 2: Planning**, when the CEO identifies which agents are needed:

1. Check if the required dependencies for those agents are installed
2. If missing Tier 1 dependencies: **STOP** — tell user these must be installed first
3. If missing Tier 2 dependencies: **WARN** — tell user capabilities will be limited without them
4. If missing Tier 3 dependencies: **NOTE** — mention during pre-flight that publishing will require manual steps unless APIs are configured

The CEO should run these checks:
```bash
# Check impeccable
ls ~/.claude/skills/impeccable/ 2>/dev/null || echo "MISSING: impeccable"

# Check agent-reach
ls ~/.claude/skills/agent-reach/ 2>/dev/null || echo "MISSING: agent-reach"

# Check Remotion (project-level)
ls node_modules/remotion/ 2>/dev/null || echo "MISSING: Remotion (optional)"
```

---

## Dependency Matrix

| Agent Category | agent-reach | impeccable | Remotion | Publishing APIs |
|---------------|:-----------:|:----------:|:--------:|:--------------:|
| Social Media Agents (13) | ✅ | — | — | ✅ |
| Design Agents (7) | — | ✅ | ✅* | — |
| Frontend/UI Engineers (5) | — | ✅ | — | — |
| Marketing/Growth (6) | ✅ | — | ✅* | ✅ |
| Research/Intelligence (4) | ✅ | — | — | — |
| Content Production (3) | ✅ | — | ✅ | ✅ |
| Compliance/Security (3) | ✅ | — | — | — |
| Testing/QA (2) | — | ✅ | — | — |
| Video Production (3) | — | — | ✅ | — |

*Only agents that produce video/animated content
