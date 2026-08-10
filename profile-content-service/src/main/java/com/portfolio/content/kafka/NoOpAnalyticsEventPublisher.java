package com.portfolio.content.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@ConditionalOnProperty(name = "app.features.kafka.enabled", havingValue = "false", matchIfMissing = true)
public class NoOpAnalyticsEventPublisher implements AnalyticsEventPublisher {

    @Override
    public void publishPageView(String page, String ip, String userAgent) {
        log.info("Kafka disabled. Analytics event skipped (PAGE_VIEWED). Page: {}", page);
    }

    @Override
    public void publishProjectView(String projectId, String projectTitle) {
        log.info("Kafka disabled. Analytics event skipped (PROJECT_VIEWED). Project: {}", projectTitle);
    }
}
