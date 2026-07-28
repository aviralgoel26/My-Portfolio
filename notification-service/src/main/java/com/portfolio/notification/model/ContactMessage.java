package com.portfolio.notification.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "contact_messages")
public class ContactMessage {

    @Id
    private String id;

    private String name;
    private String email;
    private String subject;
    private String message;

    @Builder.Default
    private String status = "RECEIVED";  // RECEIVED, EMAIL_SENT, FAILED

    @Builder.Default
    private Instant receivedAt = Instant.now();

    private Instant emailSentAt;
    private String errorMessage;
}
