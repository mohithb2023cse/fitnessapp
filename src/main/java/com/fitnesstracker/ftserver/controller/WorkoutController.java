package com.fitnesstracker.ftserver.controller;

import com.fitnesstracker.ftserver.dto.WorkoutDTO;
import com.fitnesstracker.ftserver.services.workout.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class WorkoutController {

    private final WorkoutService workoutService;

    @PostMapping("/workout")
    public ResponseEntity<?> postWorkout(@RequestBody WorkoutDTO workoutDTO) {
        try {
            return ResponseEntity.ok(workoutService.postWorkout(workoutDTO));
        } catch (Exception e) {
            e.printStackTrace(); // Optional: log for debugging
            return ResponseEntity.internalServerError().body("Failed to save workout.");
        }
    }

    @GetMapping("/workouts")
    public ResponseEntity<?> getWorkouts() {
        try {
            return ResponseEntity.ok(workoutService.getWorkouts());
        } catch (Exception e) {
            e.printStackTrace(); // Optional: log for debugging
            return ResponseEntity.internalServerError().body("Failed to fetch workouts.");
        }
    }
}
