import React from 'react';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function ContactButton({ className = "", onClick, children }: ContactButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`bg-[#00BFFF] hover:bg-[#00BFFF]/90 text-[#0a0e27] font-bold py-2.5 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,191,255,0.4)] text-sm ${className}`}
    >
      {children || "Contact Us"}
    </button>
  );
}
