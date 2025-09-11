import React from 'react';

interface LoadingSpinnerProps {
  isVisible: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="text-center py-8">
      <div className="loader mx-auto"></div>
      <p className="text-gray-500 mt-4 font-medium">AI is analyzing... This may take a moment.</p>
    </div>
  );
};

export default LoadingSpinner;