package com.portfolio.content.kafka;

public interface AnalyticsEventPublisher {
    void publishPageView(String page, String ip, String userAgent);
    void publishProjectView(String projectId, String projectTitle);
}
