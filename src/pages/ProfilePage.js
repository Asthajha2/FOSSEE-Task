import { useState } from 'react';

export default function ProfilePage({ user, setPage }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: user?.name?.split(' ')[0] || '',
    last_name: user?.name?.split(' ')[1] || '',
    email: 'priya.sharma@iitb.ac.in',
    phone: '+91 98765 43210',
    institute: user?.institute || 'IIT Bombay',
    department: 'Computer Science and Engineering',
  });
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔒</div>
            <h3>Sign in required</h3>
            <button className="btn btn-primary" onClick={() => setPage('login')}>Sign In</button>
          </div>
        </div>
      </div>
    );
  }

  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-wrapper">
      <div style={{ padding:'40px 16px', maxWidth:'700px', margin:'0 auto' }}>
        <div className="page-header">
          <div className="page-header-text">
            <h1>My Profile</h1>
            <p>Manage your account and personal information</p>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            {!editing && (
              <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
            )}
            <button className="btn btn-ghost btn-sm" onClick={() => setPage('change-password')}>🔑 Change Password</button>
          </div>
        </div>

        {saved && (
          <div className="alert alert-success animate-in">
            <span>✅</span>
            <span>Profile updated successfully!</span>
          </div>
        )}

        {/* AVATAR CARD */}
        <div className="card" style={{ marginBottom:'20px' }}>
          <div className="card-body" style={{ display:'flex', alignItems:'center', gap:'24px', flexWrap:'wrap' }}>
            <div className="avatar avatar-lg">{initials}</div>
            <div>
              <h2 style={{ fontSize:'1.3rem', fontWeight:700, marginBottom:'4px' }}>{user.name}</h2>
              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                <span className="chip">
                  {user.role === 'instructor' ? '👩‍🏫 Instructor' : '📋 Coordinator'}
                </span>
                <span className="chip">🏛️ {user.institute}</span>
                <span className="badge badge-success">● Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* INFO / EDIT */}
        <div className="card">
          <div className="card-header">Personal Information</div>
          <div className="card-body">
            {editing ? (
              <form onSubmit={handleSave}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'0 20px' }}>
                  {[
                    { key:'first_name', label:'First Name' },
                    { key:'last_name', label:'Last Name' },
                  ].map(f => (
                    <div className="form-group" key={f.key}>
                      <label className="form-label">{f.label}</label>
                      <input className="form-control" value={form[f.key]} onChange={e => setForm({...form, [f.key]:e.target.value})}/>
                    </div>
                  ))}
                </div>
                {[
                  { key:'email', label:'Email Address', type:'email' },
                  { key:'phone', label:'Phone Number' },
                  { key:'institute', label:'Institute' },
                  { key:'department', label:'Department' },
                ].map(f => (
                  <div className="form-group" key={f.key}>
                    <label className="form-label">{f.label}</label>
                    <input className="form-control" type={f.type||'text'} value={form[f.key]} onChange={e => setForm({...form, [f.key]:e.target.value})}/>
                  </div>
                ))}
                <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            ) : (
              <table className="detail-table">
                <tbody>
                  {[
                    { label:'Full Name', value: `${form.first_name} ${form.last_name}` },
                    { label:'Username', value: user.username },
                    { label:'Email', value: form.email },
                    { label:'Phone', value: form.phone },
                    { label:'Institute', value: form.institute },
                    { label:'Department', value: form.department },
                    { label:'Role', value: user.role === 'instructor' ? 'Instructor' : 'Coordinator' },
                  ].map(row => (
                    <tr key={row.label}>
                      <th>{row.label}</th>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
