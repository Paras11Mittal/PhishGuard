import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ onClick, disabled, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-6 w-full bg-gradient-to-r from-primary to-secondary text-[#0B0F19] font-bold py-3.5 px-4 rounded-inner hover:brightness-110 transition-all duration-100 ease-out flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 focus-ring shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)]"
    >
      <SearchIcon />
      <span>{isLoading ? 'Analyzing...' : 'Analyze Now'}</span>
    </button>
  );
};

export default AnalyzeButton;