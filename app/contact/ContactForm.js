"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <Link 
        href="/" 
        style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px', 
          color: 'var(--text-muted)', 
          textDecoration: 'none',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        ← Back
      </Link>

      {!success ? (
        <>
          <h1 className="name">Contact Us</h1>
          <p className="bio">
            Have questions or need help? Send us a message and we'll get back to you.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                name="name"
                id="contact-name"
                className="form-input" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                name="email"
                id="contact-email"
                className="form-input" 
                placeholder="your.email@example.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input 
                type="text" 
                name="subject"
                id="contact-subject"
                className="form-input" 
                placeholder="What is this about?" 
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea 
                name="message"
                id="contact-message"
                className="form-input" 
                placeholder="Type your message here..." 
                rows="4"
                style={{ resize: 'none' }}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              id="contact-submit"
              className="pay-btn" 
              disabled={loading}
            >
              {loading ? <div className="loader"></div> : "Send Message"}
            </button>
          </form>
        </>
      ) : (
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Sent!</h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.6' }}>
            Thank you for reaching out. We have received your message and will get back to you soon.
          </p>
          
          <Link 
            href="/"
            className="pay-btn"
            style={{ 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginTop: '1rem'
            }}
          >
            Return Home
          </Link>
        </div>
      )}
    </div>
  );
}
