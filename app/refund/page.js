import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy | Premium Contact Reveal',
  description: 'Our refund policy for consultation services.',
};

export default function RefundPage() {
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

        <h1 className="name" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Refund Policy</h1>
        
        <p className="bio" style={{ marginBottom: '2rem' }}>
          Effective Date: May 12, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-main)' }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>1. Refund Eligibility</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)', fontSize: '1.125rem', fontWeight: 500 }}>
              At SSB WITH ABHI, we value your trust. Our refund policy is simple:
            </p>
            <div style={{ 
              background: 'rgba(139, 92, 246, 0.1)', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              borderLeft: '4px solid var(--accent-primary)',
              marginTop: '1rem',
              color: 'var(--text-main)',
              lineHeight: '1.6'
            }}>
              <strong>"If the call is not made for any reason after your payment has been verified, the full amount will be refunded to your original payment source."</strong>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>2. Refund Process</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              To request a refund if your call was not received within the expected timeframe, please reach out to us through our <Link href="/contact" style={{ color: 'var(--accent-primary)' }}>Contact Page</Link> or send a message on WhatsApp with your transaction details.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>3. Timeline</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              Once a refund is approved, it will be processed within 2-3 business days. Please note that the actual credit to your account may depend on your bank's processing time.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>4. Non-Refundable Cases</h2>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              Refunds will not be issued if the call was successfully made and completed. We also cannot issue refunds for incorrect UPI IDs provided by the user during the manual payment process.
            </p>
          </section>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/" className="pay-btn" style={{ textDecoration: 'none', width: 'auto', display: 'inline-block', padding: '1rem 2rem' }}>
            Got it
          </Link>
        </div>
      </div>
    </div>
  );
}
