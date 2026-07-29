package com.portfolio.gateway.config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RateLimiter;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import reactor.core.publisher.Mono;
import java.util.Collections;
import java.util.Map;

@Configuration
public class GatewayConfig {

    /**
     * Rate limiting key resolver — uses client IP address.
     * Falls back to "anonymous" if IP cannot be determined.
     */
    @Bean
    public KeyResolver ipKeyResolver() {
        return exchange -> {
            String ip = exchange.getRequest().getRemoteAddress() != null
                    ? exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
                    : "anonymous";
            return Mono.just(ip);
        };
    }

    /**
     * Wrap the default RedisRateLimiter to fail-open if Redis is down.
     * This prevents the entire Gateway from returning 500s when Redis fails.
     */
    @Bean
    @Primary
    public RateLimiter<RedisRateLimiter.Config> failOpenRateLimiter(RedisRateLimiter redisRateLimiter) {
        return new RateLimiter<RedisRateLimiter.Config>() {
            @Override
            public Mono<Response> isAllowed(String routeId, String id) {
                return redisRateLimiter.isAllowed(routeId, id)
                        .onErrorResume(throwable -> {
                            // On Redis failure, allow the request to proceed (fail-open)
                            return Mono.just(new Response(true, Collections.emptyMap()));
                        });
            }

            @Override
            public Map<String, RedisRateLimiter.Config> getConfig() {
                return redisRateLimiter.getConfig();
            }

            @Override
            public Class<RedisRateLimiter.Config> getConfigClass() {
                return redisRateLimiter.getConfigClass();
            }

            @Override
            public RedisRateLimiter.Config newConfig() {
                return redisRateLimiter.newConfig();
            }
        };
    }
}
