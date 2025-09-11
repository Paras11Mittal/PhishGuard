import React from 'react';

interface RiskAssessmentProps {
  riskLevel: string;
  summary: string;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ riskLevel, summary }) => {
  const getRiskClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'high risk':
        return 'border-orange-500 bg-orange-50';
      case 'suspicious':
        return 'border-yellow-500 bg-yellow-50';
      case 'low risk':
        return 'border-lime-500 bg-lime-50';
      case 'safe':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 mb-6 transition-all duration-300 ${getRiskClass(riskLevel)}`}>
      <p className="text-sm font-semibold uppercase tracking-wider">Risk Level</p>
      <p className="text-2xl font-bold">{riskLevel}</p>
      <p className="text-gray-600 mt-1">{summary}</p>
    </div>
  );
};

export default RiskAssessment;