# Product animation briefs

Twelve clips to replace the current five. Every screen described here was read
from the live app on 2026-08-13, so the labels, statuses and column names are
the product's own, not invented.

**These are supporting, not the main event.** They sit inside panels beside
copy that already makes the point. A clip that demands attention is a clip
that has failed: no audio, no camera moves, no transitions between unrelated
scenes. One screen, one thing happening on it, held at the end.

---

## Paste this first, once

> I need a screen-recording-style product animation of a web app UI. Not a
> presentation, not a marketing video: it should look like a real product
> being used, captured over the shoulder.
>
> **Canvas:** 1080 x 1080 square, flat design, no perspective, no device
> frame, no browser chrome. The UI fills the frame edge to edge.
>
> **Brand:** primary #4024C0 (purple). Supporting: ink #17171C, secondary text
> #55555E, muted #8A8A93, hairlines #E8E8EC, page #F7F7F8, panels #FFFFFF.
> Status colours: green #178A63, amber #C77414, red #C93838, violet #7A5BD6.
> Tints for status pills: green #E4F5EE, amber #FBF0DE, red #FBEAEA, purple
> #ECE8FB.
>
> **Surface rules:** rounded corners on everything: 8px on small chips and
> inputs, 12px on cards and panels, 18px on large panels and media frames.
> Nothing square. No drop shadows at all, ever: separation comes from 1px
> hairline borders. Generous white space. Where a card sits inside another
> rounded container, its corner is smaller than the parent's, never equal.
>
> **Type:** Plus Jakarta Sans for headings and numbers, Inter for body and
> labels. Tabular figures for anything numeric. Never use a long dash or an
> en dash anywhere on screen: write "9:00 to 17:00", not "9:00 to 17:00" with
> a dash.
>
> **Motion:** UI-realistic only. Things fade, slide a short distance, count
> up, fill, or check off. Easing cubic-bezier(.22,.61,.36,1), 200 to 400ms
> per beat. Cursor visible and moving naturally between targets, with a brief
> pause before each click. No bounce, no spring overshoot, no parallax.
>
> **Duration:** 14 to 18 seconds. **Start on the finished UI already loaded**,
> no fade in from black, no logo, no title card. **Hold the final frame for
> the last 2 seconds**, completely still.
>
> **Data:** invented but plausible Nigerian workplace data. Money in naira
> (₦). Use only these names: Ruth Adeyemi, Usman Ibrahim, Emmanuel Okafor,
> Jemimah Dogara, Blossom Adeh, Joseph Obi, Samuel Johnson.
>
> I will give you one scene brief at a time. Build exactly that scene.

---

## Priority 1: the three that replace clips already on the site

### 1. Smart clock-in

**Where:** Time & Attendance pillar, step one. **Replaces:** `time-tracking.mp4`

Screen: a clock-in card. Large current time in tabular figures, the timezone
`Africa/Lagos` beneath it, a location line, and a wide primary button reading
**Clock in**.

Beats:
1. Cursor moves to **Clock in**, pauses, clicks.
2. Button switches to a running state. A timer starts counting up from
   `0h 00m` in real time.
3. A location line resolves underneath: a pin icon, a place name, then a
   small green pill reading **Inside geofence**.
4. A second card slides up from below: today's session row, showing clock-in
   time, a live-updating duration, and status **Present**.
5. Hold.

The geofence pill is the point of this one. It should be the last thing to
resolve and it should be unmistakable.

### 2. The attendance board

**Where:** Time & Attendance, step two. **Replaces:** `timesheets.mp4`

Screen: the attendance table. Header row reads
`STAFF · DATE · CLOCK IN · CLOCK OUT · HOURS · BREAK · STATUS · LOCATION`.
Above it, five stat cards: **PRESENT**, **LATE**, **REMOTE / WFH**,
**OUTSIDE GEOFENCE**, **TOTAL RECORDS**. Below the stats, a day/week/month
toggle set to Day.

Beats:
1. Six staff rows are visible with mixed statuses: Present, Late, Remote,
   Outside geofence.
2. The five stat numbers count up to 11, 2, 3, 1, 17.
3. Cursor opens the status filter and selects **Outside geofence**.
4. The table filters down to the single matching row, which highlights. Its
   location cell shows a place name in amber.
