export interface RedFlag {
  indicator: string;
  explanation: string;
}

export interface AnalysisResult {
  riskLevel: 'Safe' | 'Low Risk' | 'Suspicious' | 'High Risk' | 'Critical';
  summary: string;
  redFlags: RedFlag[];
}

export type TabType = 'email' | 'message' | 'url';