package com.fitnesstracker.ftserver.entity;

import com.fitnesstracker.ftserver.dto.ActivityDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.ZoneId;

@Entity
@Data
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDate date;

    private int steps;

    private double distance;

    private int caloriesBurned;

    public ActivityDTO getActivityDTO() {
        ActivityDTO activityDTO = new ActivityDTO();
        activityDTO.setId(id);
        activityDTO.setDate(this.date);
        activityDTO.setSteps(steps);
        activityDTO.setDistance(distance);
        activityDTO.setCaloriesBurned(caloriesBurned);
        return activityDTO;
    }
}
