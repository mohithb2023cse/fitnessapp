import React from 'react';
import { Activity, Target, BarChart3, Dumbbell, Home } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

type Tab = {
  id: string;
  label: string;
  icon: React.FC<{ size?: number }>;
};

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'stats', label: 'Stats', icon: BarChart3 }
  ];

  return (
    <nav className="bg-white shadow-lg rounded-2xl p-2 mb-6">
      <div className="flex justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 min-w-[60px] ${
                isActive
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
