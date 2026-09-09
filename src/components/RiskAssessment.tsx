import React from 'react';

interface RiskAssessmentProps {
  riskLevel: string;
  summary: string;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ riskLevel, summary }) => {
  const getRiskClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical':
        return 'bg-critical/10 text-critical border-critical/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
      case 'high risk':
        return 'bg-warning/10 text-warning border-warning/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'suspicious':
        return 'bg-warning/10 text-warning border-warning/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'low risk':
        return 'bg-safe/10 text-safe border-safe/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'safe':
        return 'bg-safe/10 text-safe border-safe/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      default:
        return 'bg-[#0B0F19]/50 text-foreground border-border';
    }
  };

  return (
    <div className={`p-6 border-l-4 rounded-r-outer ${getRiskClass(riskLevel)} animate-slide-up relative overflow-hidden group`}>
      <p className="text-micro font-medium uppercase tracking-wider mb-1">Risk Level</p>
      <h3 className="text-2xl font-bold font-mono tracking-tight mb-2">{riskLevel}</h3>
      <p className="text-body leading-relaxed">{summary}</p>
      
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default RiskAssessment;