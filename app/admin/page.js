"use client";

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      setError('Invalid password');
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions');
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setSubmissions(data.submissions);
    } catch (err) {
      console.error(err);
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="glass-card">
          <h1 className="name">Admin Login</h1>
          <p className="bio">Enter the password to view submissions.</p>
          
          <div className="form-group">
            <input 
              type="password" 
              className="form-input" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
              required
            />
          </div>
          {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}
          <button type="button" onClick={handleLogin} className="pay-btn">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="glass-card" style={{ maxWidth: '100%', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="name" style={{ marginBottom: 0 }}>Payment Submissions</h1>
          <button 
            onClick={fetchSubmissions} 
            className="pay-btn" 
            style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {loading && submissions.length === 0 ? (
          <div className="loader"></div>
        ) : submissions.length === 0 ? (
          <p className="bio">No submissions found yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Date</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Phone</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Transaction ID</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>{new Date(sub.timestamp).toLocaleString()}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{sub.studentName}</td>
                    <td style={{ padding: '1rem' }}>{sub.studentPhone}</td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{sub.transactionId}</td>
                    <td style={{ padding: '1rem', color: 'var(--success-color)' }}>₹{sub.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
