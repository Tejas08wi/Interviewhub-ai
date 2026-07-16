import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const menuItems = [
    { 
      name: "Dashboard", 
      path: "/admin/dashboard",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      )
    },
    { 
      name: "Candidates", 
      path: "/admin/candidates",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    { 
      name: "Recruiters", 
      path: "/admin/recruiters",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    },
    { 
      name: "Jobs", 
      path: "/admin/jobs",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    { 
      name: "Applications", 
      path: "/admin/applications",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    { 
      name: "Interviews", 
      path: "/admin/interviews",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 dark:border-slate-950 text-slate-300 flex flex-col justify-between p-6 transition-colors duration-200">
      
      {/* Brand & Administrative Identity Section */}
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 shrink-0">
            I
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-white tracking-tight leading-none">
              InterviewHub <span className="text-blue-500 font-semibold">AI</span>
            </h2>
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-blue-500 mt-1">
              Admin Suite
            </span>
          </div>
        </div>

        {/* Global Navigation links */}
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
                  {/* Left-side visual indicator bar */}
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

      {/* Footer Branding Context */}
      <div className="border-t border-slate-800 dark:border-slate-850 pt-6 mt-6 text-center">
        <span className="text-xs text-slate-500 font-medium">System Operator v1.0</span>
      </div>
    </aside>
  );
};

export default AdminSidebar;