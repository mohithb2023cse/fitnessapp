package com.fitnesstracker.ftserver.services.activity;

import com.fitnesstracker.ftserver.dto.ActivityDTO;
import com.fitnesstracker.ftserver.entity.Activity;
import com.fitnesstracker.ftserver.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;

    @Override
    public ActivityDTO postActivity(ActivityDTO dto) {
        Activity activity = new Activity();
        activity.setDate(dto.getDate());
        activity.setSteps(dto.getSteps());
        activity.setDistance(dto.getDistance());
        activity.setCaloriesBurned(dto.getCaloriesBurned());

        return activityRepository.save(activity).getActivityDTO();
    }

    @Override
    public List<ActivityDTO> getActivities() {
        return activityRepository.findAll()
                .stream()
                .map(Activity::getActivityDTO)
                .collect(Collectors.toList());
    }
}
