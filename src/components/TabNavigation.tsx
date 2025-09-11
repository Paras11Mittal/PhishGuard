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
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'tab-active'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200'
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