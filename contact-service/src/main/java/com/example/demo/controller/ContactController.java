package com.example.demo.controller;

import com.example.demo.dto.ContactRequest;
import com.example.demo.service.EmailService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:8080")
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public void sendMessage(@RequestBody ContactRequest request) {

        emailService.sendEmail(
                request.getName(),
                request.getEmail(),
                request.getMessage()
        );
    }
}
