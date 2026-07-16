import { useState } from "react";

function InterviewGenerateForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    jobRole: "",
    difficulty: "EASY",
    numberOfQuestions: 5,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...formData,
      numberOfQuestions: Number(formData.numberOfQuestions),
    });
  };

  // Consistent modern form styling classes
  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";
  const selectClass = "w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5";
  const svgWrapperClass = "absolute left-3.5 top-3.5 text-slate-400 pointer-events-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Job Role Input */}
        <div>
          <label className={labelClass}>Job Role</label>
          <div className="relative">
            {/* Briefcase SVG */}
            <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              placeholder="e.g. Java Developer"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* 2. Difficulty Select */}
        <div>
          <label className={labelClass}>Difficulty</label>
          <div className="relative">
            {/* Speedometer/Activity SVG */}
            <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
            {/* Custom dropdown arrow to replace native ugly indicator */}
            <div className="absolute right-3.5 top-3.5 pointer-events-none text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Number of Questions Input */}
        <div>
          <label className={labelClass}>Number of Questions</label>
          <div className="relative">
            {/* List/Help Circle SVG */}
            <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <input
              type="number"
              name="numberOfQuestions"
              value={formData.numberOfQuestions}
              onChange={handleChange}
              min="1"
              max="20"
              className={inputClass}
              required
            />
          </div>
        </div>

      </div>

      {/* Action Button */}
      <div className="flex justify-end border-t border-slate-100 pt-5">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/10"
        >
          {/* Sparkles SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Generate Interview
        </button>
      </div>
    </form>
  );
}

export default InterviewGenerateForm;