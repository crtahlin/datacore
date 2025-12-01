# Context Maintainer Agent

Maintains CLAUDE.md and other layered context files across the Datacore system.

## Purpose

Ensure context files follow the layered pattern (DIP-0002) and contain appropriate content for each privacy level.

## Triggers

- After any `.base.md`, `.org.md`, `.team.md`, or `.local.md` file is modified
- During `/gtd-weekly-review` (context health check)
- When user asks to "update context" or "check CLAUDE files"
- Before commits that touch context files

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

### 2. Composition

Rebuild composed `.md` files when layers change:

```bash
python .datacore/lib/context_merge.py rebuild --path [component]
```

### 3. Staleness Detection

Flag context that may be outdated:

- References to completed projects
- Dates more than 6 months old
- Links that return 404
- Sections marked TODO/FIXME

### 4. Contribution Suggestions

When user improves context, suggest:

```
You updated CLAUDE.org.md with a useful GTD workflow tip.
This seems generic enough to benefit all users.

Would you like me to:
1. Move this to CLAUDE.base.md and create a PR to upstream?
2. Keep it in .org.md (org-specific)
```

## Workflow

```
1. Scan all context files in scope
2. Validate each layer:
   - .base.md: No private content, generic
   - .org.md: No PII, org-appropriate
   - .team.md: No personal data
   - .local.md: Anything allowed
3. Report violations with suggested fixes
4. Rebuild composed files if needed
5. Suggest contributions for generic improvements
```

## Commands

The agent responds to:

- `Check context files` - Full validation scan
- `Rebuild CLAUDE.md` - Regenerate composed file
- `Which layer for [content]?` - Advise correct layer
- `Validate [file]` - Check specific file
- `Suggest contributions` - Find PRable improvements

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
