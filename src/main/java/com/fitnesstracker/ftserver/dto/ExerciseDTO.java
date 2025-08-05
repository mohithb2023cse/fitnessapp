package com.fitnesstracker.ftserver.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDTO {
    private String name;
    private String category;
    private int duration;
    private int calories;
}
