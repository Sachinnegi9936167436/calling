"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [studentPhone, setStudentPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // YOUR DETAILS - Update these
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          studentPhone,
          transactionId,
          amount
        }),
      });

      if (!response.ok) {
        console.warn('Failed to submit details to backend, but continuing.');
      }

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
          <h1 className="hero-title">Master Your SSB Interview with Personalized Guidance</h1>
          <p className="hero-subtitle">
            Don't leave your selection to chance. Get direct mentorship, mock interviews, and psychological evaluation from an expert.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#consult" className="pay-btn" style={{ maxWidth: '250px' }}>Get Started Now</a>
            <a href="#services" className="pay-btn" style={{ maxWidth: '250px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>Learn More</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="section-container">
          <h2 className="name" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>About SSB WITH ABHI</h2>
          <div className="grid">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Expert Mentorship</h3>
              <p className="bio" style={{ marginBottom: 0 }}>
                Personalized guidance tailored to your strengths and weaknesses. I focus on building your confidence and officer-like qualities (OLQs).
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Proven Strategy</h3>
              <p className="bio" style={{ marginBottom: 0 }}>
                Learn the exact methods to crack PPDT, WAT, TAT, and SRT. No more confusion, just clear, actionable steps for success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="section-container">
          <h2 className="name" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>Our Services</h2>
          <p className="bio" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Everything you need to excel in your Services Selection Board (SSB) interview.
          </p>
          <div className="grid">
            <div className="feature-card">
              <div className="feature-icon">🎤</div>
              <h3>Mock Interviews</h3>
              <p className="bio" style={{ marginBottom: 0 }}>One-on-one personal interview sessions with detailed feedback to refine your responses and body language.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Psych Evaluation</h3>
              <p className="bio" style={{ marginBottom: 0 }}>Evaluation of your TAT, WAT, and SRT responses to ensure they reflect your true potential and OLQs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🖼️</div>
              <h3>PPDT & GPE</h3>
              <p className="bio" style={{ marginBottom: 0 }}>Learn how to write impactful stories for PPDT and lead effectively during Group Planning Exercises.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p className="bio" style={{ marginBottom: 0 }}>Direct access to me via WhatsApp for any queries during your preparation journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="section-container">
          <h2 className="name" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>How It Works</h2>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Pay Consultation Fee</h3>
              <p className="bio">Pay a nominal fee of ₹{amount} via UPI to book your session. This ensures serious candidates get the time they deserve.</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Fill Your Details</h3>
              <p className="bio">Submit your name, phone number, and transaction ID in the form below so I can verify your payment.</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3>WhatsApp Confirmation</h3>
              <p className="bio">Click the WhatsApp button to send your details directly. This speeds up the verification process.</p>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <h3>Personalized Call</h3>
              <p className="bio">Once verified, I will personally call you within 24-48 hours to start your mentorship journey.</p>
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
                <h2 className="name">Get Your Personal Call</h2>
                <p className="bio" style={{ marginBottom: '1.5rem' }}>
                  Fill the form after paying ₹{amount} to book your slot.
                </p>

                <div className="price-tag">
                  Consultation Fee: ₹{amount}
                </div>

                <div className="payment-instructions">
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Pay ₹{amount} to this UPI ID:</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '0.5rem 0' }}>
                    <div className="upi-id">{creatorUPI}</div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(creatorUPI);
                        alert('UPI ID copied to clipboard!');
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      📋 Copy
                    </button>
                  </div>
                  
                  <a 
                    href={upiLink}
                    className="pay-btn"
                    style={{ 
                      marginTop: '1rem', 
                      textDecoration: 'none', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                    }}
                  >
                    📲 Pay Now (GPay/PhonePe)
                  </a>
                </div>

                <form onSubmit={handleSubmitDetails}>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Enter your full name" 
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="e.g. +91 98765 43210" 
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Transaction ID / UTR Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="12-digit Transaction ID" 
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="pay-btn" 
                    disabled={loading}
                  >
                    {loading ? <div className="loader"></div> : "Submit Details"}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-container">
                <div className="success-icon">✓</div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Details Submitted!</h2>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.6' }}>
                  Final Step: Please click the button below to send your payment details on WhatsApp for instant verification.
                </p>
                
                <a 
                  href={`https://wa.me/${creatorWhatsApp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="pay-btn"
                  style={{ 
                    textDecoration: 'none', 
                    background: '#25D366', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>💬</span> Confirm on WhatsApp
                </a>

                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Once you send the message, I will verify the payment and call <strong>{studentName}</strong> at <strong>{studentPhone}</strong>.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
