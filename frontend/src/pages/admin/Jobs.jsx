import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Custom toast notification and confirmation state parameters
  const [toastMessage, setToastMessage] = useState("");
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  // Utility to fire automatic premium fade-out alerts
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const fetchJobs = async () => {
    try {
      const response = await adminService.getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error(error);
      triggerToast("Unable to fetch job listings.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (jobId) => {
    try {
      const response = await adminService.getJobById(jobId);
      setSelectedJob(response.data);
    } catch (error) {
      console.error(error);
      triggerToast("Unable to fetch job details.");
    }
  };

  // Called only after selecting "Purge Listing" from our premium modal container
  const handleExecuteDelete = async () => {
    const id = jobIdToDelete;
    setJobIdToDelete(null);

    try {
      await adminService.deleteJob(id);
      triggerToast("Job deleted successfully from global directory.");
      fetchJobs();

      if (selectedJob?.id === id) {
        setSelectedJob(null);
      }
    } catch (error) {
      console.error(error);
      triggerToast("Failed to complete administrative job deletion.");
    }
  };

  // Upgraded Loading State Spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium dark:text-slate-500">Loading jobs...</p>
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
          Job Management
        </h1>
        <p className="text-slate-455 dark:text-slate-500 text-sm mt-1">
          Monitor system-wide active listings, audit posting details, or remove invalid employment roles globally.
        </p>
      </div>

      {/* Main Jobs Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden transition-colors duration-200">
        {jobs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <p className="text-slate-550 dark:text-slate-400 font-medium">No active job listings found in system database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <th className="px-6 py-4">Job Title</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Recruiter</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
                {jobs.map((job) => (
                  <tr 
                    key={job.id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-800/10 text-slate-700 dark:text-slate-200 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      {job.jobTitle}
                    </td>

                    <td className="px-6 py-4 text-slate-655 dark:text-slate-350">
                      {job.companyName}
                    </td>

                    <td className="px-6 py-4 text-slate-550 dark:text-slate-400 font-medium">
                      {job.recruiterName}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-550 dark:text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {job.location}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        job.active 
                          ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-450 border-slate-200 dark:border-slate-750"
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${job.active ? "bg-emerald-500" : "bg-slate-400"} shrink-0`} />
                        {job.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(job.id)}
                          className="inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/20 dark:hover:bg-blue-955/10 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Inspect
                        </button>

                        <button
                          onClick={() => setJobIdToDelete(job.id)}
                          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-955/15 rounded-lg transition-all duration-150"
                          title="Purge Posting"
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

      {/* Selected Job Detail Panel Overlay */}
      {selectedJob && (
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 sm:p-8 shadow-sm relative animate-slide-up transition-colors duration-200 space-y-6">
          
          <button 
            onClick={() => setSelectedJob(null)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-150"
            title="Close Panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <svg className="text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            System Listing Log Detail
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Position Title</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedJob.jobTitle}</p>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Employer Company</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedJob.companyName}</p>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Responsible Recruiter</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedJob.recruiterName}</p>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Geographical Scope</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedJob.location}</p>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Required Experience</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedJob.experience}</p>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Employment Category</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-150">{selectedJob.employmentType}</p>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Comp. Range (Min)</span>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-450">₹{Number(selectedJob.minSalary).toLocaleString("en-IN")}</p>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Comp. Range (Max)</span>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-450">₹{Number(selectedJob.maxSalary).toLocaleString("en-IN")}</p>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Database Status</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mt-1 ${
                selectedJob.active 
                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-450 border-slate-200"
              }`}>
                {selectedJob.active ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Required Skills Target</span>
            <div className="flex flex-wrap gap-1.5">
              {(selectedJob.skills || "").split(",").map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold rounded-lg"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Corporate Job Description</span>
            <div className="bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-655 dark:text-slate-300 whitespace-pre-line">
                {selectedJob.jobDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modern Confirmation Modal Overlay */}
      {jobIdToDelete && (
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
              <h3 className="text-lg font-bold text-slate-855 dark:text-white">Global Directory Purge</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete this job listing? This action cannot be undone and will globally strip all associated matching evaluation cycles across the platform.
              </p>
            </div>

            {/* Modal Trigger Actions Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setJobIdToDelete(null)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-850 text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-500/10"
              >
                Purge Job Posting
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Jobs;