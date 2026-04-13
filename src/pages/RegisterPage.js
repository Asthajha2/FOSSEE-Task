import { useState } from 'react';

export default function RegisterPage({ setPage }) {
  const [form, setForm] = useState({
    first_name: '', last_name: '', username: '', email: '',
    phone: '', institute: '', department: '', password: '', confirm_password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.first_name) e.first_name = 'Required';
    if (!form.last_name) e.last_name = 'Required';
    if (!form.username) e.username = 'Required';
    if (!form.email || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.phone) e.phone = 'Required';
    if (!form.institute) e.institute = 'Required';
    if (!form.password || form.password.length < 8) e.password = 'Min 8 characters';
    if (form.password !== form.confirm_password) e.confirm_password = 'Passwords do not match';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
  };

  const Field = ({ name, label, type='text', placeholder, required=true }) => (
    <div className="form-group">
      <label className={`form-label ${required ? 'required' : ''}`}>{label}</label>
      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={e => { setForm({...form, [name]: e.target.value}); setErrors({...errors, [name]: undefined}); }}
        aria-required={required}
        aria-invalid={!!errors[name]}
      />
      {errors[name] && <div style={{ fontSize: '0.78rem', color: 'var(--accent-red)', marginTop: '6px' }}>⚠ {errors[name]}</div>}
    </div>
  );

  if (submitted) {
    return (
      <div className="page-wrapper">
        <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
          <div style={{ textAlign: 'center', maxWidth: '460px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '24px' }}>✅</div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px' }}>Registration Submitted!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.7' }}>
              An activation email has been sent to <strong>{form.email}</strong>. Please check your inbox and click the activation link to complete your registration.
            </p>
            <button className="btn btn-primary" onClick={() => setPage('login')}>
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div style={{ padding: '40px 16px', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📝</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Coordinator Registration</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Create your account to propose and manage workshops</p>
        </div>

        <div className="card animate-in">
          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 20px' }}>
                <Field name="first_name" label="First Name" placeholder="Priya"/>
                <Field name="last_name" label="Last Name" placeholder="Sharma"/>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 20px' }}>
                <Field name="username" label="Username" placeholder="priya.sharma"/>
                <Field name="email" label="Email Address" type="email" placeholder="priya@iitb.ac.in"/>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 20px' }}>
                <Field name="phone" label="Phone Number" placeholder="+91 98765 43210"/>
                <Field name="institute" label="Institute Name" placeholder="IIT Bombay"/>
              </div>
              <Field name="department" label="Department" placeholder="Computer Science and Engineering" required={false}/>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 20px' }}>
                <Field name="password" label="Password" type="password" placeholder="Min 8 characters"/>
                <Field name="confirm_password" label="Confirm Password" type="password" placeholder="Repeat password"/>
              </div>

              <div className="divider"/>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setPage('login')}>
                  ← Already have an account?
                </button>
                <button type="submit" className="btn btn-primary">
                  Register →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
