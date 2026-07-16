import { useState } from "react";
import resumeAnalysisService from "../../services/resumeAnalysisService";

function ResumeAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setMessage("");
    setAnalysis(null);

    try {
      const response = await resumeAnalysisService.analyzeResume();
      setAnalysis(response.data.data);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to analyze resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            AI Resume Analysis
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Run your active resume through our artificial intelligence model to check parsing compatibility and ATS scoring.
          </p>
        </div>

        {/* Trigger Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 self-start sm:self-center shrink-0 ${
            loading
              ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
          }`}
        >
          {/* Sparkles SVG Icon */}
          <svg className={loading ? "animate-spin text-slate-400" : "text-white"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {loading ? (
              <>
                <circle cx="12" cy="12" r="10" strokeDasharray="30 10" />
              </>
            ) : (
              <>
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.32 11.32l.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              </>
            )}
          </svg>
          {loading ? "Analyzing Profile..." : "Analyze Resume"}
        </button>
      </div>

      {/* Loading Skeleton State */}
      {loading && (
        <div className="space-y-6 animate-pulse">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 h-32 flex items-center justify-between">
            <div className="space-y-3 w-1/3">
              <div className="h-4 bg-slate-100 rounded w-2/3"></div>
              <div className="h-8 bg-slate-100 rounded w-1/2"></div>
            </div>
            <div className="w-16 h-16 bg-slate-100 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 h-48"></div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 h-48"></div>
          </div>
        </div>
      )}

      {/* Feedback Message Toast */}
      {message && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-sm font-medium">
          <svg className="text-emerald-500 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {/* Results View */}
      {analysis && (
        <div className="space-y-6">
          
          {/* ATS Scoring Metric Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Analysis Result</span>
              <h2 className="text-lg font-bold text-slate-800 mt-0.5">Applicant Tracking System (ATS) Score</h2>
              <p className="text-xs text-slate-400 mt-1">
                Your score is calculated based on keyword density, formatting checks, and experience flow.
              </p>
            </div>
            {/* Dynamic circular-styled badge */}
            <div className="flex flex-col items-center justify-center bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 min-w-[100px] text-center">
              <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">
                {analysis.atsScore}
              </span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase mt-0.5">/ 100 max</span>
            </div>
          </div>

          {/* Core Content Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section
              title="Skills matched"
              items={analysis.skills}
              theme="blue"
            />
            <Section
              title="Strengths"
              items={analysis.strengths}
              theme="emerald"
            />
            <Section
              title="Areas for Improvement"
              items={analysis.weaknesses}
              theme="rose"
            />
            <Section
              title="Parser Projects Check"
              items={analysis.projects}
              theme="indigo"
            />
          </div>

          {/* Single value inputs stack below */}
          <div className="space-y-6">
            <SingleText
              title="Education Parsed Summary"
              value={analysis.education}
            />

            <SingleText
              title="Experience Parsed Summary"
              value={analysis.experience}
            />

            <Section
              title="Recommendations & Suggestions"
              items={analysis.suggestions}
              theme="amber"
            />
          </div>

        </div>
      )}
    </div>
  );
}

// Upgraded Section Card
function Section({ title, items, theme = "blue" }) {
  // Theme styling configuration map
  const themes = {
    blue: {
      bg: "bg-blue-50/40",
      border: "border-blue-100/60",
      dot: "bg-blue-500",
      title: "text-blue-700",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      )
    },
    emerald: {
      bg: "bg-emerald-50/40",
      border: "border-emerald-100/60",
      dot: "bg-emerald-500",
      title: "text-emerald-700",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    },
    rose: {
      bg: "bg-rose-50/40",
      border: "border-rose-100/60",
      dot: "bg-rose-500",
      title: "text-rose-700",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )
    },
    indigo: {
      bg: "bg-indigo-50/40",
      border: "border-indigo-100/60",
      dot: "bg-indigo-500",
      title: "text-indigo-700",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    amber: {
      bg: "bg-amber-50/40",
      border: "border-amber-100/60",
      dot: "bg-amber-500",
      title: "text-amber-700",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    }
  };

  const currentTheme = themes[theme] || themes.blue;

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between`}>
      <div>
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 pb-4 border-b border-slate-100">
          <span className={currentTheme.title}>{currentTheme.icon}</span>
          {title}
        </h2>

        {items && items.length > 0 ? (
          <ul className="mt-4 space-y-2.5">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-slate-650 leading-relaxed">
                <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot} shrink-0 mt-2`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400 italic mt-4">No data parsed for this section.</p>
        )}
      </div>
    </div>
  );
}

// Upgraded Single Text Card
function SingleText({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 pb-4 border-b border-slate-100">
        <span className="text-blue-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </span>
        {title}
      </h2>

      {value ? (
        <p className="mt-4 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          {value}
        </p>
      ) : (
        <p className="text-xs text-slate-400 italic mt-4">No text details provided.</p>
      )}
    </div>
  );
}

export default ResumeAnalysis;