package com.fitnesstracker.ftserver.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyStatsDTO {
    private LocalDate date;
    private int steps;
    private int calories;
    private double distance;
    private int workouts;
    private int activeMinutes;
}
