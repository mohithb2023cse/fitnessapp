package com.fitnesstracker.ftserver.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDTO {
    private long id;
    private String type;
    private LocalDate date;
    private int duration;
    private int caloriesBurned;
    private String notes;
    private List<ExerciseDTO> exercises;
}
