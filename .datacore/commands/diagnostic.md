# Diagnostic

**"All hands, this is the bridge. Prepare for full systems diagnostic."**

Run a comprehensive diagnostic of all Datacore systems to verify installation health and operational status.

## Behavior

Execute a Level 1 diagnostic sequence, checking all primary and secondary systems. Report status using TNG-style terminology.

## Diagnostic Sequence

### 1. Primary Systems Check

**Core Matrix:**
- Verify `~/Data` exists and is accessible
- Check `.datacore/` directory structure
- Verify CLAUDE.md present at root

**Report format:**
```
PRIMARY SYSTEMS
---------------
Core Matrix.............. [OPERATIONAL/OFFLINE]
  - Root directory: [path]
  - .datacore config: [PRESENT/MISSING]
  - CLAUDE.md: [PRESENT/MISSING]
```

### 2. Repository Health

**Check git status for all repositories:**

| Repository | Location | Expected Remote |
|------------|----------|-----------------|
| datacore (root) | `~/Data/` | datacore-one/datacore |
| datafund-space | `~/Data/1-datafund/` | datacore-one/datafund-space |
| datacore-space | `~/Data/2-datacore/` | datacore-one/datacore-space |
| datacore-dips | `~/.datacore/dips/` | datacore-one/datacore-dips |
| trading (module) | `~/.datacore/modules/trading/` | datacore-one/datacore-trading |
| datacore-campaigns (module) | `~/.datacore/modules/datacore-campaigns/` | datacore-one/datacore-campaigns |

**Note:** All modules should be git repos linked to their upstream. Check for `.git` directory in each module.

**For each repo check:**
- Working tree status (clean/dirty)
- Uncommitted changes count
- Untracked files count
- Remote sync status (ahead/behind/up-to-date)

**Report format:**
```
REPOSITORY HEALTH
-----------------
Core Repos:
  datacore (root).......... [SYNCED/DIRTY/AHEAD/BEHIND]
    - Uncommitted: [count] files
    - Untracked: [count] files
    - Remote: [up-to-date/X commits ahead/X commits behind]

Space Repos:
  datafund-space........... [SYNCED/DIRTY/AHEAD/BEHIND]
    - Uncommitted: [count] files
    - Untracked: [count] files
    - Remote: [up-to-date/X commits ahead/X commits behind]

  datacore-space........... [SYNCED/DIRTY/AHEAD/BEHIND]
    - Uncommitted: [count] files
    - Untracked: [count] files
    - Remote: [up-to-date/X commits ahead/X commits behind]

System Repos:
  datacore-dips............ [SYNCED/DIRTY/AHEAD/BEHIND]
    - Remote: [up-to-date/X commits ahead/X commits behind]

Module Repos:
  trading.................. [SYNCED/DIRTY/AHEAD/BEHIND]
    - Remote: [up-to-date/X commits ahead/X commits behind]
  datacore-campaigns....... [SYNCED/DIRTY/AHEAD/BEHIND]
    - Remote: [up-to-date/X commits ahead/X commits behind]
```

### 3. Command Processors

**Check each command file in `.datacore/commands/`:**
- today.md
- gtd-daily-start.md
- gtd-daily-end.md
- gtd-weekly-review.md
- gtd-monthly-strategic.md
- diagnostic.md (this file)

**Report format:**
```
COMMAND PROCESSORS
------------------
/today................... [ONLINE/OFFLINE]
/gtd-daily-start......... [ONLINE/OFFLINE]
/gtd-daily-end........... [ONLINE/OFFLINE]
/gtd-weekly-review....... [ONLINE/OFFLINE]
/gtd-monthly-strategic... [ONLINE/OFFLINE]
/diagnostic.............. [ONLINE]
```

### 4. Agent Subsystems

**Check each agent file in `.datacore/agents/`:**
- ai-task-executor.md
- gtd-inbox-processor.md
- gtd-content-writer.md
- gtd-data-analyzer.md
- gtd-project-manager.md
- gtd-research-processor.md
- conversation-processor.md
- research-link-processor.md
- context-maintainer.md
- module-registrar.md
- landing-generator.md

