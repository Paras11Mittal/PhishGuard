import React from 'react';

const TopNav: React.FC = () => {
  return (
    <header className="h-16 bg-muted/95 backdrop-blur-md border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-inner leading-5 bg-[#0B0F19] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-inner font-mono"
            placeholder="Search IPs, domains, incident IDs..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-6 ml-6">
        <div className="hidden md:flex items-center space-x-2 border border-border bg-[#0B0F19]/50 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)] animate-pulse"></span>
          <span className="text-micro font-medium text-muted-foreground">All Systems Operational</span>
        </div>
        
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-critical ring-2 ring-muted shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
        </button>
        
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shadow-[0_0_10px_rgba(0,229,255,0.2)] cursor-pointer">
          JD
        </div>
      </div>
    </header>
  );
};

export default TopNav;
