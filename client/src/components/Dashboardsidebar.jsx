import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <aside className="dashboard-sidebar">

      <Link to="/dashboard" className="sidebar-brand">
        <span className="brand-mark">PF</span>

        <span>
          Prep<span>Forge</span>
        </span>
      </Link>

      <div className="sidebar-label">
        WORKSPACE
      </div>

      <nav className="sidebar-nav">

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          <span className="sidebar-icon">⌂</span>
          Dashboard
        </Link>

        <a href="#roadmap">
          <span className="sidebar-icon">◫</span>
          My Roadmap
        </a>

        <a href="#progress">
          <span className="sidebar-icon">◔</span>
          Progress
        </a>

      </nav>

      <div className="sidebar-bottom">

        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <strong>{user?.displayName || "Learner"}</strong>
            <small>{user?.email}</small>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </aside>
  );
}