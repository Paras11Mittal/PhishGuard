import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import InputSection from './components/InputSection';
import AnalyzeButton from './components/AnalyzeButton';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import AnalysisResults from './components/AnalysisResults';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import RiskDistribution from './components/RiskDistribution';
import TelemetryWidgets from './components/TelemetryWidgets';
import IncidentStream from './components/IncidentStream';
import { TabType, AnalysisResult } from './types/analysis';
import { analyzeContent, PhishingAnalysisError } from './services/phishingApi';
import { analyzeClientSideHeuristics, highlightSuspiciousDomains } from './utils/heuristics';
import { 
  saveAnalysisToHistory, 
  getAnalysisHistory, 
  clearAnalysisHistory,
  AnalysisHistory as HistoryType 
} from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('email');
  const [emailContent, setEmailContent] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [urlInput, setUrlInput] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const [highlightedContent, setHighlightedContent] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    setHistory(getAnalysisHistory());
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    clearResults();
  };

  const clearResults = () => {
    setShowResults(false);
    setAnalysisResults(null);
    setHighlightedContent('');
    setShowError(false);
    setErrorMessage('');
  };

  const getCurrentInput = (): { content: string; type: string } => {
    switch (activeTab) {
      case 'email':
        return { content: emailContent, type: 'email content' };
      case 'message':
        return { content: messageContent, type: 'message content' };
      case 'url':
        return { content: urlInput, type: 'website URL' };
      default:
        return { content: '', type: '' };
    }
  };

  const handleSelectHistory = (entry: HistoryType) => {
    // Set the content based on the type
    switch (entry.type) {
      case 'email content':
        setActiveTab('email');
        setEmailContent(entry.content);
        break;
      case 'message content':
        setActiveTab('message');
        setMessageContent(entry.content);
        break;
      case 'website URL':
        setActiveTab('url');
        setUrlInput(entry.content);
        break;
    }
    
    // Show the previous results
    setAnalysisResults(entry.result);
    setHighlightedContent(highlightSuspiciousDomains(entry.content));
    setShowResults(true);
    setShowError(false);
  };

  const handleClearHistory = () => {
    clearAnalysisHistory();
    setHistory([]);
  };
  const handleAnalysis = async () => {
    const { content, type } = getCurrentInput();
    
    if (!content.trim()) {
      alert('Please enter some content to analyze.');
      return;
    }

    setIsLoading(true);
    setShowResults(true);
    setShowError(false);
    setAnalysisResults(null);
    setHighlightedContent('');

    try {
      // Get AI analysis
      const aiResult = await analyzeContent(content, type);
      
      // Get client-side heuristics
      const clientFlags = analyzeClientSideHeuristics(content);
      
      // Combine results
      const combinedResult: AnalysisResult = {
        ...aiResult,
        redFlags: [...aiResult.redFlags, ...clientFlags]
      };
      
      // Highlight suspicious content
      const highlighted = highlightSuspiciousDomains(content);
      
      setAnalysisResults(combinedResult);
      setHighlightedContent(highlighted);
      setAnalysisResults(aiResult);
      setShowError(false);
      
      // Save to history
      saveAnalysisToHistory(type, content, combinedResult);
      setHistory(getAnalysisHistory());
    } catch (error) {
      console.error("Analysis failed:", error);
      
      let errorMsg = "An unknown error occurred. Please check the console for details.";
      
      if (error instanceof PhishingAnalysisError) {
        errorMsg = error.message;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }
      
      setErrorMessage(errorMsg);
      setShowError(true);
      setAnalysisResults(null);
      setHighlightedContent('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    handleAnalysis();
  };
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-12 gap-6 mb-8">
              
              {/* Top Row: Heatmap & Telemetry */}
              <div className="col-span-12 xl:col-span-8 space-y-6">
                <RiskDistribution history={history} />
                <TelemetryWidgets history={history} />
              </div>
              
              {/* Right Column: Incident Stream */}
              <div className="col-span-12 xl:col-span-4 h-[820px] xl:h-auto">
                <IncidentStream history={history} onSelectIncident={handleSelectHistory} onClearHistory={handleClearHistory} />
              </div>
              
              {/* Bottom Row: PhishGuard Engine */}
              <div className="col-span-12">
                <div className="glass-panel p-6 sm:p-8 rounded-outer">
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                    <h2 className="text-heading font-bold text-foreground flex items-center">
                      <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Threat Analysis Engine
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side: Inputs */}
                    <div className="space-y-6">
                      <TabNavigation 
                        activeTab={activeTab} 
                        onTabChange={handleTabChange} 
                      />
                      
                      <InputSection
                        activeTab={activeTab}
                        emailContent={emailContent}
                        messageContent={messageContent}
                        urlInput={urlInput}
                        onEmailContentChange={setEmailContent}
                        onMessageContentChange={setMessageContent}
                        onUrlInputChange={setUrlInput}
                      />
            
                      <AnalyzeButton 
                        onClick={handleAnalysis}
                        disabled={isLoading}
                        isLoading={isLoading}
                      />
                    </div>
                    
                    {/* Right side: Results */}
                    <div className="relative">
                      {showResults ? (
                        <div className="h-full">
                          <LoadingSpinner isVisible={isLoading} />
                          <ErrorMessage 
                            message={errorMessage} 
                            isVisible={showError} 
                            onRetry={handleRetry}
                          />
                          {analysisResults && (
                            <AnalysisResults 
                              results={analysisResults} 
                              isVisible={!isLoading && !showError} 
                              highlightedContent={highlightedContent}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="h-full min-h-[400px] border border-border border-dashed rounded-inner flex items-center justify-center p-8 text-center bg-[#0B0F19]/50">
                          <div>
                            <svg className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="text-muted-foreground text-body font-medium">Awaiting input for threat analysis...</p>
                            <p className="text-micro text-muted-foreground mt-2 max-w-xs mx-auto">Paste an email, SMS message, or URL to begin automated security scanning.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;