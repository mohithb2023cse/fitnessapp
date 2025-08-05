import React from 'react';
import { TrendingUp, Calendar, Award, Target } from 'lucide-react';
import { useFitnessData } from '../hooks/useFitnessData';

const Stats: React.FC = () => {
  const { dailyStats, activities, goals, workouts } = useFitnessData();

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const weeklyData = last7Days.map(date => {
    const dayStats = dailyStats.find(stat => stat.date === date);
    return {
      date,
      steps: dayStats?.steps || 0,
      calories: dayStats?.calories || 0,
      distance: dayStats?.distance || 0,
      workouts: dayStats?.workouts || 0
    };
  });

  const totalStats = {
    totalWorkouts: workouts.length,
    totalActivities: activities.length,
    activeGoals: goals.filter(g => g.isActive).length,
    completedGoals: goals.filter(g => g.current >= g.target).length
  };

  const averages = {
    avgSteps: Math.round(weeklyData.reduce((sum, day) => sum + day.steps, 0) / 7),
    avgCalories: Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / 7),
    avgDistance: Math.round((weeklyData.reduce((sum, day) => sum + day.distance, 0) / 7) * 10) / 10,
    avgWorkouts: Math.round((weeklyData.reduce((sum, day) => sum + day.workouts, 0) / 7) * 10) / 10
  };

  const maxValues = {
    maxSteps: Math.max(...weeklyData.map(d => d.steps)),
    maxCalories: Math.max(...weeklyData.map(d => d.calories)),
    maxDistance: Math.max(...weeklyData.map(d => d.distance)),
    maxWorkouts: Math.max(...weeklyData.map(d => d.workouts))
  };

  interface StatCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: React.FC<{ size?: number }>;
    color: string;
  }

  const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4`}>
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );

  const ChartBar: React.FC<{
    value: number;
    maxValue: number;
    color: string;
  }> = ({ value, maxValue, color }) => {
    const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
      <div className="flex flex-col items-center">
        <div className="w-8 bg-gray-200 rounded-t relative" style={{ height: '80px' }}>
          <div
            className={`${color} rounded-t absolute bottom-0 w-full transition-all duration-500`}
            style={{ height: `${height}%` }}
          />
        </div>
        <span className="text-xs text-gray-600 mt-2">{value.toLocaleString()}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Statistics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Workouts"
          value={totalStats.totalWorkouts}
          subtitle="All time"
          icon={Award}
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Activities Logged"
          value={totalStats.totalActivities}
          subtitle="All time"
          icon={TrendingUp}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Active Goals"
          value={totalStats.activeGoals}
          subtitle={`${totalStats.completedGoals} completed`}
          icon={Target}
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="Streak Days"
          value="7"
          subtitle="Current streak"
          icon={Calendar}
          color="from-orange-500 to-orange-600"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">7-Day Averages</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-500">{averages.avgSteps.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Steps/day</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-500">{averages.avgCalories}</p>
            <p className="text-sm text-gray-600">Calories/day</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-500">{averages.avgDistance} km</p>
            <p className="text-sm text-gray-600">Distance/day</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-500">{averages.avgWorkouts}</p>
            <p className="text-sm text-gray-600">Workouts/day</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Weekly Steps', key: 'steps', color: 'bg-blue-500', max: maxValues.maxSteps },
          { title: 'Weekly Calories', key: 'calories', color: 'bg-orange-500', max: maxValues.maxCalories },
          { title: 'Weekly Distance', key: 'distance', color: 'bg-green-500', max: maxValues.maxDistance },
          { title: 'Weekly Workouts', key: 'workouts', color: 'bg-purple-500', max: Math.max(maxValues.maxWorkouts, 1) }
        ].map(({ title, key, color, max }) => (
          <div key={key} className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="flex items-end justify-between space-x-2">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <ChartBar value={day[key as keyof typeof day] as number} maxValue={max} color={color} />
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
