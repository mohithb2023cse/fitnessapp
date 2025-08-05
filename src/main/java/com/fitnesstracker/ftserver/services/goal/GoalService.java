package com.fitnesstracker.ftserver.services.goal;


import com.fitnesstracker.ftserver.dto.GoalDTO;

import java.util.List;

public interface GoalService {
    GoalDTO postGoal(GoalDTO goalDTO);
    List<GoalDTO> getGoal();
    GoalDTO updateStatus(Long id);
}
