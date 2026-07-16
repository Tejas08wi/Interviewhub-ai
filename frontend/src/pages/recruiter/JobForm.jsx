import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRecruiterJob,
  getRecruiterJobById,
  updateRecruiterJob,
} from "../../services/recruiterJobService";

function JobForm() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const isEdit = !!jobId;

  const [job, setJob] = useState({
    jobTitle: "",
    jobDescription: "",
    skills: "",
    experience: "",
    location: "",
    employmentType: "",
    minSalary: "",
    maxSalary: "",
    active: true,
  });

  // Floating toast notification state
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (isEdit) {
      loadJob();
    }
  }, []);

  // Utility to fire automatic premium fade-out alerts
  const triggerToast = (msg, delay = 3000) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, delay);
  };

  const loadJob = async () => {
    try {
      const response = await getRecruiterJobById(jobId);

      if (response.success) {
        const data = response.data;

        setJob({
          jobTitle: data.jobTitle,
          jobDescription: data.jobDescription,
          skills: data.skills,
          experience: data.experience,
          location: data.location,
          employmentType: data.employmentType,
          minSalary: data.minSalary,
          maxSalary: data.maxSalary,
          active: data.active,
        });
      }
    } catch (error) {
      triggerToast("Failed to load job layout settings.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setJob({
      ...job,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateRecruiterJob(jobId, job);
        triggerToast("Job posting updated successfully.");
      } else {
        await createRecruiterJob(job);
        triggerToast("Job entry published successfully.");
      }

      // Short delay before redirection so recruiters can read the confirmation toast
      setTimeout(() => {
        navigate("/recruiter/jobs");
      }, 1500);
    } catch (error) {
      triggerToast("Form submission rejected. Please check your inputs.");
    }
  };

  // Modern input focus and Tailwind style presets
  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";
  const textareaClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5";
  const svgWrapperClass = "absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none";

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      
      {/* Floating HUD Toast Notification Overlay */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-xl border border-slate-800 dark:border-slate-100 animate-slide-up">
          <svg className="text-blue-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage("")} className="ml-2 text-slate-400 hover:text-slate-200 dark:hover:text-slate-700">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          {isEdit ? "Edit Job Posting" : "Create New Job"}
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
          {isEdit 
            ? "Update your existing position details, requirements, and compensation parameters." 
            : "Post an open role to search for premium talent and begin automated AI evaluations."
          }
        </p>
      </div>

      {/* Main Form Card Wrapper */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-150 dark:border-slate-800/80 shadow-sm transition-colors duration-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Job Title */}
          <div>
            <label className={labelClass}>Job Title</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <input
                type="text"
                name="jobTitle"
                placeholder="e.g. Senior Fullstack Developer"
                value={job.jobTitle}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className={labelClass}>Job Description</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <textarea
                name="jobDescription"
                placeholder="Describe the day-to-day responsibilities, expectations, and tech-stack requirements..."
                value={job.jobDescription}
                onChange={handleChange}
                rows={5}
                required
                className={textareaClass}
              />
            </div>
          </div>

          {/* Key Skills Needed */}
          <div>
            <label className={labelClass}>Required Skills</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <input
                type="text"
                name="skills"
                placeholder="e.g. Java, Spring Boot, React, AWS (Comma separated)"
                value={job.skills}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Meta Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
            {/* Experience */}
            <div>
              <label className={labelClass}>Experience</label>
              <div className="relative">
                <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <input
                  type="text"
                  name="experience"
                  placeholder="e.g. 3-5 Years"
                  value={job.experience}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className={labelClass}>Location</label>
              <div className="relative">
                <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Bangalore, KA / Remote"
                  value={job.location}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Employment Type */}
            <div>
              <label className={labelClass}>Employment Type</label>
              <div className="relative">
                <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <input
                  type="text"
                  name="employmentType"
                  placeholder="e.g. Full-time, Internship"
                  value={job.employmentType}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Minimum Salary */}
            <div>
              <label className={labelClass}>Minimum Annual Salary (₹)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400 dark:text-slate-500 pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  name="minSalary"
                  placeholder="e.g. 800000"
                  value={job.minSalary}
                  onChange={handleChange}
                  required
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Maximum Salary */}
            <div>
              <label className={labelClass}>Maximum Annual Salary (₹)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400 dark:text-slate-500 pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  name="maxSalary"
                  placeholder="e.g. 1500000"
                  value={job.maxSalary}
                  onChange={handleChange}
                  required
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Listing Active Status Toggler */}
            <div className="flex flex-col justify-end pb-1.5">
              <label className="flex items-center gap-2.5 cursor-pointer select-none py-1 group">
                <input
                  type="checkbox"
                  name="active"
                  checked={job.active}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500/25 dark:border-slate-800 dark:bg-slate-900 cursor-pointer"
                />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  Active Listing
                </span>
              </label>
            </div>
          </div>

          {/* Form Trigger Actions Block */}
          <div className="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/60">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-205 shadow-lg shadow-blue-500/10"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {isEdit ? "Update Job Posting" : "Publish Job"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/recruiter/jobs")}
              className="inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-750 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 bg-white dark:bg-slate-900"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default JobForm;