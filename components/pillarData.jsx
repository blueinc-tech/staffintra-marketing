/* The three product pillars, to the v3 taxonomy: Time & Attendance,
   Productivity & Performance, People & Operations. Names, features and copy
   come from the v3 landing content, adapted only where the house style bans
   long dashes.

   `tone` picks the panel surface and the eyebrow/tab tint. Large surfaces stay
   in the purple family plus ink; the small marks carry a per-pillar accent.

   Time & Attendance runs on real product footage. The other six features are
   drawn cards until their recordings exist. All sample data is the v3 cast
   and deliberately generic. */

export const PILLARS = [
  {
    id: 'time',
    name: 'Time & Attendance',
    tone: 'a',
    headline: 'From clock-in to payslip.',
    body:
      'One tap from desktop or mobile, with device health and location context built in. ' +
      'Clock events become payroll-ready timesheets, and leave routes itself by your rules.',
    href: '/product#time',
    story: null,
    steps: [
      {
        label: 'Smart clock-in',
        /* Each video step holds for its own clip; a timer stays only as a
           backstop for playback that never starts. */
        dwell: 17800,
        moment: {
          shape: 'video',
          src: '/assets/time-tracking.mp4',
          poster: '/assets/time-tracking-poster.jpg',
          alt: 'Live timers counting up from each clock-in, with location context on every session',
        },
      },
      {
        label: 'Timesheets',
        dwell: 19000,
        moment: {
          shape: 'video',
          src: '/assets/timesheets.mp4',
          poster: '/assets/timesheets-poster.jpg',
          alt: 'The week reconciled: hours totalled per person, variances flagged, each timesheet signed off',
        },
      },
      {
        label: 'Leave',
        dwell: 18600,
        moment: {
          shape: 'video',
          src: '/assets/leave-requests.mp4',
          poster: '/assets/leave-requests-poster.jpg',
          alt: 'A leave request routed by rule, opened with balance and cover alongside it, then approved',
        },
      },
    ],
  },

  {
    id: 'productivity',
    name: 'Productivity & Performance',
    tone: 'b',
    headline: 'One transparent formula for everyone.',
    body:
      'Real activity beside clock-in data, transparent to staff by design. Attendance, ' +
      'activity and approved output become one grade everyone can see.',
    href: '/product#productivity',
    story: null,
    steps: [
      {
        label: 'Activity insights',
        moment: {
          shape: 'bars',
          title: 'Activity · today',
          meta: 'No screenshots, ever',
          rows: [
            { label: 'Focused', value: '5h 40m', p: 0.82 },
            { label: 'Meetings', value: '1h 10m', p: 0.35 },
            { label: 'Admin', value: '0h 55m', p: 0.24 },
            { label: 'Idle', value: '0h 50m', p: 0.18 },
          ],
        },
      },
      {
        label: 'Performance grades',
        moment: {
          shape: 'list',
          title: 'Grade · August',
          meta: '82 / 100',
          rows: [
            { name: 'Attendance', meta: '96% on time this month', chip: 'A', tone: 'ok' },
            { name: 'Activity', meta: '5h 40m focused daily', chip: 'B', tone: 'accent' },
            { name: 'Approved output', meta: '14 work logs signed off', chip: 'A', tone: 'ok' },
          ],
        },
      },
      {
        label: 'Work logs',
        moment: {
          shape: 'list',
          title: 'Work logs · this week',
          meta: 'Counts toward the grade',
          rows: [
            { name: 'KYC validation states', meta: 'Delivered and approved', chip: 'Approved', tone: 'ok' },
            { name: 'Payout webhook retries', meta: '2h 10m tracked', chip: 'Open', tone: 'warn' },
            { name: 'Empty-state designs', meta: 'Sent for review', chip: 'In review', tone: 'accent' },
          ],
        },
      },
    ],
  },

  {
    id: 'operations',
    name: 'People & Operations',
    tone: 'c',
    headline: 'Payroll, people and process in one place.',
    body:
      'Timesheets flow straight into pay runs with statutory deductions handled. Onboarding ' +
      'to exit stays one continuous record, and any process becomes a case your rules enforce.',
    href: '/product#operations',
    story: null,
    steps: [
      {
        label: 'HR & Payroll',
        moment: {
          shape: 'timer',
          title: 'August payroll',
          site: '312 staff · 2 of 2 approvals',
          time: '₦48.2m',
          note: 'Statutory deductions handled',
          action: 'Run scheduled · 28 Aug',
        },
      },
      {
        label: 'Staff lifecycle',
        moment: {
          shape: 'list',
          title: 'Lifecycle',
          meta: 'One continuous record',
          rows: [
            { name: 'Town hall Friday', meta: 'Announcement', chip: '14 read', tone: 'quiet' },
            { name: 'New analyst onboarding', meta: 'Day 2 of 5', chip: 'On track', tone: 'ok' },
            { name: 'Exit checklist · contractor', meta: '3 items left', chip: 'Open', tone: 'warn' },
          ],
        },
      },
      {
        label: 'Cases & approvals',
        moment: {
          shape: 'steps',
          title: 'Expense above ₦50k',
          pct: '75%',
          note: 'Your rule, enforced · 4 steps',
          rows: [
            { t: 'Submitted with receipts', s: 'done' },
            { t: 'Team lead review', s: 'done' },
            { t: 'Finance check', s: 'current' },
            { t: 'CEO sign-off', s: '' },
          ],
        },
      },
    ],
  },
];
