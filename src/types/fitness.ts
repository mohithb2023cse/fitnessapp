export interface Activity {
  id: string;
  type: 'steps' | 'calories' | 'distance' | 'duration';
  value: number;
  date: string;
  timestamp: number;
}

export interface Goal {
  id: string;
  type: 'steps' | 'calories' | 'distance' | 'workouts';
  target: number;
  current: number;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'cardio' | 'strength' | 'flexibility' | 'sports';
  duration?: number;
  sets?: number;
  reps?: number;
  weight?: number;
  distance?: number;
  calories?: number;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number;
  exercises: Exercise[];
  totalCalories: number;
  notes?: string;
}

export interface DailyStats {
  date: string;
  steps: number;
  calories: number;
  distance: number;
  workouts: number;
  activeMinutes: number;
}