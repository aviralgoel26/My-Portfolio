package com.portfolio.notification.kafka;

import com.portfolio.notification.model.ContactMessage;
import com.portfolio.notification.repository.ContactMessageRepository;
import com.portfolio.notification.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnMissingBean(ContactEventPublisher.class)
public class LocalContactEventPublisher implements ContactEventPublisher {

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    @Override
    public void publishContactSubmitted(String name, String email, String subject, String message) {
        log.info("Kafka disabled. Using local notification flow for: {}", email);
        
        ContactMessage contactMessage = ContactMessage.builder()
                .name(name)
                .email(email)
                .subject(subject)
                .message(message)
                .status("RECEIVED")
                .build();

        try {
            contactMessage = contactMessageRepository.save(contactMessage);
            log.info("Local: Contact message saved to DB: {} ({})", contactMessage.getName(), contactMessage.getEmail());
            
            emailService.sendContactEmail(contactMessage);
            log.info("Local: Contact email sent successfully.");
        } catch (Exception e) {
            log.error("Local: Failed to process contact submission: {}", e.getMessage(), e);
        }
    }
}
