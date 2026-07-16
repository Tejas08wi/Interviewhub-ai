import { useEffect, useState } from "react";
import candidateJobService from "../../services/candidateJobService";
import applicationService from "../../services/applicationService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchData, setSearchData] = useState({
    title: "",
    skills: "",
    location: "",
    experience: "",
  });

  const loadJobs = async () => {
    try {
      const response = await candidateJobService.getAllJobs();
      setJobs(response.data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = async () => {
    try {
      const response = await candidateJobService.searchJobs(
        searchData.title,
        searchData.skills,
        searchData.location,
        searchData.experience
      );
      setJobs(response.data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to search jobs.");
    }
  };

  const handleViewDetails = async (jobId) => {
    try {
      const response = await candidateJobService.getJobById(jobId);
      setSelectedJob(response.data.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to fetch job details."
      );
    }
  };

  const handleApply = async (jobId) => {
    try {
      const response = await applicationService.applyJob(jobId);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to apply for job.");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Utility classes for input fields
  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";
  const svgWrapperClass = "absolute left-3.5 top-3.5 text-slate-400 pointer-events-none";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Available Jobs
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Browse open positions matching your verified skills and directly apply using your active resume.
        </p>
      </div>

      {/* 1. Merged Search Jobs Block */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
          <svg className="text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search Jobs Filter
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <input
              type="text"
              name="title"
              placeholder="Job Title (e.g. Frontend Engineer)"
              value={searchData.title}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="relative">
            <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <input
              type="text"
              name="skills"
              placeholder="Required Skills (e.g. React, Node)"
              value={searchData.skills}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="relative">
            <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              name="location"
              placeholder="Location (e.g. Remote, Mumbai)"
              value={searchData.location}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="relative">
            <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <input
              type="text"
              name="experience"
              placeholder="Experience (e.g. 2+ years)"
              value={searchData.experience}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSearch}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/10"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search Openings
          </button>
        </div>
      </div>

      {/* Status Indicators */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 text-sm font-medium">Loading jobs...</p>
          </div>
        </div>
      )}

      {/* Alert Banner */}
      {message && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-sm font-medium">
          <svg className="text-emerald-500 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {/* 2. Selected Job Detailed Profile Pane */}
      {selectedJob && (
        <div className="bg-white rounded-2xl p-6 border-l-4 border-l-blue-600 border border-y-slate-100 border-r-slate-100 shadow-sm space-y-6 animate-slide-in">
          <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Detailed View</span>
              <h2 className="text-xl font-bold text-slate-800 mt-0.5">{selectedJob.jobTitle}</h2>
              <p className="text-sm font-medium text-blue-600">{selectedJob.companyName}</p>
            </div>
            <div className="self-start sm:self-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                💰 ₹{selectedJob.minSalary} - ₹{selectedJob.maxSalary}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Location</span>
              <span className="font-semibold text-slate-700">{selectedJob.location}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Experience</span>
              <span className="font-semibold text-slate-700">{selectedJob.experience}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Employment Type</span>
              <span className="font-semibold text-slate-700 capitalize">{selectedJob.employmentType.toLowerCase()}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Skills Needed</span>
              <span className="font-semibold text-slate-700">{selectedJob.skills}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Primary Recruiter</span>
              <span className="font-semibold text-slate-700">{selectedJob.recruiterName}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Job Description</h4>
            <p className="text-sm text-slate-650 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {selectedJob.jobDescription}
            </p>
          </div>
        </div>
      )}

      {/* 3. Job Listings Feed */}
      <div className="space-y-6">
        {jobs.length === 0 && !loading ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 text-sm font-medium">No open positions matching your active search parameters.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
              
              {/* Job Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug">
                    {job.jobTitle}
                  </h3>
                  <p className="text-sm font-bold text-blue-600 mt-0.5">{job.companyName}</p>
                </div>
                <div className="self-start">
                  <span className="inline-block text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                    ₹{job.minSalary} - ₹{job.maxSalary}
                  </span>
                </div>
              </div>

              {/* Information Meta Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs text-slate-500 font-medium">
                <p className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-400">Recruiter:</span> {job.recruiterName}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-400">Location:</span> {job.location}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-400">Experience:</span> {job.experience}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-400">Contract:</span> <span className="capitalize">{job.employmentType.toLowerCase()}</span>
                </p>
                <p className="col-span-2 flex items-center gap-1.5">
                  <span className="font-semibold text-slate-400 shrink-0">Skills:</span> 
                  <span className="truncate">{job.skills}</span>
                </p>
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-3 line-clamp-2">
                {job.jobDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleViewDetails(job.id)}
                  className="inline-flex items-center gap-1.5 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50/20 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Full Details
                </button>

                <button
                  onClick={() => handleApply(job.id)}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Apply Now
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;