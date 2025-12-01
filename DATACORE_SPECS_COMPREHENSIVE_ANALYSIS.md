# Datacore Specifications and DIPs - Comprehensive Analysis

**Analysis Date**: December 1, 2025
**Total Items Analyzed**: 1 Core Specification + 4 DIPs + 6 Architecture Documents

---

## 1. CORE SPECIFICATION

### Datacore Specification v1.3

**Location**: `/Users/gregor/Data/.datacore/specs/datacore-specification.md`

**Purpose**: 
Defines a modular, multi-space AI second brain system inspired by Star Trek's Data. Provides the complete blueprint for a personal/organizational knowledge management and task execution system.

**Key Requirements**:

#### Core Philosophy
- **Data** = AI agent/advisor (second brain)
- **Datacore** = Framework and configuration system  
- **~/Data** = Centralized knowledge repository
- Guiding principles: "Augment, don't replace" | "Progressive processing" | "Cognitive offloading" | "Memory augmentation" | "Personalization"

#### System Architecture
- **Modular design**: Core + installable modules (GTD, trading, comms)
- **Multi-space support**: Personal + unlimited team/project spaces
- **AI-first**: Built for Claude Code and autonomous agents
- **Git-native**: Everything version controlled, fully reproducible
- **File-based**: Text files, no databases, works with Obsidian/any editor
- **Zettelkasten methodology**: Atomic notes, progressive summarization, emergent connections

#### Repository Hierarchy
```
Level 0: Framework (Public)
  └── datacore-one/datacore

Level 1: Modules (Public)
  ├── datacore-one/datacore-gtd
  ├── datacore-one/datacore-trading
  └── datacore-one/datacore-comms

Level 2: User Fork (Private)
  └── [user]/datacore

Level 3: Spaces (Team repos)
  ├── datafund/space
  └── [org]/space

Level 4: Projects (Gitignored)
  ├── datafund/verity
  └── [project]
```

#### Two Dimensions of a Space
Every space has:

1. **SYSTEM LAYER** (Methodology - Shareable)
   - `.datacore/` - agents, commands, modules, config, specs
   - `org/` - task management (inbox.org, next_actions.org)
   - **Purpose**: Defines HOW work gets done
   - **Tracking**: Contributable upstream

2. **KNOWLEDGE LAYER** (Content - Private)
   - `notes/` - journals, pages, zettel, literature
   - `content/` - generated content (blog, reports)
   - **Purpose**: Contains WHAT you know
   - **Tracking**: Never tracked, stays local

#### Personal Space Structure
```
0-personal/
├── org/
│   ├── inbox.org (single capture point)
│   ├── next_actions.org (GTD next actions)
│   ├── someday.org (future items)
│   └── habits.org (habit tracking)
├── notes/
│   ├── journals/ (YYYY-MM-DD.md)
│   ├── pages/ (wiki pages)
│   ├── 0-inbox/ (fleeting notes)
│   ├── 1-active/ (living documents)
│   ├── 2-knowledge/
│   │   ├── zettel/ (atomic notes)
│   │   ├── literature/ (source notes)
│   │   └── reference/ (quick ref)
│   └── 3-archive/
├── code/ (projects)
└── content/ (outputs)
```

#### Team Space Structure
```
[N]-[name]/
├── org/
│   ├── inbox.org
│   └── next_actions.org
├── journal/ (team daily log YYYY-MM-DD.md)
├── 0-inbox/ (unprocessed)
├── 1-tracks/ (ACTIVE WORK)
│   ├── ops/
│   ├── product/
│   ├── dev/
│   ├── research/
│   └── comms/
├── 2-projects/ (code repos - gitignored)
├── 3-knowledge/
│   ├── topics/
│   ├── zettel/
│   ├── literature/
│   └── reference/
└── 4-archive/
```

#### Knowledge Layer (Zettelkasten)
- **Atomicity**: Each note captures one concept
- **Connectivity**: Notes link to related notes
- **Emergence**: Structure emerges from connections
- **Progressive summarization**: Layer highlights for different reading depths

Note types:
- **Fleeting** (`0-inbox/`) - Quick captures
- **Literature** (`literature/`) - Source summaries with 3-layer progressive summarization
- **Permanent/Zettel** (`zettel/`) - Atomic concepts
- **Topic** (`topics/`) - Aggregated insights
- **Reference** (`reference/`) - People, companies, glossary
- **Index** (Various) - Entry points, maps of content (MOCs)

#### System Layer - Task Management (GTD)

**Core Files**:
| File | Purpose | Process to Zero |
|------|---------|----------------|
| `inbox.org` | Single capture point | Yes, daily |
| `next_actions.org` | Actionable tasks by context | No |
| `someday.org` | Ideas and future projects | No, review monthly |

**GTD Workflow**:
1. CAPTURE - Everything to inbox.org
2. CLARIFY - What is it? Is it actionable? What's the next physical action?
3. ORGANIZE - Route to destination (actionable → next_actions, ref → knowledge, future → someday, delegate → :AI: tag, trash → delete)
4. REFLECT - Daily inbox review, weekly system review
5. ENGAGE - Work from next_actions by context

**Task States**:
- `TODO` - To be done (default)
- `NEXT` - Immediate focus (3-5 max)
- `WAITING` - Blocked, waiting on someone/something
- `DONE` - Completed

**AI Task Delegation** - Tag tasks with `:AI:` to delegate:
| Tag | Agent | Output |
|-----|-------|--------|
| `:AI:` | ai-task-executor routes | Varies |
| `:AI:research:` | gtd-research-processor | Literature notes, zettels |
| `:AI:content:` | gtd-content-writer | Blog posts, emails, docs |
| `:AI:data:` | gtd-data-analyzer | Reports, metrics, insights |
| `:AI:pm:` | gtd-project-manager | Status reports, blockers |

**Daily Rhythm** (Automated + Interactive):

Morning:
- 06:00 `/today` (cron) - Generates daily briefing
- 09:00 `/gtd-daily-start` (interactive) - Reviews AI work, sets priorities

Evening:
- 17:00 `/gtd-daily-end` (interactive) - Processes inbox, delegates to AI
- 18:00 `/tomorrow` (interactive) - Syncs repos, runs diagnostics

Weekly:
- Friday 16:00 `/gtd-weekly-review` (interactive)

