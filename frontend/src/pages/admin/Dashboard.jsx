import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await adminService.getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // Upgraded Loading State Spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium dark:text-slate-500">Loading system metrics...</p>
        </div>
      </div>
    );
  }

  // Enhanced data array mapping unique styles and vector icons to each card
  const cards = [
    { 
      title: "Total Users", 
      value: dashboard?.totalUsers ?? 0,
      iconColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    { 
      title: "Candidates", 
      value: dashboard?.totalCandidates ?? 0,
      iconColor: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    { 
      title: "Recruiters", 
      value: dashboard?.totalRecruiters ?? 0,
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    },
    { 
      title: "Jobs", 
      value: dashboard?.totalJobs ?? 0,
      iconColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    { 
      title: "Applications", 
      value: dashboard?.totalApplications ?? 0,
      iconColor: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    { 
      title: "Interview Sessions", 
      value: dashboard?.totalInterviewSessions ?? 0,
      iconColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    { 
      title: "Resumes", 
      value: dashboard?.totalResumes ?? 0,
      iconColor: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Welcome Title Block */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-450 dark:text-slate-500 text-sm mt-1">
          Real-time analytical summaries, database counts, and global monitoring controls.
        </p>
      </div>

      {/* Grid of Dynamic Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Title Header & SVG Wrapper */}
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {card.title}
              </h3>
              <div className={`p-2.5 rounded-xl shrink-0 ${card.iconColor}`}>
                {card.icon}
              </div>
            </div>

            {/* Metric Value */}
            <div className="mt-4">
              <p className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                {card.value}
              </p>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                Active Records
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;