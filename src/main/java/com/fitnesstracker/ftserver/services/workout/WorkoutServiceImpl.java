package com.fitnesstracker.ftserver.services.workout;

import com.fitnesstracker.ftserver.dto.WorkoutDTO;
import com.fitnesstracker.ftserver.entity.Exercise;
import com.fitnesstracker.ftserver.entity.Workout;
import com.fitnesstracker.ftserver.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;

    @Override
    public WorkoutDTO postWorkout(WorkoutDTO workoutDTO) {
        try {
            Workout workout = new Workout();

            workout.setType(workoutDTO.getType());

            // Handle potential null date
            if (workoutDTO.getDate() != null) {
                Date date = Date.from(workoutDTO.getDate().atStartOfDay(ZoneId.systemDefault()).toInstant());
                workout.setDate(date);
            } else {
                workout.setDate(new Date()); // fallback to current date
            }

            workout.setDuration(workoutDTO.getDuration());
            workout.setCaloriesBurned(workoutDTO.getCaloriesBurned());

            // Map exercises if provided
            if (workoutDTO.getExercises() != null && !workoutDTO.getExercises().isEmpty()) {
                List<Exercise> exercises = workoutDTO.getExercises().stream().map(dto -> {
                    Exercise exercise = new Exercise();
                    exercise.setName(dto.getName());
                    exercise.setCategory(dto.getCategory());
                    exercise.setDuration(dto.getDuration());
                    exercise.setCalories(dto.getCalories());
                    exercise.setWorkout(workout); // bi-directional link
                    return exercise;
                }).collect(Collectors.toList());
                workout.setExercises(exercises);
            }

            return workoutRepository.save(workout).getWorkoutDto();
        } catch (Exception e) {
            e.printStackTrace(); // log actual error to console
            throw new RuntimeException("Workout save failed: " + e.getMessage());
        }
    }

    @Override
    public List<WorkoutDTO> getWorkouts() {
        return workoutRepository.findAll().stream()
                .map(Workout::getWorkoutDto)
                .collect(Collectors.toList());
    }
}
