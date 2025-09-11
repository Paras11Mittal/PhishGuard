import React from 'react';
import { AnalysisResult } from '../types/analysis';
import RiskAssessment from './RiskAssessment';
import RedFlagsList from './RedFlagsList';
import PhishingTip from './PhishingTip';
import CopyReportButton from './CopyReportButton';

interface AnalysisResultsProps {
  results: AnalysisResult;
  isVisible: boolean;
  highlightedContent?: string;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  results, 
  isVisible, 
  highlightedContent 
}) => {
  if (!isVisible) return null;

  return (
    <div className="animate-slide-up">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Analysis Report</h2>
      
      <RiskAssessment 
        riskLevel={results.riskLevel}
        summary={results.summary}
      />

      {highlightedContent && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-gray-800 mb-2">Content Analysis</h3>
          <div 
            className="text-sm text-gray-700 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          />
        </div>
      )}
      <h3 className="font-semibold text-gray-800 mb-3">Detected Red Flags</h3>
      
      <RedFlagsList redFlags={results.redFlags} />
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <CopyReportButton results={results} />
      </div>
      
      <PhishingTip />
    </div>
  );
};

export default AnalysisResults;