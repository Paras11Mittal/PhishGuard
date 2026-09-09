import React from 'react';
import { RedFlag } from '../types/analysis';
import { WarningIcon } from './icons/WarningIcon';

interface RedFlagsListProps {
  redFlags: RedFlag[];
}

const RedFlagsList: React.FC<RedFlagsListProps> = ({ redFlags }) => {
  if (!redFlags || redFlags.length === 0) {
    return (
      <div className="text-center py-4 px-3 bg-emerald-950/40 rounded-outer border border-emerald-500/30">
        <p className="font-medium text-emerald-400 text-body">
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
          className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-outer border border-white/5 shadow-lg shadow-black/20"
        >
          <div className="flex-shrink-0 mt-0.5">
            <WarningIcon />
          </div>
          <div>
            <p className="font-medium text-foreground text-body">{flag.indicator}</p>
            <p className="text-body text-muted-foreground mt-1 leading-relaxed">{flag.explanation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RedFlagsList;