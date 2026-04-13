const BAR_DATA = [
  { label:'Python', count:87, color:'var(--accent-blue)' },
  { label:'Scilab', count:64, color:'var(--accent-cyan)' },
  { label:'eSim', count:52, color:'var(--accent-green)' },
  { label:'OpenFOAM', count:38, color:'var(--accent-amber)' },
  { label:'DWSIM', count:31, color:'#a78bfa' },
  { label:'QGIS', count:28, color:'#f472b6' },
  { label:'Osdag', count:22, color:'#34d399' },
  { label:'R', count:18, color:'#fb923c' },
];

const MONTHLY = [
  { month:'Aug', count:24 }, { month:'Sep', count:31 }, { month:'Oct', count:28 },
  { month:'Nov', count:19 }, { month:'Dec', count:12 }, { month:'Jan', count:22 },
  { month:'Feb', count:35 }, { month:'Mar', count:41 }, { month:'Apr', count:38 },
];

const STATES = [
  { state:'Maharashtra', count:78 }, { state:'Karnataka', count:62 }, { state:'Tamil Nadu', count:54 },
  { state:'Telangana', count:47 }, { state:'Gujarat', count:41 }, { state:'Rajasthan', count:36 },
  { state:'West Bengal', count:31 }, { state:'Kerala', count:28 },
];

const maxBar = Math.max(...BAR_DATA.map(d => d.count));
const maxMonthly = Math.max(...MONTHLY.map(d => d.count));

export default function StatisticsPage() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <div className="page-header-text">
            <h1>Workshop Statistics</h1>
            <p>Insights into FOSSEE workshop reach and impact across India</p>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="stats-row" style={{ padding:'0 0 36px', maxWidth:'none' }}>
          {[
            { num:'340', label:'Workshops This Year', icon:'🎓' },
            { num:'142', label:'Partner Colleges', icon:'🏛️' },
            { num:'8,900+', label:'Students Reached', icon:'👩‍🎓' },
            { num:'22', label:'Active Instructors', icon:'👩‍🏫' },
            { num:'18', label:'States Covered', icon:'🗺️' },
            { num:'98%', label:'Satisfaction Rate', icon:'⭐' },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div style={{ fontSize:'1.6rem', marginBottom:'8px' }}>{s.icon}</div>
              <div className="stat-number">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))', gap:'24px', marginBottom:'24px' }}>
          {/* WORKSHOPS BY TYPE */}
          <div className="card">
            <div className="card-header">📊 Workshops by Type</div>
            <div className="card-body">
              {BAR_DATA.map(d => (
                <div key={d.label} style={{ marginBottom:'14px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px', fontSize:'0.85rem' }}>
                    <span style={{ color:'var(--text-secondary)' }}>{d.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)', color:'var(--text-primary)', fontWeight:600 }}>{d.count}</span>
                  </div>
                  <div style={{ height:'8px', background:'rgba(255,255,255,0.05)', borderRadius:'100px', overflow:'hidden' }}>
                    <div style={{
                      height:'100%', borderRadius:'100px',
                      width:`${(d.count/maxBar)*100}%`,
                      background: d.color,
                      transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                    }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MONTHLY TREND */}
          <div className="card">
            <div className="card-header">📈 Monthly Workshop Trend</div>
            <div className="card-body">
              <div style={{ display:'flex', alignItems:'flex-end', gap:'8px', height:'180px', paddingBottom:'8px' }}>
                {MONTHLY.map(d => (
                  <div key={d.month} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', height:'100%', justifyContent:'flex-end' }}>
                    <span style={{ fontSize:'0.7rem', fontFamily:'var(--font-mono)', color:'var(--text-secondary)' }}>{d.count}</span>
                    <div
                      style={{
                        width:'100%', borderRadius:'4px 4px 0 0',
                        height:`${(d.count/maxMonthly)*100}%`,
                        background: 'linear-gradient(180deg, var(--accent-blue), rgba(59,130,246,0.4))',
                        minHeight:'4px',
                        transition: 'height 0.8s ease',
                      }}
                    />
                    <span style={{ fontSize:'0.7rem', color:'var(--text-muted)' }}>{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BY STATE */}
        <div className="card">
          <div className="card-header">🗺️ Top States by Workshop Count</div>
          <div className="card-body" style={{ padding:0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>State</th>
                  <th>Workshops</th>
                  <th>Distribution</th>
                </tr>
              </thead>
              <tbody>
                {STATES.map((s, i) => (
                  <tr key={s.state}>
                    <td data-label="#" style={{ fontFamily:'var(--font-mono)', width:'40px' }}>{i+1}</td>
                    <td data-label="State">{s.state}</td>
                    <td data-label="Count" style={{ fontFamily:'var(--font-mono)', fontWeight:600 }}>{s.count}</td>
                    <td data-label="Distribution" style={{ width:'200px' }}>
                      <div style={{ height:'6px', background:'rgba(255,255,255,0.05)', borderRadius:'100px', overflow:'hidden' }}>
                        <div style={{
                          height:'100%', borderRadius:'100px',
                          width:`${(s.count/STATES[0].count)*100}%`,
                          background:'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))',
                        }}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
