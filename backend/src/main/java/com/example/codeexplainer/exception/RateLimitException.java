package com.example.codeexplainer.exception;

/**
 * Thrown when a client exceeds the rate limit.
 */
public class RateLimitException extends RuntimeException {

    public RateLimitException(String message) {
        super(message);
    }
}
