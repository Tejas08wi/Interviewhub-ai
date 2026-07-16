import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCandidate } from "../../services/authService";

function CandidateRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await registerCandidate(formData);

      setMessage(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // Modern input focus and Tailwind style presets
  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5";
  const svgWrapperClass = "absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl p-8 w-full max-w-md space-y-6 transition-colors duration-200">
        
        {/* Brand & Page Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-blue-600 items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20 mb-1">
            I
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
            Create an Account
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Join InterviewHub AI to start practicing and applying
          </p>
        </div>

        {/* Success Alert */}
        {message && (
          <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400 rounded-xl text-xs font-semibold">
            <svg className="shrink-0 text-emerald-500 dark:text-emerald-450" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{message}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2.5 p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-rose-800 dark:text-rose-400 rounded-xl text-xs font-semibold animate-shake">
            <svg className="shrink-0 text-rose-500 dark:text-rose-450" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Two-Column Name Input Block */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name</label>
              <div className="relative">
                <svg className={svgWrapperClass} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Last Name</label>
              <div className="relative">
                <svg className={svgWrapperClass} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Email Form Field */}
          <div>
            <label className={labelClass}>Email Address</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Password Form Field */}
          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <svg className={svgWrapperClass} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 mt-2 ${
              loading
                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-800"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/15"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin text-slate-400 dark:text-slate-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" strokeDasharray="30 10" stroke="transparent" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
                </svg>
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Existing Member Navigation */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-5 text-center text-xs">
          <p className="text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default CandidateRegister;