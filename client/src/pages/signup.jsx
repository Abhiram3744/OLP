import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';


function BrandMark() {
  return <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect x="4" y="24" width="32" height="6" rx="1.5" fill="#fff"/><rect x="9" y="17" width="8" height="9" rx="1" fill="#fff"/><path d="M23 6 27 13h5l-6 11h-5l6-11h-4l-4 7-4-7h5l3-7Z" fill="#FF7A3D"/></svg>;
}

function EyeIcon({ hidden }) {
  return hidden ? <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.8 21.8 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="m1 1 22 22"/></svg> : <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
}

export default function signup() {
const navigate = useNavigate(); // <-- ADD THIS LINE
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
  event.preventDefault();
  setStatus({ type: '', message: '' });

  if (password !== confirmPassword) {
    setStatus({
      type: 'error',
      message: 'Passwords do not match.',
    });
    return;
  }

  setIsSubmitting(true);

  try {
    // Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Create the user's profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    setStatus({
      type: 'success',
      message: `Account created for ${user.email}.`,
    });

    setPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      navigate('/login');
    }, 1500);

  } catch (error) {
    console.error('Signup error:', error);

    let message = 'Unable to create your account.';

    if (error.code === 'auth/email-already-in-use') {
      message = 'An account already exists with this email.';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address.';
    } else if (error.code === 'auth/weak-password') {
      message = 'Password should be at least 6 characters.';
    }

    setStatus({
      type: 'error',
      message,
    });

  } finally {
    setIsSubmitting(false);
  }
}

  return <main className="page-shell">
    <section className="panel-left" aria-label="PrepForge introduction">
      <div className="grain" />
      {Array.from({ length: 6 }, (_, index) => <span className="spark" key={index} />)}
      <div className="brand"><BrandMark /><span className="brand-name">Prep<span>Forge</span></span></div>
      <div className="hero"><span className="eyebrow">Create your account</span><h1>Forge your<br /><em>prep.</em> Show up<br />ready.</h1><p>Practice questions, mock tests, and structured study plans — built to turn exam prep into exam confidence.</p></div>
    </section>
    <section className="panel-right">
      <div className="card">
        <div className="card-head"><h2>Create an account</h2><p>Start your prep — it takes less than a minute.</p></div>
        <form onSubmit={handleSubmit}>
          <div className="field"><label htmlFor="email">Email</label><div className="input-wrap"><input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required autoComplete="email" /></div></div>
          <div className="field"><label htmlFor="password">Password</label><div className="input-wrap"><input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required autoComplete="new-password" minLength="8" /><button type="button" className="toggle-eye" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}><EyeIcon hidden={showPassword} /></button></div><p className="hint">Use at least 8 characters.</p></div>
          <div className="field"><label htmlFor="confirm-password">Confirm password</label><div className="input-wrap"><input type={showConfirmPassword ? 'text' : 'password'} id="confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm your password" required autoComplete="new-password" minLength="8" /><button type="button" className="toggle-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? 'Hide confirmed password' : 'Show confirmed password'}><EyeIcon hidden={showConfirmPassword} /></button></div></div>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Creating account…' : 'Create account'}</button>
          {status.message && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}
        </form>
        <p className="footnote">Already have an account? <Link to="/login">Log in</Link></p>

        <p className="legal">By creating an account, you agree to PrepForge's <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
      </div>
    </section>
  </main>;
}
