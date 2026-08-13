import {
  MarkStripes,
  MarkStagger,
  MarkConverge,
  MarkSteps,
  MarkEnclose,
  MarkLedger,
  MarkAdvance,
  MarkPlan,
  MarkBranch,
  MarkLayers,
  MarkCross,
} from './NavMarks';

// The v3 taxonomy: Product | Solutions | Platform | Pricing | Resources.
// Every branch points at a real route now; in-page anchors keep the /# form so
// they resolve from subpages too.
export const NAV_ITEMS = [
  {
    id: 'product',
    label: 'Product',
    menu: {
      type: 'columns',
      groups: [
        {
          heading: 'Products',
          span: 3,
          columns: [
            {
              feature: {
                label: 'Time & Attendance',
                description: 'One tap to clock in, timesheets that build themselves, leave that routes itself.',
                href: '/product#time',
                mark: <MarkStripes />,
              },
              items: [
                { label: 'Smart clock-in', href: '/product#time', mark: <MarkPlan /> },
                { label: 'Timesheets', href: '/product#time', mark: <MarkLedger /> },
                { label: 'Leave', href: '/product#time', mark: <MarkAdvance /> },
              ],
            },
            {
              feature: {
                label: 'Productivity & Performance',
                description: 'Real activity beside clock-in data, and one transparent grade for everyone.',
                href: '/product#productivity',
                mark: <MarkConverge />,
              },
              items: [
                { label: 'Activity insights', href: '/product#productivity', mark: <MarkStagger /> },
                { label: 'Performance grades', href: '/product#productivity', mark: <MarkSteps /> },
                { label: 'Work logs', href: '/product#productivity', mark: <MarkEnclose /> },
              ],
            },
            {
              feature: {
                label: 'People & Operations',
                description: 'Payroll connected to the record, and any process modelled as a case.',
                href: '/product#operations',
                mark: <MarkLayers />,
              },
              items: [
                { label: 'HR & Payroll', href: '/product#operations', mark: <MarkLedger /> },
                { label: 'Staff lifecycle', href: '/product#operations', mark: <MarkAdvance /> },
                { label: 'Cases & approvals', href: '/product#operations', mark: <MarkBranch /> },
                { label: 'Forms', href: '/product#operations', mark: <MarkPlan /> },
              ],
            },
          ],
        },
        {
          heading: 'Platform',
          span: 1,
          columns: [
            {
              items: [
                { label: 'The command center', href: '/platform', mark: <MarkStripes /> },
                { label: 'Integrations', href: '/platform#integrations', mark: <MarkBranch /> },
                { label: 'Security & compliance', href: '/platform#security', mark: <MarkEnclose /> },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'solutions',
    label: 'Solutions',
    menu: {
      type: 'intro',
      intro: {
        title: 'Solutions',
        description: 'However your business runs, StaffIntra bends to fit, not the other way round.',
      },
      items: [
        { label: 'Startups', href: '/solutions#startups', mark: <MarkStagger /> },
        { label: 'Mid-sized businesses', href: '/solutions#midsize', mark: <MarkSteps /> },
        { label: 'Field & operations teams', href: '/solutions#operations', mark: <MarkCross /> },
        { label: 'Established organizations', href: '/solutions#enterprise', mark: <MarkLayers /> },
        { label: 'System consolidation', href: '/solutions#consolidation', mark: <MarkConverge /> },
      ],
    },
  },
  {
    id: 'platform',
    label: 'Platform',
    menu: {
      type: 'intro',
      intro: {
        title: 'The platform',
        description: 'One home for the whole workday.',
      },
      items: [
        { label: 'The command center', href: '/platform', mark: <MarkStripes /> },
        { label: 'Integrations', href: '/platform#integrations', mark: <MarkBranch /> },
        { label: 'Security & compliance', href: '/platform#security', mark: <MarkEnclose /> },
        { label: 'Support', href: '/platform#support', mark: <MarkConverge /> },
      ],
    },
  },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  {
    id: 'resources',
    label: 'Resources',
    menu: {
      type: 'resources',
      intro: {
        title: 'Resources',
        description: 'Guidance for the people who run operations.',
        mark: <MarkStripes />,
      },
      byType: {
        heading: 'By type',
        items: [
          { label: 'Blog', href: '/resources#blog' },
          { label: 'Help center', href: '/resources#help' },
          { label: 'API docs', href: '/resources#api' },
          { label: 'Status', href: '/resources#status' },
        ],
      },
      featured: {
        heading: 'Featured',
        title: 'Consolidating your stack: a migration guide',
        href: '/resources',
      },
    },
  },
];
