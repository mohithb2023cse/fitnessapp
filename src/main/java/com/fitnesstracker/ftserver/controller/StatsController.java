package com.fitnesstracker.ftserver.controller;

import com.fitnesstracker.ftserver.dto.GraphDTO;
import com.fitnesstracker.ftserver.dto.DailyStatsDTO;
import com.fitnesstracker.ftserver.services.stats.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StatsController {

    private final StatsService statsService;

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        return ResponseEntity.ok(statsService.getStats());
    }

    @GetMapping("/graphs")
    public ResponseEntity<?> getGraphStats() {
        GraphDTO graphDTO = statsService.getGraphStats();

        if (graphDTO != null) {
            return ResponseEntity.ok(graphDTO);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/stats/weekly")
    public ResponseEntity<List<DailyStatsDTO>> getWeeklyStats() {
        List<DailyStatsDTO> weeklyStats = statsService.getLast7DaysStats();
        return ResponseEntity.ok(weeklyStats);
    }
}
