import React, { useState } from 'react';
import { Plus, Dumbbell, Clock, Flame, Trash2 } from 'lucide-react';
import { useFitnessData } from '../hooks/useFitnessData';
import { Exercise, Workout } from '../types/fitness';

const Workouts: React.FC = () => {
  const { workouts, addWorkout } = useFitnessData();
  const [showForm, setShowForm] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<Partial<Workout> | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const exerciseTemplates: { name: string; category: Exercise['category'] }[] = [
    { name: 'Push-ups', category: 'strength' },
    { name: 'Squats', category: 'strength' },
    { name: 'Plank', category: 'strength' },
    { name: 'Running', category: 'cardio' },
    { name: 'Cycling', category: 'cardio' },
    { name: 'Yoga', category: 'flexibility' },
    { name: 'Stretching', category: 'flexibility' }
  ];

  const startNewWorkout = () => {
    setActiveWorkout({
      name: '',
      date: new Date().toISOString().split('T')[0],
      duration: 0,
      totalCalories: 0,
      notes: ''
    });
    setExercises([]);
    setShowForm(true);
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      name: '',
      category: 'strength',
      sets: 1,
      reps: 10,
      weight: 0,
      duration: 0,
      calories: 0
    };
    setExercises(prev => [...prev, newExercise]);
  };

  const updateExercise = (id: string, updates: Partial<Exercise>) => {
    setExercises(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, ...updates } : ex))
    );
  };

  const removeExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const saveWorkout = () => {
    if (!activeWorkout?.name?.trim()) return;

    const totalCalories = exercises.reduce((sum, ex) => sum + (ex.calories || 0), 0);
    const totalDuration = exercises.reduce((sum, ex) => sum + (ex.duration || 0), 0);

    addWorkout({
      name: activeWorkout.name.trim(),
      date: activeWorkout.date || new Date().toISOString().split('T')[0],
      duration: totalDuration || 30,
      exercises,
      totalCalories: totalCalories || 150,
      notes: activeWorkout.notes
    });

    setActiveWorkout(null);
    setExercises([]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Workouts</h1>
        <button
          onClick={startNewWorkout}
          className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Workout</span>
        </button>
      </div>

      {showForm && activeWorkout && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Workout</h2>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Workout Name</label>
                <input
                  type="text"
                  value={activeWorkout.name}
                  onChange={e => setActiveWorkout({ ...activeWorkout, name: e.target.value })}
                  placeholder="e.g., Morning Cardio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={activeWorkout.date}
                  onChange={e => setActiveWorkout({ ...activeWorkout, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
              <textarea
                value={activeWorkout.notes}
                onChange={e => setActiveWorkout({ ...activeWorkout, notes: e.target.value })}
                placeholder="Any notes about your workout..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none h-20"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-semibold text-gray-800">Exercises</h3>
              <button
                onClick={addExercise}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg hover:bg-purple-200 text-sm"
              >
                Add Exercise
              </button>
            </div>

            {exercises.length > 0 ? (
              <div className="space-y-4">
                {exercises.map((ex, index) => (
                  <div key={ex.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-800">Exercise {index + 1}</h4>
                      <button
                        onClick={() => removeExercise(ex.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Exercise</label>
                        <select
                          value={ex.name}
                          onChange={e => {
                            const name = e.target.value;
                            const matched = exerciseTemplates.find(t => t.name === name);
                            updateExercise(ex.id, {
                              name,
                              category: matched?.category || ex.category
                            });
                          }}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500"
                        >
                          <option value="">Select exercise</option>
                          {exerciseTemplates.map(template => (
                            <option key={template.name} value={template.name}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Duration (min)</label>
                        <input
                          type="number"
                          value={ex.duration || ''}
                          onChange={e => updateExercise(ex.id, { duration: Number(e.target.value) })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Calories</label>
                        <input
                          type="number"
                          value={ex.calories || ''}
                          onChange={e => updateExercise(ex.id, { calories: Number(e.target.value) })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No exercises added yet.</p>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={saveWorkout}
              disabled={!activeWorkout.name?.trim()}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Workout
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setActiveWorkout(null);
                setExercises([]);
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Workout History</h2>
        {workouts.length > 0 ? (
          <div className="space-y-4">
            {workouts.map(workout => (
              <div key={workout.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{workout.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(workout.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="text-gray-500" size={16} />
                      <span>{workout.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Flame className="text-orange-500" size={16} />
                      <span>{workout.totalCalories} cal</span>
                    </div>
                  </div>
                </div>

                {workout.exercises?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-2">Exercises:</p>
                    <div className="flex flex-wrap gap-2">
                      {workout.exercises.map((ex, index) => (
                        <span
                          key={index}
                          className="bg-white px-2 py-1 rounded text-xs text-gray-700"
                        >
                          {ex.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {workout.notes && (
                  <p className="text-sm text-gray-600 italic">{workout.notes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Dumbbell className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 text-lg">No workouts yet</p>
            <p className="text-gray-400 text-sm">Start your first workout to begin tracking your fitness journey!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
