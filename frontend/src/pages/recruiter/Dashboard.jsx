import { useEffect, useState } from "react";
import { getRecruiterDashboard } from "../../services/recruiterDashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getRecruiterDashboard();

      if (response.success) {
        setDashboard(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard.");
    }
  };

  // Upgraded Loading State Spinner
  if (!dashboard) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium dark:text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Generate an avatar initial from the recruiter's name
  const avatarInitial = dashboard.recruiterName
    ? dashboard.recruiterName.charAt(0).toUpperCase()
    : "R";

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Warm Greeting & Profile Overview Block */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar Profile */}
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-2xl shadow-sm shrink-0">
            {avatarInitial}
          </div>
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wider">
              Employer Hub
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
              {dashboard.recruiterName}
            </h1>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">
              {dashboard.designation} at{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {dashboard.companyName}
              </span>
            </p>
          </div>
        </div>

        {/* Quick Contact Badge Grid */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 p-4 rounded-xl self-start md:self-center">
          <svg
            className="text-slate-400 dark:text-slate-500 shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <div className="text-xs">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Recruiter Email
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-350">
              {dashboard.email}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Total Candidates */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total Candidates
            </span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {dashboard.totalCandidates}
            </span>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
              In Pipeline
            </p>
          </div>
        </div>

        {/* Metric 2: Interview Sessions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Active Sessions
            </span>
            <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {dashboard.totalInterviewSessions}
            </span>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
              AI Mocks Run
            </p>
          </div>
        </div>

        {/* Metric 3: Completed Evaluations */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Evaluations
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {dashboard.completedEvaluations}
            </span>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
              Completed
            </p>
          </div>
        </div>

        {/* Metric 4: Average Score */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Average Score
            </span>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {Number(dashboard.averageInterviewScore || 0).toFixed(1)}%
            </span>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
              Overall Grade
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
