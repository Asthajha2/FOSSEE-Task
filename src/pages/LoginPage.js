import { useState } from 'react';

export default function LoginPage({ onLogin, setPage }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      // Simulate login - in real app this hits Django backend
      if (form.username === 'coordinator' && form.password === 'demo123') {
        onLogin({ name: 'Priya Sharma', username: 'coordinator', role: 'coordinator', institute: 'IIT Bombay' });
      } else if (form.username === 'instructor' && form.password === 'demo123') {
        onLogin({ name: 'Dr. Raj Kumar', username: 'instructor', role: 'instructor', institute: 'FOSSEE Team' });
      } else {
        setError('Invalid username or password. (Try: coordinator / demo123)');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="page-wrapper">
      <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔐</div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sign in to your FOSSEE account</p>
          </div>

          <div className="card animate-in">
            <div className="card-body">
              {error && (
                <div className="alert alert-danger">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label required">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={e => setForm({...form, username: e.target.value})}
                    autoComplete="username"
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                    autoComplete="current-password"
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                  disabled={loading}
                >
                  {loading ? '⏳ Signing in...' : '→ Sign In'}
                </button>
              </form>

              <div className="divider"/>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ width: '100%', justifyContent: 'center', color: 'var(--accent-blue)' }}
                  onClick={() => setPage('register')}
                >
                  New here? Create an account →
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setPage('forgot-password')}
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>

          <div className="alert alert-info" style={{ marginTop: '20px' }}>
            <span>💡</span>
            <span style={{ fontSize: '0.82rem' }}>Demo: <strong>coordinator</strong> / demo123 or <strong>instructor</strong> / demo123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
