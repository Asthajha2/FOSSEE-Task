import { useState } from 'react';

const WORKSHOPS = [
  { id: 1, name: 'Python for Scientific Computing', duration: 2, level: 'Beginner', category: 'Programming', desc: 'Hands-on introduction to Python with NumPy, SciPy and Matplotlib for scientific applications.' },
  { id: 2, name: 'Scilab Toolbox', duration: 3, level: 'Intermediate', category: 'Math Tools', desc: 'Open-source MATLAB alternative for numerical computation and simulation.' },
  { id: 3, name: 'eSim Circuit Design', duration: 2, level: 'Beginner', category: 'Electronics', desc: 'Electronic circuit simulation using the open-source eSim tool developed by FOSSEE.' },
  { id: 4, name: 'OpenFOAM CFD', duration: 5, level: 'Advanced', category: 'Simulation', desc: 'Computational fluid dynamics simulations using the powerful open-source OpenFOAM framework.' },
  { id: 5, name: 'DWSIM Process Simulation', duration: 2, level: 'Intermediate', category: 'Chemical Engg', desc: 'Chemical process simulation and modelling using DWSIM, a free, open-source simulator.' },
  { id: 6, name: 'Osdag Steel Design', duration: 2, level: 'Beginner', category: 'Civil Engg', desc: 'Design of steel structures using Osdag, with IS code integration and 3D visualization.' },
  { id: 7, name: 'QGIS Geographic Information', duration: 3, level: 'Beginner', category: 'GIS', desc: 'Geospatial analysis and mapping using the open-source QGIS desktop application.' },
  { id: 8, name: 'R for Data Analysis', duration: 2, level: 'Intermediate', category: 'Data Science', desc: 'Statistical computing and data visualization using the R programming language and RStudio.' },
];

const LEVEL_BADGE = { Beginner: 'badge-success', Intermediate: 'badge-warning', Advanced: 'badge-info' };
const PAGE_SIZE = 6;

export default function WorkshopTypesPage({ setPage, setSelectedWorkshop, user }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setCurPage] = useState(1);
  const [view, setView] = useState('grid');

  const categories = ['All', ...new Set(WORKSHOPS.map(w => w.category))];
  const filtered = WORKSHOPS.filter(w =>
    (category === 'All' || w.category === category) &&
    w.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <div className="page-header-text">
            <h1>Workshop Types</h1>
            <p>Browse all available FOSSEE workshop programs</p>
          </div>
          {user?.role === 'instructor' && (
            <button className="btn btn-primary btn-sm" onClick={() => setPage('add-workshop-type')}>
              + Add Workshop Type
            </button>
          )}
        </div>

        {/* FILTERS */}
        <div style={{ display:'flex', gap:'12px', marginBottom:'28px', flexWrap:'wrap', alignItems:'center' }}>
          <div style={{ position:'relative', flex:'1', minWidth:'200px' }}>
            <input
              className="form-control"
              placeholder="🔍  Search workshops..."
              value={search}
              onChange={e => { setSearch(e.target.value); setCurPage(1); }}
              aria-label="Search workshops"
              style={{ paddingLeft: '16px' }}
            />
          </div>
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
            {categories.map(c => (
              <button
                key={c}
                className={`btn btn-sm ${category===c ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => { setCategory(c); setCurPage(1); }}
                aria-pressed={category===c}
              >
                {c}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:'4px', marginLeft:'auto' }}>
            <button className={`btn btn-sm ${view==='grid'?'btn-outline':'btn-ghost'}`} onClick={() => setView('grid')} aria-label="Grid view">⊞</button>
            <button className={`btn btn-sm ${view==='list'?'btn-outline':'btn-ghost'}`} onClick={() => setView('list')} aria-label="List view">☰</button>
          </div>
        </div>

        {/* RESULT COUNT */}
        <p style={{ fontSize:'0.85rem', color:'var(--text-muted)', marginBottom:'20px' }}>
          Showing {paged.length} of {filtered.length} workshops
        </p>

        {/* GRID VIEW */}
        {view === 'grid' && (
          <div className="workshop-grid">
            {paged.map(w => (
              <article
                key={w.id}
                className="workshop-card"
                onClick={() => { setSelectedWorkshop(w); setPage('workshop-details'); }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${w.name}`}
                onKeyDown={e => e.key==='Enter' && (setSelectedWorkshop(w), setPage('workshop-details'))}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px' }}>
                  <span className="chip">{w.category}</span>
                  <span className={`badge ${LEVEL_BADGE[w.level]}`}>{w.level}</span>
                </div>
                <h3 className="workshop-card-title">{w.name}</h3>
                <p className="workshop-card-desc">{w.desc}</p>
                <div className="workshop-card-meta">
                  <span>📅 {w.duration} Day{w.duration>1?'s':''}</span>
                  <span style={{ marginLeft:'auto', color:'var(--accent-blue)', fontSize:'0.8rem', fontWeight:600 }}>
                    View Details →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* LIST VIEW */}
        {view === 'list' && (
          <div className="table-wrapper">
            <table className="table" role="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Workshop Name</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((w, i) => (
                  <tr key={w.id}>
                    <td data-label="#">{(page-1)*PAGE_SIZE + i + 1}</td>
                    <td data-label="Workshop">{w.name}</td>
                    <td data-label="Category"><span className="chip">{w.category}</span></td>
                    <td data-label="Duration">{w.duration} day{w.duration>1?'s':''}</td>
                    <td data-label="Level"><span className={`badge ${LEVEL_BADGE[w.level]}`}>{w.level}</span></td>
                    <td data-label="Action">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => { setSelectedWorkshop(w); setPage('workshop-details'); }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔭</div>
            <h3>No workshops found</h3>
            <p>Try adjusting your search or filter.</p>
            <button className="btn btn-outline btn-sm" onClick={() => { setSearch(''); setCategory('All'); }}>Clear Filters</button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination" role="navigation" aria-label="Pagination">
            <button className="page-btn" disabled={page===1} onClick={() => setCurPage(p => p-1)} aria-label="Previous page">‹</button>
            {Array.from({length: totalPages}, (_,i) => (
              <button key={i} className={`page-btn ${page===i+1?'active':''}`} onClick={() => setCurPage(i+1)} aria-label={`Page ${i+1}`} aria-current={page===i+1?'page':undefined}>{i+1}</button>
            ))}
            <button className="page-btn" disabled={page===totalPages} onClick={() => setCurPage(p => p+1)} aria-label="Next page">›</button>
            <span className="page-info">Page {page}/{totalPages}</span>
          </div>
        )}
      </div>
    </div>
  );
}