5. Hold on the filtered state.

### 3. Leave, routed and approved

**Where:** Time & Attendance, step three. **Replaces:** `leave-requests.mp4`

Screen: split view. Left, a request list. Right, the detail pane for the
selected request, with a **timeline** down one side and a decision panel at
the bottom.

Beats:
1. A new request slides into the top of the list: Jemimah Dogara, annual
   leave, Thursday to Friday.
2. Cursor clicks it. The detail pane fills: dates, a balance readout showing
   **12 of 20 days**, and a cover line showing who is on shift.
3. A routing chip appears on the timeline: **Auto-routed by rule**.
4. Cursor moves to **Approve** and clicks.
5. The timeline gains a final entry with a green tick; the request's pill
   turns to **Approved** and the balance updates to 14 of 20.
6. Hold.

---

## Priority 2: the fiction fix

### 4. Work logs

**Where:** Productivity pillar, step one. **New. Replaces invented "grades".**

Screen: the work logs view. Header **Work logs**, subtitle
`Hours tracked by teammate, workspace and task`. A workspace filter, a
toggle labelled **Include auto-generated**, and a running **Total** figure.

Beats:
1. Two logged entries visible, grouped under a workspace heading, each with a
   free-text description, a duration, a date and an author. Total reads `5.0h`.
2. Cursor clicks **Log work**. A compact form opens.
3. A description types itself in one short line, a duration is set to `2h`.
4. Save. The new entry slides into the group and the Total counts up to `7.0h`.
5. Cursor flips **Include auto-generated** on. Two more entries fade in, each
   with a small **Auto** chip, and the Total counts up again to `9.5h`.
6. Hold.

The auto-generated toggle is the payoff. It shows the product filling the
log by itself.

### 5. The productivity trend

**Where:** Productivity pillar, step two. **New.**

Screen: the Reports view. Four counters across the top: **TOTAL STAFF**,
**CLOCKED IN NOW**, **TASK COMPLETION**, **PENDING APPROVALS**. Below, a
weekly bar chart titled `Active, productive, and idle time by week`.

Beats:
1. Counters tick up to 312, 187, 84%, 6.
2. Chart bars grow from the baseline, left to right, one week at a time. Each
   bar is three stacked segments: active (purple), productive (deeper
   purple), idle (grey).
3. A dotted average line draws itself across.
4. Cursor hovers the tallest week; a tooltip shows the three values.
5. Hold with the tooltip open.

---

## Priority 3: the new pages

### 6b. Approvals, the picker

**Where:** the approvals page hero. **New, and high value.**

Screen: the "New approval request" picker, open. Four group headings with
their types listed under each.

Beats:
1. Cursor clicks **New request**. The picker opens.
2. The four groups reveal in order, their types listing under each:
   **Attendance** (early departure, lateness), **Leave** (nine types),
   **Shift** (location change, schedule adjustment, shift change),
   **Other** (upfront loan request).
3. Cursor hovers **Study leave**, then **Upfront loan request**, pausing on
   each so both are legible.
4. Cursor selects one; the picker gives way to that request's short form.
5. Hold.

Those two hovers are the whole point of the clip. They are the two types that
show this was built for Nigerian workplaces rather than imported.

### 6. Geofence and breaks

**Where:** the geofencing page. **New.**

Screen: a site detail view. A simple map plate with a circular geofence
drawn on it, a radius label, and a list of today's sessions beside it.

Beats:
1. The geofence circle draws itself around a site pin.
2. Three staff dots appear inside the circle, one outside it.
3. The outside dot pulses once and its row in the list flags amber:
   **Outside geofence**.
4. Cursor clicks the flagged row. A break breakdown expands showing clock-in,
   break start, break end, and total break `45m`.
5. Hold.

### 7. Intake before day one

**Where:** the lifecycle page, stage one. **New.**

Screen: the intake list, empty, with a header reading **Staff intake** and
the subtitle `Collect a candidate's details before their first day.`

Beats:
1. Cursor clicks **New intake**. A short form opens: name, role, start date,
   department.
2. Fields fill in sequence, quickly.
3. Submit. The record lands in the list with a status pill reading
   **Submitted**.
4. A caption line fades in beneath: **No account created yet.**
5. Hold.

That caption is the whole reason this clip exists. It has to land.