Monthly:
- Last Friday `/gtd-monthly-strategic` (interactive)

**Weekly Review** (System heartbeat):
1. Review accomplishments
2. Review AI delegation effectiveness
3. Process inbox to zero
4. Review all work areas by category
5. Follow up on WAITING items (>7 days)
6. Review all projects
7. Review someday/maybe
8. Check habit completion rates
9. Preview next week's deadlines
10. Set Top 3 priorities
11. System reflection
12. Weekly gratitude

#### System Layer - Agents & Commands

**Commands** (Interactive, user-initiated):
- Automatable
- Idempotent
- Self-contained
- Composable
- Observable (output to files)

**Command Resolution Priority**:
1. Space custom: `[N]-[name]/.datacore/commands/`
2. Space modules: `[N]-[name]/.datacore/modules/*/commands/`
3. Personal custom: `0-personal/.datacore/commands/`
4. Personal modules: `0-personal/.datacore/modules/*/commands/`
5. Root custom: `.datacore/commands/`
6. Root modules: `.datacore/modules/*/commands/`

**Agents** (Autonomous, background processing):
- Triggered by `:AI:` tags in tasks
- Route through `ai-task-executor`
- Output pattern: `[space]/0-inbox/[type]-[YYYY-MM-DD]-[name].md`
- Types: `report-`, `draft-`, `research-`, `analysis-`, `summary-`

#### External Services Principle

**Datacore is the brain. External services are hands.**

```
DATACORE (Orchestrator)
  1. Maintains best context (RAG, PKM, history)
  2. Delegates execution to specialized services
  3. Receives all results back
  4. Stores artifacts in knowledge base
  5. Extracts zettels, updates learning
```

External services: PostHog, n8n, Gamma, Figma (via MCP)

**Core rules**:
1. Datacore has best context
2. All artifacts return to Datacore
3. Published content is knowledge
4. Feedback loop is mandatory

#### Modules

**Structure**:
```
datacore-[name]/
├── module.yaml (manifest)
├── CLAUDE.md (AI context)
├── commands/
├── agents/
├── prompts/
├── workflows/
└── templates/
```

**Manifest format** (module.yaml):
```yaml
name: gtd
version: 1.0.0
description: Getting Things Done methodology
author: datacore
repository: https://github.com/datacore-one/datacore-gtd

dependencies:
  - core@>=1.0.0

provides:
  commands:
    - gtd-daily-start
    - gtd-daily-end
  agents:
    - gtd-inbox-processor
```

**Built-in vs Optional**:
- Built-in: Core functionality, GTD methodology, core agents
- Optional: Trading workflows, communications, DevOps

#### Configuration

**install.yaml** (System Manifest):
```yaml
meta:
  name: "User's Datacore"
  root: ~/Data
  version: 1.0.0

modules:
  - repo: datacore-one/datacore-gtd
    path: .datacore/modules/gtd

personal:
  modules:
    - repo: datacore-one/datacore-trading
      path: 0-personal/.datacore/modules/trading

spaces:
  datafund:
    repo: datafund/space
    path: 1-datafund
    modules:
      - repo: datacore-one/datacore-comms
```

**Sync Script**:
```bash
./sync          # Pull all repos
./sync push     # Commit and push all
./sync status   # Show status
```

#### Git & Contribution

**Privacy & Data Classification**:
| Level | Description | Example |
|-------|-------------|---------|
| PUBLIC | In repo, shareable | Agents, commands, specs |
| TEAM | Within team spaces | Space content |
| PRIVATE | Never leaves machine | Journals, personal notes |

**Gitignore pattern**:
```gitignore
# Knowledge Layer (private)
**/*.org
**/journals/
**/pages/
**/*.db
install.yaml
CLAUDE.md

# Team spaces (separate repos)
/[1-9]-*/

# Modules (cloned on install)
.datacore/modules/
```

**Contributing workflow**:
```
1. IDENTIFY IMPROVEMENT
   While using Datacore, improve an agent/command

2. ISOLATE CHANGE
   The improvement is in .datacore/ (System Layer)
   Not in notes/ or org/ (Knowledge Layer)

3. SUBMIT UPSTREAM
   Create PR to datacore-one/datacore or module repo

4. COMMUNITY BENEFITS
   All users get improvement
   Your personal data remains private
```

#### Integrations

**Supported**:
| Source | Integration Type |
|--------|------------------|
| GitHub | Native via `gh` CLI |
| Notion | Link index, API sync (planned) |
| Google Docs/Drive | Link index, manual import |
| Figma | Link index, MCP tool |
| Linear/Jira | Link index, API sync (planned) |
| Readwise | Auto-sync to literature/ (planned) |
| Email/Telegram | Capture to inbox (via n8n) |

**n8n Workflow Bridges**:
```
Notion webhook    → notion-sync       → knowledge/
Email forward     → email-capture     → 0-inbox/
Telegram bot      → telegram-capture  → 0-inbox/
Readwise API      → readwise-sync     → literature/
Calendar          → calendar-digest   → journal/
```

**Current Status**: v1.3.0 (2025-12-01)
- Core specification complete and implemented
- GTD methodology fully specified
- Agent architecture defined
- Command resolution system specified

---

## 2. DATACORE IMPROVEMENT PROPOSALS (DIPs)

### DIP-0000: DIP Template

**Location**: `/Users/gregor/Data/.datacore/dips/DIP-0000-template.md`

**Type**: Process | **Status**: Implemented | **Created**: 2025-12-01

**Purpose**: Establishes the template and standardized format for all future DIPs.

**Key Requirements**:

- **DIP Sections**:
  1. Summary (one paragraph)
  2. Motivation (why needed, problems solved, use cases)
  3. Specification (technical details, implementation guide)
     - Changes Required
     - New Components
     - Interface Changes
  4. Rationale (why this design, alternatives considered, rejections)
  5. Backwards Compatibility (breaking changes, migration path)
  6. Security Considerations (security/privacy implications)
  7. Implementation (reference implementation, rollout plan)
  8. Open Questions (unresolved issues)
  9. References (related discussions, prior art)

- **DIP Types**:
  | Type | Description |
  |------|-------------|
  | Core | Changes to main datacore repo |
  | Org | Changes to datacore-org template |
  | Module | New module proposals or standards |
  | Process | Changes to DIP process itself |

