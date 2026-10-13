package com.example.codeexplainer;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    "gemini.api-key=test-key",
    "gemini.model=gemini-2.0-flash"
})
class CodeExplainerApplicationTests {

    @Test
    void contextLoads() {
        // Verifies that the Spring context starts successfully
    }
}
