import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Activities from './components/Activities';
import Goals from './components/Goals';
import Workouts from './components/Workouts';
import Stats from './components/Stats';
import Login from './components/Login';
import { useFitnessData } from './hooks/useFitnessData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFitnessData(); // initialize hook

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'activities':
        return <Activities />;
      case 'goals':
        return <Goals />;
      case 'workouts':
        return <Workouts />;
      case 'stats':
        return <Stats />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-2">
            Fitness Challenge App
          </h1>
          <p className="text-gray-600">Your comprehensive fitness companion</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>

        <main className="animate-fadeIn">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default App;
