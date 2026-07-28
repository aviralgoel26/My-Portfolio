package com.portfolio.notification.repository;

import com.portfolio.notification.model.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {
    List<ContactMessage> findAllByOrderByReceivedAtDesc();
    List<ContactMessage> findByStatus(String status);
}
