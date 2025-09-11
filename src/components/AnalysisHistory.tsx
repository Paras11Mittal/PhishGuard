import React from 'react';
import { AnalysisHistory as HistoryType } from '../utils/storage';

interface AnalysisHistoryProps {
  history: HistoryType[];
  onSelectHistory: (entry: HistoryType) => void;
  onClearHistory: () => void;
}

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ 
  history, 
  onSelectHistory, 
  onClearHistory 
}) => {
  if (history.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-sm">Recent Analyses</h3>
        <button
          onClick={onClearHistory}
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="space-y-2">
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelectHistory(entry)}
            className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)} Analysis
                </p>
                <p className="text-xs text-gray-500 truncate">{entry.content}</p>
              </div>
              <div className="flex-shrink-0 ml-2">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  entry.result.riskLevel === 'Critical' ? 'bg-red-500' :
                  entry.result.riskLevel === 'High Risk' ? 'bg-orange-500' :
                  entry.result.riskLevel === 'Suspicious' ? 'bg-yellow-500' :
                  entry.result.riskLevel === 'Low Risk' ? 'bg-lime-500' :
                  'bg-green-500'
                }`}></span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;