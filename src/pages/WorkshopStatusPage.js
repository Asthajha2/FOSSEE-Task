import { useState } from 'react';

const ACCEPTED_WORKSHOPS = [
  { id:1, coordinator:'Priya Sharma', institute:'IIT Bombay', name:'Python for Scientific Computing', date:'2025-05-15', status:'Accepted', instructor:'Dr. Raj Kumar' },
  { id:2, coordinator:'Ankit Verma', institute:'BITS Pilani', name:'Scilab Toolbox', date:'2025-06-02', status:'Accepted', instructor:'Prof. Sunita Rao' },
];

const PROPOSED_WORKSHOPS = [
  { id:3, coordinator:'Rohan Das', institute:'NIT Trichy', name:'eSim Circuit Design', date:'2025-05-28', status:'Pending', tnc:true },
  { id:4, coordinator:'Deepika Mehta', institute:'VJTI Mumbai', name:'OpenFOAM CFD', date:'2025-06-10', status:'Pending', tnc:true },
  { id:5, coordinator:'Kiran Patil', institute:'Pune University', name:'R for Data Analysis', date:'2025-07-01', status:'Pending', tnc:true },
];

export default function WorkshopStatusPage({ setPage, user }) {
  const [accepted, setAccepted] = useState(ACCEPTED_WORKSHOPS);
  const [proposed, setProposed] = useState(PROPOSED_WORKSHOPS);
  const [tab, setTab] = useState('all');

  const isInstructor = user?.role === 'instructor';

  const handleAccept = (id) => {
    const w = proposed.find(p => p.id === id);
    if (!w) return;
    if (!window.confirm(`Accept workshop "${w.name}" for ${w.coordinator} at ${w.institute}? This cannot be undone.`)) return;
    setProposed(proposed.filter(p => p.id !== id));
    setAccepted([...accepted, { ...w, status:'Accepted', instructor: user.name }]);
  };

  const isUpcoming = (dateStr) => new Date(dateStr) > new Date();

  const tabs = [
    { id:'all', label:'All Workshops', count: accepted.length + proposed.length },
    { id:'accepted', label:'Accepted', count: accepted.length },
    { id:'proposed', label:'Pending', count: proposed.length },
  ];

  const showAccepted = tab === 'all' || tab === 'accepted';
  const showProposed = tab === 'all' || tab === 'proposed';

  if (!user) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔒</div>
            <h3>Sign in required</h3>
            <p>Please sign in to view workshop status.</p>
            <button className="btn btn-primary" onClick={() => setPage('login')}>Sign In</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <div className="page-header-text">
            <h1>Workshop Status</h1>
            <p>Hello, {user.name.split(' ')[0]} 👋 — Here's an overview of your workshops.</p>
          </div>
          {!isInstructor && (
            <button className="btn btn-primary btn-sm" onClick={() => setPage('propose')}>+ Propose Workshop</button>
          )}
        </div>

        {/* SUMMARY CHIPS */}
        <div style={{ display:'flex', gap:'10px', marginBottom:'28px', flexWrap:'wrap' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`btn btn-sm ${tab===t.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setTab(t.id)}
              aria-pressed={tab===t.id}
            >
              {t.label} <span style={{ background:'rgba(255,255,255,0.15)', borderRadius:'100px', padding:'1px 7px', fontSize:'0.75rem', marginLeft:'4px' }}>{t.count}</span>
            </button>
          ))}
        </div>

        {accepted.length === 0 && proposed.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No workshops yet</h3>
            <p>Your workshop-related information will appear here. Head to Workshop Types to get started.</p>
            <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn btn-primary" onClick={() => setPage('propose')}>Propose a Workshop</button>
              <button className="btn btn-outline" onClick={() => setPage('workshop-types')}>Browse Workshop Types</button>
            </div>
          </div>
        ) : (
          <>
            {/* ACCEPTED */}
            {showAccepted && accepted.length > 0 && (
              <section style={{ marginBottom:'36px' }}>
                <h2 style={{ fontSize:'1.1rem', fontWeight:600, marginBottom:'16px', display:'flex', alignItems:'center', gap:'10px' }}>
                  <span className="badge badge-success">✓ Accepted</span>
                  Workshops
                </h2>
                <div className="table-wrapper">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Coordinator</th>
                        <th>Institute</th>
                        <th>Workshop</th>
                        <th>Date</th>
                        <th>Instructor</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accepted.map(w => (
                        <tr key={w.id}>
                          <td data-label="Coordinator">{w.coordinator}</td>
                          <td data-label="Institute" style={{ color:'var(--text-secondary)' }}>{w.institute}</td>
                          <td data-label="Workshop">{w.name}</td>
                          <td data-label="Date" style={{ color:'var(--text-secondary)', fontFamily:'var(--font-mono)', fontSize:'0.82rem' }}>
                            {new Date(w.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                            {isUpcoming(w.date) && <span className="badge badge-info" style={{ marginLeft:'8px', fontSize:'0.68rem' }}>Upcoming</span>}
                          </td>
                          <td data-label="Instructor" style={{ color:'var(--text-secondary)' }}>{w.instructor}</td>
                          <td data-label="Status"><span className="badge badge-success">● Confirmed</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* PROPOSED */}
            {showProposed && proposed.length > 0 && (
              <section>
                <h2 style={{ fontSize:'1.1rem', fontWeight:600, marginBottom:'16px', display:'flex', alignItems:'center', gap:'10px' }}>
                  <span className="badge badge-warning">⏳ Pending</span>
                  Proposals
                  {isInstructor && <span style={{ fontSize:'0.8rem', color:'var(--text-muted)', fontWeight:400 }}>— Review and accept below</span>}
                </h2>
                <div className="table-wrapper">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Coordinator</th>
                        <th>Institute</th>
                        <th>Workshop</th>
                        <th>Date</th>
                        <th>Status</th>
                        {isInstructor && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {proposed.map(w => (
                        <tr key={w.id}>
                          <td data-label="Coordinator">{w.coordinator}</td>
                          <td data-label="Institute" style={{ color:'var(--text-secondary)' }}>{w.institute}</td>
                          <td data-label="Workshop">{w.name}</td>
                          <td data-label="Date" style={{ color:'var(--text-secondary)', fontFamily:'var(--font-mono)', fontSize:'0.82rem' }}>
                            {new Date(w.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                          </td>
                          <td data-label="Status"><span className="badge badge-warning">⏳ Pending Review</span></td>
                          {isInstructor && (
                            <td data-label="Action">
                              <button className="btn btn-success btn-sm" onClick={() => handleAccept(w.id)}>
                                ✓ Accept
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