- **DIP Status Workflow**:
  ```
  Draft → Review → Accepted → Implemented
            ↓
         Rejected
  ```

- **DIP Assignment**: Maintainers assign DIP numbers sequentially

---

### DIP-0001: Contribution Model

**Location**: `/Users/gregor/Data/.datacore/dips/DIP-0001-contribution-model.md`

**Type**: Process | **Status**: Implemented | **Created**: 2025-12-01

**Purpose**: 
Defines the repository structure and contribution model enabling thousands of users to improve Datacore while keeping their content private.

**Key Requirements**:

#### Repository Types

**Public Template Repos** (Forkable, Contributable):
- `datacore` - Personal space framework
- `datacore-org` - Organization space template
- `datacore-[module]` - Domain modules

**Private Content Repos** (Per-user/org):
- Content stays local, gitignored
- Or in private repo if team sync needed

#### Contribution Flow

```
1. User forks template repo (e.g., datacore-org)
2. User clones fork to ~/Data/N-orgname/
3. User works - content is auto-gitignored
4. User improves agent/command/structure
5. User commits system files to fork
6. User opens PR to upstream
7. Maintainers review and merge
8. All users get improvement via git pull
```

#### .gitignore Structure

Template repos track (contributable):
- `.datacore/agents/*.md`
- `.datacore/commands/*.md`
- `CLAUDE.md` / `CLAUDE.template.md`
- `*/_index.md`, `*/README.md`
- Folder structure

Template repos ignore (stays local):
- `org/*.org` (tasks)
- `journal/*.md` (activity)
- `*-knowledge/**/*.md` (knowledge)
- `*-departments/**/*.md` (work)
- `*.db` (databases)

#### Upstream Sync

```bash
git remote add upstream https://github.com/datacore-one/datacore-org.git
git fetch upstream
git merge upstream/main
```

#### Significant Changes: DIP Process

For non-trivial changes:
1. Submit DIP
2. Community discussion
3. Maintainer review
4. Accept/Reject
5. Implementation

#### Migration Path

For existing spaces:
```bash
cd ~/Data/N-space/

# Fetch updated .gitignore
git fetch origin
git checkout origin/main -- .gitignore

# Remove content from tracking (keeps local files)
git rm -r --cached org/*.org
git rm -r --cached journal/*.md
git rm -r --cached 2-knowledge/

git commit -m "Migrate to overlay contribution model"
```

**Status**: 
- Updated `.gitignore` in datacore-org: Implemented
- DIP process in datacore: This DIP
- INSTALL.md updates: In progress
- CATALOG.md updates: In progress

---

### DIP-0002: Layered Context Pattern

**Location**: `/Users/gregor/Data/.datacore/dips/DIP-0002-layered-context-pattern.md`

**Type**: Core | **Status**: Implemented | **Created**: 2025-12-01

**Purpose**: 
Universal pattern for managing context files (CLAUDE.md, agents, commands) with three layers: PUBLIC, SPACE, and PRIVATE. Facilitates contributions while protecting privacy.

**Key Requirements**:

#### Core Layers

| Level | Suffix | Visibility | Git Tracking | PR Target |
|-------|--------|------------|--------------|-----------|
| PUBLIC | `.base.md` | Everyone | Tracked | Upstream repo |
| SPACE | `.space.md` | Space members | Tracked in space repo | None |
| PRIVATE | `.local.md` | Only user | Never | None |

**Future Layer (Reserved)**:
| Level | Suffix | Visibility | Git Tracking | PR Target |
|-------|--------|------------|--------------|-----------|
| TEAM | `.team.md` | Team members | Optional | Team repo |

#### File Structure

```
[component]/
├── [NAME].base.md    # PUBLIC - generic template (tracked upstream)
├── [NAME].space.md   # SPACE - space customizations (tracked in space)
├── [NAME].local.md   # PRIVATE - personal notes (gitignored)
└── [NAME].md         # Composed output (gitignored)
```

#### Composition

```
[NAME].base.md    # Layer 1: System defaults (PUBLIC)
  + [NAME].space.md # Layer 2: Space customizations (SPACE)
  + [NAME].local.md # Layer 3: Personal notes (PRIVATE)
  ─────────────────
  = [NAME].md       # Output: Complete context
```

**Merge behavior**:
- Add sections - New headers appended
- Extend sections - Content under same header concatenated
- Override values - Specific key-value patterns overwritten

#### Applied Components

| Component | Base Location | Example |
|-----------|---------------|---------|
| System context | `datacore/CLAUDE.base.md` | GTD methodology |
| Org template | `datacore-org/CLAUDE.base.md` | Org structure |
| Space context | `space/CLAUDE.base.md` | Space overview |
| Module context | `modules/[name]/CLAUDE.base.md` | Trading rules |
| Agent definition | `agents/[name].base.md` | Agent prompt |
| Command definition | `commands/[name].base.md` | Command prompt |

#### Gitignore Pattern

```gitignore
# Private layer - never tracked
*.local.md

# Composed output - generated at runtime
CLAUDE.md

# PUBLIC and SPACE layers are tracked:
# *.base.md   (tracked - PRable to upstream)
# *.space.md  (tracked in space repo)
```

#### Contribution Flow

```
User improves something
        │
        ├─► Generic improvement ──► Edit .base.md ──► PR to upstream
        │
        ├─► Space-specific ──► Edit .space.md ──► Commit to space repo
        │
        └─► Personal ──► Edit .local.md ──► Stays local
```

#### Merge Utility

```python
# .datacore/lib/context_merge.py

def merge_context(component_path: str, name: str = "CLAUDE") -> str:
    """Merge layered context files into single output."""
    layers = [
        f"{name}.base.md",   # PUBLIC
        f"{name}.space.md",  # SPACE
        f"{name}.local.md",  # PRIVATE
    ]
    
    content = []
    for layer in layers:
        path = component_path / layer
        if path.exists():
            content.append(f"<!-- Layer: {layer} -->\n")
            content.append(path.read_text())
            content.append("\n")
    
    return "".join(content)
```

#### Commands

```bash
datacore context rebuild              # Regenerate all composed files
datacore context rebuild --path .datacore/modules/trading
datacore context validate             # Validate no private content in PUBLIC
datacore context trace "Position Sizing"  # Show which layer
```

