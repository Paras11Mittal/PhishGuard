import React from 'react';
import { AnalysisHistory } from '../utils/storage';

interface IncidentStreamProps {
  history: AnalysisHistory[];
  onSelectIncident: (entry: AnalysisHistory) => void;
  onClearHistory?: () => void;
}

const IncidentStream: React.FC<IncidentStreamProps> = ({ history, onSelectIncident, onClearHistory }) => {
  const getSeverityStyles = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'critical': return 'bg-critical/10 text-critical border-critical/30';
      case 'high risk': return 'bg-warning/10 text-warning border-warning/30';
      case 'suspicious': return 'bg-warning/10 text-warning border-warning/30';
      case 'low risk': return 'bg-safe/10 text-safe border-safe/30';
      case 'safe': return 'bg-safe/10 text-safe border-safe/30';
      default: return 'bg-[#0B0F19]/50 text-foreground border-border';
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const truncateContent = (content: string, length = 30) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
  };

  return (
    <div className="glass-panel p-0 overflow-hidden flex flex-col h-full max-h-[800px]">
      <div className="p-5 border-b border-border flex justify-between items-center bg-[#0B0F19]/50">
        <h2 className="text-heading font-bold text-foreground">Incident Stream</h2>
        <div className="flex space-x-2">
          <div className="text-micro font-medium text-muted-foreground bg-[#0B0F19] px-2 py-1 rounded-inner border border-border">
            {history.length} Records
          </div>
          {onClearHistory && history.length > 0 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if(window.confirm('Are you sure you want to clear all history?')) {
                  onClearHistory();
                }
              }}
              className="text-micro font-medium text-critical bg-critical/10 px-2 py-1 rounded-inner border border-critical/30 hover:bg-critical/20 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground">
             <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
             <p className="text-body font-medium">No active incidents</p>
             <p className="text-micro mt-1">Run an analysis to generate telemetry data.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0B0F19]/50 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="py-3 px-5 text-micro font-medium text-muted-foreground uppercase tracking-wider">ID / Time</th>
                <th className="py-3 px-5 text-micro font-medium text-muted-foreground uppercase tracking-wider">Type / Source</th>
                <th className="py-3 px-5 text-micro font-medium text-muted-foreground uppercase tracking-wider">Severity</th>
                <th className="py-3 px-5 text-micro font-medium text-muted-foreground uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {history.map((incident) => (
                <tr key={incident.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => onSelectIncident(incident)}>
                  <td className="py-3 px-5">
                    <div className="font-mono text-body font-medium text-foreground">INC-{incident.id.slice(-4)}</div>
                    <div className="font-mono text-micro text-muted-foreground mt-0.5">{formatTime(incident.timestamp)}</div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="text-body font-medium text-foreground capitalize">{incident.type.replace(' content', '')}</div>
                    <div className="font-mono text-micro text-muted-foreground mt-0.5" title={incident.content}>{truncateContent(incident.content)}</div>
                  </td>
                  <td className="py-3 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-micro text-micro font-medium border ${getSeverityStyles(incident.result.riskLevel)}`}>
                      {incident.result.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-inner bg-[#0B0F19] border border-border text-primary hover:bg-primary/10 hover:border-primary/30 focus-ring">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IncidentStream;
