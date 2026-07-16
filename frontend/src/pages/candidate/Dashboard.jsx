import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import the exact working candidate, interview, and application services
import candidateService from "../../services/candidateService"; 
import interviewService from "../../services/interviewService";
import applicationService from "../../services/applicationService";

function Dashboard() {
  const [resumeScore, setResumeScore] = useState(0);
  const [completedInterviews, setCompletedInterviews] = useState([]);
  const [activeApplications, setActiveApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllRealData();
  }, []);

  const loadAllRealData = async () => {
    try {
      // 1. Fetch real Resume Score using getProfile() from your candidateService
      try {
        const profileResponse = await candidateService.getProfile();
        const profileData = profileResponse?.data?.data || profileResponse?.data || profileResponse;
        if (profileData) {
          setResumeScore(profileData.resumeScore || profileData.score || 0);
        }
      } catch (err) {
        console.warn("Failed to load profile score from getProfile:", err);
      }

      // 2. Fetch real Mock Interview History matching your Interview.jsx page exactly
      try {
        const interviewResponse = await interviewService.getInterviewHistory();
        const interviewData = interviewResponse?.data?.data || interviewResponse?.data || interviewResponse;
        if (Array.isArray(interviewData)) {
          setCompletedInterviews(interviewData);
        }
      } catch (err) {
        console.warn("Failed to load interview history:", err);
      }

      // 3. Fetch real Applications matching your Applications.jsx page exactly
      try {
        const appsResponse = await applicationService.getApplications();
        const appsData = appsResponse?.data?.data || appsResponse?.data || appsResponse;
        if (Array.isArray(appsData)) {
          setActiveApplications(appsData);
        }
      } catch (err) {
        console.warn("Failed to load job applications:", err);
      }

    } catch (error) {
      console.error("General dashboard loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Safely filter scheduled interviews that have a future date
  const upcomingInterviews = completedInterviews.filter((item) => {
    if (item.status === "SCHEDULED") return true;
    if (!item.createdAt) return false;
    return new Date(item.createdAt) > new Date();
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium dark:text-slate-500">Loading your metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* 1. Warm Greeting Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 text-white shadow-xl shadow-indigo-950/10 border border-slate-800">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 uppercase tracking-wider">
            <svg className="animate-pulse text-blue-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            AI Assistant Engaged
          </span>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome back, Candidate!
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Practice your technical skills with our AI Interviewer to identify weak points, target specific job profiles, and boost your hiring potential.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link 
              to="/candidate/interview" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              Start Practice Interview
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link 
              to="/candidate/resume-analysis" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 transition-all duration-200"
            >
              Analyze Resume
            </Link>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-gradient from-blue-500/10 to-transparent pointer-events-none blur-3xl" />
      </div>

      {/* 2. Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Resume Rating */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-150 dark:border-slate-800/80 shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">AI Resume Rating</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {resumeScore > 0 ? `${resumeScore}/100` : "Unrated"}
            </span>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-455 dark:text-slate-500 font-medium">
              <svg className="text-slate-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>{resumeScore > 0 ? "Analyzed with AI metrics" : "Upload your resume to rate"}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Completed Interviews (Mocks Run) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-150 dark:border-slate-800/80 shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Mocks Run</span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {completedInterviews.length}
            </span>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-455 dark:text-slate-500 font-medium">
              <svg className="text-slate-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Total assessment records</span>
            </div>
          </div>
        </div>

        {/* Card 3: Active Applications */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-150 dark:border-slate-800/80 shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Applications</span>
            <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {activeApplications.length}
            </span>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-455 dark:text-slate-500 font-medium">
              <svg className="text-slate-405" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              <span>Submissions in pipeline</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Main Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Scheduled Interviews */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-150 dark:border-slate-800/80 shadow-sm transition-colors duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Scheduled Assessments</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Real scheduled sessions requiring mock preparation</p>
            </div>
            {upcomingInterviews.length > 0 && (
              <Link to="/candidate/interview" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                View all
              </Link>
            )}
          </div>

          <div className="space-y-4">
            {upcomingInterviews.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center text-slate-400 mx-auto mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <p className="text-slate-550 dark:text-slate-400 text-xs font-semibold">No upcoming scheduled interviews found.</p>
                <Link to="/candidate/interview" className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 mt-2 hover:underline">
                  Initiate a mock practice session →
                </Link>
              </div>
            ) : (
              upcomingInterviews.map((interview, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-200"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl text-blue-600 dark:text-blue-400 mt-0.5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">{interview.jobRole}</h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        {interview.companyName || "AI Mock System"} • <span className="text-indigo-500 dark:text-indigo-400">{interview.difficulty || "Practice Round"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 rounded-lg">
                      {new Date(interview.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-150 dark:border-slate-800/80 shadow-sm flex flex-col justify-between transition-colors duration-200">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">AI Recommendation</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Automated optimizations based on current pipeline status</p>

            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/30 text-amber-850 dark:text-amber-400 text-xs leading-relaxed space-y-2">
              <span className="font-bold text-amber-800 dark:text-amber-500 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A7.5 7.5 0 0 0 3 8c0 1 .3 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
                Resume Optimization Tip
              </span>
              <p className="text-amber-700 dark:text-amber-350 font-medium">
                Keep your technical skills updated! Matching pipeline systems automatically target high-priority terms like <strong className="text-amber-900 dark:text-amber-300">TypeScript</strong> and <strong className="text-amber-900 dark:text-amber-300">Docker</strong> in matching developer openings.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60">
            <Link 
              to="/candidate/resume-analysis" 
              className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
            >
              <span>Optimize with Resume Analyst</span>
              <svg className="transform group-hover:translate-x-0.5 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;