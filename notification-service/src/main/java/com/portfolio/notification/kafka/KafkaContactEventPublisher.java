package com.portfolio.notification.kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.features.kafka.enabled", havingValue = "true")
public class KafkaContactEventPublisher implements ContactEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Override
    public void publishContactSubmitted(String name, String email, String subject, String message) {
        Map<String, Object> event = Map.of(
                "eventType", "CONTACT_SUBMITTED",
                "name", name,
                "email", email,
                "subject", subject,
                "message", message,
                "timestamp", System.currentTimeMillis()
        );
        kafkaTemplate.send("portfolio.contact", event);
        log.info("Published CONTACT_SUBMITTED event to Kafka for: {}", email);
    }
}
