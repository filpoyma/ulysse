import React from 'react';
import { Map, Plane, Home } from 'lucide-react';

interface DetailsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DetailsTabs({ activeTab, onTabChange }: DetailsTabsProps) {
  return (
    <div className="details-tabs">
      <button 
        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
        onClick={() => onTabChange('overview')}
      >
        <Map size={24} />
        <span>Обзор</span>
      </button>
      <button 
        className={`tab ${activeTab === 'flights' ? 'active' : ''}`}
        onClick={() => onTabChange('flights')}
      >
        <Plane size={24} />
        <span>Рейсы</span>
      </button>
      <button 
        className={`tab ${activeTab === 'accommodation' ? 'active' : ''}`}
        onClick={() => onTabChange('accommodation')}
      >
        <Home size={24} />
        <span>Проживание</span>
      </button>
    </div>
  );
}