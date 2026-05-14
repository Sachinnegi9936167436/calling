"use client";

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [studentPhone, setStudentPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // YOUR DETAILS
  const creatorUPI = "abhisheksingh17nasa8@okhdfcbank"; 
  const creatorWhatsApp = "8218978921"; 
  const amount = "50"; 

  const upiLink = `upi://pay?pa=${creatorUPI}&pn=Consultation&am=${amount}&cu=INR`;

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    if (!studentName || !studentPhone || !transactionId) {
      alert("Please fill in all details");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, studentPhone, transactionId, amount }),
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting:', error);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = `Hello! I have just paid ₹${amount} for the consultation. %0A%0AMy Details:%0A- Name: ${studentName}%0A- Phone: ${studentPhone}%0A- Transaction ID: ${transactionId}%0A%0APlease verify and call me back.`;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="section-container">
          <h1 className="hero-title">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>Master Your SSB</span><br/>
            <span className="reveal-text gradient-text" style={{ animationDelay: '0.3s' }}>Personalized Guidance</span>
          </h1>
          <p className="hero-subtitle">
            Don't leave your selection to chance. Get direct mentorship, psychology evaluation, and strategic guidance from an expert.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', opacity: 0, animation: 'fadeIn 1s 1s forwards' }}>
            <a href="#consult" className="pay-btn" style={{ minWidth: '220px' }}>Get Started Now</a>
            <a href="#roadmap" className="pay-btn" style={{ 
              minWidth: '220px', 
              background: 'white', 
              color: 'var(--accent-primary)',
              border: '2px solid var(--accent-primary)',
              boxShadow: 'none'
            }}>View Roadmap</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ background: 'white' }}>
        <div className="section-container">
          <h2 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            About <span className="gradient-text">SSB WITH ABHI</span>
          </h2>
          <p className="hero-subtitle" style={{ textAlign: 'center', marginBottom: '4rem', opacity: 1, animation: 'none' }}>
            I am Abhi, your mentor for SSB. I've helped numerous candidates clear their selection board with practical tips and personalized evaluation.
          </p>
          
          <div className="grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <h3>Expert Mentorship</h3>
              <p className="bio" style={{ color: 'var(--text-muted)' }}>
                Personalized guidance tailored to your strengths and weaknesses. I focus on building your confidence and officer-like qualities (OLQs).
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
              </div>
              <h3>Proven Strategy</h3>
              <p className="bio" style={{ color: 'var(--text-muted)' }}>
                Learn the exact methods to crack PPDT, WAT, TAT, and SRT. No more confusion, just clear, actionable steps for success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap">
        <div className="section-container">
          <h2 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            The <span className="gradient-text">SSB Journey</span>
          </h2>
          <p className="hero-subtitle" style={{ textAlign: 'center', marginBottom: '4rem', opacity: 1, animation: 'none' }}>
            A day-by-day breakdown of the selection process and how we prepare you.
          </p>

          <div className="roadmap-timeline">
            <div className="roadmap-step">
              <div className="roadmap-content">
                <span className="roadmap-day">Day 1</span>
                <h3>Screening Test</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>OIR Tests and PPDT. We ensure your story writing and narration are top-notch to clear the first hurdle.</p>
              </div>
            </div>
            <div className="roadmap-step">
              <div className="roadmap-content">
                <span className="roadmap-day">Day 2</span>
                <h3>Psychology Tests</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>TAT, WAT, SRT, and SD. Detailed evaluation of your responses to reflect natural officer-like qualities.</p>
              </div>
            </div>
            <div className="roadmap-step">
              <div className="roadmap-content">
                <span className="roadmap-day">Day 3 & 4</span>
                <h3>GTO Tasks</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>Group discussions, GPE, and outdoor tasks. Learn the psychology of group dynamics and leadership.</p>
              </div>
            </div>
            <div className="roadmap-step">
              <div className="roadmap-content">
                <span className="roadmap-day">Day 2-4</span>
                <h3>Personal Interview</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>The core of selection. Strategy to handle tricky PIQ-based questions with confidence and honesty.</p>
              </div>
            </div>
            <div className="roadmap-step">
              <div className="roadmap-content">
                <span className="roadmap-day">Day 5</span>
                <h3>Conference</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>The final decision day. We prepare you for the mental pressure and the final board interaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" style={{ background: 'white' }}>
        <div className="section-container">
          <h2 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            Why <span className="gradient-text">Choose Mentorship?</span>
          </h2>
          <p className="hero-subtitle" style={{ textAlign: 'center', marginBottom: '4rem', opacity: 1, animation: 'none' }}>
            See the difference between struggling alone and having an expert guide.
          </p>

          <div className="comparison-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-col">Feature</th>
                  <th>Self Preparation</th>
                  <th className="highlight">Mentorship with Abhi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-col">Psych Evaluation</td>
                  <td><span className="cross-icon">✕</span> Random Internet tips</td>
                  <td className="highlight"><span className="check-icon">✓</span> Expert OLQ mapping</td>
                </tr>
                <tr>
                  <td className="feature-col">PPDT Strategy</td>
                  <td><span className="cross-icon">✕</span> Generic stories</td>
                  <td className="highlight"><span className="check-icon">✓</span> Impactful narration</td>
                </tr>
                <tr>
                  <td className="feature-col">Personal Interview</td>
                  <td><span className="cross-icon">✕</span> Guesswork</td>
                  <td className="highlight"><span className="check-icon">✓</span> Mock-style strategy</td>
                </tr>
                <tr>
                  <td className="feature-col">Direct Access</td>
                  <td><span className="cross-icon">✕</span> None</td>
                  <td className="highlight"><span className="check-icon">✓</span> 24/7 WhatsApp support</td>
                </tr>
                <tr>
                  <td className="feature-col">Result Oriented</td>
                  <td><span className="cross-icon">✕</span> Trial and error</td>
                  <td className="highlight"><span className="check-icon">✓</span> Proven success path</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="section-container">
          <h2 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            Our <span className="gradient-text">Premium Services</span>
          </h2>
          <div className="grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3>Psych Evaluation</h3>
              <p className="bio" style={{ color: 'var(--text-muted)' }}>Evaluation of your TAT, WAT, and SRT responses to ensure they reflect your true potential and OLQs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              </div>
              <h3>PPDT & GPE</h3>
              <p className="bio" style={{ color: 'var(--text-muted)' }}>Learn how to write impactful stories for PPDT and lead effectively during Group Planning Exercises.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3>24/7 Support</h3>
              <p className="bio" style={{ color: 'var(--text-muted)' }}>Direct access to me via WhatsApp for any queries during your preparation journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" style={{ background: 'white' }}>
        <div className="section-container">
          <h2 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Pay Consultation Fee</h3>
              <p className="bio" style={{ color: 'var(--text-muted)' }}>Pay a nominal fee of ₹{amount} via UPI to book your session.</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Fill Your Details</h3>
              <p className="bio" style={{ color: 'var(--text-muted)' }}>Submit your name, phone number, and transaction ID in the form below.</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3>WhatsApp Confirmation</h3>
              <p className="bio" style={{ color: 'var(--text-muted)' }}>Click the WhatsApp button to send your details directly.</p>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <h3>Personalized Call</h3>
              <p className="bio" style={{ color: 'var(--text-muted)' }}>Once verified, I will personally call you within 24-48 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation/Payment Form Section */}
      <section id="consult">
        <div className="section-container">
          <div className="glass-card">
            {!success ? (
              <>
                <h2 className="hero-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Get Your <span className="gradient-text">Personal Call</span></h2>
                <p className="bio" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Fill the form after paying ₹{amount} to book your slot.</p>

                <div className="price-tag">Consultation Fee: ₹{amount}</div>

                <div className="payment-instructions">
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '600' }}>Pay ₹{amount} to this UPI ID:</p>
                  <div className="upi-id-wrapper" style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '1.5rem 0', background: 'white', padding: '12px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                  }}>
                    <div className="upi-id" style={{ margin: 0, background: 'transparent', border: 'none', padding: 0, fontSize: '1.125rem', fontWeight: '700', color: 'var(--accent-primary)', letterSpacing: '0.5px' }}>{creatorUPI}</div>
                    <button onClick={(e) => {
                      navigator.clipboard.writeText(creatorUPI);
                      const btn = e.currentTarget;
                      const originalText = btn.innerHTML;
                      btn.innerHTML = '✅ Copied!';
                      btn.style.background = 'var(--success-color)';
                      setTimeout(() => { btn.innerHTML = originalText; btn.style.background = 'var(--accent-primary)'; }, 2000);
                    }} style={{ background: 'var(--accent-primary)', border: 'none', borderRadius: '10px', padding: '8px 16px', color: 'white', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '700', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px' }}>📋 Copy</button>
                  </div>
                  
                  <a href={upiLink} className="pay-btn" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>📲 Pay Now (GPay/PhonePe)</a>
                </div>

                <form onSubmit={handleSubmitDetails}>
                  <div className="form-group"><label className="form-label">Your Name</label><input type="text" className="form-input" placeholder="Enter your full name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">Your Phone Number</label><input type="tel" className="form-input" placeholder="e.g. +91 98765 43210" value={studentPhone} onChange={(e) => setStudentPhone(e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">Transaction ID / UTR Number</label><input type="text" className="form-input" placeholder="12-digit Transaction ID" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required /></div>
                  <button type="submit" className="pay-btn" disabled={loading}>{loading ? "Submitting..." : "Submit Details"}</button>
                </form>
              </>
            ) : (
              <div className="success-container">
                <div className="success-icon">✓</div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>Details Submitted!</h2>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.6', fontSize: '1.125rem' }}>Final Step: Please click the button below to send your payment details on WhatsApp for instant verification.</p>
                <a href={`https://wa.me/${creatorWhatsApp}?text=${whatsappMessage}`} target="_blank" rel="noreferrer" className="pay-btn" style={{ textDecoration: 'none', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)' }}><span style={{ fontSize: '1.2rem' }}>💬</span> Confirm on WhatsApp</a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
