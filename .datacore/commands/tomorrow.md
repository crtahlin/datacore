# Tomorrow

**"End of watch. Securing all stations for the night."**

Evening wrap-up command that closes out today and prepares the system for tomorrow. The counterpart to `/today`.

## Purpose

- Ensure all work is saved and pushed
- Run diagnostics and heal any issues
- Capture what's important for tomorrow
- Preview tomorrow's agenda
- Leave the system clean and ready

## Behavior

Execute the evening shutdown sequence, interacting with the user for priorities input.

## Sequence

### 1. Repository Sync Check

**For each repo, check and prompt:**

```
REPOSITORY SYNC
---------------
Checking all repositories...

datacore (root).......... [DIRTY - 5 uncommitted]
  → Commit and push? [Y/n]

datafund-space........... [SYNCED]
datacore-space........... [DIRTY - 1 uncommitted]
  → Commit and push? [Y/n]

datacore-dips............ [SYNCED]
trading.................. [SYNCED]
datacore-campaigns....... [SYNCED]
```

**If user approves:**
- Stage all changes
- Generate appropriate commit message
- Commit and push
- Verify push succeeded

### 2. Inbox Status

**Check all inboxes for unprocessed items:**

```
INBOX STATUS
------------
Personal (0-personal/0-inbox/)...... 2 items
Datafund (1-datafund/0-inbox/)...... 1 item
Datacore (2-datacore/0-inbox/)...... 0 items

Unprocessed items found. Process now? [Y/n]
```

**If items exist:**
- List each item briefly
- Offer to process or defer to morning

### 3. Quick Diagnostics

**Run abbreviated diagnostic (critical systems only):**

```
QUICK DIAGNOSTIC
----------------
Core Systems............ [OPERATIONAL]
Repository Health....... [5/6 SYNCED]
Space Integrity......... [ALL OPERATIONAL]
DIP Compliance.......... [OK]

[If issues found:]
⚠ Minor issues detected. Auto-heal? [Y/n]
```

**Auto-heal actions:**
- Rebuild composed CLAUDE.md files if stale
- Fix obvious git issues (stale locks, etc.)
- Report what was fixed

### 4. Journal Entry

**Update today's journal with wrap-up:**

```
JOURNAL UPDATE
--------------
Adding end-of-day entry to journal...

What did you accomplish today? (brief, or press Enter to skip)
> [user input]

Any blockers or open items? (brief, or press Enter to skip)
> [user input]
```

**Append to journal:**
```markdown
## End of Day

**Accomplished:**
- [user input or auto-generated from commits]

**Open Items:**
- [user input]

**System Status:** All repos synced, diagnostics passed
```

### 5. Tomorrow's Priorities

**Gather input for tomorrow:**

```
TOMORROW'S PRIORITIES
---------------------
What's most important for tomorrow? (1-3 items, or Enter to skip)
> [user input]

These will appear in tomorrow's /today briefing.
```

**Store in:**
- `0-personal/notes/journals/tomorrow-priorities.md` (temporary file)
- Or append to tomorrow's journal entry if it exists

### 6. Tomorrow's Preview

**Show what's already scheduled:**

```
TOMORROW'S PREVIEW
------------------
Date: [tomorrow's date]

Scheduled:
- [calendar items if available]
- [org-mode scheduled items for tomorrow]

Pending AI Tasks:
- [count] tasks tagged :AI: in queue

Inbox Items:
- [count] items to process

Your Priorities (just set):
1. [priority 1]
2. [priority 2]
```

### 7. Final Status

**Closing message:**

```
===============================
TOMORROW READY
===============================

All repositories: SYNCED
Inboxes: [CLEAR/X items pending]
Diagnostics: PASSED
Journal: UPDATED
Priorities: SET

"The ship is secured. Rest well, Captain.
Tomorrow's briefing will be ready at 0700."
```

**Or if issues remain:**

```
===============================
TOMORROW READY (with notes)
===============================

⚠ 2 items remain in inbox (deferred)
⚠ 1 repo has uncommitted changes (user skipped)

"Most systems secured. These items will appear
in tomorrow's briefing for attention."
```

## Options

| Flag | Effect |
|------|--------|
| `--quick` | Skip user prompts, auto-commit, no priorities |
| `--no-push` | Commit but don't push (offline mode) |
| `--heal` | Auto-fix all issues without prompting |

## Integration

- Reads from `/diagnostic` for system checks
- Writes to journal (same format as `/today`)
- Priorities file read by `/today` next morning
- Can trigger `gtd-daily-end` processing if requested

## Timing

Best run:
- End of work day
- Before shutting down
- After major work sessions

## Related Commands

| Command | Relationship |
|---------|--------------|
| `/today` | Morning counterpart - reads priorities set here |
| `/diagnostic` | Full system check (this runs abbreviated version) |
| `/gtd-daily-end` | GTD-specific wrap-up (can be called from here) |

---

*"Bridge to all hands: Secure your stations. Tomorrow's watch begins at 0700."*