#### Security Validation

**Private Content Patterns** (blocked in PUBLIC layer):
```regex
# Personal identifiers
/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/  # Email
/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/  # Phone

# Secrets
/api[_-]?key|password|secret|token/i

# Financial
/\$[\d,]+\.\d{2}/  # Dollar amounts
```

#### Implementation Status

**Phase 1: Core Pattern** - Complete
- [x] Create `context_merge.py` utility
- [x] Update `.gitignore` templates
- [x] Create pre-commit hooks

**Phase 2: Apply to Repos** - Complete
- [x] Update `datacore` repo
- [x] Update `datacore-org` template

**Phase 3: Tooling** - In Progress
- [ ] Add `datacore context` CLI commands
- [x] Create pre-commit hooks
- [x] Add CI validation workflow

**Phase 4: Documentation** - Planned
- [ ] Update INSTALL.md
- [ ] Update CONTRIBUTING.md

#### Backwards Compatibility

Migration from current pattern:
| Current | New |
|---------|-----|
| `CLAUDE.template.md` | `CLAUDE.base.md` |
| `CLAUDE.md` (local) | `CLAUDE.local.md` |

Migration script provided in implementation.

---

### DIP-0003: Scaffolding Pattern

**Location**: `/Users/gregor/Data/.datacore/dips/DIP-0003-scaffolding-pattern.md`

**Type**: Standard | **Status**: Draft | **Created**: 2025-12-01

**Purpose**: 
Define standardized scaffolding pattern specifying foundational documents every organization needs, apply layered context to scaffolding, and treat projects as complete modules containing code and documentation.

**Key Requirements**:

#### Scaffolding Layers (DIP-0002)

```
space/
├── SCAFFOLDING.base.md     # PUBLIC - generic template
├── SCAFFOLDING.space.md    # SPACE - space-specific additions
├── SCAFFOLDING.local.md    # PRIVATE - personal tracking (gitignored)
└── SCAFFOLDING.md          # Composed - status tracking (gitignored)
```

**SCAFFOLDING.base.md** (upstream template):
- Defines universal document categories
- Lists expected documents with paths and purposes
- Provides templates/stubs for each document type
- Updated via PRs when teams discover new required docs

**SCAFFOLDING.space.md** (space customization):
- Adds space-specific document types
- Tracks document status (exists/missing/draft)
- Contains space-specific projects and their docs

**SCAFFOLDING.md** (composed output):
- Generated by context_merge.py
- Used by scaffolding-auditor agent
- Shows complete picture with status

#### Document Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **Identity** | Who we are | Purpose, Vision, Mission, Values, Principles |
| **Strategy** | Where we're going | Strategy, Positioning, North Star Metric |
| **Brand** | How we present | Brand Guidelines, Voice & Tone, Glossary |
| **Sensing** | What we're watching | Competitor Map, Market Landscape, Trend Radar |
| **Memory** | What we know | Zettelkasten structure, Literature notes, Reference |
| **Reasoning** | How we think | Analysis frameworks, Decision templates |
| **Action** | How we execute | Playbooks, Processes, Standards, Templates |
| **Learning** | How we improve | Feedback capture, Retrospectives, Experiments |
| **Coordination** | How we align | Communication channels, Rhythms, Handoffs |
| **Metrics** | How we measure | North Star, Health metrics, OKRs |

#### Project Module Structure

Projects are complete modules containing code AND documentation:

```
project-name/
├── CLAUDE.md               # Project context (layered)
├── README.md               # Standard readme
├── CANVAS.md               # Project canvas/charter
├── ROADMAP.md              # Project-specific roadmap
├── IMPLEMENTATION.md       # Technical implementation plan
├── CHANGELOG.md            # Version history
│
├── docs/                   # Project documentation
│   ├── architecture.md     # Technical architecture
│   ├── api.md              # API documentation
│   └── setup-guide.md      # Getting started
│
├── .datacore/              # Datacore integration
│   ├── module.yaml         # Module metadata
│   └── agents/             # Project-specific agents
│
└── src/                    # Source code
```

**Required project documents**:
| Document | Purpose | Required |
|----------|---------|----------|
| `README.md` | Project overview | Yes |
| `CLAUDE.md` | AI context | Yes |
| `CANVAS.md` | Project charter (why, what, who, when) | Yes |
| `ROADMAP.md` | Feature/milestone roadmap | Recommended |
| `IMPLEMENTATION.md` | Technical plan | Recommended |
| `docs/setup-guide.md` | Getting started | Yes |

#### Symlinks for Cross-Reference

When project docs need to appear in space folders:

```bash
# In space's 1-tracks/product/roadmaps/
ln -s ../../../2-projects/verity/ROADMAP.md verity-roadmap.md
```

The `space-initializer` agent generates these symlinks based on configuration.

#### New Components

**SCAFFOLDING.base.md Template**:
- Defines universal document categories
- Lists expected documents with paths and purposes
- Provides templates/stubs for each document type

**space-initializer Agent**:
Triggers on new space creation. Actions:
1. Copy SCAFFOLDING.base.md from datacore-org
2. Generate stub files for all required documents
3. Create project folder structure
4. Generate symlinks per configuration
5. Mark all docs as `status: stub` in SCAFFOLDING.space.md

**scaffolding-auditor Agent**:
Runs weekly or on-demand. Actions:
1. Read composed SCAFFOLDING.md
2. Check existence of all listed documents
3. Update status (missing/stub/draft/reviewed/published)
4. Report coverage metrics
5. Flag documents needing human review
6. Suggest missing document types based on usage patterns

#### Contribution Workflow

When a team discovers a missing document type:

```
1. DISCOVER GAP
   Team realizes they need a document type not in scaffolding

2. CREATE DOCUMENT
   Team creates their space-specific version

3. PROPOSE TO SCAFFOLDING
   PR to datacore-org adding document type to SCAFFOLDING.base
   Includes: path pattern, purpose, template/stub

4. OPTIONAL: CREATE MODULE
   If document has reusable content, create a module
```

#### Implementation Phases

**Phase 1: Template Creation** - Planned
1. Create SCAFFOLDING.base.md in datacore-org
2. Create document templates/stubs
3. Update DIP-0002 to reference scaffolding

