# Session Wrap-Up

Quick session wrap-up before closing a Claude Code conversation.

## Usage

```
/wrap-up
```

**Also triggered by natural language:**
- "wrap up"
- "let's wrap up"
- "it's done"
- "let's close"
- "I'm done"
- "that's it for now"
- "closing up"
- "end session"

**When**: Before closing terminal after a work session
**Duration**: ~2-5 minutes (mostly automated, light interaction)

## Context

You started this conversation with a goal. Work happened, insights emerged. Now you're ready to close this terminal window. This command ensures:
- Incomplete work becomes continuation tasks with context
- Learnings are captured
- Journal is updated
- Completed tasks are marked done

## Sequence

### 1. Session Summary (Automatic)

```
═══════════════════════════════════════════════════
SESSION WRAP-UP
═══════════════════════════════════════════════════

Goal: [Inferred from conversation start or ask user]

Work completed:
  - [List key accomplishments from session]
  - [Files created/modified]
  - [Decisions made]

───────────────────────────────────────────────────
```

### 2. Continuation Tasks

**If work is incomplete:**

```
CONTINUATION TASKS
──────────────────
This session's work appears incomplete. Let me capture what's needed to continue.

What remains to be done? (brief, or I'll infer from context)
> [user input or auto-inferred]

Creating continuation task with bootstrap context...
```

**Bootstrap prompt format** (stored in task):

```org
*** TODO Continue: [task description]                    :continuation:
SCHEDULED: <YYYY-MM-DD Day>
:PROPERTIES:
:CREATED: [timestamp]
:SESSION: [today's date + time]
:BOOTSTRAP: |
  Context: [What was being worked on]
  Progress: [What was accomplished]
  Next steps: [Specific next actions]
  Key files: [Relevant file paths]
  Blockers: [Any known blockers]
:END:

[Full bootstrap prompt for next session]

To continue this work, the next session should:
1. [Specific step 1]
2. [Specific step 2]
3. [Specific step 3]

Relevant context:
- [Key insight 1]
- [Key insight 2]
```

**The BOOTSTRAP property enables the next session to:**
- Understand what was happening
- Pick up exactly where this session left off
- Have all necessary context without re-reading files

### 3. Mark Completed Tasks

```
TASK COMPLETION
───────────────
Checking for completed tasks from this session...

[Scan next_actions.org for tasks related to session work]

Found X tasks that appear complete:
- [ ] Task 1 → Mark DONE? [Y/n]
- [ ] Task 2 → Mark DONE? [Y/n]

[Update org-mode states]
```

### 4. Session Learning (Automatic + Light Prompt)

```
SESSION LEARNING
────────────────
Extracting learnings from this session...

Patterns detected:
- [Auto-detected pattern from work done]

Any additional insights to capture? (brief, or Enter to skip)
> [user input]

[If input provided:]
Added to patterns.md: [description]

[If skipped:]
Automatic patterns captured.
```

**What gets captured:**
- Successful approaches used
- New patterns discovered
- Corrections made (to corrections.md)
- Insights worth preserving

### 5. Journal Entry (Automatic)

**Append to today's journal** (`0-personal/notes/journals/YYYY-MM-DD.md`):

```markdown
## Session: HH:MM - [Goal]

**Accomplished:**
- [Key accomplishment 1]
- [Key accomplishment 2]

**Continuation:**
- [Task created if incomplete]

**Learnings:**
- [Patterns/insights captured]

**Files:**
- Created: [list]
- Modified: [list]
```

**If working in a space, also update space journal:**
- `1-datafund/journal/YYYY-MM-DD.md`
- `2-datacore/journal/YYYY-MM-DD.md`

### 6. Index Session to Database (DIP-0004)

```
INDEXING SESSION
────────────────
Updating knowledge database with session data...

Session indexed:
  - Goal: [session goal]
  - Accomplishments: X
  - Files modified: X
  - Decisions: X

[If index fails, warn and continue - data still in journal files]
```

**Run:**
```bash
python ~/.datacore/lib/journal_parser.py --sync --space personal
```

### 7. Push Changes to Repos

**Push ALL repos including subprojects within spaces.**

```
SAVING WORK
───────────
Checking for uncommitted changes...

1. Spaces & Root (via ./sync push):
   datacore (root).......... [3 files changed] → Pushed
   datafund-space........... [No changes]
   datacore-space........... [1 file changed] → Pushed

2. Subproject repos (manual check):
   [Check git status in common subproject locations]
   1-datafund/2-projects/verity... [1 commit ahead] → Pushing...
   [Any other repos with unpushed commits]

All work saved.
```

**Steps:**
1. Run `./sync push` for spaces and root
2. Check subproject repos for unpushed commits:
   - `git -C 1-datafund/2-projects/verity status`
   - Any other active project repos
3. Push any repos that are ahead of origin

