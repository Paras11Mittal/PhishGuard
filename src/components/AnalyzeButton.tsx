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
      className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:bg-blue-300"
    >
      <SearchIcon />
      <span>{isLoading ? 'Analyzing...' : 'Analyze Now'}</span>
    </button>
  );
};

export default AnalyzeButton;