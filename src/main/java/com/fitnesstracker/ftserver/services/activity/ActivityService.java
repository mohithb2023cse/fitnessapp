package com.fitnesstracker.ftserver.services.activity;

import com.fitnesstracker.ftserver.dto.ActivityDTO;

import java.util.List;

public interface ActivityService {
    ActivityDTO postActivity(ActivityDTO dto);
    List<ActivityDTO> getActivities();
}
