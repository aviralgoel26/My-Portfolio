package com.portfolio.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

/**
 * Generic Kafka event payload for inter-service communication.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KafkaEventDTO {

    private String eventType;    // e.g. "PAGE_VIEWED", "CONTACT_SUBMITTED"
    private String sourceService;
    private String entityId;     // relevant resource ID if any
    private Map<String, Object> payload;

    @Builder.Default
    private Instant occurredAt = Instant.now();
}
