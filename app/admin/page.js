"use client";

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions', 'messages'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'contacted'

  // Check for existing session on load
  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session === 'money') {
      setIsAuthenticated(true);
      fetchSubmissions();
      fetchContacts();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'money') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_session', 'money');
      fetchSubmissions();
      fetchContacts();
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_session');
    setPassword('');
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

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      if (!res.ok) throw new Error('Failed to fetch contacts');
      const data = await res.json();
      setContacts(data.contacts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete');
      
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting message');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete');
      
      setSubmissions(submissions.filter(sub => sub._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting submission');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contacted: !currentStatus }),
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      const data = await res.json();
      
      setSubmissions(submissions.map(sub => 
        sub._id === id ? { ...sub, contacted: data.submission.contacted } : sub
      ));
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  // Filter and Search Logic
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.studentPhone.includes(searchTerm) ||
      sub.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'pending' && !sub.contacted) || 
      (statusFilter === 'contacted' && sub.contacted);
      
    return matchesSearch && matchesStatus;
  });

  const filteredContacts = contacts.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.subject.toLowerCase().includes(term) ||
      c.message.toLowerCase().includes(term)
    );
  });

  // Calculate Stats
  const stats = {
    total: submissions.length,
    revenue: submissions.reduce((acc, sub) => acc + (parseFloat(sub.amount) || 0), 0),
    pending: submissions.filter(s => !s.contacted).length,
    contacted: submissions.filter(s => s.contacted).length,
    messages: contacts.length
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
    <div style={{ padding: '2rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header with Logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="name" style={{ marginBottom: '0.25rem' }}>Admin Dashboard</h1>
          <p className="bio" style={{ margin: 0, textAlign: 'left' }}>Manage your payment submissions</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => { fetchSubmissions(); fetchContacts(); }} className="pay-btn" style={{ width: 'auto', padding: '0.6rem 1.2rem', fontSize: '0.875rem', background: 'rgba(255,255,255,0.1)' }}>
            {loading ? '...' : 'Refresh'}
          </button>
          <button onClick={handleLogout} className="pay-btn" style={{ width: 'auto', padding: '0.6rem 1.2rem', fontSize: '0.875rem', background: '#ef4444' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('submissions')}
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'submissions' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          💳 Submissions ({stats.total})
        </button>
        <button 
          onClick={() => setActiveTab('messages')}
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'messages' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          ✉️ Messages ({stats.messages})
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        <div className="glass-card" style={{ padding: '1.5rem', margin: 0, textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</p>
          <h2 style={{ fontSize: '2rem', margin: '0.5rem 0', color: 'var(--success-color)' }}>₹{stats.revenue}</h2>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', margin: 0, textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Submissions</p>
          <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.total}</h2>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', margin: 0, textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Pending Calls</p>
          <h2 style={{ fontSize: '2rem', margin: '0.5rem 0', color: '#eab308' }}>{stats.pending}</h2>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', margin: 0, textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Contacted</p>
          <h2 style={{ fontSize: '2rem', margin: '0.5rem 0', color: '#22c55e' }}>{stats.contacted}</h2>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="glass-card" style={{ maxWidth: '100%', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <input 
            type="text" 
            placeholder="Search by name, phone or Transaction ID..." 
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: 0 }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'pending', 'contacted'].map(filter => (
            <button 
              key={filter}
              onClick={() => setStatusFilter(filter)}
              style={{
                background: statusFilter === filter ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-card" style={{ maxWidth: '100%', padding: '1.5rem' }}>
        {activeTab === 'submissions' ? (
          <>
            {loading && submissions.length === 0 ? (
              <div className="loader"></div>
            ) : filteredSubmissions.length === 0 ? (
              <p className="bio">No matching submissions found.</p>
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
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((sub) => (
                      <tr key={sub._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{new Date(sub.timestamp).toLocaleString()}</td>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>{sub.studentName}</td>
                        <td style={{ padding: '1rem' }}>{sub.studentPhone}</td>
                        <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--accent-primary)', fontSize: '0.875rem' }}>{sub.transactionId}</td>
                        <td style={{ padding: '1rem', color: 'var(--success-color)', fontWeight: 600 }}>₹{sub.amount}</td>
                        <td style={{ padding: '1rem' }}>
                          <button 
                            onClick={() => toggleStatus(sub._id, sub.contacted)}
                            style={{
                              background: sub.contacted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                              color: sub.contacted ? '#22c55e' : '#eab308',
                              border: `1px solid ${sub.contacted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)'}`,
                              padding: '0.4rem 0.8rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              width: '100px',
                              textAlign: 'center',
                              transition: 'all 0.2s'
                            }}
                          >
                            {sub.contacted ? 'Contacted' : 'Pending'}
                          </button>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <button 
                            onClick={() => handleDelete(sub._id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              color: '#ef4444',
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.875rem',
                              transition: 'all 0.2s'
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            {loading && contacts.length === 0 ? (
              <div className="loader"></div>
            ) : filteredContacts.length === 0 ? (
              <p className="bio">No messages found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Date</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>From</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Subject</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Message</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{new Date(contact.timestamp).toLocaleString()}</td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 600 }}>{contact.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{contact.email}</div>
                        </td>
                        <td style={{ padding: '1rem', fontWeight: 500 }}>{contact.subject}</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', maxWidth: '300px' }}>
                          <div style={{ 
                            whiteSpace: 'pre-wrap', 
                            maxHeight: '100px', 
                            overflowY: 'auto',
                            background: 'rgba(0,0,0,0.1)',
                            padding: '0.5rem',
                            borderRadius: '8px'
                          }}>
                            {contact.message}
                          </div>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <button 
                            onClick={() => handleDeleteContact(contact._id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              color: '#ef4444',
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.875rem',
                              transition: 'all 0.2s'
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
