import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const token = await loginUser(formData);

      login(token);

      const decoded = jwtDecode(token);

      if (decoded.role === "CANDIDATE") {
        navigate("/candidate/dashboard");
      } else if (decoded.role === "RECRUITER") {
        navigate("/recruiter/dashboard");
      } else if (decoded.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // Modern input focus and default class styles
  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5";
  const svgWrapperClass = "absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl p-8 w-full max-w-md space-y-6 transition-colors duration-200">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-blue-600 items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20 mb-1">
            I
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
            InterviewHub <span className="text-blue-500">AI</span>
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Access your automated interviewing dashboard
          </p>
        </div>

        {/* Error Notification Alert */}
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

        {/* LoginForm Wrapper */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Submit Action Block */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
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
                Checking credentials...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Dynamic Registration Directory Grid */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-5 space-y-3.5 text-center text-xs">
          <p className="text-slate-500 dark:text-slate-400">
            Don't have an account yet? Register as:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/register" 
              className="px-3 py-2 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:bg-blue-50/20 dark:hover:bg-blue-950/10 text-slate-650 dark:text-slate-300 rounded-xl font-medium transition-all duration-150"
            >
              Candidate
            </Link>
            <Link 
              to="/recruiter/register" 
              className="px-3 py-2 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:bg-blue-50/20 dark:hover:bg-blue-950/10 text-slate-650 dark:text-slate-300 rounded-xl font-medium transition-all duration-150"
            >
              Recruiter
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;