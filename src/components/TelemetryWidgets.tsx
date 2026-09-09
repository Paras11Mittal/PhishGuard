import React from 'react';
import { AnalysisHistory } from '../utils/storage';

interface TelemetryWidgetsProps {
  history: AnalysisHistory[];
}

const TelemetryWidgets: React.FC<TelemetryWidgetsProps> = ({ history }) => {
  const totalScans = history.length;
  
  const highRiskCount = history.filter(h => 
    h.result.riskLevel === 'Critical' || h.result.riskLevel === 'High Risk'
  ).length;

  const emailCount = history.filter(h => h.type.includes('email')).length;
  const messageCount = history.filter(h => h.type.includes('message')).length;
  const urlCount = history.filter(h => h.type.includes('URL')).length;

  const emailPct = totalScans > 0 ? Math.round((emailCount / totalScans) * 100) : 0;
  const messagePct = totalScans > 0 ? Math.round((messageCount / totalScans) * 100) : 0;
  const urlPct = totalScans > 0 ? Math.round((urlCount / totalScans) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Scans */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-primary/30 transition-colors flex flex-col justify-between min-h-[160px]">
        <div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
          <p className="text-body font-medium text-muted-foreground mb-1 uppercase tracking-wider text-micro">Total Scans</p>
          <div className="flex items-end space-x-3 mt-2">
            <h3 className="text-4xl font-bold font-mono text-foreground tracking-tight">{totalScans}</h3>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-1.5 w-full bg-[#0B0F19] rounded-full overflow-hidden">
            <div className="h-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)] rounded-full" style={{ width: totalScans > 0 ? '100%' : '0%' }}></div>
          </div>
          <p className="text-micro text-muted-foreground mt-2">Historical records retained locally</p>
        </div>
      </div>

      {/* Threats Detected */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-critical/30 transition-colors flex flex-col justify-between min-h-[160px]">
        <div>
          <p className="text-body font-medium text-muted-foreground mb-1 uppercase tracking-wider text-micro">High-Risk Threats</p>
          <div className="flex items-end space-x-3 mt-2">
            <h3 className="text-4xl font-bold font-mono text-critical tracking-tight">{highRiskCount}</h3>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-1.5 w-full bg-[#0B0F19] rounded-full overflow-hidden">
             <div className="h-full bg-critical shadow-[0_0_10px_rgba(239,68,68,0.8)] rounded-full" style={{ width: totalScans > 0 ? `${(highRiskCount/totalScans)*100}%` : '0%' }}></div>
          </div>
          <p className="text-micro text-muted-foreground mt-2">{totalScans > 0 ? Math.round((highRiskCount/totalScans)*100) : 0}% of all scans flagged as dangerous</p>
        </div>
      </div>

      {/* Threat Vectors */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-primary/30 transition-colors min-h-[160px]">
        <p className="text-body font-medium text-muted-foreground mb-1 uppercase tracking-wider text-micro">Scan Breakdown</p>
        
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex justify-between text-micro mb-1">
              <span className="text-foreground">Emails</span>
              <span className="font-mono text-primary">{emailPct}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#0B0F19] rounded-full overflow-hidden">
              <div className="h-full bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)] rounded-full" style={{ width: `${emailPct}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-micro mb-1">
              <span className="text-foreground">URLs</span>
              <span className="font-mono text-warning">{urlPct}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#0B0F19] rounded-full overflow-hidden">
              <div className="h-full bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)] rounded-full" style={{ width: `${urlPct}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-micro mb-1">
              <span className="text-foreground">SMS/Messages</span>
              <span className="font-mono text-safe">{messagePct}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#0B0F19] rounded-full overflow-hidden">
              <div className="h-full bg-safe shadow-[0_0_8px_rgba(16,185,129,0.8)] rounded-full" style={{ width: `${messagePct}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemetryWidgets;
