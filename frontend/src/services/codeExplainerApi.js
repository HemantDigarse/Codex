import axios from 'axios';

/**
 * Axios instance configured for the Spring Boot backend.
 * In development, Vite proxies /api requests to localhost:8080.
 */
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 120000, // 2 minutes – LLMs can be slow
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Send code to the backend for AI-powered explanation.
 *
 * @param {string} language – "java" or "python"
 * @param {string} code – the source code to explain
 * @returns {Promise<Object>} structured explanation from the LLM
 */
export async function explainCode(language, code) {
  const response = await apiClient.post('/code-explainer/explain', {
    language,
    code,
  });
  return response.data;
}

export default apiClient;
