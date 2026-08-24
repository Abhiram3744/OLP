

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  async function handleForgotPassword() {
    if (!email) {
      setStatus({
        type: "error",
        message: "Please enter your email address first.",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus({
        type: "success",
        message: "Password reset email sent. Please check your inbox.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      setStatus({
        type: "error",
        message: "Unable to send password reset email.",
      });
    }
  }

  return (
    <div className="forgot-password-page">
      <h2>Reset your password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send reset email</button>
      {status && <p className={status.type}>{status.message}</p>}
    </div>
  );
}