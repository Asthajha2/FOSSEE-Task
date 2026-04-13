import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WorkshopTypesPage from './pages/WorkshopTypesPage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';
import ProposeWorkshopPage from './pages/ProposeWorkshopPage';
import WorkshopStatusPage from './pages/WorkshopStatusPage';
import StatisticsPage from './pages/StatisticsPage';
import ProfilePage from './pages/ProfilePage';

function ChangePasswordPage({ setPage }) {
  const [form, setForm] = useState({ old:'', new1:'', new2:'' });
  const [done, setDone] = useState(false);
  return (
    <div className="page-wrapper">
      <div style={{minHeight:'calc(100vh - 64px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 16px'}}>
        <div style={{width:'100%',maxWidth:'420px'}}>
          <div style={{textAlign:'center',marginBottom:'32px'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>🔑</div>
            <h1 style={{fontSize:'1.5rem',fontWeight:700}}>Change Password</h1>
          </div>
          {done ? (
            <div className="alert alert-success animate-in">
              <span>✅</span>
              <span>Password changed! <span style={{cursor:'pointer',color:'var(--accent-blue)'}} onClick={()=>setPage('profile')}>Back to Profile →</span></span>
            </div>
          ) : (
            <div className="card animate-in">
              <div className="card-body">
                <form onSubmit={e=>{e.preventDefault();setDone(true);}}>
                  {[{k:'old',l:'Current Password'},{k:'new1',l:'New Password'},{k:'new2',l:'Confirm New Password'}].map(f=>(
                    <div className="form-group" key={f.k}>
                      <label className="form-label required">{f.l}</label>
                      <input className="form-control" type="password" value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} required/>
                    </div>
                  ))}
                  <div style={{display:'flex',justifyContent:'space-between',gap:'10px'}}>
                    <button type="button" className="btn btn-ghost" onClick={()=>setPage('profile')}>← Cancel</button>
                    <button type="submit" className="btn btn-primary">Update Password</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ForgotPasswordPage({ setPage }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="page-wrapper">
      <div style={{minHeight:'calc(100vh - 64px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 16px'}}>
        <div style={{width:'100%',maxWidth:'420px'}}>
          <div style={{textAlign:'center',marginBottom:'32px'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>📧</div>
            <h1 style={{fontSize:'1.5rem',fontWeight:700}}>Reset Password</h1>
            <p style={{color:'var(--text-secondary)',marginTop:'8px',fontSize:'0.9rem'}}>We'll send you a reset link.</p>
          </div>
          {sent ? (
            <div className="alert alert-success animate-in"><span>✅</span><span>Reset link sent to <strong>{email}</strong>.</span></div>
          ) : (
            <div className="card animate-in">
              <div className="card-body">
                <form onSubmit={e=>{e.preventDefault();setSent(true);}}>
                  <div className="form-group">
                    <label className="form-label required">Email Address</label>
                    <input className="form-control" type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Send Reset Link</button>
                </form>
                <div className="divider"/>
                <button className="btn btn-ghost btn-sm" style={{width:'100%',justifyContent:'center'}} onClick={()=>setPage('login')}>← Back to Sign In</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const handleLogin = (userData) => { setUser(userData); setPage('home'); };
  const handleLogout = () => { setUser(null); setPage('home'); };

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} user={user}/>;
      case 'login': return <LoginPage onLogin={handleLogin} setPage={setPage}/>;
      case 'register': return <RegisterPage setPage={setPage}/>;
      case 'forgot-password': return <ForgotPasswordPage setPage={setPage}/>;
      case 'workshop-types': return <WorkshopTypesPage setPage={setPage} setSelectedWorkshop={setSelectedWorkshop} user={user}/>;
      case 'workshop-details': return <WorkshopDetailsPage workshop={selectedWorkshop} setPage={setPage} user={user}/>;
      case 'propose': return user ? <ProposeWorkshopPage setPage={setPage} user={user}/> : <LoginPage onLogin={handleLogin} setPage={setPage}/>;
      case 'workshop-status': return <WorkshopStatusPage setPage={setPage} user={user}/>;
      case 'statistics': return <StatisticsPage/>;
      case 'profile': return <ProfilePage user={user} setPage={setPage}/>;
      case 'change-password': return <ChangePasswordPage setPage={setPage}/>;
      default: return <HomePage setPage={setPage} user={user}/>;
    }
  };

  return (
    <>
      <Navbar currentPage={page} setPage={setPage} user={user} onLogout={handleLogout}/>
      <main id="main-content" role="main">{renderPage()}</main>
      <Footer/>
    </>
  );
}
