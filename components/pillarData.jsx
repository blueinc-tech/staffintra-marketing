/* The three product pillars, and the moments that play inside each panel.
   Names and copy come straight from the nav taxonomy in navData.jsx, so the
   menu and this section describe the same product rather than two guesses.

   `tone` picks the panel surface and the eyebrow/tab tint. Large surfaces stay
   in the purple family plus ink — the brand kit reserves saturated fills for
   Brand Purple — while the small marks carry a per-pillar accent, which is how
   the reference gives each pillar an identity.

   Every moment is sample product data, deliberately generic: no customer
   names, no organisations, nothing that reads as a claim about a real user. */

export const PILLARS = [
  {
    id: 'scheduling',
    name: 'Scheduling & shifts',
    tone: 'a',
    headline: 'Every shift, visible to everyone.',
    body:
      'Build the rota in minutes, not evenings. Drag shifts into place, catch clashes ' +
      'before they happen, and publish to every phone at once.',
    href: '#features',
    story: 'How an operations team cut rota admin from a full evening to under an hour',
    storyLabel: 'Customer story',
    steps: [
      {
        label: 'Rota builder',
        /* Every step here holds for its own clip plus a beat. On the shared
           5.2s dwell the carousel moved on a quarter of the way through.
           18.8s of footage after the two-second intro fade was trimmed. */
        dwell: 19600,
        /* The one moment that is real footage rather than a drawn card: the
           actual rota builder, shifts dragged into place and the week
           published. A drawing cannot make that case as well as the thing
           itself can. */
        moment: {
          shape: 'video',
          src: '/assets/rota-builder.mp4',
          poster: '/assets/rota-builder-poster.jpg',
          alt: 'Building the week of 10 August: shifts dragged into place across the grid, clashes flagged, then the week published',
        },
      },
      {
        label: 'Open shifts',
        /* 19.8s of footage plus a beat, same rule as the rota builder. */
        dwell: 18600,
        moment: {
          shape: 'video',
          src: '/assets/open-shifts.mp4',
          poster: '/assets/open-shifts-poster.jpg',
          alt: 'An unfilled Saturday shift offered out to eight people, then claimed from a phone: first to claim gets it',
        },
      },
      {
        label: 'Time tracking',
        /* 19.8s of footage plus a beat. */
        dwell: 18600,
        moment: {
          shape: 'video',
          src: '/assets/time-tracking.mp4',
          poster: '/assets/time-tracking-poster.jpg',
          alt: 'Live timers running against open shifts, counting up from each clock-in',
        },
      },
      {
        label: 'Timesheets',
        /* 19.0s of footage plus a beat. */
        dwell: 19800,
        moment: {
          shape: 'video',
          src: '/assets/timesheets.mp4',
          poster: '/assets/timesheets-poster.jpg',
          alt: 'The week of 10 August reconciled: hours totalled per person, variances flagged, each timesheet signed off',
        },
      },
    ],
  },

  {
    id: 'leave',
    name: 'Leave & approvals',
    tone: 'b',
    headline: 'Approvals that don’t sit in inboxes.',
    body:
      'Requests arrive with the context to decide: balances, cover, and policy. A fair ' +
      'answer takes seconds and nothing gets lost in email.',
    href: '#features',
    story: 'How a multi-site team brought approvals down from four days to the same shift',
    storyLabel: 'Customer story',
    steps: [
      {
        label: 'Leave requests',
        moment: {
          shape: 'list',
          title: 'Requests',
          meta: '2 waiting on you',
          rows: [
            { name: 'Sofia Reyes', meta: 'Annual leave · 12–14 Aug', chip: 'Approve', tone: 'ok' },
            { name: 'Tunde Okafor', meta: 'Shift swap · Sat 15 Aug', chip: 'Approve', tone: 'ok' },
            { name: 'Priya Sharma', meta: 'Overtime · approved just now', chip: 'Approved', tone: 'quiet' },
          ],
        },
      },
      {
        label: 'Balances',
        moment: {
          shape: 'bars',
          title: 'Balances · this year',
          meta: 'Accrual and carry-over handled',
          rows: [
            { label: 'Sofia Reyes', value: '9 days left', p: 0.36 },
            { label: 'Tunde Okafor', value: '14 days left', p: 0.56 },
            { label: 'Priya Sharma', value: '3 days left', p: 0.12 },
            { label: 'Kofi Mensah', value: '19 days left', p: 0.76 },
          ],
        },
      },
      {
        label: 'Cover',
        moment: {
          shape: 'list',
          title: 'Cover · 12–14 Aug',
          meta: 'Every shift accounted for',
          rows: [
            { name: 'Thu 12 Aug · Late', meta: 'Covered by Kofi Mensah', chip: 'Set', tone: 'ok' },
            { name: 'Fri 13 Aug · Morning', meta: 'Covered by Priya Sharma', chip: 'Set', tone: 'ok' },
            { name: 'Sat 14 Aug · Floor', meta: 'Offered to 4 people', chip: 'Open', tone: 'warn' },
          ],
        },
      },
      {
        label: 'Approvals inbox',
        moment: {
          shape: 'steps',
          title: 'This week',
          pct: '92%',
          note: 'answered within a shift',
          rows: [
            { t: 'Annual leave · 12–14 Aug', s: 'done' },
            { t: 'Shift swap · Sat 15 Aug', s: 'done' },
            { t: 'Overtime · Fri 13 Aug', s: 'done' },
            { t: 'Unpaid leave · 22 Aug', s: 'current' },
            { t: 'Annual leave · 2–6 Sep', s: '' },
          ],
        },
      },
    ],
  },

  {
    id: 'onboarding',
    name: 'Onboarding journeys',
    tone: 'c',
    headline: 'Day one, already sorted.',
    body:
      'Turn new-hire chaos into a guided journey. Paperwork, sign-off, kit, and introductions get ' +
      'sequenced automatically before anyone walks in.',
    href: '#features',
    story: null,
    steps: [
      {
        label: 'Guided journeys',
        moment: {
          shape: 'steps',
          title: 'Kofi Mensah · starts Monday',
          pct: '80%',
          note: 'Floor supervisor',
          rows: [
            { t: 'Contract signed', s: 'done' },
            { t: 'Policies acknowledged', s: 'done' },
            { t: 'Payroll details verified', s: 'done' },
            { t: 'Meet your team · scheduled', s: 'current' },
            { t: 'First-week shadow shifts', s: '' },
          ],
        },
      },
      {
        label: 'Policy sign-off',
        moment: {
          shape: 'list',
          title: 'Policies',
          meta: '4 of 5 acknowledged',
          rows: [
            { name: 'Health & safety', meta: 'Signed 8 Aug', chip: 'Signed', tone: 'ok' },
            { name: 'Code of conduct', meta: 'Signed 8 Aug', chip: 'Signed', tone: 'ok' },
            { name: 'Data handling', meta: 'Sent 9 Aug', chip: 'Waiting', tone: 'warn' },
          ],
        },
      },
      {
        label: 'Task routing',
        moment: {
          shape: 'list',
          title: 'Tasks routed',
          meta: 'Assigned automatically',
          rows: [
            { name: 'Create accounts & kit', meta: 'Routed to IT', chip: 'Done', tone: 'ok' },
            { name: 'Add to payroll run', meta: 'Routed to Payroll', chip: 'Done', tone: 'ok' },
            { name: 'Book induction', meta: 'Routed to Manager', chip: 'Today', tone: 'accent' },
          ],
        },
      },
      {
        label: 'Documents',
        moment: {
          shape: 'list',
          title: 'Documents',
          meta: 'Stored against the record',
          rows: [
            { name: 'Signed contract', meta: 'PDF · 8 Aug', chip: 'Filed', tone: 'quiet' },
            { name: 'Right to work', meta: 'Verified · 8 Aug', chip: 'Filed', tone: 'quiet' },
            { name: 'Bank details', meta: 'Encrypted · 9 Aug', chip: 'Filed', tone: 'quiet' },
          ],
        },
      },
    ],
  },
];
