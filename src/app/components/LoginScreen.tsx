import { useState } from "react";
import { motion } from "motion/react";
import usjLogo from "../../usj-logo.png";
import { BackButton } from "./ui/BackButton";

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onGoRegister: () => void;
}

export function LoginScreen({ onBack, onLoginSuccess, onGoRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [forgotSent, setForgotSent] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); onLoginSuccess(); }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-gray-100 font-sans">
      {/* Back button — top left */}
      <BackButton onClick={onBack} className="absolute top-6 left-6 z-20" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px] rounded-2xl p-8 bg-white border border-gray-200 shadow-md shadow-gray-200/50"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-gray-200 shadow-md p-1.5">
            <img
              src={usjLogo}
              alt="USJ Logo"
              className="w-9 h-9 object-contain"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-7">
          <h1 className="mb-1.5 text-gray-900 text-[1.75rem] font-bold tracking-tight">
            Sign In
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your institutional credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1.5 text-gray-900 text-[0.8rem] font-medium">
              Institutional Email
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                placeholder="name@sjp.ac.lk"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border outline-none text-sm transition-all ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-gold"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-gray-900 text-[0.8rem] font-medium">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  if (!email) { setErrors((p) => ({ ...p, email: "Enter your email first" })); return; }
                  setForgotSent(true);
                  setTimeout(() => setForgotSent(false), 4000);
                }}
                className="text-maroon font-semibold text-[0.78rem] hover:text-maroon-light transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white border outline-none text-sm transition-all ${
                  errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-gold"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" />
                    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          {/* Remember for 30 days */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none text-gray-500 text-[0.82rem]">
            <button
              type="button"
              onClick={() => setRemember((p) => !p)}
              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all border ${
                remember ? "bg-gradient-to-br from-maroon to-maroon-dark border-none" : "border-gray-300"
              }`}
            >
              {remember && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span onClick={() => setRemember((p) => !p)}>Remember for 30 days</span>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-full transition-all duration-200 flex items-center justify-center gap-2 mt-1 text-white font-bold text-[0.95rem] tracking-wide ${
              isLoading 
                ? "bg-maroon/60 cursor-not-allowed shadow-none" 
                : "bg-gradient-to-br from-maroon to-maroon-dark hover:brightness-110 active:scale-[0.99]"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3" />
                  <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
                </svg>
                Signing in...
              </>
            ) : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-[0.75rem] tracking-widest font-semibold">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Microsoft Outlook SSO */}
        <button
          type="button"
          className="w-full py-3 rounded-xl flex items-center justify-center gap-2.5 transition-all bg-white border border-gray-200 text-gray-900 font-medium text-[0.88rem] hover:bg-gray-50 hover:border-gray-300"
        >
          <svg width="17" height="17" viewBox="0 0 21 21" fill="none">
            <rect x="1" y="1" width="9" height="9" fill="#F25022" />
            <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
            <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
            <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
          </svg>
          Continue with Microsoft Outlook
        </button>

        {/* Register link */}
        <p className="text-center mt-6 text-gray-500 text-[0.85rem]">
          Don't have an account?{" "}
          <button
            onClick={onGoRegister}
            className="text-maroon font-semibold hover:text-maroon-light transition-colors"
          >
            Request access
          </button>
        </p>

        {/* Forgot password toast */}
        {forgotSent && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-600 text-[0.8rem]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
              <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Password reset link sent to <strong>{email}</strong></span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
