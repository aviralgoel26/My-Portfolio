package com.portfolio.analytics.repository;

import com.portfolio.analytics.model.VisitorEvent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface VisitorEventRepository extends MongoRepository<VisitorEvent, String> {
    List<VisitorEvent> findByTimestampBetween(Instant start, Instant end);
    long countByPage(String page);
    long countByIp(String ip);
    List<VisitorEvent> findByEventType(String eventType);
}
