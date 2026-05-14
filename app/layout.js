import { Analytics } from "@vercel/analytics/react";
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'SSB WITH ABHI | Personal Consultancy for Defence Aspirants',
  description: 'Get personalized guidance and consultancy for SSB interviews from Abhi. Mock interviews, PPDT, psychology tests, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="logo">SSB WITH ABHI</Link>
            <div className="nav-links">
              <a href="#about" className="nav-link">About</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#how-it-works" className="nav-link">How it Works</a>
              <a href="#consult" className="nav-link">Consult Now</a>
            </div>
          </div>
        </nav>

        <main>
          {children}
        </main>

        <footer>
          <div className="section-container">
            <div className="footer-links">
              <Link href="/contact" className="footer-link">Contact Us</Link>
              <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              <Link href="/terms" className="footer-link">Terms & Conditions</Link>
              <Link href="/refund" className="footer-link">Refund Policy</Link>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              &copy; {new Date().getFullYear()} SSB WITH ABHI. All rights reserved.
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
