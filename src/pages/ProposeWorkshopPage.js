import { useState } from 'react';

const WORKSHOP_TYPES = [
  { id:1, name:'Python for Scientific Computing', duration:2 },
  { id:2, name:'Scilab Toolbox', duration:3 },
  { id:3, name:'eSim Circuit Design', duration:2 },
  { id:4, name:'OpenFOAM CFD', duration:5 },
  { id:5, name:'DWSIM Process Simulation', duration:2 },
  { id:6, name:'Osdag Steel Design', duration:2 },
  { id:7, name:'QGIS Geographic Information', duration:3 },
  { id:8, name:'R for Data Analysis', duration:2 },
];

const TNC_TEXT = {
  1: 'The coordinator agrees to: (1) Arrange a computer lab with at least 30 systems with Python pre-installed. (2) Ensure stable internet connectivity. (3) Provide a projector and audio system. (4) Collect feedback forms from all participants at the end of the workshop.',
  2: 'The coordinator agrees to: (1) Arrange computers with Scilab installed. (2) Provide a printed participant list. (3) Ensure all systems have adequate RAM (min 4GB). (4) Arrange refreshments for participants and instructor.',
  default: 'The coordinator agrees to provide adequate infrastructure, ensure student participation, collect feedback, and cooperate with the FOSSEE instructor throughout the workshop duration.',
};

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().split('T')[0];
}
function getMaxDate() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split('T')[0];
}

export default function ProposeWorkshopPage({ setPage, user }) {
  const [form, setForm] = useState({ workshop_type: '', date: '', tnc_accepted: false });
  const [errors, setErrors] = useState({});
  const [showTnc, setShowTnc] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedWorkshop = WORKSHOP_TYPES.find(w => String(w.id) === String(form.workshop_type));

  const validate = () => {
    const e = {};
    if (!form.workshop_type) e.workshop_type = 'Please select a workshop type';
    if (!form.date) e.date = 'Please select a date';
    if (!form.tnc_accepted) e.tnc_accepted = 'You must accept the terms and conditions';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-wrapper">
        <div style={{ minHeight:'calc(100vh - 64px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 16px' }}>
          <div style={{ textAlign:'center', maxWidth:'480px' }}>
            <div style={{ fontSize:'4rem', marginBottom:'24px' }}>🎉</div>
            <h2 style={{ fontSize:'1.6rem', fontWeight:700, marginBottom:'12px' }}>Workshop Proposed!</h2>
            <p style={{ color:'var(--text-secondary)', marginBottom:'8px', lineHeight:'1.8' }}>
              Your workshop proposal for <strong>{selectedWorkshop?.name}</strong> on <strong>{new Date(form.date).toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</strong> has been submitted.
            </p>
            <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', marginBottom:'32px' }}>
              A FOSSEE instructor will review your proposal and get back to you shortly.
            </p>
            <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn btn-primary" onClick={() => setPage('workshop-status')}>View Workshop Status</button>
              <button className="btn btn-outline" onClick={() => setPage('home')}>Go to Home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div style={{ padding:'40px 16px', maxWidth:'600px', margin:'0 auto' }}>
        <div className="page-header">
          <div className="page-header-text">
            <h1>Propose a Workshop</h1>
            <p>Request a FOSSEE workshop for your institution</p>
          </div>
        </div>

        <div className="alert alert-info">
          <span>ℹ️</span>
          <span>Before proposing, please review the available workshop types and their requirements in the <strong>Workshop Types</strong> section.</span>
        </div>

        <div className="card animate-in">
          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
              {/* WORKSHOP TYPE */}
              <div className="form-group">
                <label className="form-label required">Workshop Type</label>
                <select
                  className="form-control"
                  value={form.workshop_type}
                  onChange={e => { setForm({...form, workshop_type:e.target.value}); setErrors({...errors, workshop_type:undefined}); }}
                  aria-required="true"
                  aria-invalid={!!errors.workshop_type}
                >
                  <option value="">— Select a workshop —</option>
                  {WORKSHOP_TYPES.map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({w.duration} day{w.duration>1?'s':''})</option>
                  ))}
                </select>
                {errors.workshop_type && <div style={{ fontSize:'0.78rem', color:'var(--accent-red)', marginTop:'6px' }}>⚠ {errors.workshop_type}</div>}
              </div>

              {/* SELECTED WORKSHOP INFO */}
              {selectedWorkshop && (
                <div className="alert alert-success" style={{ marginBottom:'20px' }}>
                  <span>✅</span>
                  <span style={{ fontSize:'0.85rem' }}>
                    <strong>{selectedWorkshop.name}</strong> — {selectedWorkshop.duration}-day workshop. 
                    Availability: Open for proposals.
                  </span>
                </div>
              )}

              {/* DATE */}
              <div className="form-group">
                <label className="form-label required">Preferred Start Date</label>
                <input
                  className="form-control"
                  type="date"
                  value={form.date}
                  min={getMinDate()}
                  max={getMaxDate()}
                  onChange={e => { setForm({...form, date:e.target.value}); setErrors({...errors, date:undefined}); }}
                  aria-required="true"
                  aria-invalid={!!errors.date}
                />
                <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', marginTop:'6px' }}>
                  Minimum 3 days from today. Weekends excluded by instructors.
                </div>
                {errors.date && <div style={{ fontSize:'0.78rem', color:'var(--accent-red)', marginTop:'4px' }}>⚠ {errors.date}</div>}
              </div>

              {/* TNC */}
              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="tnc"
                    checked={form.tnc_accepted}
                    onChange={e => { setForm({...form, tnc_accepted:e.target.checked}); setErrors({...errors, tnc_accepted:undefined}); }}
                    aria-required="true"
                  />
                  <label htmlFor="tnc" style={{ fontSize:'0.9rem', cursor:'pointer' }}>
                    I accept the{' '}
                    <span
                      style={{ color:'var(--accent-blue)', cursor:'pointer', textDecoration:'underline' }}
                      onClick={e => { e.preventDefault(); setShowTnc(!showTnc); }}
                    >
                      terms and conditions
                    </span>
                  </label>
                </div>
                {errors.tnc_accepted && <div style={{ fontSize:'0.78rem', color:'var(--accent-red)', marginTop:'6px' }}>⚠ {errors.tnc_accepted}</div>}
              </div>

              {/* TNC CONTENT */}
              {showTnc && (
                <div style={{ background:'rgba(59,130,246,0.05)', border:'1px solid var(--border-active)', borderRadius:'var(--radius-md)', padding:'18px', marginBottom:'20px', fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:'1.8' }}>
                  <div style={{ fontWeight:600, marginBottom:'10px', color:'var(--text-primary)' }}>Terms & Conditions</div>
                  {TNC_TEXT[form.workshop_type] || TNC_TEXT.default}
                </div>
              )}

              <div className="divider"/>

              <div style={{ display:'flex', justifyContent:'space-between', gap:'12px', flexWrap:'wrap' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setPage('workshop-types')}>← Cancel</button>
                <button type="submit" className="btn btn-success">Submit Proposal →</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
