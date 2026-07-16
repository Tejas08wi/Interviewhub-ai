import { NavLink } from "react-router-dom";

function RecruiterSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/recruiter/profile",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      name: "Jobs",
      path: "/recruiter/jobs",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 dark:border-slate-950 text-slate-300 flex flex-col justify-between p-6 transition-colors duration-200">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
            I
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            InterviewHub <span className="text-blue-500 font-semibold">AI</span>
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 font-semibold"
                    : "hover:bg-slate-800/60 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Accent Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md bg-blue-500" />
                  )}
                  <span className={`transition-colors duration-200 ${
                    isActive 
                      ? "text-blue-500" 
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Branding Info */}
      <div className="border-t border-slate-800 dark:border-slate-850 pt-6 mt-6 text-center">
        <span className="text-xs text-slate-500 font-medium">Recruiter Workspace v1.0</span>
      </div>
    </div>
  );
}

export default RecruiterSidebar;