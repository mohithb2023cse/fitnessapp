import React from 'react';
import { Activity, Target, Clock, Zap, TrendingUp, Award } from 'lucide-react';
import { useFitnessData } from '../hooks/useFitnessData';

const Dashboard: React.FC = () => {
  const { getTodayStats, goals, workouts } = useFitnessData();
  const todayStats = getTodayStats();

  const activeGoals = goals.filter(goal => goal.isActive);
  const recentWorkouts = workouts.slice(0, 3);

  const statCards = [
    {
      title: 'Steps Today',
      value: todayStats.steps?.toLocaleString() || '0',
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      target: '10,000'
    },
    {
      title: 'Calories Burned',
      value: todayStats.calories?.toLocaleString() || '0',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      target: '2,000'
    },
    {
      title: 'Distance',
      value: `${todayStats.distance?.toFixed(1) || '0.0'} km`,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      target: '5.0 km'
    },
    {
      title: 'Active Minutes',
      value: todayStats.activeMinutes?.toString() || '0',
      icon: Clock,
      color: 'from-purple-500 to-purple-600',
      target: '30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">Here's your fitness summary for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">Target: {stat.target}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Target className="text-blue-500 mr-3" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Active Goals</h2>
        </div>
        {activeGoals.length > 0 ? (
          <div className="space-y-4">
            {activeGoals.map(goal => {
              const percent = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0;
              return (
                <div key={goal.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800 capitalize">{goal.type} Goal</span>
                    <span className="text-sm text-gray-600">{goal.period}</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{goal.current.toLocaleString()} / {goal.target.toLocaleString()}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No active goals. Set some goals to track your progress!</p>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Award className="text-green-500 mr-3" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Recent Workouts</h2>
        </div>
        {recentWorkouts.length > 0 ? (
          <div className="space-y-4">
            {recentWorkouts.map(workout => (
              <div key={workout.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">{workout.name}</h3>
                    <p className="text-sm text-gray-600">{new Date(workout.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{workout.duration} min</p>
                    <p className="text-xs text-gray-600">{workout.totalCalories} cal</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No workouts yet. Start your first workout!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
