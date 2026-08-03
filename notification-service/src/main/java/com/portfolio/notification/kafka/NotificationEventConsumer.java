package com.portfolio.notification.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.notification.model.ContactMessage;
import com.portfolio.notification.repository.ContactMessageRepository;
import com.portfolio.notification.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.features.kafka.enabled", havingValue = "true")
public class NotificationEventConsumer {

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "portfolio.contact", groupId = "notification-group")
    public void consumeContactEvent(String message) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> event = objectMapper.readValue(message, Map.class);

            ContactMessage contactMessage = ContactMessage.builder()
                    .name(getString(event, "name"))
                    .email(getString(event, "email"))
                    .subject(getString(event, "subject"))
                    .message(getString(event, "message"))
                    .status("RECEIVED")
                    .build();

            contactMessage = contactMessageRepository.save(contactMessage);
            log.info("Contact message received from: {} ({})", contactMessage.getName(), contactMessage.getEmail());

            // Trigger async email
            emailService.sendContactEmail(contactMessage);

        } catch (Exception e) {
            log.error("Failed to process contact event: {}", e.getMessage(), e);
        }
    }

    private String getString(Map<String, Object> map, String key) {
        Object val = map.get(key);
        return val != null ? val.toString() : null;
    }
}
