import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import InputSection from './components/InputSection';
import AnalyzeButton from './components/AnalyzeButton';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import AnalysisResults from './components/AnalysisResults';
import AnalysisHistory from './components/AnalysisHistory';
import Footer from './components/Footer';
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
    <div className="bg-gray-50 text-gray-800 flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        
        <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
          <TabNavigation 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
          
          <AnalysisHistory
            history={history}
            onSelectHistory={handleSelectHistory}
            onClearHistory={handleClearHistory}
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
          
          {showResults && (
            <div className="mt-8">
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
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;