package com.portfolio.content.kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class ContentEventProducer {

    private static final String ANALYTICS_TOPIC = "portfolio.analytics";
    private static final String CONTACT_TOPIC = "portfolio.contact";

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishPageView(String page, String ip, String userAgent) {
        Map<String, Object> event = Map.of(
                "eventType", "PAGE_VIEWED",
                "page", page,
                "ip", ip != null ? ip : "unknown",
                "userAgent", userAgent != null ? userAgent : "unknown",
                "timestamp", System.currentTimeMillis()
        );
        kafkaTemplate.send(ANALYTICS_TOPIC, event);
        log.debug("Published PAGE_VIEWED event for page: {}", page);
    }

    public void publishProjectView(String projectId, String projectTitle) {
        Map<String, Object> event = Map.of(
                "eventType", "PROJECT_VIEWED",
                "entityId", projectId,
                "entityTitle", projectTitle,
                "timestamp", System.currentTimeMillis()
        );
        kafkaTemplate.send(ANALYTICS_TOPIC, event);
    }
}
