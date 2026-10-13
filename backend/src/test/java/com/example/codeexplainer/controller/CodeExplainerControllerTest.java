package com.example.codeexplainer.controller;

import com.example.codeexplainer.config.GeminiProperties;
import com.example.codeexplainer.dto.CodeExplainRequest;
import com.example.codeexplainer.dto.CodeExplainResponse;
import com.example.codeexplainer.service.CodeExplainerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Unit tests for CodeExplainerController using plain Mockito (no Spring context).
 */
class CodeExplainerControllerTest {

    private final CodeExplainerService service = Mockito.mock(CodeExplainerService.class);
    private final GeminiProperties geminiProperties = Mockito.mock(GeminiProperties.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final CodeExplainerController controller = new CodeExplainerController(service, geminiProperties, objectMapper);

    @Test
    void explainCode_validRequest_returnsExplanation() {
        // Arrange
        CodeExplainResponse mockResponse = new CodeExplainResponse(
                "A simple Hello World program.",
                "Step 1: The main method is the entry point...",
                "main: the entry point method",
                "Hello, World!",
                "O(1) — constant time",
                "O(1) — constant space",
                "No significant issues detected."
        );

        when(service.explainCode(any(CodeExplainRequest.class)))
                .thenReturn(mockResponse);

        CodeExplainRequest request = new CodeExplainRequest("java",
                "public class Main { public static void main(String[] args) { System.out.println(\"Hello World\"); } }");

        // Act
        ResponseEntity<CodeExplainResponse> response = controller.explainCode(request);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals("A simple Hello World program.", response.getBody().getSummary());
        assertEquals("Hello, World!", response.getBody().getExpectedOutput());
    }

    @Test
    void health_returnsOk() {
        ResponseEntity<String> response = controller.health();
        assertEquals(200, response.getStatusCode().value());
        assertEquals("OK", response.getBody());
    }

    @Test
    void explainCode_serviceThrows_propagatesException() {
        when(service.explainCode(any(CodeExplainRequest.class)))
                .thenThrow(new RuntimeException("AI failed"));

        CodeExplainRequest request = new CodeExplainRequest("python", "print('hello')");

        assertThrows(RuntimeException.class, () -> controller.explainCode(request));
    }
}
