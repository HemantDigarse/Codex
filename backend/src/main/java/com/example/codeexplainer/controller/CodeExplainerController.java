package com.example.codeexplainer.controller;

import com.example.codeexplainer.config.GeminiProperties;
import com.example.codeexplainer.dto.CodeExplainRequest;
import com.example.codeexplainer.dto.CodeExplainResponse;
import com.example.codeexplainer.service.CodeExplainerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * REST controller for the AI Code Explainer.
 */
@RestController
@RequestMapping("/api/code-explainer")
public class CodeExplainerController {

    private static final Logger log = LoggerFactory.getLogger(CodeExplainerController.class);

    private final CodeExplainerService codeExplainerService;
    private final GeminiProperties geminiProperties;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public CodeExplainerController(CodeExplainerService codeExplainerService,
                                    GeminiProperties geminiProperties,
                                    ObjectMapper objectMapper) {
        this.codeExplainerService = codeExplainerService;
        this.geminiProperties = geminiProperties;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newHttpClient();
    }

    @PostMapping("/explain")
    public ResponseEntity<CodeExplainResponse> explainCode(
            @Valid @RequestBody CodeExplainRequest request) {
        log.info("Received explain request for language: {}", request.getLanguage());
        CodeExplainResponse response = codeExplainerService.explainCode(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }

    /**
     * GET /api/code-explainer/diagnose
     * Checks Gemini API key config and tests connectivity.
     * Open http://localhost:8080/api/code-explainer/diagnose in your browser.
     */
    @GetMapping("/diagnose")
    public ResponseEntity<Map<String, Object>> diagnose() {
        Map<String, Object> result = new LinkedHashMap<>();

        // Check API key
        String apiKey = geminiProperties.getApiKey();
        boolean keySet = apiKey != null && !apiKey.isBlank();
        result.put("apiKeyConfigured", keySet);
        result.put("model", geminiProperties.getModel());
        result.put("baseUrl", geminiProperties.getBaseUrl());

        if (!keySet) {
            result.put("error", "GEMINI_API_KEY is not set! Run: set GEMINI_API_KEY=your-key-here");
            return ResponseEntity.ok(result);
        }

        result.put("apiKeyPrefix", apiKey.substring(0, Math.min(8, apiKey.length())) + "...");

        // Test Gemini API with a simple prompt using Java HttpClient
        try {
            String fullUrl = geminiProperties.getBaseUrl()
                    + "/models/" + geminiProperties.getModel()
                    + ":generateContent?key=" + apiKey;

            result.put("requestUrl", fullUrl.replaceAll("key=.*", "key=***"));

            Map<String, Object> body = Map.of(
                    "contents", List.of(
                            Map.of("parts", List.of(Map.of("text", "Say hello in one word.")))
                    )
            );

            String jsonBody = objectMapper.writeValueAsString(body);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            result.put("httpStatus", response.statusCode());

            if (response.statusCode() == 200) {
                result.put("geminiConnected", true);
                String respBody = response.body();
                result.put("testResponse", respBody != null
                        ? respBody.substring(0, Math.min(300, respBody.length()))
                        : "null");
            } else {
                result.put("geminiConnected", false);
                result.put("error", "HTTP " + response.statusCode() + ": " + response.body());
            }

        } catch (Exception e) {
            result.put("geminiConnected", false);
            result.put("error", e.getClass().getSimpleName() + ": " + e.getMessage());
        }

        return ResponseEntity.ok(result);
    }

    /**
     * GET /api/code-explainer/list-models
     * Lists all available Gemini models for the configured API key.
     */
    @GetMapping("/list-models")
    public ResponseEntity<String> listModels() {
        String apiKey = geminiProperties.getApiKey();
        if (apiKey == null || apiKey.isBlank()) {
            return ResponseEntity.ok("{\"error\": \"API key not configured\"}");
        }

        try {
            String fullUrl = geminiProperties.getBaseUrl() + "/models?key=" + apiKey;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return ResponseEntity.ok(response.body());
        } catch (Exception e) {
            return ResponseEntity.ok("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
