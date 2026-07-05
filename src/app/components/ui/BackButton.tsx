import { ArrowLeft } from "lucide-react";

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
      <ArrowLeft size={14} strokeWidth={2} />
      {label}
    </button>
  );
}
