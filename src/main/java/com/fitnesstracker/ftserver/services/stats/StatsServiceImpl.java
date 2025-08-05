package com.fitnesstracker.ftserver.services.stats;

import com.fitnesstracker.ftserver.dto.*;
import com.fitnesstracker.ftserver.entity.Activity;
import com.fitnesstracker.ftserver.entity.Workout;
import com.fitnesstracker.ftserver.repository.ActivityRepository;
import com.fitnesstracker.ftserver.repository.GoalRepository;
import com.fitnesstracker.ftserver.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatsServiceImpl implements StatsService {

    private final GoalRepository goalRepository;
    private final ActivityRepository activityRepository;
    private final WorkoutRepository workoutRepository;

    @Override
    public StatsDTO getStats() {
        Long achievedGoals = goalRepository.countAchievedGoals();
        Long notAchievedGoals = goalRepository.countNotAchievedGoals();

        Integer totalSteps = activityRepository.getTotalSteps();
        Double totalDistance = activityRepository.getTotalDistance();
        Integer totalCaloriesBurned = activityRepository.getTotalCaloriesBurned();

        Integer totalDuration = workoutRepository.getTotalDuration();
        Integer totalWorkoutCalories = workoutRepository.getTotalWorkoutCalories();

        int totalCalories = (totalCaloriesBurned != null ? totalCaloriesBurned : 0)
                + (totalWorkoutCalories != null ? totalWorkoutCalories : 0);

        StatsDTO dto = new StatsDTO();
        dto.setAchievedGoals(achievedGoals != null ? achievedGoals : 0);
        dto.setNotAchievedGoals(notAchievedGoals != null ? notAchievedGoals : 0);
        dto.setSteps(totalSteps != null ? totalSteps : 0);
        dto.setDistance(totalDistance != null ? totalDistance : 0);
        dto.setTotalCaloriesBurned(totalCalories);
        dto.setDuration(totalDuration != null ? totalDuration : 0);

        return dto;
    }

    @Override
    public GraphDTO getGraphStats() {
        Pageable pageable = PageRequest.of(0, 50); // Fetch more than 7 if needed
        List<Workout> workouts = workoutRepository.findLast7Workouts(pageable);
        List<Activity> activities = activityRepository.findLast7Activities(pageable);

        // Format date as yyyy-MM-dd
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        // Map for grouping by date
        Map<String, Integer> stepsByDate = new HashMap<>();
        Map<String, Integer> caloriesByDate = new HashMap<>();
        Map<String, Double> distanceByDate = new HashMap<>();
        Map<String, Integer> workoutsByDate = new HashMap<>();

        // Aggregate Activities
        for (Activity a : activities) {
            String dateStr = sdf.format(a.getDate());

            stepsByDate.put(dateStr, stepsByDate.getOrDefault(dateStr, 0) + a.getSteps());
            caloriesByDate.put(dateStr, caloriesByDate.getOrDefault(dateStr, 0) + a.getCaloriesBurned());
            distanceByDate.put(dateStr, distanceByDate.getOrDefault(dateStr, 0.0) + a.getDistance());
        }

        // Aggregate Workouts
        for (Workout w : workouts) {
            String dateStr = sdf.format(w.getDate());

            caloriesByDate.put(dateStr, caloriesByDate.getOrDefault(dateStr, 0) + w.getCaloriesBurned());
            workoutsByDate.put(dateStr, workoutsByDate.getOrDefault(dateStr, 0) + 1);
        }

        // Prepare 7-day list (past 7 days)
        List<ActivityDTO> dailySummaries = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        for (int i = 6; i >= 0; i--) {
            cal.setTime(new Date());
            cal.add(Calendar.DATE, -i);
            String date = sdf.format(cal.getTime());

            ActivityDTO dto = new ActivityDTO();
            dto.setDate(cal.getTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            dto.setSteps(stepsByDate.getOrDefault(date, 0));
            dto.setCaloriesBurned(caloriesByDate.getOrDefault(date, 0));
            dto.setDistance(distanceByDate.getOrDefault(date, 0.0));
            dto.setId(0); // placeholder ID

            dailySummaries.add(dto);
        }

        List<WorkoutDTO> workoutDTOs = workouts.stream()
                .map(Workout::getWorkoutDto)
                .collect(Collectors.toList());

        GraphDTO graphDTO = new GraphDTO();
        graphDTO.setActivities(dailySummaries);
        graphDTO.setWorkouts(workoutDTOs);

        return graphDTO;
    }

    @Override
    public List<DailyStatsDTO> getLast7DaysStats() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Pageable pageable = PageRequest.of(0, 50);
        List<Activity> activities = activityRepository.findLast7Activities(pageable);
        List<Workout> workouts = workoutRepository.findLast7Workouts(pageable);

        Map<String, Integer> stepsByDate = new HashMap<>();
        Map<String, Double> distanceByDate = new HashMap<>();
        Map<String, Integer> caloriesByDate = new HashMap<>();
        Map<String, Integer> workoutsByDate = new HashMap<>();
        Map<String, Integer> durationByDate = new HashMap<>();

        for (Activity a : activities) {
            String date = sdf.format(a.getDate());
            stepsByDate.put(date, stepsByDate.getOrDefault(date, 0) + a.getSteps());
            distanceByDate.put(date, distanceByDate.getOrDefault(date, 0.0) + a.getDistance());
            caloriesByDate.put(date, caloriesByDate.getOrDefault(date, 0) + a.getCaloriesBurned());
        }

        for (Workout w : workouts) {
            String date = sdf.format(w.getDate());
            caloriesByDate.put(date, caloriesByDate.getOrDefault(date, 0) + w.getCaloriesBurned());
            workoutsByDate.put(date, workoutsByDate.getOrDefault(date, 0) + 1);
            durationByDate.put(date, durationByDate.getOrDefault(date, 0) + w.getDuration());
        }

        List<DailyStatsDTO> weeklyStats = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        for (int i = 6; i >= 0; i--) {
            cal.setTime(new Date());
            cal.add(Calendar.DATE, -i);
            String dateStr = sdf.format(cal.getTime());

            DailyStatsDTO dto = new DailyStatsDTO();
            dto.setDate(cal.getTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            dto.setSteps(stepsByDate.getOrDefault(dateStr, 0));
            dto.setDistance(distanceByDate.getOrDefault(dateStr, 0.0));
            dto.setCalories(caloriesByDate.getOrDefault(dateStr, 0));
            dto.setWorkouts(workoutsByDate.getOrDefault(dateStr, 0));
            dto.setActiveMinutes(durationByDate.getOrDefault(dateStr, 0));

            weeklyStats.add(dto);
        }

        return weeklyStats;
    }

}
