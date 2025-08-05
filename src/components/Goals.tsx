
import React, { useState } from 'react';
import { useFitnessData } from '../hooks/useFitnessData';
import { Goal } from '../types/fitness';
import { CalendarCheck2, CheckCircle } from 'lucide-react';

const Goals: React.FC = () => {
  const { goals, addGoal, updateGoal } = useFitnessData();
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.description.trim()) {
      await addGoal(newGoal);
      setNewGoal({
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Goals</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <CalendarCheck2 size={20} />
          <span>New Goal</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Goal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Goal Description"
              value={newGoal.description}
              onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={newGoal.startDate}
                onChange={(e) => setNewGoal(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="date"
                value={newGoal.endDate}
                onChange={(e) => setNewGoal(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Goal
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Goals</h2>
        {goals.length > 0 ? (
          <div className="space-y-3">
            {goals.map(goal => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div>
                  <p className="font-medium text-gray-800">{goal.description}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className={`text-sm font-semibold ${goal.achieved ? 'text-green-600' : 'text-yellow-500'}`}>
                    {goal.achieved ? 'Achieved' : 'In Progress'}
                  </p>
                  {!goal.achieved && (
                    <button
                      onClick={() => updateGoal(goal.id.toString(), { achieved: true })}
                      className="text-green-500 hover:text-green-600"
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No goals set yet. Define your fitness journey!</p>
        )}
      </div>
    </div>
  );
};

export default Goals;
