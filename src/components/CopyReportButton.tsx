import React, { useState } from 'react';
import { AnalysisResult } from '../types/analysis';

interface CopyReportButtonProps {
  results: AnalysisResult;
}

const CopyReportButton: React.FC<CopyReportButtonProps> = ({ results }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const reportText = JSON.stringify(results, null, 2);
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy report:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 text-foreground border border-white/10 rounded-inner hover:bg-slate-700/50 transition-all duration-100 ease-out text-body font-medium focus-ring"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <span>{copied ? 'Copied!' : 'Copy Report'}</span>
    </button>
  );
};

export default CopyReportButton;