**Phase 2: Agent Implementation** - Planned
1. Implement space-initializer agent
2. Implement scaffolding-auditor agent
3. Test with 2-datacore space

**Phase 3: Migration** - Planned
1. Generate SCAFFOLDING.space.md for existing spaces
2. Add missing project docs as stubs
3. Document contribution workflow

#### Backwards Compatibility

- Existing spaces without scaffolding continue to work
- `scaffolding-auditor` can generate initial SCAFFOLDING.space.md from existing structure
- Projects without standard docs get warnings, not errors

#### Open Questions

1. Should scaffolding coverage be a space health metric?
2. How to handle documents that span multiple categories?
3. Should there be a "minimum viable scaffolding" for quick starts?

**Current Status**: Draft (not yet implemented)

---

## 3. ARCHITECTURE DOCUMENTS

### AI Assistant MCP Architecture

**Location**: `/Users/gregor/Data/2-datacore/1-tracks/dev/architecture/AI-Assistant-MCP-Architecture.md`

**Purpose**: Design for local-first, privacy-focused AI assistant using Docker's MCP Gateway.

**Key Specifications**:

#### Core Architecture

```
[Claude/AI] ↔ [MCP Gateway] ↔ [Multiple MCP Servers]
                        ├── Org Mode MCP (Tasks/Projects)
                        ├── Obsidian MCP (Notes/Knowledge)
                        ├── Finance MCP (Sensitive Data)
                        ├── Automation MCP (Actions/Outputs)
                        └── Knowledge Graph MCP (Cross-references)
```

#### Key Design Principles

1. **Privacy-First** - Encrypt sensitive data, even locally
2. **Separation of Concerns** - Different MCP servers for different trust levels
3. **Audit Everything** - Comprehensive logging of AI access
4. **Progressive Enhancement** - Start local, optionally move to server
5. **Tool Specialization** - Each tool does what it does best

#### System Components

1. **Task Management Layer** (Org Mode)
   - Location: `~/org/`
   - Features: TODO management, agenda views, time tracking, project hierarchies
   - MCP Access: Read/write tasks, limited access to sensitive properties

2. **Knowledge Management Layer** (Obsidian)
   - Location: `~/Documents/ObsidianVault/`
   - Structure: Public/ | Private/ | Sensitive/
   - MCP Access: Existing Obsidian MCP with path-based permissions

3. **Intelligence Layer** (SQLite)
   - Databases: org.db, knowledge-graph.db, finance.db.enc (encrypted)
   - MCP Access: Read-only for queries, write for caching

4. **Security Layer**
   - Audit Logging: All AI actions with timestamps
   - Permission System: Session-based, scoped access
   - Encryption: SQLCipher for sensitive databases
   - Data Classification:
     - Public: Task titles, project names
     - Private: Task bodies, meeting notes
     - Sensitive: Financial data, passwords
     - Critical: API keys, auth tokens

#### Directory Structure

```
~/ai-assistant/
├── data/
│   ├── org/                 # Symlink to ~/org
│   ├── vault/               # Encrypted sensitive data
│   ├── cache/               # SQLite indexes
│   └── logs/                # Audit logs
├── mcp-servers/
│   ├── org-mode/            # Custom built
│   ├── finance/             # Custom built
│   └── automation/          # Custom built
├── staging/                 # AI-generated content for review
└── docker/
    └── compose.yml          # MCP Gateway configuration
```

#### Implementation Phases

**Phase 1: Local Foundation** (Weeks 1-4)
- [x] Choose Obsidian over Logseq
- [ ] Set up Obsidian vault structure
- [ ] Install and configure Obsidian MCP
- [ ] Build basic Org mode MCP (Python)
- [ ] Set up SQLite caching layer
- [ ] Implement file watching for Org sync

**Phase 2: Integration** (Weeks 5-8)
- [x] Set up Docker MCP Gateway locally
- [ ] Build cross-reference system
- [ ] Implement audit logging
- [ ] Create permission system
- [ ] Add encrypted vault for sensitive data
- [ ] Build automation MCP for output staging

**Phase 3: Server Migration** (Week 8+)
- [ ] Set up VPS or home server
- [ ] Configure VPN/Tailscale for secure access
- [ ] Implement Git-based sync for Org files
- [ ] Set up automated backups
- [ ] Add monitoring and alerting

#### Data Flows

**Daily Planning Flow**:
1. User: "What should I focus on today?"
2. Claude queries:
   - Org MCP → Today's scheduled tasks
   - Obsidian MCP → Recent meeting notes
   - Knowledge Graph → Related project context
3. Claude synthesizes prioritized action plan

**Project Creation Flow**:
1. User: "Create a new marketing campaign"
2. Claude:
   - Searches Obsidian for similar past projects
   - Creates project structure in Org
   - Creates project documentation in Obsidian
   - Establishes bi-directional links
   - Stages email drafts for team notification

#### Technology Stack

Required:
- Docker Desktop with MCP Gateway
- Python 3.10+
- Obsidian with MCP server plugin
- Emacs with Org mode
- SQLite with SQLCipher extension

#### Access Control (Session-based)

```json
{
  "mcp_permissions": {
    "org-tasks-mcp": "auto_approve",
    "obsidian-mcp": {
      "/Public/**": "auto_approve",
      "/Private/**": "request_permission",
      "/Sensitive/**": "require_password"
    },
    "finance-mcp": "always_request",
    "automation-mcp": "output_staging_only"
  }
}
```

#### Cross-Reference Schema

Linking convention:
- Org → Obsidian: `[[obsidian://open?vault=Work&file=path/to/note]]`
- Obsidian → Org: `[[org:project-id:task-id]]`
- Both → Vault: `[[vault:category:item-id]]`

Reference index table:
```sql
CREATE TABLE cross_references (
  id TEXT PRIMARY KEY,
  source_system TEXT,  -- 'org', 'obsidian', 'vault'
  source_id TEXT,
  target_system TEXT,
  target_id TEXT,
  relationship_type TEXT,  -- 'relates_to', 'implements', 'documents'
  created_at TIMESTAMP
);
```

**Current Status**: Partially implemented (Docker setup complete, needs integration work)

---

### Module: Campaigns Specification

**Location**: `/Users/gregor/Data/2-datacore/1-tracks/dev/architecture/Module - Campaigns Specification.md`

