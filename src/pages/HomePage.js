export default function HomePage({ setPage, user }) {
  const features = [
    { icon: '🎯', title: 'Targeted Learning', desc: 'Workshops designed for specific tools like Python, Scilab, eSim, and more.' },
    { icon: '🏛️', title: 'Institute-based', desc: 'Request workshops for your college or institution easily through the portal.' },
    { icon: '👩‍🏫', title: 'Expert Instructors', desc: 'FOSSEE-trained instructors deliver hands-on, industry-relevant sessions.' },
    { icon: '📊', title: 'Track Progress', desc: 'Monitor workshop status from proposal to completion in real time.' },
    { icon: '🆓', title: 'Free of Cost', desc: 'All FOSSEE workshops are completely free for educational institutions.' },
    { icon: '📱', title: 'Mobile Friendly', desc: 'Access and manage your workshops on any device, anywhere.' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"/>
        <div className="hero-grid"/>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="dot"/>
            IIT Bombay · Open Source Initiative
          </div>
          <h1 className="hero-title">
            Workshops that<br/>
            <span>Empower Students</span>
          </h1>
          <p className="hero-subtitle">
            FOSSEE brings free, high-quality technical workshops on open-source tools to colleges across India.
          </p>
          <div className="hero-actions">
            {user ? (
              <button className="btn btn-primary" onClick={() => setPage('propose')}>
                🚀 Propose a Workshop
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setPage('register')}>
                🚀 Get Started Free
              </button>
            )}
            <button className="btn btn-outline" onClick={() => setPage('workshop-types')}>
              Browse Workshops
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-row">
        {[
          { num: '500+', label: 'Workshops Conducted' },
          { num: '200+', label: 'Partner Institutes' },
          { num: '15K+', label: 'Students Trained' },
          { num: '20+', label: 'Expert Instructors' },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-number">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title">Why Choose FOSSEE?</h2>
            <p className="section-subtitle">A complete ecosystem for open-source technical education</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {features.map(f => (
              <div className="card" key={f.title} style={{ padding: '28px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 600, marginBottom: '8px', fontSize: '1rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="section">
          <div className="container">
            <div style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.1))',
              border: '1px solid var(--border-active)',
              borderRadius: 'var(--radius-xl)',
              padding: '60px 40px',
              textAlign: 'center',
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>Ready to Get Started?</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '460px', margin: '0 auto 32px' }}>
                Register as a coordinator and bring FOSSEE workshops to your institution.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => setPage('register')}>
                  Create an Account
                </button>
                <button className="btn btn-outline" onClick={() => setPage('login')}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