### 8. The workflow template

**Where:** the lifecycle page, stage two. **New.**

Screen: the Onboarding Templates view. Cards for
**Standard Employee Onboarding** and **Standard Offboarding**, each showing
`N tasks · N uses · N days` and, on the first, **Auto-assign enabled**.

Beats:
1. Cursor opens Standard Employee Onboarding. A task list expands: four
   tasks, each with an owner chip (IT, Payroll, Hiring manager).
2. A fifth task is added; the card's counter ticks from 4 tasks to 5.
3. Cursor toggles **Auto-assign**. A line appears: `Assigned on start date`.
4. The usage counter ticks from 3 uses to 4 as a new starter's avatar appears
   against the template.
5. Hold.

### 9. Offboarding

**Where:** the lifecycle page, stage three. **New.**

Screen: the lifecycle overview with three columns, **Intake**, **Onboarding**,
**Offboarding**, each showing counts for Not started, In progress, Needs
attention, Completed.

Beats:
1. A card moves from Onboarding into Offboarding, and the counters on both
   columns update.
2. The Offboarding card expands to a four-item checklist: return equipment,
   revoke access, final pay, exit interview.
3. Items check off one by one, the first three green.
4. The fourth stays open and its column count shows **1 needs attention** in
   amber.
5. Hold.

Ending on the unfinished item is deliberate. It shows the product tracking
what is outstanding rather than pretending everything closes cleanly.

### 10. The org chart

**Where:** the directory page. **New.**

Screen: an org chart. A manager card at the top with a role chip, direct
reports as cards beneath, connected by hairlines.

Beats:
1. The tree draws in, top down, hairlines extending then cards fading in.
2. Cursor expands one report who is themself a manager; a second row of
   reports unfolds beneath.
3. Cursor switches to the **Directory** tab. The same people reflow into a
   list view with department labels.
4. A department filter is applied; the list narrows.
5. Hold.

### 11. Case management

**Where:** the cases page. **New, and the most valuable clip in this set.**

Screen: the case board in **Kanban** view, columns for Open, Under Review,
Escalated, Resolved. Above, counters and an **SLA breaches** readout.

Beats:
1. Cards visible with priority chips: Low, Medium, High, Critical.
2. A card drags from Open to Under Review. Counters update.
3. A Critical card's SLA meter fills toward its limit and turns amber; the
   SLA breaches figure ticks from 0 to 1.
4. Cursor switches the view to **Timeline**. The same cases reflow into a
   horizontal timeline.
5. Hold on the timeline.

The view switch at the end is the point: same data, five ways to look at it.

### 12. The command center

**Where:** the platform page hero. **New.**

Screen: the home dashboard. Greeting line, then the four-cell strip:
**NOW**, **TODAY**, **PRODUCTIVITY**, **WORKDAY**.

Beats:
1. The four cells populate in sequence: a clock, hours worked, a trend
   figure, and a state reading **Standby**.
2. The **My Work** panel fills with three items, each with a reason line.
3. Clock-in happens; **WORKDAY** flips from Standby to **Active** and the
   TODAY timer starts running.
4. Team today fills with four avatars and a small in-office count.
5. Hold.

---

## Handover

Export each as **MP4, 1080 x 1080, 30fps**, named exactly:

`clock-in` · `attendance-board` · `leave-approved` · `work-logs` ·
`productivity-trend` · `geofence-breaks` · `intake` · `workflow-template` ·
`offboarding` · `org-chart` · `case-board` · `command-center`

Drop them anywhere and tell me where. I will trim, scale, encode and generate
posters, same pipeline as before: quality-targeted encode, roughly 3 MB each,
deferred so they never touch first paint.

If the tool can export **self-contained HTML or SVG animation** instead of
video, that is better: it stays sharp at any size, weighs a fraction of an
MP4, and can respect reduced-motion. Worth trying on one before committing to
twelve.

## One flag

The cast above (Ruth Adeyemi, Usman Ibrahim, Jemimah Dogara, Blossom Adeh,
Joseph Obi) came from the v3 landing file, and several are close to real
Blueinc staff names. That was the company's own choice in their own file, so
it stands, but it is worth a conscious decision rather than an inherited one.
Say the word and I will swap the whole cast for clearly unrelated names.
