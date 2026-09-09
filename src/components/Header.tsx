import React from 'react';
import { ShieldIcon } from './icons/ShieldIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center flex flex-col items-center">
      <div className="inline-flex items-center justify-center p-4 rounded-outer bg-slate-800/50 text-primary border border-primary/20 shadow-[0_0_30px_rgba(99,102,241,0.2)] mb-6">
        <ShieldIcon />
      </div>
      <h1 className="text-hero tracking-[-0.04em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">PhishGuard</h1>
      <p className="text-body text-muted-foreground mt-3 max-w-lg mx-auto">
        AI-powered analysis to detect and explain phishing threats in real-time.
      </p>
    </header>
  );
};

export default Header;