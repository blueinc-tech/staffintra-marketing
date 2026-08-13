# The real app, read 2026-08-13

Read directly from `workspace.blueinctech.com` through the browser, logged in.
This is the source of truth for feature names and terminology. Everything the
marketing site says about what the product does should trace back to here.

**Privacy rule: none of the sample data in this app goes on the site.** The
account holds real staff names, real roles, and a real home location on an
attendance record. Terminology and structure are what we take. Names, places,
hours and departments stay invented on the marketing side.

## Route map

| Route | Sidebar label | Group |
|---|---|---|
| `/dashboard` | Home | — |
| `/dashboard/inbox` | Inbox | — |
| `/dashboard/workspaces` | Workspaces | Work |
| `/dashboard/tasks` | My Tasks | Work |
| `/dashboard/reports` | Reports | Work |
| `/dashboard/cases` | Case Management | Work |
| `/dashboard/work-logs` | Productivity | Work |
| `/dashboard/platform/announcements` | Announcements | Work |
| `/dashboard/directory` | HR | People |
| `/dashboard/onboarding` | Staff Lifecycle | People |
| `/dashboard/attendance` | Attendance | People |
| `/dashboard/approvals` | Approvals | People |
| `/dashboard/tools` | Tools | Platform |
| `/dashboard/apps` | App Store | quick-link rail |
| `/dashboard/settings/billing/plan` | Upgrade plan | — |

Support already points at **support.staffintra.com**, so the StaffIntra brand
is live inside the product, not just on the marketing site.

## Home

Top bar: search with `⌘K`, My Work, Support, notifications, a live **"8.0h
logged"** pill, and an **Overtime** button.

Greeting is `Good evening, <first name>` with `Thursday, August 13, 2026 ·
Lagos (GMT+1)`, plus a **Your briefing** dialog that composes from the work
queue and workspace events, timestamped.

**Your day at a glance**, four cells, and these are the real labels:
`NOW` (clock, timezone, clocked-in state) · `TODAY` (hours, sessions, View
timesheet) · `PRODUCTIVITY` (this month, comparison) · `WORKDAY` (Standby /
worked today).

Note our hero mockup says `ELSEWHERE` for the fourth cell. The real one is
`WORKDAY`, and the third is `PRODUCTIVITY`, which we do not show at all.

Widgets: My Work · Continue where you left off · Approvals queue · Today's
schedule · My week · Announcements · Quick actions (Request leave, My
timesheet, Open projects, Team directory) · Team today · **Celebrations**
(birthdays, work anniversaries, and **Hi5s**).

Empty states are written with real care and are worth echoing in tone:
"Queue is clear", "Leave, expense, and access requests that need your
sign-off arrive here."

## Attendance

"Track and manage team attendance". Export CSV, Filters, Day/Week/Month.

Stat row: `PRESENT` · `LATE` · `REMOTE / WFH` · **`OUTSIDE GEOFENCE`** ·
`TOTAL RECORDS`.

Table columns: STAFF · DATE · CLOCK IN · CLOCK OUT · HOURS · BREAK · STATUS ·
LOCATION. Clock-in carries a full place string and an IANA timezone.

**Geofencing is a real feature and the site never mentions it.** So is break
tracking as its own column.

## Productivity (`/work-logs`)

Titled **"Work logs"**, "Hours tracked by teammate, workspace and task".
Actions: Log work. Filters: workspace picker, **Include auto-generated**.
Entries group under a workspace with a free-text description, date and author,
and a total.

So productivity here is **work logs against workspaces**, and logs can be
auto-generated. Our site invented a "grade out of 100" formula that does not
appear anywhere in the app.

## Approvals

List plus detail. Views: My Requests, History. New request. The detail pane
promises "details, **timeline** and **decision panel**". Queue counts waiting
items. Covers leave, expense and access requests.

## HR (`/directory`)

"Directory", member count, two tabs: **Directory** and **Org chart**.
Department filter. Each person: name, role, department, View profile, Message.
Paginated 10/20/50.

**Org chart and in-app messaging are both real and both unmentioned by us.**

## Staff Lifecycle (`/onboarding`)

