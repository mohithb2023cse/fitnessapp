package com.fitnesstracker.ftserver.entity;

import com.fitnesstracker.ftserver.dto.WorkoutDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String type;
    private Date date;
    private int duration;
    private int caloriesBurned;

    @Column(nullable = false)  // Important: avoid 500 error
    private int totalCalories;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercise> exercises;

    public WorkoutDTO getWorkoutDto() {
        WorkoutDTO workoutDTO = new WorkoutDTO();
        workoutDTO.setId(id);
        workoutDTO.setType(type);

        if (date != null) {
            LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            workoutDTO.setDate(localDate);
        }

        workoutDTO.setDuration(duration);
        workoutDTO.setCaloriesBurned(caloriesBurned);

        if (exercises != null) {
            workoutDTO.setExercises(exercises.stream().map(ex -> {
                var dto = new com.fitnesstracker.ftserver.dto.ExerciseDTO();
                dto.setName(ex.getName());
                dto.setCategory(ex.getCategory());
                dto.setDuration(ex.getDuration());
                dto.setCalories(ex.getCalories());
                return dto;
            }).collect(Collectors.toList()));
        }

        return workoutDTO;
    }
}
