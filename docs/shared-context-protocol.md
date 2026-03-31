# Shared Context Protocol

When multiple agents work in parallel (whether via teams or independent dispatch), they often duplicate discovery work — each agent independently figures out the same project facts. The shared context protocol prevents this.

## How It Works

1. **At workstream start**, the CEO creates a shared context file:
   ```
   ceo-projects/<project-name>/context/<workstream-slug>.md
   ```

2. **Each agent's prompt** includes the instruction to read and append to this file.

3. **Agents append discoveries** in the format:
   ```markdown
   - JWT tokens use RS256, not HS256 (discovered by Backend Architect)
   - Rate limit is 100 req/min per user, configured in nginx (discovered by Security Engineer)
   - Frontend expects /api/v2 prefix for all endpoints (discovered by Frontend Developer)
   ```

4. **Agents read before starting** to avoid re-discovering what a teammate already found.

## Rules

- **Create before spawning**: The context file MUST exist before any agent in the workstream starts.
- **Append only**: Agents append facts. They do not edit or remove existing entries.
- **Facts only**: The file contains discovered project facts, not opinions or plans.
- **Attribute discoveries**: Always include `(discovered by {role})` so other agents know the source.
- **One file per workstream** by default. For large workstreams, create topic-specific files (e.g., `api-contracts.md`, `env-config.md`).

## Template

```markdown
# Shared Context: <workstream-name>

## Project Facts
<!-- Agents: append discoveries below -->
<!-- Format: - {fact} (discovered by {your-role}) -->

## API Contracts
<!-- Endpoint definitions, request/response shapes, auth requirements -->

## Environment & Config
<!-- Env vars, ports, external service URLs, credentials locations -->
```

## In Team Mode vs. Standalone Mode

- **Team mode**: Shared context complements `SendMessage`. Use SendMessage for requests/questions between agents. Use the context file for passive fact sharing.
- **Standalone mode**: Shared context is the primary coordination mechanism since agents cannot message each other.
