import { useState, useEffect } from 'react';
import { Activity, Goal, Workout, DailyStats } from '../types/fitness';
import api from '../api/api';

export const useFitnessData = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [activityRes, goalRes, workoutRes, statsRes] = await Promise.all([
          api.get('/activities'),
          api.get('/goals'),
          api.get('/workouts'),
          api.get('/stats')
        ]);
        setActivities(activityRes.data);
        setGoals(goalRes.data);
        setWorkouts(workoutRes.data);
        setDailyStats([
          {
            date: new Date().toISOString().split('T')[0],
            steps: statsRes.data.steps,
            calories: statsRes.data.totalCaloriesBurned,
            distance: statsRes.data.distance,
            workouts: statsRes.data.achievedGoals + statsRes.data.notAchievedGoals,
            activeMinutes: statsRes.data.duration
          }
        ]);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };
    fetchAll();
  }, []);

  const addActivity = async (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const payload = {
      date: activity.date,
      steps: activity.value,
      distance: activity.type === 'distance' ? activity.value : 0,
      caloriesBurned: activity.type === 'calories' ? activity.value : 0
    };
    try {
      const res = await api.post('/activity', payload);
      setActivities(prev => [res.data, ...prev]);
    } catch (error) {
      console.error('Failed to post activity:', error);
    }
  };

  const addGoal = async (goal: Omit<Goal, 'id' | 'current'>) => {
    try {
      const res = await api.post('/goal', goal);
      setGoals(prev => [res.data, ...prev]);
    } catch (error) {
      console.error('Failed to post goal:', error);
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<Goal>) => {
    try {
      await api.get(`/goal/status/${goalId}`);
      setGoals(prev =>
        prev.map(goal => goal.id === goalId ? { ...goal, achieved: true } : goal)
      );
    } catch (error) {
      console.error('Failed to update goal status:', error);
    }
  };

  const addWorkout = async (workout: Omit<Workout, 'id'>) => {
    const payload = {
      date: workout.date,
      type: workout.name,
      duration: workout.duration,
      caloriesBurned: workout.totalCalories,
      notes: workout.notes,
      exercises: workout.exercises || [] 
    };

    try {
      const res = await api.post('/workout', payload);
      setWorkouts(prev => [res.data, ...prev]);
    } catch (error) {
      console.error('Failed to post workout:', error);
    }
  };

  const getTodayStats = (): DailyStats => {
    const today = new Date().toISOString().split('T')[0];
    return (
      dailyStats.find(stat => stat.date === today) || {
        date: today,
        steps: 0,
        calories: 0,
        distance: 0,
        workouts: 0,
        activeMinutes: 0
      }
    );
  };

  return {
    activities,
    goals,
    workouts,
    dailyStats,
    addActivity,
    addGoal,
    updateGoal,
    addWorkout,
    getTodayStats
  };
};
