import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Cpu, 
  Video, 
  Briefcase, 
  FileCheck2,
  LogOut
} from "lucide-react";

function CandidateSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/candidate/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      path: "/candidate/profile",
      icon: User,
    },
    {
      name: "Resume",
      path: "/candidate/resume",
      icon: FileText,
    },
    {
      name: "Resume Analysis",
      path: "/candidate/resume-analysis",
      icon: Cpu,
    },
    {
      name: "AI Interview",
      path: "/candidate/interview",
      icon: Video,
    },
    {
      name: "Jobs",
      path: "/candidate/jobs",
      icon: Briefcase,
    },
    {
      name: "Applications",
      path: "/candidate/applications",
      icon: FileCheck2,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 dark:bg-black border-r border-slate-800 dark:border-slate-950 text-slate-300 flex flex-col justify-between p-6 transition-colors duration-200">
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
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
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
                    <Icon 
                      size={18} 
                      className={`transition-colors duration-200 ${
                        isActive 
                          ? "text-blue-500" 
                          : "text-slate-400 group-hover:text-slate-200"
                      }`} 
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile / Utility Section */}
      <div className="border-t border-slate-800 pt-6 mt-6">
        
      </div>
    </div>
  );
}

export default CandidateSidebar;