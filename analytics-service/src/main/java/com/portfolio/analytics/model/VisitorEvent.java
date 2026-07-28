package com.portfolio.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "visitor_events")
public class VisitorEvent {

    @Id
    private String id;

    private String eventType;   // PAGE_VIEWED, PROJECT_VIEWED, etc.
    private String page;
    private String entityId;    // projectId, blogId if applicable
    private String entityTitle;

    @Indexed
    private String ip;
    private String userAgent;
    private String referrer;

    @Indexed
    private Instant timestamp;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
