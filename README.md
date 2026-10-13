# 🧠 CodeMind AI – AI Code Explainer

A full-stack web application that lets users paste **Java** or **Python** code and receive a beginner-friendly, AI-generated explanation. Built with **React + Vite** on the frontend and **Spring Boot + Spring AI + Google Gemini** on the backend.

> **💡 Free to use** — Powered by Google Gemini's free API tier. No credit card required!

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react)
![Tech Stack](https://img.shields.io/badge/Spring_Boot-3.3-green?logo=springboot)
![Tech Stack](https://img.shields.io/badge/Spring_AI-1.0_M2-purple)
![Tech Stack](https://img.shields.io/badge/Gemini-2.0_Flash-blue?logo=google)
![Tech Stack](https://img.shields.io/badge/Java-17-orange?logo=openjdk)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-3.4-cyan?logo=tailwindcss)

---

## ✨ Features

- 🖥️ **Monaco Editor** with syntax highlighting for Java and Python
- 🤖 **AI-powered explanations** using Google Gemini (free tier)
- 📋 **7 structured sections**: Summary, Step-by-Step, Variables, Output, Time/Space Complexity, Bugs
- 📦 **Pre-built examples**: Hello World, Even/Odd, Factorial, Array Max
- 🎨 **Dark theme** with glassmorphism, gradients, and micro-animations
- 🔒 **Secure**: API keys server-side, rate limiting, input validation
- 📱 **Responsive** design for all screen sizes
- 📋 **Copy to clipboard** with toast notifications

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | 18+ | https://nodejs.org |
| **Java JDK** | 17+ | https://adoptium.net |
| **Maven** | 3.8+ | https://maven.apache.org (or use included wrapper) |

---

### Step 1: Get a FREE Gemini API Key

1. Go to **https://aistudio.google.com/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AIza...`)

> ✅ The free tier gives you **15 requests/minute** and **1,500 requests/day** — more than enough for development and demos.

### Step 2: Start the Backend

```bash
cd backend

# Set your Gemini API key
set GEMINI_API_KEY=AIzaSy...your-key-here

# Start Spring Boot
mvnw.cmd spring-boot:run
```

> On macOS/Linux:
> ```bash
> export GEMINI_API_KEY=AIzaSy...your-key-here
> ./mvnw spring-boot:run
> ```

The backend starts on **http://localhost:8080**. Verify it:
```bash
curl http://localhost:8080/api/code-explainer/health
# → OK
```

### Step 3: Start the Frontend

Open a **new terminal**:
```bash
cd frontend
npm install
npm run dev
```

The frontend starts on **http://localhost:5173**.

### Step 4: Use It!

1. Open **http://localhost:5173** in your browser
2. Go to **Code Explainer**
3. Click **Load Example** → pick any snippet
4. Click **Explain Code** ✨
5. The AI explanation appears in seconds!

---

## 🤖 Available Gemini Models (All Free)

| Model | Speed | Quality | Best For |
|-------|-------|---------|----------|
| `gemini-2.0-flash` ⭐ | ⚡⚡ Very fast | Great | **Recommended** — best speed/quality balance |
| `gemini-1.5-flash` | ⚡⚡ Very fast | Good | Quick explanations |
| `gemini-1.5-pro` | ⚡ Fast | Excellent | Most detailed explanations |

To change the model, set the environment variable:
```bash
set GEMINI_MODEL=gemini-1.5-pro
mvnw.cmd spring-boot:run
```

---

## 📁 Project Structure

```
GenCode/
├── frontend/                          # React + Vite
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CodeEditor.jsx         # Monaco Editor wrapper
│   │   │   ├── LanguageSelector.jsx
│   │   │   ├── ExampleLoader.jsx
│   │   │   ├── ExplanationPanel.jsx   # Renders AI explanation
│   │   │   ├── LoadingOverlay.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CodeExplainer.jsx      # Main tool page
│   │   │   └── About.jsx
│   │   ├── services/
│   │   │   └── codeExplainerApi.js    # Axios API service
│   │   ├── data/
│   │   │   └── sampleCode.js          # Example snippets
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                           # Spring Boot + Spring AI
│   ├── src/main/java/com/example/codeexplainer/
│   │   ├── controller/
│   │   │   └── CodeExplainerController.java
│   │   ├── service/
│   │   │   └── CodeExplainerService.java
│   │   ├── ai/
│   │   │   ├── AiCodeAnalyzer.java    # Gemini communication
│   │   │   └── CodeExplainerPrompt.java
│   │   ├── dto/
│   │   │   ├── CodeExplainRequest.java
│   │   │   ├── CodeExplainResponse.java
│   │   │   └── ErrorResponse.java
│   │   ├── config/
│   │   │   ├── CorsConfig.java
│   │   │   └── RateLimitFilter.java
│   │   ├── exception/
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   ├── InvalidCodeException.java
│   │   │   ├── AiServiceException.java
│   │   │   └── RateLimitException.java
│   │   └── CodeExplainerApplication.java
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── src/test/java/...
│   └── pom.xml
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔌 API Reference

### `POST /api/code-explainer/explain`

**Request Body:**
```json
{
  "language": "java",
  "code": "public class Main { public static void main(String[] args) { System.out.println(\"Hello World\"); } }"
}
```

**Response:**
```json
{
  "summary": "A simple Hello World program...",
  "explanation": "Step 1: The JVM calls the main method...",
  "importantElements": "main(): The entry point...",
  "expectedOutput": "Hello World",
  "timeComplexity": "O(1) — constant time...",
  "spaceComplexity": "O(1) — constant space...",
  "potentialIssues": "No significant issues detected."
}
```

### `GET /api/code-explainer/health`

Returns `OK` if the server is running.

---

## 🔐 Security

- API keys are stored **server-side only** via environment variables
- Input validated for length (max 10,000 chars) and supported languages
- Rate limiting: 10 requests per minute per IP
- User-submitted code is **never executed** — analyzed as text only
- Internal stack traces are **never exposed** to the frontend
- Code in prompts is treated as **untrusted content** (prompt injection mitigation)

---

## 🛠️ Tech Stack

| Layer      | Technology                                    |
|-----------|-----------------------------------------------|
| Frontend  | React 18, Vite 5, Tailwind CSS 3              |
| Editor    | Monaco Editor (VS Code engine)                 |
| Icons     | Lucide React                                   |
| HTTP      | Axios                                          |
| Backend   | Java 17, Spring Boot 3.3, Spring Web           |
| AI        | Spring AI 1.0-M2 + Google Gemini 2.0 Flash     |
| Build     | Maven                                          |
| Validation| Jakarta Bean Validation                        |

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| `401 Unauthorized` | Check your `GEMINI_API_KEY` is set correctly |
| `429 Too Many Requests` | Free tier limit reached — wait a minute |
| Slow response | Normal for first request; Gemini Flash is usually fast |
| Frontend can't reach backend | Ensure backend runs on port 8080, frontend on 5173 |
| `CORS error` in browser console | Backend CORS config allows localhost:5173 by default |
| `mvnw` not recognized | Use `mvn spring-boot:run` if Maven is installed globally |

---

## 📝 License

This project is for educational purposes. Feel free to modify and use it for learning.
