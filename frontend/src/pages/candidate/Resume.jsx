import { useState } from "react";
import ResumeUploadForm from "../../components/forms/ResumeUploadForm";
import resumeService from "../../services/resumeService";

function Resume() {
  const [message, setMessage] = useState("");
  // Custom modal open/close trigger state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpload = async (file) => {
    try {
      const response = await resumeService.uploadResume(file);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to upload resume."
      );
    }
  };

  const handleDownload = async () => {
    try {
      const response = await resumeService.downloadResume();

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to download resume."
      );
    }
  };

  // Called only after the user confirms deletion in our premium modal
  const handleExecuteDelete = async () => {
    setShowDeleteModal(false);
    try {
      const response = await resumeService.deleteResume();
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to delete resume."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Resume Management
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
          Upload, update, or download your primary resume file for AI screening and matches.
        </p>
      </div>

      {/* Success/Error Toast Message */}
      {message && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-xl text-sm font-medium">
          <svg className="text-emerald-500 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {/* Core Action Zone Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-150 dark:border-slate-800/80 shadow-sm space-y-6 transition-colors duration-200">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/60">
          <svg className="text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Active Resume File
          </h2>
        </div>

        {/* Your custom Upload component */}
        <div className="bg-slate-50 dark:bg-slate-950/20 rounded-2xl p-2 border border-dashed border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <ResumeUploadForm onUpload={handleUpload} />
        </div>

        {/* File Action Controls */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </button>

          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-800 hover:border-rose-250 dark:hover:border-rose-900/40 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-955/15 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            Delete Resume
          </button>
        </div>
      </div>

      {/* Helpful Hint Block */}
      <div className="bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100/60 dark:border-blue-900/30 rounded-2xl p-6">
        <div className="flex gap-3">
          <svg className="text-blue-500 shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div>
            <h4 className="text-xs font-bold text-blue-800 dark:text-blue-400 uppercase tracking-wider">AI Optimization Note</h4>
            <p className="text-xs text-blue-600/90 dark:text-blue-500 leading-relaxed mt-1">
              For best results with the **AI Resume Analysis** and matching systems, we highly recommend uploading files formatted in structured PDF (.pdf) format with selectable text.
            </p>
          </div>
        </div>
      </div>

      {/* Modern Deletion Confirmation Modal */}
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
                Are you sure you want to permanently delete your resume? This cannot be undone and will impact active applications.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-850 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteDelete}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-500/10"
              >
                Delete Resume
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Resume;