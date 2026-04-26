"use client";

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [studentPhone, setStudentPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // YOUR DETAILS - Update these
  const creatorUPI = "yourname@upi"; 
  const creatorWhatsApp = "919876543210"; 
  const amount = "10"; // Updated to 10 as per your change

  const upiLink = `upi://pay?pa=${creatorUPI}&pn=Consultation&am=${amount}&cu=INR`;

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    if (!studentName || !studentPhone || !transactionId) {
      alert("Please fill in all details");
      return;
    }

    setLoading(true);
    
    // Simulate a submission delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  const whatsappMessage = `Hello! I have just paid ₹${amount} for the consultation. %0A%0AMy Details:%0A- Name: ${studentName}%0A- Phone: ${studentPhone}%0A- Transaction ID: ${transactionId}%0A%0APlease verify and call me back.`;

  return (
    <div className="container">
      <div className="glass-card">
        {!success ? (
          <>
            <div className="profile-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Profile" 
                className="profile-img"
              />
            </div>
            
            <h1 className="name">Content Creator</h1>
            <p className="bio" style={{ marginBottom: '1rem' }}>
              Pay the consultation fee manually to get a direct call from me.
            </p>

            <div className="price-tag">
              Consultation Fee: ₹{amount}
            </div>

            <div className="payment-instructions">
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Pay ₹{amount} to this UPI ID:</p>
              <div className="upi-id">{creatorUPI}</div>
              
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

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                (Take a screenshot after payment)
              </p>
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
                  placeholder="Enter 12-digit UTR or Transaction ID" 
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
              Final Step: Please click the button below to send your payment details to me on WhatsApp for instant verification.
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
  );
}
