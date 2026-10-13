package com.example.codeexplainer.exception;

/**
 * Thrown when the submitted code or language is invalid.
 */
public class InvalidCodeException extends RuntimeException {

    public InvalidCodeException(String message) {
        super(message);
    }
}