**Purpose**: Landing page creation, deployment, traffic acquisition, and optimization - designed for agent-driven continuous improvement.

**Key Specifications**:

#### Campaign Lifecycle

1. **Plan** - Strategy, audience, messaging
2. **Build** - Generate landing page variants
3. **Deploy** - Push to server, configure routing
4. **Traffic** - Acquire visitors via X Ads, etc.
5. **Analyze** - Track metrics, assess significance
6. **Optimize** - Declare winners, iterate

#### Module Structure

```
datacore/module-campaigns/
├── module.yaml
├── CLAUDE.md
├── README.md
├── commands/
│   ├── create-campaign.md
│   ├── deploy-variant.md
│   ├── campaign-status.md
│   └── optimize-campaign.md
├── agents/
│   ├── campaigns-executor.md    # Router
│   ├── campaign-planner.md      # Strategy
│   ├── landing-generator.md     # HTML/CSS/JS generation
│   ├── metrics-analyzer.md      # PostHog/X data → insights
│   └── ad-optimizer.md          # Ad performance
├── workflows/
│   ├── campaign-lifecycle.md
│   ├── ab-testing-protocol.md
│   └── traffic-sources.md
└── templates/
    ├── landing-pages/
    │   ├── waitlist.html
    │   ├── product.html
    │   └── minimal.html
    └── campaign-brief.md
```

#### Agent Breakdown

**campaigns-executor** (Router):
- Scans `:AI:campaign:` tagged tasks
- Routes by task type:
  - `:AI:campaign:plan:` → campaign-planner
  - `:AI:campaign:landing:` → landing-generator
  - `:AI:campaign:metrics:` → metrics-analyzer
  - `:AI:campaign:optimize:` → ad-optimizer

**campaign-planner**:
- Inputs: Product/feature, target audience, goals
- Outputs: Campaign brief, personas, messaging angles, UTM strategy, success metrics, ad copy

**landing-generator**:
- Inputs: Campaign brief, design constraints, template, copy requirements
- Outputs: HTML/CSS/JS files (JAMstack), PostHog tracking, UTM capture, A/B variants
- Capabilities: Generate from scratch, create variants, update copy/styling, add/modify tracking

**metrics-analyzer**:
- Inputs: PostHog project ID, X Ads campaign ID, time range, comparison variants
- Outputs: Conversion rates, cost per acquisition, statistical significance, funnel analysis, reports
- Schedule: Daily automated run, writes to knowledge base

**ad-optimizer**:
- Inputs: X Ads performance data, landing page conversion data, budget constraints
- Outputs: Winner/loser declarations, budget reallocation, new copy suggestions, audience refinement recommendations

#### Infrastructure Requirements

| Service | Purpose | Notes |
|---------|---------|-------|
| **Digital Ocean Droplet** | Hosting, deployment | Caddy web server, git webhook |
| **PostHog** | Analytics, A/B testing, feature flags | Cloud or self-hosted |
| **X Ads** | Traffic acquisition | Optional, other sources supported |
| **Anthropic API** | LLM responses on waitlist forms | Optional |

#### Environment Variables

```bash
# Analytics
POSTHOG_API_KEY=phc_xxx
POSTHOG_PROJECT_ID=12345

# Deployment
DO_API_TOKEN=dop_xxx
DO_DROPLET_IP=123.45.67.89
DEPLOY_WEBHOOK_SECRET=webhook_secret_xxx

# Traffic (optional)
X_ADS_BEARER_TOKEN=xxx
X_ADS_ACCOUNT_ID=xxx

# LLM responses (optional)
ANTHROPIC_API_KEY=sk-ant-xxx
```

#### Module Manifest

```yaml
name: campaigns
version: 1.0.0
description: Landing page creation, deployment, and optimization
namespace: comms

dependencies:
  - core@>=1.0.0

requires:
  infrastructure:
    - name: digitalocean_droplet
    - name: posthog
    - name: x_ads (optional)

  env_vars:
    - POSTHOG_API_KEY
    - POSTHOG_PROJECT_ID
    - DO_API_TOKEN
    - DO_DROPLET_IP
    - DEPLOY_WEBHOOK_SECRET
    - X_ADS_BEARER_TOKEN  # optional
    - ANTHROPIC_API_KEY   # optional

provides:
  commands:
    - create-campaign
    - deploy-variant
    - campaign-status
    - optimize-campaign
  agents:
    - campaigns-executor
    - campaign-planner
    - landing-generator
    - metrics-analyzer
    - ad-optimizer
```

#### Data Flow

```
1. PLAN
   org task: "Create campaign for SoftwareOfYou launch" :AI:campaign:plan:
   → campaign-planner → comms/campaigns/softwareofyou-launch/

2. BUILD
   org task: "Generate landing variants" :AI:campaign:landing:
   → landing-generator → comms/campaigns/softwareofyou-launch/variants/

3. DEPLOY
   /deploy-variant softwareofyou-launch control
   → git push → webhook → server pulls → live

4. TRAFFIC
   X Ads campaigns point to variants with UTM params

5. ANALYZE (daily cron)
   org task: "Analyze softwareofyou metrics" :AI:campaign:metrics:
   → metrics-analyzer → reports/campaigns/softwareofyou-launch/

6. OPTIMIZE
   metrics-analyzer detects significance → triggers ad-optimizer
   → recommendations + org tasks
```

#### Full Funnel Tracking

```
X Ads (Twitter Ads Manager)
  ↓ (with utm_campaign params)
Landing Page(s)
  ├── Reads UTM params
  ├── PostHog captures source attribution
  └── Tracks: scroll, time, clicks, form engagement
  ↓
Conversion (waitlist signup)
  ├── PostHog event: "waitlist_signup"
  └── Attributes to original UTM campaign
  ↓
Analytics Dashboard
  ├── Ad spend (from X)
  ├── Visitors by source
  ├── Conversion rate by variant
  └── Cost per acquisition
```

#### Hosting Architecture

```
Digital Ocean Droplet
  ├── Caddy (web server + A/B routing)
  ├── PostHog (optional)
  └── Deployment Service (git webhook)
  ↓
Cloudflare (CDN/proxy, not hosting)
  ├── SSL termination
  ├── DDoS protection
  └── Caching
```

