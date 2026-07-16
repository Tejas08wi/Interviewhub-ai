import { useEffect, useState } from "react";
import { User, Mail, ShieldAlert, Trash2, CheckCircle, AlertTriangle } from "lucide-react";
import candidateService from "../../services/candidateService";
import CandidateProfileForm from "../../components/forms/CandidateProfileForm";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  
  // Custom modal open/close trigger state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await candidateService.getProfile();
      setProfile(response.data.data);
      setProfileExists(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setProfile(null);
        setProfileExists(false);
        setMessage("");
      } else {
        setMessage(error.response?.data?.message || "Failed to load profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const response = await candidateService.createProfile(formData);
      setMessage(response.data.message);
      fetchProfile();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to create profile.");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await candidateService.updateProfile(formData);
      setMessage(response.data.message);
      fetchProfile();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to update profile.");
    }
  };

  // Called only after user clicks "Confirm Delete" inside our custom modal
  const handleExecuteDelete = async () => {
    setShowDeleteModal(false);
    try {
      const response = await candidateService.deleteProfile();
      setMessage(response.data.message);
      setProfile(null);
      setProfileExists(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to delete profile.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const initial = profile?.firstName ? profile.firstName.charAt(0).toUpperCase() : "U";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      
      {/* Header Info */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Candidate Profile</h1>
        <p className="text-slate-405 dark:text-slate-500 text-sm mt-1">Manage and update your personal candidate information and social presence.</p>
      </div>

      {/* Notification Toast */}
      {message && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-xl text-sm font-medium">
          <CheckCircle size={18} className="text-emerald-500 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Profile Overview Card (Shown if profile exists) */}
      {profileExists && profile && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-150 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Avatar block */}
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-2xl shadow-sm shrink-0">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                initial
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                {profile.firstName} {profile.lastName}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-400 dark:text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Mail size={14} />
                  {profile.email}
                </span>
                {profile.location && (
                  <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
                )}
                {profile.location && <span>{profile.location}</span>}
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-xs font-semibold px-4 py-2 rounded-xl text-center">
            Profile Status: Complete ✓
          </div>
        </div>
      )}

      {/* Main Profile Form Wrapper */}
      <CandidateProfileForm
        initialData={profile}
        onSubmit={profileExists ? handleUpdate : handleCreate}
        submitButtonText={profileExists ? "Save Profile Details" : "Create Profile"}
      />

      {/* Danger Zone */}
      {profileExists && (
        <div className="bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="text-rose-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-bold text-rose-800 dark:text-rose-400">Danger Zone</h4>
              <p className="text-xs text-rose-650 dark:text-rose-500/80 mt-1">
                Deleting your profile is permanent and cannot be undone. All your mock interview records, resume data, and custom portal configurations will be wiped out instantly.
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-rose-500/20"
            >
              <Trash2 size={14} />
              Delete Candidate Profile
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
              <AlertTriangle size={24} strokeWidth={2.5} />
            </div>

            {/* Confirmation Message */}
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-850 dark:text-white">Confirm Deletion</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete your candidate profile? All configurations, assessment data, and history records will be cleared.
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