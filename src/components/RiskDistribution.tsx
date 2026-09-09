import React from 'react';
import { AnalysisHistory } from '../utils/storage';

interface RiskDistributionProps {
  history: AnalysisHistory[];
}

const RiskDistribution: React.FC<RiskDistributionProps> = ({ history }) => {
  const total = history.length;
  const critical = history.filter(h => h.result.riskLevel === 'Critical').length;
  const highRisk = history.filter(h => h.result.riskLevel === 'High Risk').length;
  const suspicious = history.filter(h => h.result.riskLevel === 'Suspicious').length;
  const lowRisk = history.filter(h => h.result.riskLevel === 'Low Risk').length;
  const safe = history.filter(h => h.result.riskLevel === 'Safe').length;

  const getWidth = (count: number) => {
    if (total === 0) return '0%';
    return `${(count / total) * 100}%`;
  };

  return (
    <div className="glass-panel p-6 relative overflow-hidden group flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-heading font-bold text-foreground flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Risk Distribution Overview
          </h2>
          <p className="text-body text-muted-foreground mt-1">Breakdown of threat levels across all analyzed content</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {total === 0 ? (
           <div className="text-center text-muted-foreground p-8">
             <p>No data available to display risk distribution.</p>
           </div>
        ) : (
          <>
            {/* Critical & High Risk */}
            <div>
              <div className="flex justify-between text-body mb-2">
                <span className="text-foreground flex items-center">
                  <span className="w-2 h-2 rounded-full bg-critical mr-2 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  Critical / High Risk
                </span>
                <span className="font-mono text-critical font-bold">{critical + highRisk}</span>
              </div>
              <div className="h-2 w-full bg-[#0B0F19] rounded-full overflow-hidden">
                <div className="h-full bg-critical shadow-[0_0_10px_rgba(239,68,68,0.8)] rounded-full transition-all duration-500" style={{ width: getWidth(critical + highRisk) }}></div>
              </div>
            </div>

            {/* Suspicious */}
            <div>
              <div className="flex justify-between text-body mb-2">
                <span className="text-foreground flex items-center">
                  <span className="w-2 h-2 rounded-full bg-warning mr-2 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                  Suspicious
                </span>
                <span className="font-mono text-warning font-bold">{suspicious}</span>
              </div>
              <div className="h-2 w-full bg-[#0B0F19] rounded-full overflow-hidden">
                <div className="h-full bg-warning shadow-[0_0_10px_rgba(245,158,11,0.8)] rounded-full transition-all duration-500" style={{ width: getWidth(suspicious) }}></div>
              </div>
            </div>

            {/* Safe & Low Risk */}
            <div>
              <div className="flex justify-between text-body mb-2">
                <span className="text-foreground flex items-center">
                  <span className="w-2 h-2 rounded-full bg-safe mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  Low Risk / Safe
                </span>
                <span className="font-mono text-safe font-bold">{lowRisk + safe}</span>
              </div>
              <div className="h-2 w-full bg-[#0B0F19] rounded-full overflow-hidden">
                <div className="h-full bg-safe shadow-[0_0_10px_rgba(16,185,129,0.8)] rounded-full transition-all duration-500" style={{ width: getWidth(lowRisk + safe) }}></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RiskDistribution;
