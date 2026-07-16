import { useEffect, useState } from "react";
import applicationService from "../../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      const response = await applicationService.getApplications();
      setApplications(response.data.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to load applications.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // Helper to style status badges
  const getStatusStyles = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("accept"))
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (s.includes("reject")) return "bg-rose-50 text-rose-700 border-rose-100";
    if (s.includes("interview"))
      return "bg-blue-50 text-blue-700 border-blue-100";
    return "bg-amber-50 text-amber-700 border-amber-100"; // Pending/Default
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          My Applications
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Track the status of all your submitted job applications in real-time.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error Message */}
      {message && (
        <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-sm font-medium">
          <svg
            className="text-rose-500 shrink-0"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {/* Application List */}
      {applications.length === 0 && !loading ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-sm text-center">
          <p className="text-slate-400 text-sm font-medium">
            No applications found. Head over to the Jobs tab to start applying!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.applicationId}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Header Section */}
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    {application.jobTitle}
                  </h2>
                  <p className="text-sm font-semibold text-blue-600">
                    {application.companyName}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(application.status)}`}
                >
                  {application.status}
                </span>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mt-6 pt-6 border-t border-slate-50">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Application ID
                  </span>
                  <span className="text-xs font-semibold text-slate-600 font-mono mt-1 block">
                    {application.applicationId
                      ? String(application.applicationId).slice(0, 8)
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Date Applied
                  </span>
                  <span className="text-xs font-semibold text-slate-600 mt-1 block">
                    {application.appliedAt
                      ? new Date(application.appliedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Candidate Email
                  </span>
                  <span className="text-xs font-semibold text-slate-600 mt-1 block">
                    {application.candidateEmail || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Internal Job ID
                  </span>
                  <span className="text-xs font-semibold text-slate-600 mt-1 block">
                    {application.jobId
                      ? String(application.jobId).slice(0, 8)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
