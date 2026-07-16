import { useState, useEffect } from "react";

function CandidateProfileForm({
  initialData,
  onSubmit,
  submitButtonText,
}) {
  const [formData, setFormData] = useState({
    phone: "",
    headline: "",
    about: "",
    experience: "",
    education: "",
    skills: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
    profilePhoto: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        phone: initialData.phone || "",
        headline: initialData.headline || "",
        about: initialData.about || "",
        experience: initialData.experience || "",
        education: initialData.education || "",
        skills: initialData.skills || "",
        location: initialData.location || "",
        github: initialData.github || "",
        linkedin: initialData.linkedin || "",
        portfolio: initialData.portfolio || "",
        profilePhoto: initialData.profilePhoto || "",
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  // Modern Tailwind styling presets
  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";
  const textareaClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5";
  const sectionTitleClass = "text-base font-bold text-slate-800 flex items-center gap-2 pb-4 border-b border-slate-100";
  const svgWrapperClass = "absolute left-3.5 top-3.5 text-slate-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* SECTION 1: Professional Details */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className={sectionTitleClass}>
          {/* Briefcase Icon */}
          <svg className="text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          Professional Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Headline</label>
            <div className="relative">
              {/* File Icon */}
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <input
                type="text"
                name="headline"
                placeholder="e.g. Senior Frontend Engineer with AI expertise"
                value={formData.headline}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>About Me</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <textarea
                name="about"
                placeholder="Tell recruiters about your goals and what you do..."
                value={formData.about}
                onChange={handleChange}
                rows="4"
                className={textareaClass}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Work Experience</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <textarea
                name="experience"
                placeholder="Describe your previous work roles and accomplishments..."
                value={formData.experience}
                onChange={handleChange}
                rows="4"
                className={textareaClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Education</label>
            <div className="relative">
              {/* Graduation Cap Icon */}
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
              <textarea
                name="education"
                placeholder="Degrees, academic programs, or certifications..."
                value={formData.education}
                onChange={handleChange}
                rows="3"
                className={textareaClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Skills</label>
            <div className="relative">
              {/* Wrench Icon */}
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <textarea
                name="skills"
                placeholder="e.g. React, TypeScript, Node.js, AWS, Docker"
                value={formData.skills}
                onChange={handleChange}
                rows="3"
                className={textareaClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Contact & Demographics */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className={sectionTitleClass}>
          {/* Phone Icon */}
          <svg className="text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Contact & Location
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Phone Number</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Location</label>
            <div className="relative">
              {/* Map Pin Icon */}
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                name="location"
                placeholder="e.g. San Francisco, CA"
                value={formData.location}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Social Profile Links */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className={sectionTitleClass}>
          {/* Globe Icon */}
          <svg className="text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Online Presence
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>GitHub URL</label>
            <div className="relative">
              {/* GitHub SVG */}
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <input
                type="url"
                name="github"
                placeholder="https://github.com/username"
                value={formData.github}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <div className="relative">
              {/* LinkedIn SVG */}
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <input
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Portfolio Website</label>
            <div className="relative">
              {/* Globe SVG */}
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <input
                type="url"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Profile Photo URL</label>
            <div className="relative">
              {/* Image Icon */}
              <svg className={svgWrapperClass} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <input
                type="url"
                name="profilePhoto"
                placeholder="https://example.com/photo.jpg"
                value={formData.profilePhoto}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20"
        >
          {/* Checkmark Icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default CandidateProfileForm;