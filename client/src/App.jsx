import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Signup from "./pages/signup";
import Login from "./pages/login";
import OnboardingPage from "./pages/onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/Authcontext";

function HomeRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return <Navigate to={user ? "/dashboard" : "/signup"} replace />;
}

export default function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<HomeRedirect />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
}
