import { AnalysisResult } from '../types/analysis';

export interface AnalysisHistory {
  id: string;
  timestamp: number;
  type: string;
  content: string;
  result: AnalysisResult;
}

const STORAGE_KEY = 'phishguard_history';
const MAX_HISTORY = 5;

export function saveAnalysisToHistory(
  type: string,
  content: string,
  result: AnalysisResult
): void {
  try {
    const history = getAnalysisHistory();
    const newEntry: AnalysisHistory = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      type,
      content: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
      result
    };
    
    history.unshift(newEntry);
    
    // Keep only the last MAX_HISTORY entries
    const trimmedHistory = history.slice(0, MAX_HISTORY);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn('Failed to save analysis to history:', error);
  }
}

export function getAnalysisHistory(): AnalysisHistory[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load analysis history:', error);
    return [];
  }
}

export function clearAnalysisHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear analysis history:', error);
  }
}