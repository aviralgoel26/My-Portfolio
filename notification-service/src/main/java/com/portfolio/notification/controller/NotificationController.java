package com.portfolio.notification.controller;

import com.portfolio.notification.model.ContactMessage;
import com.portfolio.notification.repository.ContactMessageRepository;
import com.portfolio.notification.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    /**
     * Public endpoint: submit a contact form.
     * Publishes to Kafka topic so it's processed asynchronously.
     */
    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitContact(@RequestBody Map<String, String> body) {
        String name = body.getOrDefault("name", "").trim();
        String email = body.getOrDefault("email", "").trim();
        String subject = body.getOrDefault("subject", "Portfolio Contact").trim();
        String message = body.getOrDefault("message", "").trim();

        if (name.isEmpty() || email.isEmpty() || message.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "name, email and message are required"));
        }

        Map<String, Object> event = Map.of(
                "eventType", "CONTACT_SUBMITTED",
                "name", name,
                "email", email,
                "subject", subject,
                "message", message,
                "timestamp", System.currentTimeMillis()
        );

        kafkaTemplate.send("portfolio.contact", event);
        return ResponseEntity.ok(Map.of("message", "Your message has been received. Thank you!"));
    }

    /**
     * Admin: get all contact messages.
     */
    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactMessageRepository.findAllByOrderByReceivedAtDesc());
    }

    /**
     * Admin: delete a message.
     */
    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String id) {
        if (!contactMessageRepository.existsById(id)) return ResponseEntity.notFound().build();
        contactMessageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
