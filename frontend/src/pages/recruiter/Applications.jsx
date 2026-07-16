import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getJobApplications,
  updateApplicationStatus,
  downloadCandidateResume,
} from "../../services/recruiterApplicationService";

function Applications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  
  // Custom non-blocking HUD toast notification state
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  // Self-dismissing toast utility handler
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const loadApplications = async () => {
    try {
      const response = await getJobApplications(jobId);
      if (response.success) {
        setApplications(response.data);
      }
    } catch (error) {
      console.error(error);
      triggerToast("Failed to load applications.");
    }
  };

  const handleStatusChange = (applicationId, status) => {
    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.applicationId === applicationId
          ? { ...application, status }
          : application
      )
    );
  };

  const handleUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      triggerToast("Application pipeline status updated successfully.");
      loadApplications();
    } catch (error) {
      console.error(error);
      triggerToast("Failed to update pipeline processing status.");
    }
  };

  // Helper styles to dynamically color-code status badge indicators
  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "HIRED":
        return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-150 dark:border-emerald-900/40";
      case "SHORTLISTED":
        return "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-150 dark:border-blue-900/40";
      case "REJECTED":
        return "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-150 dark:border-rose-900/40";
      default:
        return "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-150 dark:border-amber-900/40"; // APPLIED / PENDING
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      
      {/* HUD Toast Status Popups */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-xl border border-slate-800 dark:border-slate-100 animate-slide-up">
          <svg className="text-blue-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage("")} className="ml-2 text-slate-400 hover:text-slate-200 dark:hover:text-slate-700">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Page Title Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Job Applications
        </h1>
        <p className="text-slate-405 dark:text-slate-500 text-sm mt-1">
          Review candidate qualifications, fetch original resumes, and modify processing status values.
        </p>
      </div>

      {/* Applications Data Table Wrapper */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden transition-colors duration-200">
        
        {applications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <p className="text-slate-550 dark:text-slate-400 font-medium">No applications found for this posting.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Applied Position</th>
                  <th className="px-6 py-4">Applied At</th>
                  <th className="px-6 py-4 text-center">Resume</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
                {applications.map((application) => (
                  <tr 
                    key={application.applicationId}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-800/10 text-slate-700 dark:text-slate-200 transition-colors duration-150"
                  >
                    {/* Candidate Name */}
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      {application.candidateName}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-slate-655 dark:text-slate-400">
                      {application.candidateEmail}
                    </td>

                    {/* Corrected: jobTitle changed to application.jobTitle */}
                    <td className="px-6 py-4 font-medium">
                      {application.jobTitle}
                    </td>

                    {/* Applied Date */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(application.appliedAt).toLocaleDateString()}{" "}
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {new Date(application.appliedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    {/* Resume Download Action */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => downloadCandidateResume(application.applicationId)}
                        className="inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900/50 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/20 dark:hover:bg-emerald-955/15 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download
                      </button>
                    </td>

                    {/* Interactive Status Selector */}
                    <td className="px-6 py-4">
                      <div className="relative inline-block w-40">
                        <select
                          value={application.status}
                          onChange={(e) =>
                            handleStatusChange(application.applicationId, e.target.value)
                          }
                          className={`w-full appearance-none pl-3 pr-8 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border outline-none focus:ring-2 focus:ring-blue-500/25 transition-all cursor-pointer ${getStatusBadgeStyles(application.status)}`}
                        >
                          <option value="APPLIED">APPLIED</option>
                          <option value="SHORTLISTED">SHORTLISTED</option>
                          <option value="REJECTED">REJECTED</option>
                          <option value="HIRED">HIRED</option>
                        </select>
                        <div className="absolute right-2.5 top-2 pointer-events-none text-current">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </td>

                    {/* Update Status Trigger */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          handleUpdate(application.applicationId, application.status)
                        }
                        className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                          <polyline points="17 21 17 13 7 13 7 21" />
                          <polyline points="7 3 7 8 15 8" />
                        </svg>
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;