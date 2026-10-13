package com.example.codeexplainer.ai;

import com.example.codeexplainer.config.GeminiProperties;
import com.example.codeexplainer.dto.CodeExplainResponse;
import com.example.codeexplainer.exception.AiServiceException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;

/**
 * Calls the Google Gemini REST API directly.
 * No Spring AI dependency needed — just a simple HTTP POST.
 *
 * Gemini API docs:
 * https://ai.google.dev/gemini-api/docs/text-generation
 */
@Component
public class AiCodeAnalyzer {

    private static final Logger log = LoggerFactory.getLogger(AiCodeAnalyzer.class);

    private final HttpClient httpClient;
    private final GeminiProperties geminiProperties;
    private final ObjectMapper objectMapper;

    public AiCodeAnalyzer(GeminiProperties geminiProperties, ObjectMapper objectMapper) {
        this.geminiProperties = geminiProperties;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(30))
                .build();
    }

    /**
     * Sends code to Gemini and returns a structured explanation.
     */
    public CodeExplainResponse analyze(String language, String code) {
        log.info("Sending {} code ({} chars) to Gemini for analysis", language, code.length());

        if (geminiProperties.getApiKey() == null || geminiProperties.getApiKey().isBlank()) {
            throw new AiServiceException("Gemini API key is not configured. Set the GEMINI_API_KEY environment variable.");
        }

        try {
            String userPrompt = CodeExplainerPrompt.buildUserPrompt(language, code);

            // Build the Gemini API request body
            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(
                            Map.of("role", "user", "parts", List.of(Map.of("text", userPrompt)))
                    ),
                    "systemInstruction", Map.of(
                            "parts", List.of(Map.of("text", CodeExplainerPrompt.SYSTEM_PROMPT))
                    ),
                    "generationConfig", Map.of(
                            "temperature", geminiProperties.getTemperature(),
                            "maxOutputTokens", geminiProperties.getMaxOutputTokens()
                    )
            );

            String jsonBody = objectMapper.writeValueAsString(requestBody);

            // Build the full URL with API key as query parameter
            String fullUrl = geminiProperties.getBaseUrl()
                    + "/models/" + geminiProperties.getModel()
                    + ":generateContent?key=" + geminiProperties.getApiKey();

            log.debug("Gemini URL: {}", fullUrl.replaceAll("key=.*", "key=***"));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .timeout(Duration.ofSeconds(120))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            // Retry up to 3 times for 503 (overloaded) errors
            int maxRetries = 3;
            HttpResponse<String> response = null;
            for (int attempt = 1; attempt <= maxRetries; attempt++) {
                response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 503 && attempt < maxRetries) {
                    long waitMs = 2000L * (1L << (attempt - 1)); // 2s, 4s, 8s
                    log.warn("Gemini API returned 503 (overloaded), retrying in {}ms (attempt {}/{})",
                            waitMs, attempt, maxRetries);
                    Thread.sleep(waitMs);
                } else {
                    break;
                }
            }

            String responseJson = response.body();

            log.debug("Gemini response status: {}, body length: {} chars",
                    response.statusCode(), responseJson != null ? responseJson.length() : 0);

            if (response.statusCode() != 200) {
                log.error("Gemini API returned status {}: {}", response.statusCode(), responseJson);
                throw new AiServiceException("Gemini API error (HTTP " + response.statusCode() + "): " + responseJson);
            }

            return parseGeminiResponse(responseJson);

        } catch (AiServiceException e) {
            throw e;
        } catch (Exception e) {
            log.error("Gemini API call failed: {}", e.getMessage());
            throw new AiServiceException("Failed to get explanation from Gemini. Please try again.", e);
        }
    }

    /**
     * Extracts the text from Gemini's response and parses it as JSON.
     *
     * Gemini response format:
     * {
     *   "candidates": [{
     *     "content": {
     *       "parts": [{ "text": "..." }]
     *     }
     *   }]
     * }
     */
    private CodeExplainResponse parseGeminiResponse(String responseJson) {
        if (responseJson == null || responseJson.isBlank()) {
            throw new AiServiceException("Gemini returned an empty response.");
        }

        try {
            JsonNode root = objectMapper.readTree(responseJson);

            // Check for API errors
            JsonNode error = root.get("error");
            if (error != null) {
                String errorMsg = error.has("message") ? error.get("message").asText() : "Unknown Gemini error";
                log.error("Gemini API error: {}", errorMsg);
                throw new AiServiceException("Gemini error: " + errorMsg);
            }

            // Extract the generated text
            JsonNode candidates = root.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                throw new AiServiceException("Gemini returned no candidates.");
            }

            String generatedText = candidates.get(0)
                    .get("content")
                    .get("parts")
                    .get(0)
                    .get("text")
                    .asText();

            return parseExplanationJson(generatedText);

        } catch (AiServiceException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to parse Gemini response: {}", e.getMessage());
            throw new AiServiceException("Failed to parse Gemini response. Please try again.", e);
        }
    }

    /**
     * Parses the LLM-generated JSON text into a CodeExplainResponse.
     */
    private CodeExplainResponse parseExplanationJson(String raw) {
        // Strip markdown code fences if present
        String cleaned = raw.trim();
        if (cleaned.startsWith("```json")) {
            cleaned = cleaned.substring(7);
        } else if (cleaned.startsWith("```")) {
            cleaned = cleaned.substring(3);
        }
        if (cleaned.endsWith("```")) {
            cleaned = cleaned.substring(0, cleaned.length() - 3);
        }
        cleaned = cleaned.trim();

        try {
            JsonNode node = objectMapper.readTree(cleaned);

            CodeExplainResponse response = new CodeExplainResponse();
            response.setSummary(getTextOrNull(node, "summary"));
            response.setExplanation(getTextOrNull(node, "explanation"));
            response.setImportantElements(getTextOrNull(node, "importantElements"));
            response.setExpectedOutput(getTextOrNull(node, "expectedOutput"));
            response.setTimeComplexity(getTextOrNull(node, "timeComplexity"));
            response.setSpaceComplexity(getTextOrNull(node, "spaceComplexity"));
            response.setPotentialIssues(getTextOrNull(node, "potentialIssues"));

            if (response.getSummary() == null && response.getExplanation() == null) {
                throw new AiServiceException("AI response is missing required explanation fields.");
            }

            return response;

        } catch (AiServiceException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to parse explanation JSON: {}", e.getMessage());
            log.debug("Raw text: {}", cleaned);
            throw new AiServiceException("AI returned an invalid response format. Please try again.", e);
        }
    }

    private String getTextOrNull(JsonNode node, String field) {
        JsonNode child = node.get(field);
        if (child != null && !child.isNull()) {
            return child.asText();
        }
        return null;
    }
}
