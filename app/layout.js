import { Analytics } from "@vercel/analytics/react";
import './globals.css';

export const metadata = {
  title: 'Premium Contact Reveal',
  description: 'Pay to unlock direct contact access.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
