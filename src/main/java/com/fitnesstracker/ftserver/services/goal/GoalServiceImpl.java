package com.fitnesstracker.ftserver.services.goal;

import com.fitnesstracker.ftserver.dto.GoalDTO;
import com.fitnesstracker.ftserver.dto.WorkoutDTO;
import com.fitnesstracker.ftserver.entity.Goal;
import com.fitnesstracker.ftserver.entity.Workout;
import com.fitnesstracker.ftserver.repository.GoalRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {
    private final GoalRepository goalRepository;

    public GoalDTO postGoal(GoalDTO goalDTO){
        Goal goal=new Goal();

        goal.setDescription(goalDTO.getDescription());
        goal.setStartDate(goalDTO.getStartDate());
        goal.setEndDate(goalDTO.getEndDate());
        goal.setAchieved(false);

        return goalRepository.save(goal).getGoalDto();
    }

    public List<GoalDTO> getGoal(){
        List<Goal> goals=goalRepository.findAll();

        return goals.stream().map(Goal::getGoalDto).collect(Collectors.toList());
    }

    public GoalDTO updateStatus(Long id){
        Optional<Goal> optionalGoal=goalRepository.findById(id);

        if(optionalGoal.isPresent()){
            Goal exitingGoal=optionalGoal.get();

            exitingGoal.setAchieved(true);
            return goalRepository.save(exitingGoal).getGoalDto();
        }
        throw new EntityNotFoundException("Goal not found");
    }

}
