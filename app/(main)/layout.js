import Link from 'next/link';

export default function MainLayout({ children }) {
  return (
    <>
      <div className="urgency-banner">
        🚀 Batch filling fast - 4 slots left for this week!
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo">SSB WITH ABHI</Link>
          <div className="nav-links">
            <Link href="/#about" className="nav-link">About</Link>
            <Link href="/#services" className="nav-link">Services</Link>
            <Link href="/#roadmap" className="nav-link">Roadmap</Link>
            <Link href="/#consult" className="nav-link" style={{ 
              padding: '0.6rem 1.2rem', 
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
            }}>Consult Now</Link>
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
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', fontWeight: '500' }}>
            &copy; {new Date().getFullYear()} <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>SSB WITH ABHI</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
