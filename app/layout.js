import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'SSB WITH ABHI | Premium Personal Consultancy for Defence Aspirants',
  description: 'Get personalized guidance and consultancy for SSB interviews from Abhi. PPDT, psychology tests, and strategic guidance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ backgroundColor: 'var(--bg-color)' }}>
        {children}
        <Analytics />
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
