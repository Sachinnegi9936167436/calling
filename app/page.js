"use client";

import { useState } from 'react';
import Script from 'next/script';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [studentPhone, setStudentPhone] = useState('');
  const [studentName, setStudentName] = useState('');

  // YOUR DETAILS - Update these
  const creatorWhatsApp = "8218978921"; 
  const amount = "20"; 

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!studentName || !studentPhone) {
      alert("Please fill in all details");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Razorpay Order
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!orderRes.ok) throw new Error('Failed to create order');
      const orderData = await orderRes.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SSB WITH ABHI",
        description: "Consultation Fee",
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify Payment
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // 4. Submit Details to DB
            await fetch('/api/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                studentName,
                studentPhone,
                transactionId: response.razorpay_payment_id,
                amount
              }),
            });
            setSuccess(true);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
          setLoading(false);
        },
        prefill: {
          name: studentName,
          contact: studentPhone,
        },
        theme: {
          color: "#8b5cf6",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error('Error in payment flow:', error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const whatsappMessage = `Hello! I have just paid ₹${amount} for the consultation via Razorpay. %0A%0AMy Details:%0A- Name: ${studentName}%0A- Phone: ${studentPhone}%0A%0APlease verify and call me back.`;

  return (
    <div className="container">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      
      <div className="glass-card">
        {!success ? (
          <>
            <h1 className="name">SSB WITH ABHI</h1>
            <p className="bio" style={{ marginBottom: '1rem' }}>
              Book your consultation session now. Secure payment via Razorpay.
            </p>

            <div className="price-tag">
              Consultation Fee: ₹{amount}
            </div>

            <form onSubmit={handlePayment}>
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

              <button 
                type="submit"
                className="pay-btn" 
                disabled={loading}
                style={{ 
                  marginTop: '1rem',
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                }}
              >
                {loading ? <div className="loader"></div> : "Pay & Book Consultation"}
              </button>
            </form>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>
              Secured by Razorpay. All major UPI apps, Cards, and Netbanking supported.
            </p>
          </>
        ) : (
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.6' }}>
              Thank you, <strong>{studentName}</strong>! Your consultation has been booked. 
              Please click below to notify me on WhatsApp for immediate scheduling.
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
              <span style={{ fontSize: '1.2rem' }}>💬</span> Notify on WhatsApp
            </a>

            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              I will verify the booking and call you at <strong>{studentPhone}</strong> shortly.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

