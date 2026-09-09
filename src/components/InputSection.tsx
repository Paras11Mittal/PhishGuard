import React from 'react';
import { TabType } from '../types/analysis';

interface InputSectionProps {
  activeTab: TabType;
  emailContent: string;
  messageContent: string;
  urlInput: string;
  onEmailContentChange: (value: string) => void;
  onMessageContentChange: (value: string) => void;
  onUrlInputChange: (value: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  activeTab,
  emailContent,
  messageContent,
  urlInput,
  onEmailContentChange,
  onMessageContentChange,
  onUrlInputChange,
}) => {
  return (
    <div id="input-container" className="mb-6">
      {activeTab === 'email' && (
        <div>
          <label htmlFor="email-content" className="block text-micro text-muted-foreground mb-1.5 uppercase tracking-wide">
            Paste email content below
          </label>
          <textarea
            id="email-content"
            rows={8}
            className="w-full max-w-full p-4 border border-border rounded-inner bg-[#0B0F19] text-body text-foreground focus-ring transition-all duration-100 ease-out resize-y placeholder:text-muted-foreground shadow-inner font-mono"
            placeholder="From: security@yourbank.com..."
            value={emailContent}
            onChange={(e) => onEmailContentChange(e.target.value)}
          />
        </div>
      )}

      {activeTab === 'message' && (
        <div>
          <label htmlFor="message-content" className="block text-micro text-muted-foreground mb-1.5 uppercase tracking-wide">
            Paste message content below
          </label>
          <textarea
            id="message-content"
            rows={8}
            className="w-full max-w-full p-4 border border-border rounded-inner bg-[#0B0F19] text-body text-foreground focus-ring transition-all duration-100 ease-out resize-y placeholder:text-muted-foreground shadow-inner font-mono"
            placeholder="Your package has a delivery issue. Click here to resolve: http://bit.ly/xyz..."
            value={messageContent}
            onChange={(e) => onMessageContentChange(e.target.value)}
          />
        </div>
      )}

      {activeTab === 'url' && (
        <div>
          <label htmlFor="url-input" className="block text-micro text-muted-foreground mb-1.5 uppercase tracking-wide">
            Enter a website URL to scan
          </label>
          <input
            type="url"
            id="url-input"
            className="w-full max-w-full p-4 border border-border rounded-inner bg-[#0B0F19] text-body text-foreground focus-ring transition-all duration-100 ease-out placeholder:text-muted-foreground shadow-inner font-mono"
            placeholder="https://example-secure-login.com/update"
            value={urlInput}
            onChange={(e) => onUrlInputChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default InputSection;