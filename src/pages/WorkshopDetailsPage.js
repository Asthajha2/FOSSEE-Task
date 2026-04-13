import { useState } from 'react';

const SAMPLE_COMMENTS = [
  { id:1, author:'Ankit Verma', initials:'AV', date:'March 12, 2025', text:'Excellent workshop experience! The Python session was very well structured. Students found it extremely useful for their final year projects.', public: true },
  { id:2, author:'Dr. Meena Iyer', initials:'MI', date:'March 15, 2025', text:'Instructor note: Lab setup was smooth. Recommend increasing the NumPy session by 30 minutes next time.', public: false },
  { id:3, author:'Rohan Das', initials:'RD', date:'April 2, 2025', text:'Great hands-on examples. Could we also include a session on Pandas in future workshops?', public: true },
];

export default function WorkshopDetailsPage({ workshop, setPage, user }) {
  const [comments, setComments] = useState(SAMPLE_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  if (!workshop) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>Workshop not found</h3>
            <button className="btn btn-outline btn-sm" onClick={() => setPage('workshop-types')}>← Back to Workshops</button>
          </div>
        </div>
      </div>
    );
  }

  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, {
      id: Date.now(), author: user?.name || 'You', initials: (user?.name||'U').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(),
      date: new Date().toLocaleDateString('en-IN', { month:'long', day:'numeric', year:'numeric' }),
      text: newComment, public: isPublic,
    }]);
    setNewComment('');
  };

  const LEVEL_BADGE = { Beginner: 'badge-success', Intermediate: 'badge-warning', Advanced: 'badge-info' };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <div className="page-header-text">
            <button
              onClick={() => setPage('workshop-types')}
              style={{ background:'none', border:'none', color:'var(--text-secondary)', cursor:'pointer', fontSize:'0.85rem', marginBottom:'8px', display:'flex', alignItems:'center', gap:'6px', padding:0 }}
            >
              ← Back to Workshop Types
            </button>
            <h1>{workshop.name}</h1>
            <div style={{ display:'flex', gap:'10px', marginTop:'10px', flexWrap:'wrap' }}>
              <span className="chip">{workshop.category}</span>
              <span className={`badge ${LEVEL_BADGE[workshop.level]}`}>{workshop.level}</span>
            </div>
          </div>
          {user && user.role !== 'instructor' && (
            <button className="btn btn-primary" onClick={() => setPage('propose')}>Propose This Workshop</button>
          )}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'32px' }}>
          {/* DETAILS CARD */}
          <div className="card" style={{ gridColumn:'1 / -1' }}>
            <div className="card-header">📋 Workshop Information</div>
            <div className="card-body" style={{ padding:0 }}>
              <table className="detail-table">
                <tbody>
                  <tr>
                    <th>Workshop Name</th>
                    <td style={{ fontWeight:600 }}>{workshop.name}</td>
                  </tr>
                  <tr>
                    <th>Duration</th>
                    <td>{workshop.duration} Day{workshop.duration>1?'s':''}</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{workshop.category}</td>
                  </tr>
                  <tr>
                    <th>Level</th>
                    <td><span className={`badge ${LEVEL_BADGE[workshop.level]}`}>{workshop.level}</span></td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td style={{ color:'var(--text-secondary)', lineHeight:'1.7' }}>{workshop.desc}</td>
                  </tr>
                  <tr>
                    <th>Availability</th>
                    <td><span className="badge badge-success">● Open for Proposals</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COMMENT FORM */}
        {user && (
          <div className="card" style={{ marginBottom:'24px' }}>
            <div className="card-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
              <span>💬 Post a Comment</span>
              {user.role === 'instructor' && (
                <label className="form-check" style={{ cursor:'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={e => setIsPublic(e.target.checked)}
                  />
                  <span style={{ fontSize:'0.85rem', color:'var(--text-secondary)' }}>
                    Public {!isPublic && <span className="badge badge-dark" style={{ marginLeft:'6px' }}>Instructors only</span>}
                  </span>
                </label>
              )}
            </div>
            <div className="card-body">
              <form onSubmit={handleComment}>
                <textarea
                  className="form-control"
                  placeholder="Share your feedback or ask a question..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  rows={3}
                  aria-label="Comment text"
                />
                <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'12px' }}>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={!newComment.trim()}>
                    Post Comment →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* COMMENTS LIST */}
        <div>
          <h2 style={{ fontSize:'1.2rem', fontWeight:600, marginBottom:'20px' }}>
            💬 Comments <span style={{ fontSize:'0.85rem', color:'var(--text-muted)', fontWeight:400 }}>({comments.filter(c => user?.role==='instructor' || c.public).length})</span>
          </h2>
          {comments.filter(c => user?.role === 'instructor' || c.public).map(c => (
            <div key={c.id} className="comment-card">
              <div className="comment-header">
                <div className="avatar">{c.initials}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:'0.9rem' }}>{c.author}</div>
                  <div style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{c.date}</div>
                </div>
                {!c.public && <span className="badge badge-dark">Hidden</span>}
              </div>
              <div className="comment-body">{c.text}</div>
            </div>
          ))}
          {comments.filter(c => user?.role==='instructor' || c.public).length === 0 && (
            <div className="empty-state" style={{ padding:'40px' }}>
              <div className="empty-state-icon">💬</div>
              <h3>No comments yet</h3>
              <p>Be the first to leave feedback.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
