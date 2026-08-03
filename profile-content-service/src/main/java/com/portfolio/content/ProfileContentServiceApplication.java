package com.portfolio.content;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;

@SpringBootApplication(exclude = KafkaAutoConfiguration.class)
@EnableFeignClients
public class ProfileContentServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProfileContentServiceApplication.class, args);
    }
}
