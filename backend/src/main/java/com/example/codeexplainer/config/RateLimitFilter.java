package com.example.codeexplainer.config;

import com.example.codeexplainer.exception.RateLimitException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Simple in-memory rate limiter.
 * Limits each IP to a configurable number of requests per minute.
 * <p>
 * For production, use Spring Cloud Gateway, Bucket4j, or a Redis-based solution.
 */
@Component
public class RateLimitFilter implements Filter {

    private static final int MAX_REQUESTS_PER_MINUTE = 10;
    private static final long WINDOW_MS = 60_000L;

    private final Map<String, RateEntry> clients = new ConcurrentHashMap<>();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpReq = (HttpServletRequest) request;
        String path = httpReq.getRequestURI();

        // Only rate-limit the explain endpoint
        if (path.startsWith("/api/code-explainer/explain")) {
            String clientIp = getClientIp(httpReq);
            RateEntry entry = clients.compute(clientIp, (key, existing) -> {
                long now = System.currentTimeMillis();
                if (existing == null || now - existing.windowStart > WINDOW_MS) {
                    return new RateEntry(now, new AtomicInteger(1));
                }
                existing.count.incrementAndGet();
                return existing;
            });

            if (entry.count.get() > MAX_REQUESTS_PER_MINUTE) {
                throw new RateLimitException(
                        "Too many requests. Please wait a moment before trying again.");
            }
        }

        chain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private static class RateEntry {
        final long windowStart;
        final AtomicInteger count;

        RateEntry(long windowStart, AtomicInteger count) {
            this.windowStart = windowStart;
            this.count = count;
        }
    }
}
