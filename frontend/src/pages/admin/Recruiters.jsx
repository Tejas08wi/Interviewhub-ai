import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const Recruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Custom non-blocking notification and modal states
  const [infoMessage, setInfoMessage] = useState("");
  const [recruiterIdToDelete, setRecruiterIdToDelete] = useState(null);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const triggerToast = (msg) => {
    setInfoMessage(msg);
    setTimeout(() => {
      setInfoMessage("");
    }, 4000);
  };

  const fetchRecruiters = async () => {
    try {
      const response = await adminService.getRecruiters();
      setRecruiters(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (recruiterId) => {
    try {
      const response = await adminService.getRecruiterById(recruiterId);
      setSelectedRecruiter(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        triggerToast("This recruiter has not created a profile yet.");
      } else {
        triggerToast("Unable to fetch recruiter details.");
      }
    }
  };

  // Called only after selecting "Purge Recruiter" from our premium modal container
  const handleExecuteDelete = async () => {
    const recruiterId = recruiterIdToDelete;
    setRecruiterIdToDelete(null);

    try {
      await adminService.deleteRecruiter(recruiterId);
      triggerToast("Recruiter deleted successfully.");
      fetchRecruiters();

      if (selectedRecruiter?.id === recruiterId) {
        setSelectedRecruiter(null);
      }
    } catch (error) {
      console.error(error);
      triggerToast("Failed to delete recruiter.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium dark:text-slate-500">Loading recruiters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      
      {/* Premium Non-Blocking Alert Toast */}
      {infoMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-xl border border-slate-800 dark:border-slate-100 animate-slide-up">
          <svg className="text-blue-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className="text-xs font-semibold">{infoMessage}</span>
          <button onClick={() => setInfoMessage("")} className="ml-2 text-slate-400 hover:text-slate-200 dark:hover:text-slate-700">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Page Title Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Recruiter Management
        </h1>
        <p className="text-slate-455 dark:text-slate-500 text-sm mt-1">
          Monitor active partner accounts, review corporate registration fields, or revoke recruiter access systems.
        </p>
      </div>

      {/* Main Table Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden transition-colors duration-200">
        {recruiters.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
            <p className="text-slate-550 dark:text-slate-400 font-medium">No registered recruiters found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <th className="px-6 py-4">Recruiter</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
                {recruiters.map((recruiter) => (
                  <tr key={recruiter.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/10 text-slate-700 dark:text-slate-200 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      {recruiter.firstName} {recruiter.lastName}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                      {recruiter.email}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-300">
                      {recruiter.companyName || <span className="text-slate-300 dark:text-slate-700 font-bold">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      {recruiter.location ? (
                        <span className="inline-flex items-center gap-1.5 text-slate-550 dark:text-slate-400">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {recruiter.location}
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-slate-700 font-bold">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(recruiter.id)}
                          className="inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/20 dark:hover:bg-blue-955/10 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Inspect
                        </button>
                        <button
                          onClick={() => setRecruiterIdToDelete(recruiter.id)}
                          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-955/15 rounded-lg transition-all duration-150"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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

      {/* Selected Recruiter Profile Overview Card */}
      {selectedRecruiter && (
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-855 rounded-2xl p-6 sm:p-8 shadow-sm relative animate-slide-up transition-colors duration-200 space-y-6">
          <button 
            onClick={() => setSelectedRecruiter(null)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-855">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 flex items-center justify-center overflow-hidden shrink-0">
                {selectedRecruiter.profilePhoto ? (
                  <img src={selectedRecruiter.profilePhoto} alt="Brand" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold text-2xl">
                    {selectedRecruiter.companyName ? selectedRecruiter.companyName.charAt(0).toUpperCase() : "R"}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{selectedRecruiter.recruiterName}</h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                  {selectedRecruiter.designation} at <span className="font-semibold">{selectedRecruiter.companyName}</span>
                </p>
              </div>
            </div>
            <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold px-3.5 py-1.5 rounded-xl self-start sm:self-center">
              Recruiter Account Verified
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Corporate Industry</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedRecruiter.industry || "Not Configured"}</p>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Regional Location</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedRecruiter.location || "Not Configured"}</p>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Primary Email</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150 font-mono text-xs break-all">{selectedRecruiter.email}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Corporate Profile Statement</span>
            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-655 dark:text-slate-300 whitespace-pre-line">
                {selectedRecruiter.companyDescription || "This partner has not documented a company profile overview description yet."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modern Confirmation Modal Overlay */}
      {recruiterIdToDelete && (
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
              <h3 className="text-lg font-bold text-slate-855 dark:text-white">Revoke Corporate Access?</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete this recruiter account? All associated jobs postings, applications, corporate indexes, and logs will be detached completely.
              </p>
            </div>

            {/* Modal Trigger Actions Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setRecruiterIdToDelete(null)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-850 text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteDelete}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-500/10"
              >
                Purge Recruiter
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Recruiters;