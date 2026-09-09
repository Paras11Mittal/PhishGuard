import React from 'react';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: true },
    { name: 'Assets', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', active: false },
    { name: 'Threats', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', active: false },
    { name: 'Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', active: false },
    { name: 'Incidents', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', active: false },
    { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', active: false },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-muted border-r border-border flex-col h-screen sticky top-0 z-40">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-wide text-foreground">CyFocus</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 mt-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-inner transition-all duration-200 group ${
              item.active 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
            }`}
          >
            <svg className={`w-5 h-5 ${item.active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="font-medium text-body">{item.name}</span>
            {item.active && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            )}
          </a>
        ))}
      </nav>
      
      <div className="p-4 m-4 rounded-inner bg-[#0B0F19]/50 border border-border">
        <p className="text-micro text-muted-foreground mb-2 font-mono uppercase tracking-widest">SOC Status</p>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-safe shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          <span className="text-body font-mono text-safe">Secure</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
