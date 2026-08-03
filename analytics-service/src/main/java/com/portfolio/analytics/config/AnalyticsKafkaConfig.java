package com.portfolio.analytics.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ConditionalOnProperty(name = "app.features.kafka.enabled", havingValue = "true")
@Import(KafkaAutoConfiguration.class)
public class AnalyticsKafkaConfig {
}
