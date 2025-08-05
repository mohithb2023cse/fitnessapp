package com.fitnesstracker.ftserver.dto;

import lombok.Data;

import java.util.List;

@Data
public class StatsDTO {
    private long achievedGoals;

    private long notAchievedGoals;

    private int steps;

    private double distance;

    private int totalCaloriesBurned;

    private int duration;

    private List<DailyStatsDTO> dailyStats;
}
