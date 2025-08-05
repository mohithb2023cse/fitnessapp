package com.fitnesstracker.ftserver.services.workout;

import com.fitnesstracker.ftserver.dto.WorkoutDTO;

import java.util.List;

public interface WorkoutService {
    WorkoutDTO postWorkout(WorkoutDTO workoutDTO);

    List<WorkoutDTO> getWorkouts();
}
