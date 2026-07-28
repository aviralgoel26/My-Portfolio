package com.portfolio.analytics.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.analytics.model.VisitorEvent;
import com.portfolio.analytics.repository.VisitorEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class AnalyticsEventConsumer {

    private final VisitorEventRepository visitorEventRepository;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "portfolio.analytics", groupId = "analytics-group")
    public void consumeAnalyticsEvent(String message) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> event = objectMapper.readValue(message, Map.class);

            VisitorEvent visitorEvent = VisitorEvent.builder()
                    .eventType(getString(event, "eventType"))
                    .page(getString(event, "page"))
                    .entityId(getString(event, "entityId"))
                    .entityTitle(getString(event, "entityTitle"))
                    .ip(getString(event, "ip"))
                    .userAgent(getString(event, "userAgent"))
                    .referrer(getString(event, "referrer"))
                    .timestamp(Instant.now())
                    .build();

            visitorEventRepository.save(visitorEvent);
            log.debug("Stored analytics event: {} for page: {}", visitorEvent.getEventType(), visitorEvent.getPage());

        } catch (Exception e) {
            log.error("Failed to process analytics event: {}", e.getMessage(), e);
        }
    }

    private String getString(Map<String, Object> map, String key) {
        Object val = map.get(key);
        return val != null ? val.toString() : null;
    }
}
