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
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-medium text-foreground text-body">Recent Analyses</h3>
        <button
          onClick={onClearHistory}
          className="text-micro text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="space-y-1">
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelectHistory(entry)}
            className="w-full text-left p-2.5 bg-slate-800/30 rounded-inner hover:bg-slate-700/50 border border-transparent hover:border-white/5 transition-colors focus-ring"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-body font-medium text-foreground truncate">
                  {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)} Analysis
                </p>
                <p className="text-micro text-muted-foreground truncate mt-0.5">{entry.content}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  entry.result.riskLevel === 'Critical' ? 'bg-critical shadow-[0_0_8px_rgba(239,68,68,0.8)]' :
                  entry.result.riskLevel === 'High Risk' ? 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]' :
                  entry.result.riskLevel === 'Suspicious' ? 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]' :
                  entry.result.riskLevel === 'Low Risk' ? 'bg-safe shadow-[0_0_8px_rgba(16,185,129,0.8)]' :
                  'bg-safe shadow-[0_0_8px_rgba(16,185,129,0.8)]'
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