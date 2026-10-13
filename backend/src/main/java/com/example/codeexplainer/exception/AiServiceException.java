package com.example.codeexplainer.exception;

/**
 * Thrown when the AI/LLM service fails or times out.
 */
public class AiServiceException extends RuntimeException {

    public AiServiceException(String message) {
        super(message);
    }

    public AiServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