**Report format:**
```
AGENT SUBSYSTEMS
----------------
ai-task-executor......... [STANDING BY/OFFLINE]
gtd-inbox-processor...... [STANDING BY/OFFLINE]
gtd-content-writer....... [STANDING BY/OFFLINE]
gtd-data-analyzer........ [STANDING BY/OFFLINE]
gtd-project-manager...... [STANDING BY/OFFLINE]
gtd-research-processor... [STANDING BY/OFFLINE]
conversation-processor... [STANDING BY/OFFLINE]
research-link-processor.. [STANDING BY/OFFLINE]
context-maintainer....... [STANDING BY/OFFLINE]
module-registrar......... [STANDING BY/OFFLINE]
landing-generator........ [STANDING BY/OFFLINE]
```

### 5. Global Infrastructure

**Check `.datacore/` contents:**

| Component | Path | Purpose |
|-----------|------|---------|
| DIPs | `.datacore/dips/` | Datacore Improvement Proposals |
| Specs | `.datacore/specs/` | System specifications |
| Modules | `.datacore/modules/` | Installed modules |
| Lib | `.datacore/lib/` | Utility scripts |

**Report format:**
```
GLOBAL INFRASTRUCTURE
---------------------
DIPs Repository.......... [PRESENT/MISSING] ([count] DIPs)
System Specs............. [PRESENT/MISSING] ([count] specs)
  - agent-output-pattern.md: [PRESENT/MISSING]
  - tagging-guidelines.md: [PRESENT/MISSING]
  - privacy-policy.md: [PRESENT/MISSING]
Global Modules........... [count] installed
  - trading: [PRESENT/MISSING]
  - datacore-campaigns: [PRESENT/MISSING]
Utility Library.......... [PRESENT/MISSING]
```

### 6. Space Diagnostics

**For each space, check DIP-0002 (Layered Context) and DIP-0003 (Scaffolding) compliance.**

**Note:** For detailed DIP-0002 validation (content layer correctness, privacy checks, staleness), invoke the `context-maintainer` agent separately.

#### Personal Space (0-personal/)

**Report format:**
```
PERSONAL SPACE (0-personal/)
----------------------------
Layered Context (DIP-0002):
  - CLAUDE.md: [PRESENT/MISSING]

GTD Core (org/).......... [OPERATIONAL/DEGRADED/OFFLINE]
  - inbox.org: [PRESENT/MISSING]
  - next_actions.org: [PRESENT/MISSING]
  - someday.org: [PRESENT/MISSING]
  - habits.org: [PRESENT/MISSING]

Agent Inbox (0-inbox/)... [PRESENT/MISSING]
Knowledge Base (notes/).. [OPERATIONAL/DEGRADED/OFFLINE]
Project Bay (code/)...... [OPERATIONAL/OFFLINE]
Content Array (content/). [OPERATIONAL/OFFLINE]
```

#### Team Spaces (1-datafund/, 2-datacore/, etc.)

**For each team space, check:**

1. **Layered Context (DIP-0002):**
   - CLAUDE.base.md (PUBLIC layer)
   - CLAUDE.space.md (SPACE layer)
   - CLAUDE.md (composed)

2. **Scaffolding (DIP-0003):**
   - SCAFFOLDING.base.md
   - SCAFFOLDING.space.md

3. **Folder Structure:**
   - 0-inbox/
   - 1-tracks/ (with _index.md)
   - 2-projects/ (with _index.md)
   - 3-knowledge/ (with _index.md)
   - 4-archive/
   - org/ (inbox.org, next_actions.org)
   - journal/
   - .datacore/

4. **Track Index Files:**
   - Check each track in 1-tracks/ has _index.md

