package com.fitnesstracker.ftserver.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ActivityDTO {
    private long id;
    private LocalDate date;
    private int steps;
    private double distance;
    private int caloriesBurned;
}
