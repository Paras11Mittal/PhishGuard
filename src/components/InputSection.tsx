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
    <div id="input-container">
      {activeTab === 'email' && (
        <div>
          <label htmlFor="email-content" className="block text-sm font-medium text-gray-700 mb-1">
            Paste email content below
          </label>
          <textarea
            id="email-content"
            rows={8}
            className="w-full max-w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y"
            placeholder="From: security@yourbank.com..."
            value={emailContent}
            onChange={(e) => onEmailContentChange(e.target.value)}
          />
        </div>
      )}

      {activeTab === 'message' && (
        <div>
          <label htmlFor="message-content" className="block text-sm font-medium text-gray-700 mb-1">
            Paste message content below
          </label>
          <textarea
            id="message-content"
            rows={8}
            className="w-full max-w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y"
            placeholder="Your package has a delivery issue. Click here to resolve: http://bit.ly/xyz..."
            value={messageContent}
            onChange={(e) => onMessageContentChange(e.target.value)}
          />
        </div>
      )}

      {activeTab === 'url' && (
        <div>
          <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-1">
            Enter a website URL to scan
          </label>
          <input
            type="url"
            id="url-input"
            className="w-full max-w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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