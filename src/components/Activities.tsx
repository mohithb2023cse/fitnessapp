import React, { useState } from 'react';
import { Plus, Activity as ActivityIcon, Zap, MapPin, Clock } from 'lucide-react';
import { useFitnessData } from '../hooks/useFitnessData';
import { Activity } from '../types/fitness';
import clsx from 'clsx';

const Activities: React.FC = () => {
  const { activities, addActivity } = useFitnessData();
  const [showForm, setShowForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'steps' as Activity['type'],
    value: '',
    date: new Date().toISOString().split('T')[0]
  });

  const activityTypes = [
    { value: 'steps', label: 'Steps', icon: ActivityIcon, unit: 'steps', color: 'blue' },
    { value: 'calories', label: 'Calories', icon: Zap, unit: 'cal', color: 'orange' },
    { value: 'distance', label: 'Distance', icon: MapPin, unit: 'km', color: 'green' },
    { value: 'duration', label: 'Active Time', icon: Clock, unit: 'min', color: 'purple' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valueNum = parseFloat(newActivity.value);
    if (!isNaN(valueNum) && valueNum > 0) {
      addActivity({
        type: newActivity.type,
        value: valueNum,
        date: newActivity.date
      });
      setNewActivity({
        type: 'steps',
        value: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
    }
  };

  const getActivityType = (type: Activity['type']) => {
    return activityTypes.find(at => at.value === type);
  };

  const sortedActivities = [...activities].sort((a, b) =>
    (new Date(b.timestamp || '').getTime()) - (new Date(a.timestamp || '').getTime())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Activity Tracker</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Log Activity</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Log New Activity</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                <select
                  value={newActivity.type}
                  onChange={(e) =>
                    setNewActivity(prev => ({ ...prev, type: e.target.value as Activity['type'] }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {activityTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                <input
                  type="number"
                  value={newActivity.value}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, value: e.target.value }))}
                  placeholder={`Enter ${getActivityType(newActivity.type)?.unit || ''}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={newActivity.date}
                onChange={(e) => setNewActivity(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Log Activity
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
        {sortedActivities.length > 0 ? (
          <div className="space-y-3">
            {sortedActivities.slice(0, 10).map(activity => {
              const activityType = getActivityType(activity.type);
              const Icon = activityType?.icon || ActivityIcon;
              const color = activityType?.color || 'blue';
              const unit = activityType?.unit || '';

              let value = 0;
              switch (activity.type) {
                case 'steps':
                  value = activity.steps ?? 0;
                  break;
                case 'calories':
                  value = activity.caloriesBurned ?? 0;
                  break;
                case 'distance':
                  value = activity.distance ?? 0;
                  break;
                case 'duration':
                  value = activity.duration ?? 0;
                  break;
                default:
                  value = 0;
              }

              const formattedDate = activity.date
                ? new Date(activity.date).toLocaleDateString()
                : 'Unknown Date';

              const formattedTime = activity.timestamp
                ? new Date(activity.timestamp).toLocaleTimeString()
                : '';

              return (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center", `bg-${color}-100`)}>
                      <Icon className={`text-${color}-500`} size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 capitalize">{activity.type}</p>
                      <p className="text-sm text-gray-600">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      {value.toLocaleString()} {unit}
                    </p>
                    <p className="text-xs text-gray-500">{formattedTime}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No activities logged yet. Start tracking your fitness!</p>
        )}
      </div>
    </div>
  );
};

export default Activities;
