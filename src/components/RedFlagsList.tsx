import React from 'react';
import { RedFlag } from '../types/analysis';
import { WarningIcon } from './icons/WarningIcon';

interface RedFlagsListProps {
  redFlags: RedFlag[];
}

const RedFlagsList: React.FC<RedFlagsListProps> = ({ redFlags }) => {
  if (!redFlags || redFlags.length === 0) {
    return (
      <div className="text-center py-4 px-3 bg-green-50 rounded-lg border border-green-200">
        <p className="font-medium text-green-800">
          No significant red flags detected. The content appears to be safe.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {redFlags.map((flag, index) => (
        <div
          key={index}
          className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex-shrink-0">
            <WarningIcon />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{flag.indicator}</p>
            <p className="text-sm text-gray-600">{flag.explanation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RedFlagsList;