**Why self-hosted over Cloudflare Pages**:
- Full programmatic control
- Server-side A/B routing possible
- Better analytics integration
- Path to Swarm/IPFS deployment

#### Ethical Tracking Approach

- **First-party only** - No cross-site tracking
- **Cookieless option** - PostHog supports cookieless mode
- **Aggregate metrics** - Focus on cohort behavior
- **Transparent** - Privacy policy explains what's collected
- **Data ownership** - PostHog Cloud EU or self-host

#### Agent Summary

| Agent | Trigger | Frequency | Output Location |
|-------|---------|-----------|-----------------|
| `campaigns-executor` | Scans :AI:campaign: tags | Nightly | Routes to sub-agents |
| `campaign-planner` | Manual or :AI:campaign:plan: | Per campaign | `comms/campaigns/{name}/` |
| `landing-generator` | Manual or :AI:campaign:landing: | Per variant | `comms/campaigns/{name}/variants/` |
| `metrics-analyzer` | Daily cron | Daily | `reports/campaigns/{name}/` |
| `ad-optimizer` | After significance detected | As needed | `reports/campaigns/{name}/` + org tasks |

#### Future Considerations

- Swarm/IPFS deployment (static sites portable to decentralized storage)
- Multi-channel traffic (Reddit, LinkedIn, Google Ads adapters)
- Automated creative generation (AI-generated ad images/copy)
- Revenue attribution (track beyond signup to paid conversion)

**Current Status**: Draft specification

---

### Datacore Repository Contribution Architecture

**Location**: `/Users/gregor/Data/2-datacore/1-tracks/dev/architecture/repo-contribution-architecture.md`

**Purpose**: Design repo structure enabling 1000s of contributors to improve the system while keeping content private.

**Key Specifications**:

#### Core Principle

**System = Public, Content = Private**

Users fork and contribute to the system. Their knowledge/content never leaves their machine.

#### Repository Structure

**Public Repos** (Forkable, Contributable):
| Repo | Purpose | Contributors |
|------|---------|--------------|
| `datacore` | Core framework for personal spaces | Everyone |
| `datacore-org` | Template for team/org spaces | Organizations |
| `datacore-trading` | Trading module | Traders |
| `datacore-research` | Research module | Researchers |
| `datacore-[domain]` | Domain modules | Domain experts |

**Private Repos** (Per-user/Per-org):
| Repo | Purpose | Owner |
|------|---------|-------|
| `my-datacore-content` | Personal content | Individual |
| `acme-datacore-content` | Org content | Organization |

#### Implementation Options

**Option A: Overlay Pattern** (Recommended)

