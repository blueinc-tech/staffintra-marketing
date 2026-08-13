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

## Not yet read

`/dashboard/cases`, `/dashboard/tools`, `/dashboard/apps`, `/dashboard/inbox`,
`/dashboard/workspaces`, `/dashboard/tasks`. Cases and Apps returned only the
shell on the first pass and need a revisit.

## What this changes on the marketing site

1. **Naming.** Productivity is "work logs", not grades. The fourth briefing
   cell is WORKDAY. Staff Lifecycle spans intake to offboarding.
2. **Missing features worth pages.** Geofencing, break tracking, org chart,
   in-app messaging, offboarding, intake, workflow builder, Celebrations and
   Hi5s, the App Store, Reports as a cross-module view.
3. **Invented things to retire.** The performance grade out of 100 and its
   A/B/C/D scale do not exist in the product.
