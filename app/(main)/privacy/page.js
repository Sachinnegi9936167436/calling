import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Premium Contact Reveal',
  description: 'Learn how we handle your data and protect your privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="glass-card" style={{ textAlign: 'left' }}>
        <Link 
          href="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '5px', 
            color: 'var(--text-muted)', 
            textDecoration: 'none',
            fontSize: '0.875rem',
            marginBottom: '2rem'
          }}
        >
          ← Back
        </Link>

        <h1 className="name" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Privacy Policy</h1>
        
        <p className="bio" style={{ marginBottom: '2rem' }}>
          Effective Date: May 12, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-main)' }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>1. Information We Collect</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              When you use our service, we collect personal information you provide, such as your name, phone number, and payment details. Payment processing is handled by Razorpay, and we only store the necessary transaction identifiers for verification.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>2. How We Use Your Information</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              We use the collected information solely for:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <li>Verifying payment transactions.</li>
              <li>Contacting you for the scheduled consultation.</li>
              <li>Responding to your inquiries via the contact form.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>3. Data Protection</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              We take the security of your personal data seriously. We use MongoDB to securely store your information and implement measures to prevent unauthorized access.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>4. Third-Party Services</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              We use <strong>Razorpay</strong> for secure payment processing. We also use third-party analytics (like Vercel Analytics) to understand how users interact with our site. We do not sell or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>5. Your Rights</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              You have the right to request access to the personal data we hold about you or ask for its deletion. If you wish to exercise these rights, please contact us.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>6. Contact Us</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              If you have any questions about this Privacy Policy, please reach out to us through our <Link href="/contact" style={{ color: 'var(--accent-primary)' }}>Contact Page</Link>.
            </p>
          </section>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/" className="pay-btn" style={{ textDecoration: 'none', width: 'auto', display: 'inline-block', padding: '1rem 2rem' }}>
            I Understand
          </Link>
        </div>
      </div>
    </div>
  );
}