"Intake, onboarding, active staff, and offboarding: who is joining, who needs
attention, and who is leaving."

Stats: ACTIVE · COMPLETED · ONBOARDING · OFFBOARDING.
Tabs: Overview · Intake · Onboarding · **Workflows** · Settings.
Each stage tracks: Not started / In progress / **Needs attention** / Completed.
Intake tracks: Awaiting completion / Submitted / Needs review.

**Offboarding and Intake are full stages we never mention. Workflows is a
builder.**

## Reports

"A cross-module snapshot of your workspace." TOTAL STAFF · CLOCKED IN NOW ·
TASK COMPLETION · PENDING APPROVALS, plus a **Productivity trend** chart of
"Active, productive, and idle time by week".

## Second pass: what clicking found

The first pass only read default tabs. These came from actually clicking.

### Staff Lifecycle, Intake tab

> "Collect a candidate's details before their first day. Submitting an intake
> does not create an account."

That last clause is a real product decision worth repeating on the site: you
can gather a candidate's details without provisioning them.

### Staff Lifecycle, Workflows tab

Titled **Onboarding Templates**. Each template carries:

`name` · type (**Onboarding** / **Offboarding**) · description ·
`N tasks · N uses · N days` · optionally **Auto-assign enabled** · `by <author>`

Shipped defaults are Standard Employee Onboarding (4 tasks, 14 days,
auto-assign on), Standard Offboarding (4 tasks, 7 days) and Standard Staff
Intake (3 tasks, 14 days). So this is a **reusable journey builder with
auto-assignment and a usage count**, not a checklist.

### HR, Org chart tab

Real org chart: each manager heads a block with a role chip, their direct
reports below as cards with avatar, name and role. Managers with nobody under
them read **"No direct reports."**

### Tools Hub (`/dashboard/tools`)

> "Your centralized launcher for all workplace tools and integrations"

Categories are **Communication · Recruitment · Finance · General**, each with a
tool count.

**Our integrations section invented four different categories** (HR & people,
Payroll, Time & attendance, Finance). Only Finance overlaps. The board should
follow the product.

### Case Management (`/dashboard/cases`)

The richest module in the app, and the one the site flattens most.

> "Track operational issues, escalations, and resolutions across your workspace."

- Counters: TOTAL · OPEN · ESCALATED · RESOLVED · CLOSED
- **SLA tracking**: "SLA breaches: 0 · Avg: —"
- **Eight statuses**: Open, Under Review, Pending Response, Escalated,
  In Investigation, Resolved, Closed, Reopened
- **Five case types**: General Operations Issue, Payroll Dispute,
  Compliance Incident, HR Complaint, Facility Escalation
- **Five priorities**: Low, Medium, High, Critical, Emergency
- **Five views**: Dashboard · Kanban · Table · Timeline · Calendar
- Analytics: Cases by Status, Priority Mix, Workload by Assignee
- Filters by workspace, status, type, priority, search, "My cases only"

The site currently says "Model any process as a case." The truth is far more
specific and far more saleable: an SLA-backed case system with five views.

### Attendance filters

Status filter: Present · Late · Remote · WFH · **Outside geofence** · Absent.
Group filter is by **team** (the account has HQ, Dev and Marketing teams), so
teams are a first-class grouping.

## Still unread

`/dashboard/inbox`, `/dashboard/workspaces`, `/dashboard/tasks`,
`/dashboard/apps`, `/dashboard/reports` beyond its default view, and any
populated state anywhere. The account is nearly empty (0 approvals, 0 cases,
0 announcements, 1 attendance record), so every module was seen in its empty
state. Populated screens would be worth a second visit before building
screenshots of them.

## What this changes on the marketing site

1. **Naming.** Productivity is "work logs", not grades. The fourth briefing
   cell is WORKDAY. Staff Lifecycle spans intake to offboarding.
2. **Missing features worth pages.** Geofencing, break tracking, org chart,
   in-app messaging, offboarding, intake, workflow builder, Celebrations and
   Hi5s, the App Store, Reports as a cross-module view.
3. **Invented things to retire.** The performance grade out of 100 and its
   A/B/C/D scale do not exist in the product.
