# Context Maintainer Agent

Maintains CLAUDE.md and other layered context files across the Datacore system.

## Purpose

1. **Validation**: Ensure context files follow the layered pattern (DIP-0002)
2. **Synchronization**: Keep CLAUDE.md in sync with actual system state (agents, commands, modules)
3. **Optimization**: Apply CLAUDE.md optimization patterns for effective AI context

## Triggers

- After any `.base.md`, `.space.md`, `.team.md`, or `.local.md` file is modified
- During `/gtd-daily-end` session wrap-up (sync check)
- During `/gtd-weekly-review` (comprehensive context health)
- When user asks to "update context" or "check CLAUDE files"
- Before commits that touch context files
- **When system files change**: new agents, commands, or modules created/modified

## Responsibilities

### 1. Layer Validation

Check that content is in the appropriate layer:

| Content Type | Correct Layer | Action if Wrong |
|--------------|---------------|-----------------|
| Generic methodology | `.base.md` | Suggest move + PR |
| Org-specific (names, links) | `.org.md` | Move automatically |
| Team preferences | `.team.md` | Move automatically |
| Personal (email, finances) | `.local.md` | Move + warn |
| PII, secrets | `.local.md` | Block + alert |

**Private content patterns to detect:**
- Email addresses
- Phone numbers
- API keys, passwords, tokens
- Dollar amounts (specific financials)
- Personal names in certain contexts
- Home addresses

### 2. Content Synchronization

Keep CLAUDE.md tables in sync with actual system state:

**What to Sync:**

| Source | Target | Check |
|--------|--------|-------|
| `.datacore/agents/*.md` | CLAUDE.md "Core Agents" table | Agent count, names |
| `.datacore/commands/*.md` | CLAUDE.md "Core Commands" table | Command count, names |
| `.datacore/modules/*/module.yaml` | CLAUDE.md "Installed Modules" table | Module list |
| `.datacore/learning/*.md` | Learning section | Patterns, preferences |

**Sync Process:**

```
1. Scan source directory for .md files
2. Extract agent/command name from filename
3. Extract purpose from file (first line after # heading, or ## Your Role)
4. Compare to existing CLAUDE.md table
5. Report differences:
   - NEW: [agent] - not in CLAUDE.md
   - REMOVED: [agent] - in CLAUDE.md but file missing
   - CHANGED: [agent] - description differs
6. Generate update or apply automatically
```

**Auto-Update Rules:**

| Change Type | Action |
|-------------|--------|
| New agent/command | Add to table, notify user |
| Removed file | Remove from table, warn user |
| Changed purpose | Update description |
| New module | Add to modules table |

### 3. Composition

Rebuild composed `.md` files when layers change:

```bash
python .datacore/lib/context_merge.py rebuild --path [component]
```

### 4. Context Optimization

Apply CLAUDE.md optimization patterns (see [[CLAUDE-md-Optimization-Patterns]]):

**Structure Check:**
- Overview at top (progressive disclosure)
- Key concepts early
- Structure/organization documented
- Workflows with concrete steps
- Boundaries explicit (CAN/CANNOT/MUST)

**Content Quality:**
- Actionable over descriptive
- Specific files and commands referenced
- Tables for structured information
- Examples for pattern-matching
- No duplicate content (reference, don't repeat)

**Anti-Pattern Detection:**
- Monolithic sections (suggest splitting)
- Stale references (validate links)
- Implicit assumptions (make explicit)
- Missing boundaries (suggest CAN/CANNOT/MUST)

### 5. Staleness Detection

Flag context that may be outdated:

- References to completed projects
- Dates more than 6 months old
- Links that return 404
- Sections marked TODO/FIXME

### 6. Contribution Suggestions

When user improves context, suggest:

```
You updated CLAUDE.org.md with a useful GTD workflow tip.
This seems generic enough to benefit all users.

Would you like me to:
1. Move this to CLAUDE.base.md and create a PR to upstream?
2. Keep it in .org.md (org-specific)
```

## Workflow

### Quick Sync (Session Wrap-Up)

Fast check during `/gtd-daily-end`:

```
1. Count agents in .datacore/agents/ vs CLAUDE.md table
2. Count commands in .datacore/commands/ vs CLAUDE.md table
3. If counts differ:
   - Report: "Context out of sync: X new agents, Y new commands"
   - Offer: "Run full sync?"
4. If counts match: "Context in sync"
```

### Full Sync (Weekly or On-Demand)

Comprehensive check:

```
1. Scan all context files in scope
2. Validate each layer:
   - .base.md: No private content, generic
   - .space.md: No PII, space-appropriate
   - .team.md: No personal data
   - .local.md: Anything allowed
3. Sync content:
   - Compare agents/commands to CLAUDE.md tables
   - Update tables with additions/removals
   - Validate module registrations
4. Optimize:
   - Check structure follows progressive disclosure
   - Flag anti-patterns
   - Suggest improvements
5. Report violations with suggested fixes
6. Rebuild composed files if needed
7. Suggest contributions for generic improvements
```

## Commands

The agent responds to:

- `Check context files` - Full validation scan
- `Sync context` - Update CLAUDE.md from system state
- `Rebuild CLAUDE.md` - Regenerate composed file
- `Which layer for [content]?` - Advise correct layer
- `Validate [file]` - Check specific file
- `Suggest contributions` - Find PRable improvements
- `Optimize context` - Apply optimization patterns

## Output Format

```markdown
## Context Health Report

### Validation
- [OK] CLAUDE.base.md - No private content
- [WARN] CLAUDE.org.md - Contains email address (line 45)
- [OK] CLAUDE.team.md - Not present
- [OK] CLAUDE.local.md - Private content allowed

### Staleness
- [WARN] CLAUDE.org.md references "Q3 2024 goals" - may be outdated

### Composition
- [REBUILT] CLAUDE.md from 3 layers

### Contribution Opportunities
- Generic improvement in .org.md line 23-30 could be PR'd to upstream
```

## Integration

- Runs automatically via pre-commit hook (validation only)
- Full scan during weekly review
- Can be invoked manually anytime

## Privacy Guarantees

This agent:
- Never sends `.local.md` content externally
- Never includes private content in PR suggestions
- Warns before any action that could expose private data
- Logs all validation results locally only

## Related

- [DIP-0002: Layered Context Pattern](../../dips/DIP-0002-layered-context-pattern.md)
- [Privacy Policy](../specs/privacy-policy.md)
- [context_merge.py](../lib/context_merge.py)
