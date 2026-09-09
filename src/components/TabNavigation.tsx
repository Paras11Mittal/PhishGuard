import React from 'react';
import { TabType } from '../types/analysis';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'email' as TabType, label: 'Email Analysis' },
    { id: 'message' as TabType, label: 'SMS / Chat' },
    { id: 'url' as TabType, label: 'Website URL' },
  ];

  return (
    <div className="mb-6">
      <nav className="flex space-x-1 p-1 bg-slate-900/50 rounded-outer border border-border" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 whitespace-nowrap py-2.5 px-4 rounded-inner text-sm font-medium transition-all duration-100 ease-out focus-ring ${
              activeTab === tab.id
                ? 'bg-slate-800 text-white shadow-lg shadow-primary/10 border border-white/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;