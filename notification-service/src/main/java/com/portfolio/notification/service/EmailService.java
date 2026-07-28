package com.portfolio.notification.service;

import com.portfolio.notification.model.ContactMessage;
import com.portfolio.notification.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final ContactMessageRepository contactMessageRepository;

    @Value("${app.smtp.to-email}")
    private String toEmail;

    @Async
    public void sendContactEmail(ContactMessage message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(toEmail);
            mail.setReplyTo(message.getEmail());
            mail.setSubject("[Portfolio Contact] " + (message.getSubject() != null ? message.getSubject() : "New Message from " + message.getName()));
            mail.setText(
                    "You have a new contact message from your portfolio:\n\n" +
                    "Name: " + message.getName() + "\n" +
                    "Email: " + message.getEmail() + "\n" +
                    "Subject: " + message.getSubject() + "\n\n" +
                    "Message:\n" + message.getMessage() + "\n\n" +
                    "---\nSent via Portfolio Contact Form"
            );

            mailSender.send(mail);

            message.setStatus("EMAIL_SENT");
            message.setEmailSentAt(Instant.now());
            contactMessageRepository.save(message);
            log.info("Contact email sent successfully from: {}", message.getEmail());

        } catch (Exception e) {
            log.error("Failed to send contact email: {}", e.getMessage(), e);
            message.setStatus("FAILED");
            message.setErrorMessage(e.getMessage());
            contactMessageRepository.save(message);
        }
    }
}
