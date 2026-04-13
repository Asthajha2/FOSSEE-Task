import { useState } from 'react';

export default function Navbar({ currentPage, setPage, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = user ? [
    { id: 'home', label: 'Home' },
    { id: 'workshop-types', label: 'Workshop Types' },
    { id: 'workshop-status', label: 'Workshop Status' },
    ...(user.role !== 'instructor' ? [{ id: 'propose', label: 'Propose Workshop' }] : []),
    { id: 'statistics', label: 'Statistics' },
  ] : [
    { id: 'home', label: 'Home' },
    { id: 'statistics', label: 'Statistics' },
  ];

  const initials = user ? (user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()) : '';

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">🎓</div>
          <span>FOSSEE Workshops</span>
        </div>

        <ul className="navbar-links">
          {navItems.map(item => (
            <li key={item.id}>
              <span
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => { setPage(item.id); setMenuOpen(false); }}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="navbar-end">
          {user ? (
            <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.03)', transition: 'var(--transition)' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                tabIndex={0}
              >
                <div className="avatar">{initials}</div>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }} className="hide-mobile">
                  {user.name.split(' ')[0]}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => { setPage('profile'); setDropdownOpen(false); }}>
                  👤 My Profile
                </div>
                <div className="dropdown-item" onClick={() => { setPage('change-password'); setDropdownOpen(false); }}>
                  🔑 Change Password
                </div>
                <div className="dropdown-divider"/>
                <div className="dropdown-item" onClick={onLogout} style={{ color: '#fca5a5' }}>
                  🚪 Logout
                </div>
              </div>
            </div>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm hide-mobile" onClick={() => setPage('login')}>Sign In</button>
              <button className="btn btn-primary btn-sm" onClick={() => setPage('register')}>Register</button>
            </>
          )}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>
      </nav>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <span
            key={item.id}
            className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => { setPage(item.id); setMenuOpen(false); }}
          >
            {item.label}
          </span>
        ))}
        <div className="divider"/>
        {user ? (
          <>
            <span className="nav-link" onClick={() => { setPage('profile'); setMenuOpen(false); }}>👤 Profile</span>
            <span className="nav-link" style={{ color: '#fca5a5' }} onClick={() => { onLogout(); setMenuOpen(false); }}>🚪 Logout</span>
          </>
        ) : (
          <>
            <span className="nav-link" onClick={() => { setPage('login'); setMenuOpen(false); }}>Sign In</span>
            <span className="nav-link" onClick={() => { setPage('register'); setMenuOpen(false); }}>Register</span>
          </>
        )}
      </div>
    </>
  );
}
