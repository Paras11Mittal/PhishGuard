import React from 'react';

interface ErrorMessageProps {
  message: string;
  isVisible: boolean;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, isVisible, onRetry }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg animate-fade-in">
      <p className="font-bold text-red-800">Analysis Failed</p>
      <p className="text-sm text-red-700 mt-1">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;