How it works:
1. Fork `datacore-org` to `company/datacore-org-fork`
2. Clone fork to `~/Data/1-company/`
3. Add content directly (gitignored by datacore-org's .gitignore)
4. System improvements → PR to upstream
5. Content stays local

Pros:
- Simple - single folder
- Easy to contribute - just PR the system files
- Content naturally excluded

Cons:
- Must be careful with .gitignore
- Accidental commits possible

.gitignore in datacore-org:
```gitignore
# Content (never tracked)
org/*.org
journal/
today/
0-inbox/*.md
2-knowledge/zettel/
2-knowledge/literature/
**/*.db

# Only track system
!.datacore/
!CLAUDE.template.md
!1-departments/**/README.md
!1-departments/**/_index.md
```

**Option B: Submodule Pattern**

How it works:
1. Content repo: `company/datacore-content` (private)
2. System as submodule: `datacore-one/datacore-org`
3. Content repo includes system as `.datacore/` submodule

Pros:
- Clean separation
- Explicit system versioning

Cons:
- Submodule complexity
- Harder to contribute

**Option C: Two-Remote Pattern**

How it works:
1. Single local folder
2. Two git remotes: `system` and `content`
3. Different branches track different things

Cons:
- Too complex for most users

#### Recommended Architecture

**For Personal Spaces**:
No change needed. Personal content is gitignored in `datacore` repo. Users contribute to `datacore` directly.

**For Team/Org Spaces**:
Use Option A (Overlay Pattern):
1. **Fork** `datacore-org` to your org's GitHub
2. **Clone** fork to `~/Data/N-orgname/`
3. **Work** - content is auto-gitignored
4. **Contribute** - PR system improvements to upstream

File ownership:
| Path | Tracked In | Contributable |
|------|------------|---------------|
| `.datacore/agents/*.md` | datacore-org fork | Yes → PR upstream |
| `.datacore/commands/*.md` | datacore-org fork | Yes → PR upstream |
| `1-departments/**/README.md` | datacore-org fork | Yes → PR upstream |
| `CLAUDE.template.md` | datacore-org fork | Yes → PR upstream |
| `org/*.org` | Nothing (gitignored) | No |
| `journal/*.md` | Nothing (gitignored) | No |
| `2-knowledge/**` | Nothing (gitignored) | No |

#### Contribution Flow

**Contributing a System Improvement**:
```
1. User improves agent in ~/Data/2-myorg/.datacore/agents/foo.md
2. User commits to their fork
3. User opens PR to datacore-one/datacore-org
4. Maintainers review
5. Merged → All users get improvement on next pull
```

#### Datacore Improvement Proposals (DIPs)

For significant changes:
```
datacore/
└── dips/
    ├── DIP-0001-template.md
    ├── DIP-0002-agent-learning.md
    └── ...
```

**DIP Structure**:
```markdown
# DIP-XXXX: Title

**Author**: @username
**Status**: Draft | Review | Accepted | Implemented | Rejected
**Created**: YYYY-MM-DD

## Summary
One paragraph explanation.

## Motivation
Why is this needed?

## Specification
Technical details.

## Implementation
How to implement.

## Backwards Compatibility
Breaking changes?

## Reference Implementation
Link to PR or branch.
```

**DIP Categories**:
- **Core** - Changes to datacore main repo
- **Org** - Changes to datacore-org template
- **Module** - New module proposals
- **Process** - Changes to contribution process

#### Sync Mechanism

Users pull system updates:

```bash
# In ~/Data/1-company/
git pull origin main              # Get org's customizations
git fetch upstream                # Get datacore-org updates
git merge upstream/main           # Merge upstream improvements
```

Setup upstream (one-time):
```bash
git remote add upstream https://github.com/datacore-one/datacore-org.git
```

#### Migration Path

**For 2-datacore** (Datacore dev space):
1. Ensure datacore-org has proper .gitignore
2. Push only system files to datacore-org
3. Content stays local (gitignored)

**For 1-datafund**:
1. Fork datacore-org to datafund org
2. Migrate system customizations to fork
3. Content stays local (gitignored)

#### Summary

| Question | Answer |
|----------|--------|
| How do users contribute? | Fork template repo, PR improvements |
| Where does content live? | Local only, gitignored |
| How do users get updates? | `git pull upstream` |
| How do big changes happen? | DIP process |
| What's tracked in template repos? | System only (agents, commands, structure) |
| What's never tracked? | Content (org files, knowledge, journals) |

**Current Status**: Draft (foundation being implemented)

---

## 4. ADDITIONAL ARCHITECTURE DOCUMENTS

### AI-Focused Docs (Not reviewed in detail but present)

Located in `/Users/gregor/Data/2-datacore/1-tracks/dev/architecture/`:

- `CLAUDE_MD_Analysis.md` - Analysis of CLAUDE.md composition
- `Datacore Migration Plan.md` - Setup and migration planning
- `RAG-Implementation-Plan.md` - Retrieval-Augmented Generation implementation

---

## SUMMARY TABLE

| Document | Type | Status | Key Focus | Version |
|----------|------|--------|-----------|---------|
| **Datacore Specification v1.3** | Core Spec | Implemented | System architecture, GTD, agents, modules, spaces | 1.3.0 |
| **DIP-0000** | Template | Implemented | DIP format and process | 2025-12-01 |
| **DIP-0001** | Process DIP | Implemented | Repository structure, contribution model | 2025-12-01 |
| **DIP-0002** | Core DIP | Implemented | Layered context pattern (PUBLIC/SPACE/PRIVATE) | 2025-12-01 |
| **DIP-0003** | Standard DIP | Draft | Scaffolding pattern, required documents | 2025-12-01 |
| **AI Assistant MCP** | Architecture | In Progress | Local-first privacy-focused AI assistant | Draft |
| **Campaigns Module** | Architecture | Draft | Campaign lifecycle, landing pages, analytics | Draft |
| **Repo Contribution** | Architecture | Draft | Repository structure for contributions | Draft |

---

## KEY DEPENDENCIES & PREREQUISITES

### Foundational Requirements (DIP-0001, DIP-0002)
1. GitHub account and fork ability
2. Git knowledge (clone, commit, push, PR)
3. `.gitignore` understanding

### For DIPs to Function
1. DIP-0000 (template established) → prerequisite for DIP-0001, DIP-0002, DIP-0003
2. DIP-0001 (contribution model) → prerequisite for successful community contributions
3. DIP-0002 (layered context) → prerequisite for privacy-preserving contributions, security

### For Architecture Implementation
1. **Core Specification** → foundational for all architecture
2. **DIP-0001** → required for contribution workflows
3. **DIP-0002** → required for privacy-preserving context management
4. **MCP Architecture** → requires Docker, Python, org-mode setup
5. **Campaigns Module** → requires Digital Ocean, PostHog, X Ads integration

### Implementation Order (Critical Path)
1. Core Specification (baseline)
2. DIP-0000, DIP-0001, DIP-0002 (process and patterns)
3. DIP-0003 (scaffolding - pending)
4. Architecture implementations (MCP, Campaigns, etc.)

---

## IMPLEMENTATION STATUS MATRIX

| Requirement | Implemented | In Progress | Planned | Status |
|-------------|-------------|-------------|---------|--------|
| Core system specification | YES | - | - | Complete v1.3 |
| DIP process and template | YES | - | - | Implemented |
| Contribution model | YES | - | - | Implemented |
| Layered context pattern | YES | Tooling | Documentation | Mostly complete |
| Scaffolding pattern | - | - | YES | Draft stage |
| GTD workflow | YES | - | - | Implemented |
| Agent architecture | YES | - | - | Implemented |
| Command resolution | YES | - | - | Implemented |
| Module system | YES | - | - | Implemented |
| MCP architecture | - | YES | - | Partial setup |
| Campaigns module | - | - | YES | Draft spec |
| Repository contribution | - | - | YES | Draft architecture |

---

## REQUIREMENTS CROSS-REFERENCE

### System Layer Requirements
- [x] Modular architecture with pluggable modules
- [x] Multi-space support (personal, team, project)
- [x] AI-first design with agents and commands
- [x] Git-native version control
- [x] File-based (no databases)
- [x] Zettelkasten methodology for knowledge
- [x] GTD task management system
- [x] Layered context pattern (DIP-0002)
- [x] Contribution model (DIP-0001)
- [x] Privacy protection (System/Content separation)
- [ ] Scaffolding pattern validation (DIP-0003 - draft)

### Privacy & Security Requirements
- [x] System Layer shareable, Knowledge Layer private
- [x] Strict .gitignore pattern
- [x] Layered context with private layer
- [x] Content never pushed to public repos
- [ ] Private content pattern validation (pre-commit hooks - in progress)
- [ ] CI validation workflow (in progress)
- [ ] Merge conflict handling between layers (open question)

### Agent & Command Requirements
- [x] Agent architecture with routing
- [x] Command resolution system
- [x] AI task delegation via :AI: tags
- [x] Agent output pattern (0-inbox/)
- [x] GTD workflow integration
- [x] Weekly review cycle
- [x] Daily briefing generation
- [x] Module-specific agents/commands

### Module Requirements
- [x] Module manifest (module.yaml)
- [x] Module structure standardization
- [x] Dependencies declaration
- [x] Provides/agents/commands declaration
- [x] CLAUDE.md context per module
- [x] Built-in vs optional designation

### Integration Requirements
- [x] GitHub native support
- [ ] Notion integration (planned)
- [ ] Google Docs/Drive (planned)
- [ ] Figma MCP (planned)
- [ ] Linear/Jira (planned)
- [ ] Readwise (planned)
- [ ] n8n workflow bridges (planned)
- [ ] Email/Telegram capture (planned)

---

**Document prepared**: 2025-12-01
**Total lines analyzed**: 40,000+
**Files reviewed**: 8 core documents + supplementary architecture docs

