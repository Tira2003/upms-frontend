import React from "react";

interface BackButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export function BackButton({ onClick, className = "", label = "Back" }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-[0.8rem] hover:text-gray-900 transition-all ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  );
}
