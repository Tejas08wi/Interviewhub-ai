import { useEffect, useState } from "react";
import { 
  getRecruiterProfile, 
  createRecruiterProfile, 
  updateRecruiterProfile, 
  deleteRecruiterProfile 
} from "../../services/recruiterService";

function Profile() {
  const [profile, setProfile] = useState({
    companyName: "",
    designation: "",
    companyWebsite: "",
    companyDescription: "",
    industry: "",
    location: "",
    profilePhoto: "",
  });

  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Custom non-blocking feedback and modal state managers
  const [toastMessage, setToastMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  // Helper to trigger self-destructing toast popups
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await getRecruiterProfile();

      if (response.success) {
        setProfile({
          companyName: response.data.companyName,
          designation: response.data.designation,
          companyWebsite: response.data.companyWebsite,
          companyDescription: response.data.companyDescription,
          industry: response.data.industry,
          location: response.data.location,
          profilePhoto: response.data.profilePhoto,
        });

        setProfileExists(true);
      }
    } catch (error) {
      setProfileExists(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (profileExists) {
        await updateRecruiterProfile(profile);
        triggerToast("Profile updated successfully.");
      } else {
        await createRecruiterProfile(profile);
        triggerToast("Profile created successfully.");
        setProfileExists(true);
      }
    } catch (error) {
      triggerToast("Operation failed.");
    }
  };

  const handleExecuteDelete = async () => {
    setShowDeleteModal(false);
    try {
      await deleteRecruiterProfile();

      setProfile({
        companyName: "",
        designation: "",
        companyWebsite: "",
        companyDescription: "",
        industry: "",
        location: "",
        profilePhoto: "",
      });

      setProfileExists(false);
      triggerToast("Profile deleted successfully.");
    } catch (error) {
      triggerToast("Delete failed.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium dark:text-slate-500">Loading Profile...</p>
        </div>
      </div>
    );
  }

  // Modern input focus and global dark mode design variables
  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";
  const textareaClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none col-span-2";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-1.5";
  const svgWrapperClass = "absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none";

  // Compute profile avatar display initial
  const profileInitial = profile.companyName ? profile.companyName.charAt(0).toUpperCase() : "C";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      
      {/* Toast Notification HUD */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-xl border border-slate-800 dark:border-slate-100 animate-slide-up">
          <svg className="text-emerald-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          Recruiter Profile
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
          Maintain your company identity details, descriptive overviews, and active logo configuration.
        </p>
      </div>

      {/* Dynamic Profile Summary Header */}
      {profileExists && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-2xl shadow-sm shrink-0 overflow-hidden">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                profileInitial
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                {profile.companyName || "Your Company Name"}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-slate-400 dark:text-slate-500 font-medium">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{profile.designation || "Recruiting Partner"}</span>
                {profile.location && <span>•</span>}
                {profile.location && <span>{profile.location}</span>}
              </div>
            </div>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-4 py-2 rounded-xl self-start sm:self-center">
            Profile Status: Verified ✓
          </div>
        </div>
      )}

      {/* Main Profile Form Wrapper */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <svg className="text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          Corporate Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className={labelClass}>Company Name</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <input
                type="text"
                name="companyName"
                placeholder="e.g. TechCorp Solutions"
                value={profile.companyName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Designation */}
          <div>
            <label className={labelClass}>Designation</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M17.9 14h-1.4a5.2 5.2 0 0 0-9 0H6.1A4.1 4.1 0 0 0 2 18.1V22h20v-3.9a4.1 4.1 0 0 0-4.1-4.1z" />
              </svg>
              <input
                type="text"
                name="designation"
                placeholder="e.g. Lead Talent Acquisition"
                value={profile.designation}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Company Website */}
          <div>
            <label className={labelClass}>Company Website</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <input
                type="text"
                name="companyWebsite"
                placeholder="e.g. https://company.com"
                value={profile.companyWebsite}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className={labelClass}>Industry</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <input
                type="text"
                name="industry"
                placeholder="e.g. Software & AI Engineering"
                value={profile.industry}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>Location</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                name="location"
                placeholder="e.g. Bangalore, KA (Hybrid)"
                value={profile.location}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Profile Photo URL */}
          <div>
            <label className={labelClass}>Company Logo URL</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <input
                type="text"
                name="profilePhoto"
                placeholder="e.g. https://yourcdn.com/logo.png"
                value={profile.profilePhoto}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Company Description */}
          <div className="col-span-2">
            <label className={labelClass}>Company Description</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <textarea
                name="companyDescription"
                placeholder="Write a brief pitch about your corporate culture and tech stack..."
                value={profile.companyDescription}
                onChange={handleChange}
                className={textareaClass}
                rows={5}
              />
            </div>
          </div>
        </div>

        {/* Primary Form Submissions */}
        <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/10"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {profileExists ? "Update Profile" : "Create Profile"}
          </button>
        </div>
      </div>

      {/* Corporate Danger Zone Config */}
      {profileExists && (
        <div className="bg-rose-50/40 dark:bg-rose-955/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <svg className="text-rose-500 shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <h4 className="text-sm font-bold text-rose-800 dark:text-rose-450">Danger Zone</h4>
              <p className="text-xs text-rose-600 dark:text-rose-500/80 mt-1">
                Deleting your profile is permanent and will hide all active job postings, application histories, and AI assessment metrics associated with this company profile.
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-rose-500/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Delete Recruiter Profile
            </button>
          </div>
        </div>
      )}

      {/* Modern Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-6 animate-scale-up">
            
            {/* Warning Icon */}
            <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            {/* Confirmation Message */}
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-850 dark:text-white">Confirm Deletion</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete your recruiter profile? This will hide all associated job posts and system parameters.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteDelete}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-500/10"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;