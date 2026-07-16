import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const AdminNavbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  // Track global dark/light theme state matching previous Navbars
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  // Apply theme classes to the document body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Generate an avatar initial from the admin's email (e.g., "admin@interviewhub.ai" -> "A")
  const userInitial = auth?.email ? auth.email.charAt(0).toUpperCase() : "A";

  return (
    <header className="flex justify-between items-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-8 py-4 transition-colors duration-200">
      
      {/* Dynamic Admin Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-150 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Global system configurations and portal management tools
        </p>
      </div>

      {/* Right-Side Utilities */}
      <div className="flex items-center gap-6">
        
        {/* Theme Toggle Button */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            /* Sun Icon (Light Mode) */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            /* Moon Icon (Dark Mode) */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>

        {/* System Alert / Notification Indicator */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-200">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

        {/* User Info & Admin Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm shadow-sm">
            {userInitial}
          </div>
          
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">
              Portal Admin
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {auth?.email || "admin@interviewhub.ai"}
            </span>
          </div>
        </div>

        {/* Logout Action Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-900/50 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-450 hover:bg-rose-50/50 dark:hover:bg-rose-950/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
        >
          {/* Logout SVG Icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Logout</span>
        </button>

      </div>
    </header>
  );
};

export default AdminNavbar;