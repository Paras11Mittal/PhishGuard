import React from 'react';
import { ShieldIcon } from './icons/ShieldIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="inline-block bg-blue-100 text-blue-600 p-3 rounded-full">
        <ShieldIcon />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mt-4">PhishGuard</h1>
      <p className="text-gray-500 mt-2 text-lg">
        AI-powered analysis to detect and explain phishing threats in real-time.
      </p>
    </header>
  );
};

export default Header;