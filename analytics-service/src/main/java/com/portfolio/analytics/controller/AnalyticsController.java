package com.portfolio.analytics.controller;

import com.portfolio.analytics.model.VisitorEvent;
import com.portfolio.analytics.repository.VisitorEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final VisitorEventRepository visitorEventRepository;

    /**
     * High-level summary: total visits, unique IPs, visits by page.
     */
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        List<VisitorEvent> all = visitorEventRepository.findAll();

        long totalVisits = all.size();
        long uniqueIps = all.stream()
                .map(VisitorEvent::getIp)
                .filter(Objects::nonNull)
                .distinct()
                .count();

        Map<String, Long> visitsByPage = all.stream()
                .filter(e -> e.getPage() != null)
                .collect(Collectors.groupingBy(VisitorEvent::getPage, Collectors.counting()));

        Map<String, Long> visitsByEventType = all.stream()
                .filter(e -> e.getEventType() != null)
                .collect(Collectors.groupingBy(VisitorEvent::getEventType, Collectors.counting()));

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("totalVisits", totalVisits);
        summary.put("uniqueVisitors", uniqueIps);
        summary.put("visitsByPage", visitsByPage);
        summary.put("visitsByEventType", visitsByEventType);

        return ResponseEntity.ok(summary);
    }

    /**
     * Daily visit counts for the last N days (default 30).
     */
    @GetMapping("/timeline")
    public ResponseEntity<List<Map<String, Object>>> getTimeline(
            @RequestParam(defaultValue = "30") int days) {

        Instant start = Instant.now().minus(days, ChronoUnit.DAYS);
        List<VisitorEvent> events = visitorEventRepository.findByTimestampBetween(start, Instant.now());

        // Group by date string
        Map<String, Long> dailyCounts = events.stream()
                .collect(Collectors.groupingBy(
                        e -> e.getTimestamp().toString().substring(0, 10), // YYYY-MM-DD
                        Collectors.counting()
                ));

        // Build sorted list
        List<Map<String, Object>> timeline = dailyCounts.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    Map<String, Object> day = new LinkedHashMap<>();
                    day.put("date", entry.getKey());
                    day.put("count", entry.getValue());
                    return day;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(timeline);
    }

    /**
     * Recent events with optional limit.
     */
    @GetMapping("/events")
    public ResponseEntity<List<VisitorEvent>> getRecentEvents(
            @RequestParam(defaultValue = "100") int limit) {
        List<VisitorEvent> all = visitorEventRepository.findAll();
        // Return most recent first, limited
        List<VisitorEvent> recent = all.stream()
                .sorted(Comparator.comparing(VisitorEvent::getCreatedAt, Comparator.reverseOrder()))
                .limit(limit)
                .collect(Collectors.toList());
        return ResponseEntity.ok(recent);
    }
}
