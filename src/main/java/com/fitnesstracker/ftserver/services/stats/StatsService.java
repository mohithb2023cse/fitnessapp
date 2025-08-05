package com.fitnesstracker.ftserver.services.stats;


import com.fitnesstracker.ftserver.dto.DailyStatsDTO;
import com.fitnesstracker.ftserver.dto.GraphDTO;
import com.fitnesstracker.ftserver.dto.StatsDTO;

import java.util.List;

public interface StatsService {

    StatsDTO getStats();

    GraphDTO getGraphStats();

    List<DailyStatsDTO> getLast7DaysStats();
}
