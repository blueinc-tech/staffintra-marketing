import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import AnchorFlash from '../components/motion/AnchorFlash';
import NavAutoHide from '../components/motion/NavAutoHide';
import './globals.css';

// Display face for headlines, and the same face inside the product mockups.
// Closest available match to the reference site's wide geometric headline face,
// and the display font the brand guidelines specify.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'StaffIntra: Take control of your workforce operations',
  description:
    'Join over 1,000 businesses using StaffIntra to manage people, time, productivity and everyday operations, with confidence.',
  icons: { icon: '/assets/StaffIntra_Logo_Mark_Purple.svg' },
  openGraph: {
    title: 'StaffIntra: Take control of your workforce operations',
    description:
      'Scheduling, leave, approvals, and onboarding in a single workspace.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`${jakarta.variable} ${inter.variable} ${mono.variable}`}
      /* The head script below stamps data-mo on this element before React
         hydrates, so the server HTML and the client DOM differ by that one
         attribute and React logs a hydration mismatch. This is the sanctioned
         way to say that difference is deliberate: it is the same pattern a
         theme-flash guard uses, and without it React warns on every load. */
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document as able to animate, synchronously, before the
            first paint.

            Every entrance effect on the site starts from opacity 0 and is
            revealed by script. If that hiding is unconditional, the content
            is invisible for as long as it takes React to hydrate, and
            invisible forever if the bundle fails or scripting is off. The
            deployed hero was blank on first paint for exactly this reason.

            So the hidden start state is scoped to this flag. No script, no
            flag, and every animated element renders in its finished state.
            It is inline and synchronous rather than an effect, so there is no
            frame where the content is visible and then hidden again. */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.setAttribute("data-mo","")',
          }}
        />
      </head>
      <body>
        <AnchorFlash />
        <NavAutoHide />
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
