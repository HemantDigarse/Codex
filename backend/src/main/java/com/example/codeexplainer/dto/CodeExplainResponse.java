package com.example.codeexplainer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Response DTO containing the structured code explanation.
 * Fields match the frontend ExplanationPanel sections.
 */
public class CodeExplainResponse {

    private String summary;
    private String explanation;

    @JsonProperty("importantElements")
    private String importantElements;

    @JsonProperty("expectedOutput")
    private String expectedOutput;

    @JsonProperty("timeComplexity")
    private String timeComplexity;

    @JsonProperty("spaceComplexity")
    private String spaceComplexity;

    @JsonProperty("potentialIssues")
    private String potentialIssues;

    public CodeExplainResponse() {
    }

    public CodeExplainResponse(String summary, String explanation, String importantElements,
                                String expectedOutput, String timeComplexity,
                                String spaceComplexity, String potentialIssues) {
        this.summary = summary;
        this.explanation = explanation;
        this.importantElements = importantElements;
        this.expectedOutput = expectedOutput;
        this.timeComplexity = timeComplexity;
        this.spaceComplexity = spaceComplexity;
        this.potentialIssues = potentialIssues;
    }

    // Getters and setters

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getImportantElements() {
        return importantElements;
    }

    public void setImportantElements(String importantElements) {
        this.importantElements = importantElements;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public String getTimeComplexity() {
        return timeComplexity;
    }

    public void setTimeComplexity(String timeComplexity) {
        this.timeComplexity = timeComplexity;
    }

    public String getSpaceComplexity() {
        return spaceComplexity;
    }

    public void setSpaceComplexity(String spaceComplexity) {
        this.spaceComplexity = spaceComplexity;
    }

    public String getPotentialIssues() {
        return potentialIssues;
    }

    public void setPotentialIssues(String potentialIssues) {
        this.potentialIssues = potentialIssues;
    }
}
