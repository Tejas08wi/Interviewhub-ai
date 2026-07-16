import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Custom premium feedback and modal trigger states
  const [toastMessage, setToastMessage] = useState("");
  const [sessionIdToDelete, setSessionIdToDelete] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  // Utility to fire automatic premium fade-out alerts
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const fetchInterviews = async () => {
    try {
      const response = await adminService.getInterviews();
      setInterviews(response.data);
    } catch (error) {
      console.error(error);
      triggerToast("Unable to fetch assessment sessions.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (sessionId) => {
    try {
      const response = await adminService.getInterviewById(sessionId);
      setSelectedInterview(response.data);
    } catch (error) {
      console.error(error);
      triggerToast("Unable to fetch interview details.");
    }
  };

  // Called only after selecting "Purge Session Record" from our premium modal container
  const handleExecuteDelete = async () => {
    const id = sessionIdToDelete;
    setSessionIdToDelete(null);

    try {
      await adminService.deleteInterview(id);
      triggerToast("Interview session deleted successfully.");
      fetchInterviews();

      if (selectedInterview?.sessionId === id) {
        setSelectedInterview(null);
      }
    } catch (error) {
      console.error(error);
      triggerToast("Failed to delete interview record.");
    }
  };

  // Helper styles to dynamically render colored difficulty badges
  const getDifficultyBadgeStyles = (diff) => {
    const normalized = (diff || "").toUpperCase();
    if (normalized === "HARD") {
      return "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-150 dark:border-rose-900/40";
    } else if (normalized === "MEDIUM") {
      return "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-150 dark:border-amber-900/40";
    }
    return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-150 dark:border-emerald-900/40"; // EASY / Default
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium dark:text-slate-500">Loading sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      
      {/* Floating HUD Toast Notification Overlay */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-xl border border-slate-800 dark:border-slate-100 animate-slide-up">
          <svg className="text-blue-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage("")} className="ml-2 text-slate-400 hover:text-slate-200 dark:hover:text-slate-700">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Page Title & Context Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Interview Management
        </h1>
        <p className="text-slate-455 dark:text-slate-500 text-sm mt-1">
          Monitor system-wide AI assessments, inspect individual question blocks, or remove invalid sessions.
        </p>
      </div>

      {/* Main Grid Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden transition-colors duration-200">
        {interviews.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <p className="text-slate-550 dark:text-slate-400 font-medium">No interview sessions found in the system.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <th className="px-6 py-4">Session ID</th>
                  <th className="px-6 py-4">Target Job Role</th>
                  <th className="px-6 py-4">Difficulty Level</th>
                  <th className="px-6 py-4">Questions</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
                {interviews.map((interview) => (
                  <tr 
                    key={interview.sessionId}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-800/10 text-slate-700 dark:text-slate-200 transition-colors duration-150"
                  >
                    {/* Session ID */}
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Session #{interview.sessionId}
                    </td>

                    {/* Job Role */}
                    <td className="px-6 py-4 font-medium text-slate-850 dark:text-slate-300">
                      {interview.jobRole}
                    </td>

                    {/* Difficulty Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getDifficultyBadgeStyles(interview.difficulty)}`}>
                        <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                        {interview.difficulty}
                      </span>
                    </td>

                    {/* Total Questions count */}
                    <td className="px-6 py-4 font-medium">
                      {interview.totalQuestions} Questions
                    </td>

                    {/* Overall Score with fixed decimal protection */}
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                      {interview.overallScore != null ? (
                        `${Number(interview.overallScore).toFixed(1)}%`
                      ) : (
                        <span className="text-slate-300 dark:text-slate-700">—</span>
                      )}
                    </td>

                    {/* Timestamp */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(interview.createdAt).toLocaleDateString()}
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {new Date(interview.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    {/* Actions column wrapper */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center gap-2">
                        {/* Inspect details button */}
                        <button
                          onClick={() => handleView(interview.sessionId)}
                          className="inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/20 dark:hover:bg-blue-955/10 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Inspect
                        </button>

                        {/* Force Delete button */}
                        <button
                          onClick={() => setSessionIdToDelete(interview.sessionId)}
                          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-955/15 rounded-lg transition-all duration-150"
                          title="Purge Record"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Session Details Modal Wrapper */}
      {selectedInterview && (
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 sm:p-8 shadow-sm relative animate-slide-up transition-colors duration-200 space-y-6">
          
          {/* Close trigger */}
          <button 
            onClick={() => setSelectedInterview(null)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-150"
            title="Close Panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Core Panel Header */}
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <svg className="text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Session Meta logs (Session #{selectedInterview.sessionId})
          </h3>

          {/* General Metadata Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Candidate</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedInterview.candidateName}</p>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Candidate Email</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-150 font-mono break-all">{selectedInterview.candidateEmail}</p>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Job Role</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedInterview.jobRole}</p>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Created Timestamp</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-150">
                {new Date(selectedInterview.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>
          </div>

          {/* Performance Analytical Metrics Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Evaluation Metrics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl text-center">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Overall Grade</span>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  {selectedInterview.overallScore != null ? `${Number(selectedInterview.overallScore).toFixed(1)}%` : "N/A"}
                </p>
              </div>

              <div className="bg-violet-50/30 dark:bg-violet-950/10 border border-violet-100 dark:border-violet-900/30 p-4 rounded-xl text-center">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Technical Skills</span>
                <p className="text-2xl font-black text-violet-600 dark:text-violet-400">
                  {selectedInterview.technicalScore != null ? `${Number(selectedInterview.technicalScore).toFixed(1)}%` : "N/A"}
                </p>
              </div>

              <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl text-center">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Communication</span>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {selectedInterview.communicationScore != null ? `${Number(selectedInterview.communicationScore).toFixed(1)}%` : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Qualitative Notes Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            {/* Strengths */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Identified Strengths</span>
              <div className="bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {selectedInterview.strengths || "No specific strengths logged."}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Areas for Improvement</span>
              <div className="bg-rose-50/20 dark:bg-rose-950/10 border border-rose-100/50 dark:border-rose-900/30 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {selectedInterview.weaknesses || "No specific weaknesses logged."}
              </div>
            </div>

            {/* Suggestions */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Actionable Suggestions</span>
              <div className="bg-amber-50/20 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/30 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {selectedInterview.suggestions || "No development recommendations available."}
              </div>
            </div>

            {/* Final Feedback */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Executive Final Feedback</span>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {selectedInterview.finalFeedback || "No summary feedback entered."}
              </div>
            </div>
          </div>

          {/* Nested Questionnaire Details Section */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
            <h4 className="text-base font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <svg className="text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Interview Questions & Evaluation Logs
            </h4>

            <div className="space-y-4">
              {selectedInterview.questions.map((question) => (
                <div 
                  key={question.questionNumber}
                  className="bg-slate-50/30 dark:bg-slate-800/10 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl space-y-4 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                    <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Question {question.questionNumber} of {selectedInterview.totalQuestions}
                    </span>
                    <span className="font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Category: {question.category}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Prompt</span>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{question.question}</p>
                    </div>

                    <div className="bg-emerald-50/10 dark:bg-emerald-950/5 border border-emerald-100/30 dark:border-emerald-900/20 p-3 rounded-lg">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600/80 dark:text-emerald-500 mb-1">Ideal Expected Answer Baseline</span>
                      <p className="text-xs text-slate-655 dark:text-slate-350 leading-relaxed font-medium">{question.expectedAnswer}</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-3 rounded-lg">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Candidate Response</span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                        {question.candidateAnswer ?? "No response was recorded for this question."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Modern Confirmation Modal Overlay */}
      {sessionIdToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-6 animate-scale-up">
            
            {/* Warning Icon Container */}
            <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            {/* Warning Typography Content */}
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-855 dark:text-white">Delete Session Record?</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete this AI interview session from the registry? This action cannot be reversed.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSessionIdToDelete(null)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-850 text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-500/10"
              >
                Purge Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Interviews;