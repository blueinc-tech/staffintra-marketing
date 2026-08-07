import {
  MarkStripes,
  MarkStagger,
  MarkConverge,
  MarkSteps,
  MarkBreak,
  MarkEnclose,
  MarkLedger,
  MarkAdvance,
  MarkPlan,
  MarkBranch,
  MarkLayers,
  MarkCross,
} from './NavMarks';

// Nav structure mirrors the reference site's shape. Destination pages do not
// exist yet — every "#" below is a placeholder to be pointed at a real route.
export const NAV_ITEMS = [
  {
    id: 'platform',
    label: 'Platform',
    menu: {
      type: 'columns',
      groups: [
        {
          heading: 'Products',
          span: 3,
          columns: [
            {
              feature: {
                label: 'Scheduling & shifts',
                description: 'Build the rota, catch clashes, and publish to every phone at once.',
                href: '#product',
                mark: <MarkStripes />,
              },
              items: [
                { label: 'Rota builder', href: '#product', mark: <MarkPlan /> },
                { label: 'Open shifts', href: '#product', mark: <MarkStagger /> },
                { label: 'Shift swaps', href: '#product', mark: <MarkCross /> },
                { label: 'Time tracking', href: '#features', mark: <MarkLedger /> },
                { label: 'Timesheets', href: '#features', mark: <MarkEnclose /> },
              ],
            },
            {
              feature: {
                label: 'Leave & approvals',
                description: 'Balances, cover, and policy in view, so a fair answer takes seconds.',
                href: '#product',
                mark: <MarkConverge />,
              },
              items: [
                { label: 'Leave requests', href: '#product', mark: <MarkAdvance /> },
                { label: 'Balances & accrual', href: '#product', mark: <MarkLedger /> },
                { label: 'Cover', href: '#product', mark: <MarkBranch /> },
                { label: 'Approvals inbox', href: '#product', mark: <MarkEnclose /> },
                { label: 'Absence reporting', href: '#features', mark: <MarkBreak /> },
              ],
            },
            {
              feature: {
                label: 'Onboarding journeys',
                description: 'Paperwork, sign-off, and introductions sequenced before day one.',
                href: '#product',
                mark: <MarkSteps />,
              },
              items: [
                { label: 'Guided journeys', href: '#product', mark: <MarkAdvance /> },
                { label: 'Policy sign-off', href: '#features', mark: <MarkPlan /> },
                { label: 'Task routing', href: '#product', mark: <MarkBranch /> },
                { label: 'Documents', href: '#product', mark: <MarkEnclose /> },
              ],
            },
          ],
        },
        {
          heading: 'Technology',
          span: 1,
          columns: [
            {
              items: [
                { label: 'Integrations', href: '#features', mark: <MarkBranch /> },
                { label: 'Support', href: '#', mark: <MarkConverge /> },
                { label: 'Security & permissions', href: '#features', mark: <MarkEnclose /> },
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
        description: 'Bring the whole week together, and decide with better numbers.',
      },
      items: [
        { label: 'Compliance', href: '#features', mark: <MarkPlan /> },
        { label: 'Labour cost', href: '#features', mark: <MarkLedger /> },
        { label: 'System consolidation', href: '#features', mark: <MarkLayers /> },
        { label: 'Multi-site operations', href: '#pricing', mark: <MarkBranch /> },
      ],
    },
  },
  { id: 'customers', label: 'Customers', href: '#customers' },
  {
    id: 'resources',
    label: 'Resources',
    menu: {
      type: 'resources',
      intro: {
        title: 'Resources',
        description: 'Practical guidance for the people who run the rota.',
        mark: <MarkStripes />,
      },
      byType: {
        heading: 'By type',
        items: [
          { label: 'Guides', href: '#' },
          { label: 'Events', href: '#' },
          { label: 'Help centre', href: '#' },
        ],
      },
      featured: {
        heading: 'Featured',
        title: 'Moving off spreadsheets: a rota migration guide',
        href: '#',
      },
    },
  },
  {
    id: 'company',
    label: 'Company',
    menu: {
      type: 'intro',
      intro: {
        title: 'More about StaffIntra',
        description: 'One workspace for your whole team.',
      },
      items: [
        { label: 'About', href: '#', mark: <MarkStripes /> },
        { label: 'Careers', href: '#', mark: <MarkSteps /> },
        { label: 'Partnerships', href: '#', mark: <MarkBranch /> },
        { label: 'Customer stories', href: '#customers', mark: <MarkConverge /> },
      ],
    },
  },
];
