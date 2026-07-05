import { motion } from "motion/react";
import { BackButton } from "./ui/BackButton";

interface WaitingApprovalProps {
  onBackToLogin: () => void;
  onGoBack?: () => void;
}

export function WaitingApproval({ onBackToLogin, onGoBack }: WaitingApprovalProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-12 bg-stone-50 font-sans">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Left — text content */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 max-w-lg"
        >
          {/* Label */}
          <p className="mb-4 text-gold-dark text-sm font-bold uppercase tracking-wider">
            Application submitted
          </p>

          {/* Heading */}
          <h1 className="mb-5 text-maroon text-[clamp(2.2rem,5vw,3rem)] font-extrabold leading-none tracking-tight">
            Waiting for<br />Approval
          </h1>

          {/* Description */}
          <p className="mb-8 leading-relaxed text-stone-600 text-base">
            Your registration request has been submitted successfully. The system administrator will review your application and notify you via email once it has been approved.
          </p>

          {/* Helpful info line */}
          <p className="mb-8 text-stone-400 text-sm">
            Here are some helpful links:
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <BackButton onClick={onGoBack ?? onBackToLogin} label="Go back" />

            <button
              onClick={onBackToLogin}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-maroon to-maroon-dark text-white font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Return to login
            </button>
          </div>
        </motion.div>

        {/* Right — mail illustration */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="relative w-[340px] h-[340px]">
            {/* Scattered small circles */}
            <div className="absolute w-5 h-5 rounded-full bg-maroon/10 top-[8%] left-[20%]" />
            <div className="absolute w-3 h-3 rounded-full bg-gold/20 top-[15%] right-[10%]" />
            <div className="absolute w-4 h-4 rounded-full bg-maroon/5 bottom-[12%] left-[8%]" />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-gold/15 bottom-[20%] right-[18%]" />

            {/* Large background circle */}
            <div className="absolute rounded-full w-[260px] h-[260px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] bg-gradient-to-br from-maroon/5 to-maroon/15 shadow-md shadow-maroon/5" />

            {/* Second overlapping circle (offset top-right) */}
            <div className="absolute rounded-full w-[190px] h-[190px] top-[4%] right-[4%] bg-gradient-to-br from-white to-maroon/5 shadow-sm" />

            {/* Mail icon circle — bottom center */}
            <motion.div
              className="absolute rounded-full flex items-center justify-center w-[80px] h-[80px] bottom-[6%] left-1/2 -translate-x-1/2 bg-gradient-to-br from-gold to-gold-dark shadow-lg shadow-gold/35 z-10 text-maroon"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            {/* Envelope body — centered in the main circle */}
            <div className="absolute flex items-center justify-center w-[130px] h-[95px] top-1/2 left-1/2 -translate-x-[60%] -translate-y-[58%] z-5 text-maroon">
              <svg viewBox="0 0 130 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Envelope shadow/body */}
                <rect x="4" y="8" width="122" height="80" rx="10" fill="currentColor" className="text-maroon/5" />
                <rect x="0" y="4" width="122" height="80" rx="10" fill="white" stroke="currentColor" className="text-maroon/10" strokeWidth="1.5" />
                {/* Envelope flap lines */}
                <path d="M0 14 L61 48 L122 14" stroke="currentColor" className="text-maroon/20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* Lines suggesting text inside */}
                <rect x="18" y="56" width="50" height="5" rx="2.5" fill="currentColor" className="text-maroon/10" />
                <rect x="18" y="67" width="36" height="5" rx="2.5" fill="currentColor" className="text-maroon/10" />
              </svg>
            </div>

            {/* Pulsing ring around mail circle */}
            <motion.div
              className="absolute rounded-full w-[80px] h-[80px] bottom-[6%] left-1/2 -translate-x-1/2 border-2 border-gold z-9"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
