package com.example.codeexplainer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Request DTO for the code explanation endpoint.
 */
public class CodeExplainRequest {

    @NotBlank(message = "Programming language is required")
    private String language;

    @NotBlank(message = "Code cannot be empty")
    @Size(max = 10000, message = "Code must not exceed 10,000 characters")
    private String code;

    public CodeExplainRequest() {
    }

    public CodeExplainRequest(String language, String code) {
        this.language = language;
        this.code = code;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