**Report format:**
```
DATAFUND SPACE (1-datafund/)
----------------------------
Layered Context (DIP-0002):
  - CLAUDE.base.md: [PRESENT/MISSING]
  - CLAUDE.space.md: [PRESENT/MISSING]
  - CLAUDE.md: [PRESENT/MISSING]

Scaffolding (DIP-0003):
  - SCAFFOLDING.base.md: [PRESENT/MISSING]
  - SCAFFOLDING.space.md: [PRESENT/MISSING]

Folder Structure:
  - 0-inbox/: [PRESENT/MISSING]
  - 1-tracks/: [PRESENT/MISSING] ([count] tracks, [count] with _index.md)
  - 2-projects/: [PRESENT/MISSING] ([count] projects)
  - 3-knowledge/: [PRESENT/MISSING]
  - 4-archive/: [PRESENT/MISSING]
  - org/: [PRESENT/MISSING]
    - inbox.org: [PRESENT/MISSING]
    - next_actions.org: [PRESENT/MISSING]
  - journal/: [PRESENT/MISSING]
  - .datacore/: [PRESENT/MISSING]

Space Status: [OPERATIONAL/DEGRADED/OFFLINE]
```

Repeat for each team space (2-datacore/, etc.)

### 7. Module Status

**Check `.datacore/modules/` for installed modules:**

For each module, verify:
- CLAUDE.md present
- Required structure intact

**Report format:**
```
AUXILIARY MODULES
-----------------
Installed modules: [count]

trading:
  - CLAUDE.md: [PRESENT/MISSING]
  - commands/: [count] commands
  - agents/: [count] agents

datacore-campaigns:
  - CLAUDE.md: [PRESENT/MISSING]
  - scripts/: [PRESENT/MISSING]
  - agents/: [count] agents

Module bay: [READY/EMPTY]
```

### 8. Support Systems

**Check auxiliary files:**
- install.yaml
- sync script (executable)
- .gitignore

**Report format:**
```
SUPPORT SYSTEMS
---------------
System Manifest (install.yaml)... [PRESENT/MISSING]
Sync Protocol.................... [READY/OFFLINE]
Security Filters (.gitignore).... [ACTIVE/MISSING]
```

### 9. Final Assessment

**Summarize overall status:**

```
===============================
DIAGNOSTIC COMPLETE
===============================

Overall Status: [ALL SYSTEMS OPERATIONAL / MINOR ANOMALIES DETECTED / CRITICAL FAILURES]

Repository Status: [X/Y repos synced]
Space Status: [X/Y spaces operational]
DIP Compliance: [DIP-0002: X%, DIP-0003: X%]

[If issues found:]
Recommended Actions:
- [Action 1]
- [Action 2]

[If repos dirty:]
Uncommitted Changes:
- [repo]: [count] files need commit

[If all clear:]
"All stations report ready, Captain. The ship is yours."
```

## Status Definitions

| Status | Meaning |
|--------|---------|
| OPERATIONAL | Fully functional |
| ONLINE | Available and ready |
| STANDING BY | Agent ready for activation |
| READY | System prepared |
| ACTIVE | Currently engaged |
| PRESENT | File/directory exists |
| SYNCED | Git repo clean and up-to-date with remote |
| DIRTY | Git repo has uncommitted changes |
| AHEAD | Git repo has commits not pushed |
| BEHIND | Git repo needs to pull from remote |
| DEGRADED | Partially functional, some issues |
| OFFLINE | Not available |
| MISSING | Required component not found |

## Usage

Run this command:
- After initial installation
- When something seems wrong
- After significant system changes
- Before committing/pushing changes
- Periodically to verify health

## Output

Display the full diagnostic report in the terminal. Use monospace formatting for alignment.

If critical issues are found, provide specific remediation steps.

## Related Tools

| Tool | Purpose |
|------|---------|
| `context-maintainer` agent | Deep DIP-0002 validation (content, privacy, staleness) |
| `scaffolding-auditor` agent | Detailed DIP-0003 scaffolding gap analysis |
| `/gtd-weekly-review` | Runs context health check as part of review |

---

*"Diagnostics complete. Awaiting your orders."*
