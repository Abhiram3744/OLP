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

export default function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to="/signup"
            replace
          />
        }
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