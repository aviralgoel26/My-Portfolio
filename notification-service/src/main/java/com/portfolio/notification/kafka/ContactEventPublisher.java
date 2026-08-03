package com.portfolio.notification.kafka;

public interface ContactEventPublisher {
    void publishContactSubmitted(String name, String email, String subject, String message);
}
