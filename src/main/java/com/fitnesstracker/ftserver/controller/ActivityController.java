package com.fitnesstracker.ftserver.controller;

import com.fitnesstracker.ftserver.dto.ActivityDTO;
import com.fitnesstracker.ftserver.services.activity.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping("/activity")
    public ResponseEntity<?> postActivity(@RequestBody ActivityDTO activityDTO) {
        try {
            return ResponseEntity.ok(activityService.postActivity(activityDTO));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to post activity");
        }
    }

    @GetMapping("/activities")
    public ResponseEntity<?> getActivities() {
        try {
            return ResponseEntity.ok(activityService.getActivities());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to fetch activities");
        }
    }
}
