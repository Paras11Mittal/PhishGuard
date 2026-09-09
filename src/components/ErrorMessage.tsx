import React from 'react';

interface ErrorMessageProps {
  message: string;
  isVisible: boolean;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, isVisible, onRetry }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-red-950/40 border border-red-500/50 p-4 rounded-outer animate-fade-in shadow-[0_0_15px_rgba(239,68,68,0.15)]">
      <p className="font-medium text-red-400 text-body">Analysis Failed</p>
      <p className="text-body text-red-300 mt-1">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-inner text-body font-medium hover:bg-red-500/30 transition-all duration-100 ease-out focus-ring"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;