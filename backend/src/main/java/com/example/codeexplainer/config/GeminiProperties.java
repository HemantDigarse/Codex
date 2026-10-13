package com.example.codeexplainer.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Maps the gemini.* properties from application.yml.
 */
@Component
@ConfigurationProperties(prefix = "gemini")
public class GeminiProperties {

    private String apiKey;
    private String model = "gemini-3.8-flash";
    private String baseUrl = "https://generativelanguage.googleapis.com/v1beta";
    private double temperature = 0.3;
    private int maxOutputTokens = 4096;

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public int getMaxOutputTokens() {
        return maxOutputTokens;
    }

    public void setMaxOutputTokens(int maxOutputTokens) {
        this.maxOutputTokens = maxOutputTokens;
    }
}
