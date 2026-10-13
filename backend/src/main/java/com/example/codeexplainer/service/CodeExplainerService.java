package com.example.codeexplainer.service;

import com.example.codeexplainer.ai.AiCodeAnalyzer;
import com.example.codeexplainer.dto.CodeExplainRequest;
import com.example.codeexplainer.dto.CodeExplainResponse;
import com.example.codeexplainer.exception.InvalidCodeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Business logic for code explanation.
 * Validates the request, delegates to the AI analyzer, and returns the result.
 */
@Service
public class CodeExplainerService {

    private static final Logger log = LoggerFactory.getLogger(CodeExplainerService.class);

    private final AiCodeAnalyzer aiCodeAnalyzer;

    @Value("${app.code-explainer.max-code-length:10000}")
    private int maxCodeLength;

    @Value("${app.code-explainer.supported-languages:java,python}")
    private List<String> supportedLanguages;

    public CodeExplainerService(AiCodeAnalyzer aiCodeAnalyzer) {
        this.aiCodeAnalyzer = aiCodeAnalyzer;
    }

    /**
     * Validates the request and returns a structured AI explanation.
     */
    public CodeExplainResponse explainCode(CodeExplainRequest request) {
        // Normalize language
        String language = request.getLanguage().trim().toLowerCase();

        // Validate language
        if (!supportedLanguages.contains(language)) {
            throw new InvalidCodeException(
                    "Unsupported language: " + language + ". Supported: " + supportedLanguages);
        }

        // Validate code length
        String code = request.getCode().trim();
        if (code.isEmpty()) {
            throw new InvalidCodeException("Code cannot be empty.");
        }
        if (code.length() > maxCodeLength) {
            throw new InvalidCodeException(
                    "Code exceeds the maximum length of " + maxCodeLength + " characters.");
        }

        log.info("Explaining {} code ({} characters)", language, code.length());

        // Delegate to AI
        return aiCodeAnalyzer.analyze(language, code);
    }
}
