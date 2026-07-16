import { useState } from "react";

function ResumeUploadForm({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a resume.");
      return;
    }

    onUpload(selectedFile);

    event.target.reset();
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      
      {/* Custom Styled Dropzone Container */}
      <div className="relative group w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white rounded-2xl transition-all duration-200 overflow-hidden">
        
        {/* The Actual Input (Hidden but Functional) */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          title="" // Hides the default browser tooltip
        />

        {/* Visual State: When a file IS selected */}
        {selectedFile ? (
          <div className="flex flex-col items-center gap-3 text-center pointer-events-none">
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-sm">
              {/* Document Check SVG */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M9 15l2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{selectedFile.name}</p>
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Ready to upload
                </span>
                <span className="text-xs text-slate-400 font-medium">Click to change</span>
              </div>
            </div>
          </div>
        ) : (
          /* Visual State: When NO file is selected */
          <div className="flex flex-col items-center gap-3 text-center pointer-events-none">
            <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 group-hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300">
              {/* Cloud Upload SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">
                <span className="text-blue-600 group-hover:text-blue-700 underline decoration-blue-500/30 underline-offset-2">Click to browse</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Supports PDF, DOC, or DOCX
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button aligned to the right */}
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={!selectedFile}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            selectedFile
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
              : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
          }`}
        >
          {/* Small Arrow Up SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
          Upload Resume
        </button>
      </div>
    </form>
  );
}

export default ResumeUploadForm;