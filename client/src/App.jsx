import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import OnboardingPage from './pages/onboarding';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
