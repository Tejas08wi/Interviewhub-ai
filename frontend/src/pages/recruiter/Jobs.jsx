import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRecruiterJobsPage,
  deleteRecruiterJob,
} from "../../services/recruiterJobService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Custom toast notification and confirmation state parameters
  const [toastMessage, setToastMessage] = useState("");
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, [page]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const loadJobs = async () => {
    try {
      const response = await getRecruiterJobsPage(page, 5, "id", "asc");

      if (response.success) {
        setJobs(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error(error);
      triggerToast("Failed to load jobs.");
    }
  };

  // Called only after selecting "Delete Listing" from our premium modal container
  const handleExecuteDelete = async () => {
    const id = jobIdToDelete;
    setJobIdToDelete(null);
    try {
      await deleteRecruiterJob(id);
      triggerToast("Job deleted successfully.");
      loadJobs();
    } catch (error) {
      console.error(error);
      triggerToast("Failed to delete job.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      
      {/* Toast HUD Notification Overlay */}
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
            My Job Listings
          </h1>
          <p className="text-slate-455 dark:text-slate-500 text-sm mt-1">
            Create, modify, and monitor active job postings and navigate directly to candidate applications.
          </p>
        </div>

        <button
          onClick={() => navigate("/recruiter/jobs/create")}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/10 self-start sm:self-center shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Job
        </button>
      </div>

      {/* Main Table Grid Card Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden transition-colors duration-200">
        
        {jobs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <p className="text-slate-550 dark:text-slate-400 font-medium">No jobs available. Create your first posting to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Experience Required</th>
                  <th className="px-6 py-4">Salary Range</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
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

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-550 dark:text-slate-400">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {job.location}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {job.experience}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-305">
                      ₹{job.minSalary} - ₹{job.maxSalary}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        job.active 
                          ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-450 border-slate-200 dark:border-slate-750"
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${job.active ? "bg-emerald-500" : "bg-slate-400"} shrink-0`} />
                        {job.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/recruiter/jobs/edit/${job.id}`)}
                          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-150"
                          title="Edit Job"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => navigate(`/recruiter/jobs/${job.id}/applications`)}
                          className="inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/20 dark:hover:bg-blue-950/10 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          Applications
                        </button>

                        <button
                          onClick={() => setJobIdToDelete(job.id)}
                          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-955/15 rounded-lg transition-all duration-150"
                          title="Delete Job"
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

        {/* Pagination Block */}
        {jobs.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-950/20 transition-colors">
            <span className="text-xs text-slate-450 dark:text-slate-500 font-medium">
              Page <span className="font-bold text-slate-700 dark:text-slate-350">{page + 1}</span> of <span className="font-bold text-slate-700 dark:text-slate-350">{totalPages}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className="inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-655 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed bg-white dark:bg-slate-900"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Previous
              </button>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page + 1 >= totalPages}
                className="inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-655 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed bg-white dark:bg-slate-900"
              >
                Next
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

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
              <h3 className="text-lg font-bold text-slate-850 dark:text-white">Confirm Deletion</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete this job posting? This action cannot be undone and will retract all matching pipeline processes.
              </p>
            </div>

            {/* Modal Trigger Actions Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setJobIdToDelete(null)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-850 text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteDelete}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-500/10"
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Jobs;