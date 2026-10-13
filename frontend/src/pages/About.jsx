import { Link } from 'react-router-dom';
import {
  Code2,
  Brain,
  Shield,
  Layers,
  Server,
  ArrowRight,
} from 'lucide-react';

function About() {
  const techStack = [
    {
      icon: Code2,
      label: 'Frontend',
      items: ['React.js + Vite', 'Tailwind CSS', 'Monaco Editor', 'Axios'],
      color: 'text-indigo-400',
      bg: 'from-indigo-500/20 to-indigo-600/10',
    },
    {
      icon: Server,
      label: 'Backend',
      items: ['Java 17', 'Spring Boot 3.x', 'Spring AI', 'Maven'],
      color: 'text-purple-400',
      bg: 'from-purple-500/20 to-purple-600/10',
    },
    {
      icon: Brain,
      label: 'AI',
      items: ['Large Language Model', 'Spring AI Integration', 'Structured Output'],
      color: 'text-cyan-400',
      bg: 'from-cyan-500/20 to-cyan-600/10',
    },
    {
      icon: Shield,
      label: 'Security',
      items: ['Server-side API keys', 'Input validation', 'Rate limiting', 'No code execution'],
      color: 'text-green-400',
      bg: 'from-green-500/20 to-green-600/10',
    },
  ];

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            About <span className="gradient-text">CodeMind AI</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            CodeMind AI is a developer tool that uses artificial intelligence to explain
            code in simple, beginner-friendly language. Built for students, self-learners,
            and anyone who wants to understand how code works.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            How It Works
          </h2>
          <div className="glass-card p-6">
            <ol className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">1</span>
                <span><strong className="text-white">Paste your code</strong> into the editor and select the programming language.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">2</span>
                <span><strong className="text-white">Click "Explain Code"</strong> — the code is sent to the Spring Boot backend.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">3</span>
                <span><strong className="text-white">The AI analyzes</strong> the code as text (never executes it) and generates a structured explanation.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">4</span>
                <span><strong className="text-white">The result</strong> is displayed as easy-to-read sections covering summary, steps, variables, output, complexity, and potential bugs.</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">Technology Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map((tech, idx) => (
              <div key={idx} className="glass-card p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tech.bg} flex items-center justify-center`}>
                    <tech.icon className={`w-5 h-5 ${tech.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-white">{tech.label}</h3>
                </div>
                <ul className="space-y-1.5">
                  {tech.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/explainer"
            className="btn-glow inline-flex items-center gap-2 px-8 py-3.5 text-base"
          >
            Try the Code Explainer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
