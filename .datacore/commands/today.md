# Today

Generate the daily briefing and append it to today's journal.

## Behavior

1. **Sync repositories**: Pull latest changes from all repos
   ```
   SYNCING REPOS
   ─────────────
   Pulling latest changes...

   datacore (root).......... [OK]
   datafund-space........... [OK]
   datacore-space........... [OK]

   [If pull fails, retry twice. If still fails, warn and continue.]
   ```

2. **Sync knowledge database** (DIP-0004): Update the database with any overnight changes
   ```bash
   python ~/.datacore/lib/datacore_sync.py sync --quiet
   ```
   ```
   SYNCING DATABASE
   ────────────────
   Indexing changes...
     Tasks: 234 (5 new)
     Sessions: 156
     Files: 847

   [If sync fails, warn and continue - briefing still works from files]
   ```

3. **Detect context**: Check if running from a space directory or root
4. **Generate briefing**: Create Today content with relevant sections
5. **Append to journal**: Add under `## Daily Briefing` heading in `notes/journals/YYYY-MM-DD.md`
6. **No user prompts**: Write directly without asking for permission

## Output Location

**Personal (root or 0-personal/):**
- Append to: `0-personal/notes/journals/YYYY-MM-DD.md`
- Add under heading: `## Daily Briefing`
- Create journal file if it doesn't exist (with standard frontmatter)

**Space (e.g., 1-datafund/):**
- Append to: `[space]/today/YYYY-MM-DD.md` (create if needed)
- Spaces use dedicated today/ directory for team visibility

## Personal Today Content

Generate under `## Daily Briefing` heading:

```markdown
## Daily Briefing

### Focus
[Suggested focus based on deadlines, energy patterns, calendar]

### Priority Tasks
[Top 3-5 tasks from org/next_actions.org, sorted by priority and due date]
- Include DEADLINE items for today
- Include SCHEDULED items for today
- Flag any OVERDUE items

### Calendar
[Today's calendar events from all configured Google Calendars]

**To fetch events from all calendars:**
```python
import pickle
from datetime import datetime, timedelta
from pathlib import Path
from googleapiclient.discovery import build

CREDS_DIR = Path('.datacore/env/credentials')
CALENDARS = {
    'Datafund': 'google_calendar_token.pickle',
    'Swarm': 'google_calendar_token_ethswarm.pickle',
    'Personal': 'google_calendar_token_gmail.pickle',
}

today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
tomorrow = today + timedelta(days=1)

for name, token_file in CALENDARS.items():
    token_path = CREDS_DIR / token_file
    if not token_path.exists():
        continue
    with open(token_path, 'rb') as f:
        creds = pickle.load(f)
    service = build('calendar', 'v3', credentials=creds)
    events = service.events().list(
        calendarId='primary',
        timeMin=today.isoformat() + 'Z',
        timeMax=tomorrow.isoformat() + 'Z',
        singleEvents=True,
        orderBy='startTime'
    ).execute().get('items', [])

    if events:
        print(f"\n**{name}:**")
        for e in events:
            start = e['start'].get('dateTime', e['start'].get('date'))
            print(f"  {start[11:16]} | {e['summary']}")
```

**Output format in briefing:**
```markdown
### Calendar

**Datafund:**
- 09:00 | Daily Standup
- 14:00 | Verity Product Call

**Swarm:**
- 11:00 | Research Sync

**Personal:**
- 18:00 | Dinner with family
```

### Overnight AI Work
[Summary of completed :AI: tasks from journal/org since last briefing]

### Needs Your Decision
[Items flagged for human review by agents]

**Sync Conflicts (DIP-0010 Phase 2):**
If there are unresolved sync conflicts in the queue, list them:
```
Sync Conflicts Requiring Decision:
- github:owner/repo#42: state conflict (org: DONE, external: open)
- github:owner/repo#15: priority conflict (org: A, external: C)
```
Check via: `python .datacore/lib/sync/conflict.py --unresolved`

### This Week
[Upcoming deadlines and scheduled reviews]

### Top 3 Must-Win Battles
[Distilled priorities for the day]

### Yesterday's Wins
[Extract DONE items from yesterday's journal - celebrate accomplishments]

### Data's Observation
[Playful insight from pattern analysis - written in Data's voice]

Examples:
- "Fascinating. Your productivity peaks between 9-11 AM. I recommend scheduling deep work during this window."
- "I observe you have completed 3 consecutive days of morning routines. The evidence suggests habit formation is progressing."
- "Curious. Your WAITING items tend to resolve on Thursdays. Perhaps scheduling follow-ups for Wednesday would be optimal."
- "Your research tasks consistently exceed estimated effort by 40%. Adjusting future estimates would improve planning accuracy."
```

## Space Today Content

For team spaces, write to `[space]/today/YYYY-MM-DD.md`:

```markdown
# [Space] Today - [Date]

## Team Status
[Active members, anyone out]

## Today's Priorities
[From org/next_actions.org or GitHub Issues with priority labels]

## GitHub Activity (24h)
[Recent PRs, issues, comments via `gh` CLI]

## Standup Preview
[Draft standup from activity, ready to edit/send]

## Decisions Pending
[Items awaiting decision, sorted by age]

## This Week
[Key events for the week]
```

## Implementation Steps

1. Determine context (personal vs space)
2. Read org/next_actions.org for priorities (DEADLINE, SCHEDULED, PRIORITY A)
3. **Sync calendar** (DIP-0010 Phase 3):
   - Check if calendar adapter is enabled in settings
   - If enabled, sync today's events from Google Calendar
   - Update calendar.org with latest events
4. Scan recent journal entries for AI work completed overnight
5. Check for WAITING items needing follow-up
6. Identify decisions pending human input
7. **Extract yesterday's wins** - Read yesterday's journal for DONE items
8. **Generate Data's observation** - Analyze patterns from past 7 days:
   - Productivity patterns (time of day, day of week)
   - Habit streaks (consecutive completions)
   - Task completion trends
   - Effort estimate accuracy
   - Write in Data's voice (curious, analytical, no contractions)
9. Generate markdown content
10. **Write directly to file** (no user confirmation needed):
    - Personal: Append `## Today` section to journal file
    - Space: Write to today/YYYY-MM-DD.md
11. **Open journal for review**: `open <journal_path>` to launch in default editor
12. Display brief console summary

## Journal File Handling

If journal file doesn't exist, create with frontmatter:
```markdown
---
type: journal
date: YYYY-MM-DD
---

## Daily Briefing
[generated content]
```

If journal exists but has no `## Daily Briefing` section, append it.

If `## Daily Briefing` section exists, replace it with fresh content.

## Configuration

From `.datacore/config.yaml`:

```yaml
today:
  time: "06:00"  # Auto-generation time for cron
  include:
    - priorities
    - calendar
    - ai_work_summary
    - decisions_needed
```

## Cron Usage

```bash
# Personal briefing at 6 AM
0 6 * * * cd ~/Data && claude -p "/today"

# Space briefing at 7 AM
0 7 * * * cd ~/Data/1-datafund && claude -p "/today"
```

## Output

- Content written directly to journal (personal) or today/ file (space)
- Journal opened in default editor for review
- Brief console summary of top priorities
- No downstream prompts or questions
