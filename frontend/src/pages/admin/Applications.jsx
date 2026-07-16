import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Custom UI feedback states
  const [toastMessage, setToastMessage] = useState("");
  const [applicationIdToDelete, setApplicationIdToDelete] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const fetchApplications = async () => {
    try {
      const response = await adminService.getApplications();
      setApplications(response.data);
    } catch (error) {
      console.error(error);
      triggerToast("Unable to fetch system applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (applicationId) => {
    try {
      const response = await adminService.getApplicationById(applicationId);
      setSelectedApplication(response.data);
    } catch (error) {
      console.error(error);
      triggerToast("Unable to fetch application details.");
    }
  };

  // Called only after selecting "Purge Record" from our premium modal container
  const handleExecuteDelete = async () => {
    const id = applicationIdToDelete;
    setApplicationIdToDelete(null);

    try {
      await adminService.deleteApplication(id);
      triggerToast("Application record deleted successfully.");
      fetchApplications();

      if (selectedApplication?.applicationId === id) {
        setSelectedApplication(null);
      }
    } catch (error) {
      console.error(error);
      triggerToast("Failed to delete application record.");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium dark:text-slate-500">Loading applications...</p>
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

      {/* Page Title & Context */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Application Management
        </h1>
        <p className="text-slate-455 dark:text-slate-500 text-sm mt-1">
          Perform administrative controls on system submissions, inspect logs, or remove invalid applications globally.
        </p>
      </div>

      {/* Main Table Grid Card Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden transition-colors duration-200">
        
        {applications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <p className="text-slate-550 dark:text-slate-400 font-medium">No application records found in system database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Job Title</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Applied At</th>
                  <th className="px-6 py-4 text-center">Actions</th>
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
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                      {application.candidateEmail}
                    </td>

                    {/* Job Title */}
                    <td className="px-6 py-4 font-medium">
                      {application.jobTitle}
                    </td>

                    {/* Company */}
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {application.companyName}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyles(application.status)}`}>
                        <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                        {application.status}
                      </span>
                    </td>

                    {/* Date Applied */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(application.appliedAt).toLocaleDateString()}
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {new Date(application.appliedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    {/* Action Items */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center gap-2">
                        {/* Inspect / View Details Button */}
                        <button
                          onClick={() => handleView(application.applicationId)}
                          className="inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/20 dark:hover:bg-blue-955/10 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Inspect
                        </button>

                        {/* Force Delete Button */}
                        <button
                          onClick={() => setApplicationIdToDelete(application.applicationId)}
                          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-955/15 rounded-lg transition-all duration-150"
                          title="Delete Record"
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

      {/* Selected Application Details Panel Card */}
      {selectedApplication && (
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 shadow-sm relative animate-slide-up transition-colors duration-200">
          
          {/* Panel Top Close Action */}
          <button 
            onClick={() => setSelectedApplication(null)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-150"
            title="Close Panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-5">
            <svg className="text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            System Record Detail Logs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Candidate name info */}
            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Candidate Profile</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedApplication.candidateName}</p>
            </div>

            {/* Email Address */}
            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Candidate Email</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150 font-mono text-xs">{selectedApplication.candidateEmail}</p>
            </div>

            {/* Position */}
            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Applied Position</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedApplication.jobTitle}</p>
            </div>

            {/* Company */}
            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Employer Partner</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedApplication.companyName}</p>
            </div>

            {/* System Status badge block */}
            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Processing State</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyles(selectedApplication.status)}`}>
                <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                {selectedApplication.status}
              </span>
            </div>

            {/* Applied At timestamp */}
            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Created At Timestamp</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">
                {new Date(selectedApplication.appliedAt).toLocaleString([], { dateStyle: "long", timeStyle: "short" })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modern Deletion Confirmation Modal Overlay */}
      {applicationIdToDelete && (
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
              <h3 className="text-lg font-bold text-slate-855 dark:text-white">Delete Submission?</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
                Are you sure you want to remove this application? This action will permanently drop the candidate entry out of the selection pipelines.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setApplicationIdToDelete(null)}
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

export default Applications;