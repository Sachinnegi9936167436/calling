import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions | Premium Contact Reveal',
  description: 'Read our terms and conditions for using our consultation services.',
};

export default function TermsPage() {
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

        <h1 className="name" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Terms & Conditions</h1>
        
        <p className="bio" style={{ marginBottom: '2rem' }}>
          Effective Date: May 12, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-main)' }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>1. Acceptance of Terms</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>2. Consultation Service</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              The consultation service is provided "as is". Payment of the fee entitles you to a direct call from Abhishek Singh (Abhi) for the purpose of SSB guidance. The duration and scope of the call are subject to discretion.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>3. Payment & Refunds</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              All payments are made manually via UPI. Once a payment is verified and a call is completed or scheduled, no refunds will be issued. Please ensure you provide correct contact details (Name and Phone) for verification.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>4. User Obligations</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              Users must provide accurate information and a valid transaction ID. Any attempt to provide fraudulent information may result in denial of service without refund.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>5. Limitation of Liability</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              In no event shall we be liable for any damages arising out of the use or inability to use the services on this website.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>6. Modifications</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              We reserve the right to revise these terms at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms and Conditions.
            </p>
          </section>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/" className="pay-btn" style={{ textDecoration: 'none', width: 'auto', display: 'inline-block', padding: '1rem 2rem' }}>
            Accept & Return
          </Link>
        </div>
      </div>
    </div>
  );
}