**Commit message format:**
```
Session: [brief goal/topic]

- [Key change 1]
- [Key change 2]

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

**If push fails:**
```
⚠ Push failed for [repo]. Will retry in /tomorrow.
  Error: [error message]
  Your changes are committed locally.
```

### 8. Context Sync (Automatic, Silent)

```
[Check if agents/commands changed during session]
[If changed: backup + update CLAUDE.md tables]
[Log to journal if updates made]
```

### 9. Quick AI Delegation Check (Optional)

```
AI DELEGATION
─────────────
Any quick tasks to delegate to AI? (brief, or Enter to skip)
> [user input]

[If input:]
Added to next_actions.org with :AI: tag.
Will be reviewed in /tomorrow for overnight execution.

[If skipped:]
No new AI tasks.
```

### 10. Completion Checklist (REQUIRED)

**Before closing, verify all steps are done:**

```
WRAP-UP CHECKLIST
─────────────────
[ ] 1. Session summary displayed
[ ] 2. Continuation tasks created (if work incomplete)
[ ] 3. Completed tasks marked DONE in next_actions.org
[ ] 4. Session learnings captured (patterns.md)
[ ] 5. Journals updated (only if relevant work was done):
      [ ] Personal (0-personal/notes/journals/) - always
      [ ] Datafund (1-datafund/journal/) - if datafund work
      [ ] Datacore (2-datacore/journal/) - if datacore work
[ ] 6. All repos pushed:
      [ ] Root & spaces (./sync push)
      [ ] Subproject repos (verity, etc.)
[ ] 7. Context sync completed
[ ] 8. AI delegation captured (if any)

Note: Space journals only need updating if session involved that space.
      It's OK to skip a space journal if no relevant work was done.
```

**Verification commands:**
```bash
# Check all repos are pushed
git -C ~/Data status --short
git -C ~/Data/1-datafund/2-projects/verity log --oneline origin/main..HEAD

# Check journals exist (personal is required, spaces are optional)
ls -la ~/Data/0-personal/notes/journals/$(date +%Y-%m-%d).md
ls -la ~/Data/1-datafund/journal/$(date +%Y-%m-%d).md 2>/dev/null
ls -la ~/Data/2-datacore/journal/$(date +%Y-%m-%d).md 2>/dev/null
```

### 11. Close

```
═══════════════════════════════════════════════════
SESSION COMPLETE
═══════════════════════════════════════════════════

Checklist: [X/8 items verified]

Summary:
- Tasks completed: X
- Continuation tasks: X (with bootstrap context)
- Learnings captured: X patterns
- Journals updated: personal [+ datafund] [+ datacore]
- All repos pushed: Yes

[If continuation task created:]
Next session can run: /continue
Or search for :continuation: tagged tasks.

Ready to close terminal.
═══════════════════════════════════════════════════
```

## Key Concepts

### Bootstrap Prompts

When work is incomplete, the continuation task includes a **bootstrap prompt** - a self-contained context block that enables the next session to understand:
- What was the goal
- What progress was made
- What specifically needs to happen next
- What files/context are relevant

This eliminates the "where was I?" problem when resuming work.

### Session vs Day

| Command | Scope | Purpose |
|---------|-------|---------|
| `/wrap-up` | Session | Close current conversation, capture continuations |
| `/tomorrow` | Day | End of day, AI delegation, priorities for tomorrow |

You can run `/wrap-up` multiple times per day (after each session).
Run `/tomorrow` once at end of day.

### Light vs Full AI Delegation

- `/wrap-up`: Quick capture of obvious AI tasks
- `/tomorrow`: Full review, priority setting, overnight delegation

## Files Referenced

**Read:**
- Conversation context
- `org/next_actions.org` (for completed tasks)
- Today's journal

**Update:**
- `org/next_actions.org` (mark DONE, add continuations)
- `0-personal/notes/journals/YYYY-MM-DD.md`
- Space journals if applicable
- `.datacore/learning/patterns.md`
- `CLAUDE.md` (if context sync needed)

**Create:**
- Continuation tasks with bootstrap prompts
- Backup in `.datacore/state/` (if context changed)

## Automation Level

| Step | Automation |
|------|------------|
| Session summary | Automatic (inferred from context) |
| Continuation tasks | Semi-auto (user confirms/adds context) |
| Task completion | Semi-auto (user confirms) |
| Learning extraction | Mostly auto (optional user input) |
| Journal entry | Automatic (personal + space journals) |
| Push to repos | Automatic (spaces via sync + subproject repos) |
| Context sync | Automatic (silent) |
| AI delegation | Optional (user-initiated) |
| Completion checklist | Required (verify all steps done) |

## Related

- `/tomorrow` - End of day, full AI delegation
- `/today` - Start of day briefing
- `/gtd-daily-start` - Morning planning
- `session-learning` agent
- `context-maintainer` agent
