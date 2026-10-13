import { Link } from 'react-router-dom';
import {
  Code2,
  Brain,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  BookOpen,
  Lightbulb,
} from 'lucide-react';

function Home() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced LLM technology breaks down complex code into simple, understandable explanations.',
      color: 'from-indigo-500/20 to-indigo-600/10',
      iconColor: 'text-indigo-400',
    },
    {
      icon: Code2,
      title: 'Multi-Language Support',
      description: 'Paste Java or Python code and get instant, accurate explanations tailored to the language.',
      color: 'from-purple-500/20 to-purple-600/10',
      iconColor: 'text-purple-400',
    },
    {
      icon: BookOpen,
      title: 'Step-by-Step Breakdown',
      description: 'Every line explained with execution flow, variables, functions, and expected output.',
      color: 'from-cyan-500/20 to-cyan-600/10',
      iconColor: 'text-cyan-400',
    },
    {
      icon: Zap,
      title: 'Complexity Analysis',
      description: 'Understand time and space complexity of your algorithms with clear reasoning.',
      color: 'from-amber-500/20 to-amber-600/10',
      iconColor: 'text-amber-400',
    },
    {
      icon: Lightbulb,
      title: 'Bug Detection',
      description: 'AI identifies potential issues, edge cases, and common pitfalls in your code.',
      color: 'from-rose-500/20 to-rose-600/10',
      iconColor: 'text-rose-400',
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your code is analyzed as text only — never executed. API keys stay server-side.',
      color: 'from-green-500/20 to-green-600/10',
      iconColor: 'text-green-400',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] bg-cyan-500/3 rounded-full blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              Powered by Advanced AI
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-white">Understand Code</span>
            <br />
            <span className="gradient-text">Like Never Before</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Paste any Java or Python code and get a beginner-friendly, AI-generated explanation.
            Understand every line, every variable, every function.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/explainer"
              id="cta-explainer"
              className="btn-glow px-8 py-3.5 text-base flex items-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              Start Explaining Code
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 rounded-xl border border-dark-500 text-sm font-medium text-gray-300 hover:text-white hover:border-indigo-500/30 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Everything you need to understand code
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A comprehensive AI analysis covering every aspect of your code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-card p-6 group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="glass-card p-10 sm:p-14 text-center bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to decode your code?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Try our AI Code Explainer with built-in examples — no setup required.
          </p>
          <Link
            to="/explainer"
            className="btn-glow inline-flex items-center gap-2 px-8 py-3.5 text-base"
          >
            <Sparkles className="w-5 h-5" />
            Try It Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
