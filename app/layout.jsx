import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
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
  title: 'StaffIntra — One workspace for your whole team',
  description:
    'StaffIntra brings scheduling, leave, approvals, and onboarding into a single workspace — so your people spend less time on admin and more time on the work that matters.',
  icons: { icon: '/assets/StaffIntra_Logo_Mark_Purple.svg' },
  openGraph: {
    title: 'StaffIntra — One workspace for your whole team',
    description:
      'Scheduling, leave, approvals, and onboarding in a single workspace.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={`${jakarta.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
