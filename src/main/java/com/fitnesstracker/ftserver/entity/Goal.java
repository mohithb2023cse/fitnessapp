package com.fitnesstracker.ftserver.entity;

import com.fitnesstracker.ftserver.dto.GoalDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String description;

    private Date startDate;

    private Date endDate;

    private boolean achieved;

    public GoalDTO getGoalDto(){
        GoalDTO goalDTO=new GoalDTO();

        goalDTO.setId(id);
        goalDTO.setDescription(description);
        goalDTO.setStartDate(startDate);
        goalDTO.setEndDate(endDate);
        goalDTO.setAchieved(achieved);

        return goalDTO;
    }
}
