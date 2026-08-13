/* The three product pillars, rebuilt against the real app.

   The previous version was written from the v3 landing file, which invented a
   performance grade out of 100 with an A/B/C/D scale. The product has no such
   thing: its Performance tab tracks reviews. That content is gone.

   The pillars now follow the app's own module grouping:
     Time & attendance   clock-in, geofence, breaks, timesheets, approvals
     Work & productivity workspaces, tasks, work logs, reports
     People & operations directory, lifecycle, cases, announcements

   Every label, status and number below comes from a screen that exists.
   Sample names stay invented; the real account's data does not appear here. */

export const PILLARS = [
  {
    id: 'time',
    name: 'Time & attendance',
    tone: 'a',
    headline: 'Every hour accounted for, without anyone chasing it.',
    body:
      'One tap to clock in, with location and device context attached. Breaks, ' +
      'lateness and anyone outside their geofence surface on the same board, and ' +
      'the week arrives at payroll already reconciled.',
    href: '/product#time',
    story: null,
    steps: [
      {
        label: 'Smart clock-in',
        dwell: 17800,
        moment: {
          shape: 'video',
          src: '/assets/time-tracking.mp4',
          poster: '/assets/time-tracking-poster.jpg',
          alt: 'Clocking in from a desktop, with the session resolving inside its geofence',
        },
      },
      {
        label: 'Attendance board',
        moment: {
          shape: 'list',
          title: 'Attendance · today',
          meta: '17 records',
          rows: [
            { name: 'Present', meta: 'On site and on time', chip: '11', tone: 'ok' },
            { name: 'Late', meta: 'Clocked in after start', chip: '2', tone: 'warn' },
            { name: 'Remote / WFH', meta: 'Working off site', chip: '3', tone: 'accent' },
            { name: 'Outside geofence', meta: 'Clocked in off the perimeter', chip: '1', tone: 'due' },
          ],
        },
      },
      {
        label: 'Timesheets',
        dwell: 19000,
        moment: {
          shape: 'video',
          src: '/assets/timesheets.mp4',
          poster: '/assets/timesheets-poster.jpg',
          alt: 'The week reconciled: hours totalled per person, breaks deducted, each timesheet signed off',
        },
      },
      {
        label: 'Approvals',
        dwell: 18600,
        moment: {
          shape: 'video',
          src: '/assets/leave-requests.mp4',
          poster: '/assets/leave-requests-poster.jpg',
          alt: 'A leave request opened with its balance and cover alongside it, then approved',
        },
      },
    ],
  },

  {
    id: 'productivity',
    name: 'Work & productivity',
    tone: 'b',
    headline: 'What the team is doing, and what it added up to.',
    body:
      'Boards and tasks for the work itself, work logs for the hours behind it, ' +
      'and one cross-module report that reads across both. Logs can build ' +
      'themselves from what is already tracked.',
    href: '/product#productivity',
    story: null,
    steps: [
      {
        label: 'Workspaces',
        moment: {
          shape: 'list',
          title: 'Boards',
          meta: 'List, board, calendar or dashboard',
          rows: [
            { name: 'Client onboarding', meta: '18 tasks · 12 done', chip: '67%', tone: 'accent' },
            { name: 'Q3 site rollout', meta: '24 tasks · 21 done', chip: '88%', tone: 'ok' },
            { name: 'Payroll migration', meta: '9 tasks · 2 done', chip: '2 overdue', tone: 'due' },
          ],
        },
      },
      {
        label: 'Work logs',
        moment: {
          shape: 'list',
          title: 'Work logs · this week',
          meta: 'Total 9.5h',
          rows: [
            { name: 'KYC validation states', meta: 'Client onboarding · 3.0h', chip: 'Logged', tone: 'ok' },
            { name: 'Payout webhook retries', meta: 'Payroll migration · 2.0h', chip: 'Logged', tone: 'ok' },
            { name: 'Clock events reconciled', meta: 'From attendance · 4.5h', chip: 'Auto', tone: 'accent' },
          ],
        },
      },
      {
        label: 'Reports',
        moment: {
          shape: 'bars',
          title: 'Active, productive and idle',
          meta: 'By week',
          rows: [
            { label: 'Week 30', value: '38h', p: 0.79 },
            { label: 'Week 31', value: '41h', p: 0.86 },
            { label: 'Week 32', value: '36h', p: 0.75 },
            { label: 'Week 33', value: '43h', p: 0.9 },
          ],
        },
      },
    ],
  },

  {
    id: 'operations',
    name: 'People & operations',
    tone: 'c',
    headline: 'From first day to last, and every escalation between.',
    body:
      'One record per person, from intake before day one through to offboarding. ' +
      'Anything that needs a decision becomes a case with an owner, a priority ' +
      'and a clock on it.',
    href: '/product#operations',
    story: null,
    steps: [
      {
        label: 'Staff lifecycle',
        moment: {
          shape: 'steps',
          title: 'Standard employee onboarding',
          pct: '25%',
          note: 'Auto-assigned on start date · 14 days',
          rows: [
            { t: 'Intake submitted, no account yet', s: 'done' },
            { t: 'Contract and policy sign-off', s: 'current' },
            { t: 'Equipment and access issued', s: '' },
            { t: 'First week check-in', s: '' },
          ],
        },
      },
      {
        label: 'Directory',
        moment: {
          shape: 'list',
          title: 'Directory',
          meta: 'Org chart or list',
          rows: [
            { name: 'Product & Engineering', meta: '6 people · 1 manager', chip: 'Team', tone: 'accent' },
            { name: 'Growth & Marketing', meta: '4 people · 1 manager', chip: 'Team', tone: 'accent' },
            { name: 'Finance & Operations', meta: '2 people · 1 manager', chip: 'Team', tone: 'accent' },
          ],
        },
      },
      {
        label: 'Cases',
        moment: {
          shape: 'list',
          title: 'Cases · open',
          meta: 'SLA breaches: 1',
          rows: [
            { name: 'Payroll dispute', meta: 'Under review · from Email', chip: 'High', tone: 'warn' },
            { name: 'Facility escalation', meta: 'In investigation · from Phone', chip: 'Critical', tone: 'due' },
            { name: 'Compliance incident', meta: 'Confidential · from Portal', chip: 'Emergency', tone: 'due' },
          ],
        },
      },
    ],
  },
];

/* The fifteen request types the product actually ships, in its own four
   groups. Study leave and an upfront loan request are the two that give this
   away as built for Nigerian workplaces rather than imported wholesale. */
export const REQUEST_TYPES = [
  { group: 'Attendance', items: ['Early departure', 'Lateness'] },
  {
    group: 'Leave',
    items: [
      'Annual leave',
      'Bereavement leave',
      'Casual leave',
      'Emergency leave',
      'Leave extension',
      'Maternity leave',
      'Paternity leave',
      'Sick leave',
      'Study leave',
    ],
  },
  { group: 'Shift', items: ['Location change', 'Schedule adjustment', 'Shift change'] },
  { group: 'Other', items: ['Upfront loan request'] },
];
